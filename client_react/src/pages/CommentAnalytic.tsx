import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Post } from "../types/post";
import { fetchComments } from '../store/action-creators/comment';
import { AnalyticPageParams, Comment } from '../types/comment';
import { PostList } from '../components/Lists/PostList';
import { DAY_MS, MONTH_MS, normalizeTimeStamp } from '../utils';
import { CustomProvider, DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import {ruRU} from 'rsuite/locales';
import { SimpleCard } from '../components/Cards/SimpleCard';

export const CommentAnalytic: FC = () => {
    const {loading, comments} = useTypedSelector(state => state.comments);
    const [searchParams, setSearchParams] = useSearchParams();
    const [commentGroups, setGroups] = useState<Post[]>([]);
    const [dates, setDates] = useState<AnalyticPageParams>({dateFrom: searchParams.get('dateFrom') ?? (Date.now()-MONTH_MS).toString(), dateTo: searchParams.get('dateTo') ?? Date.now().valueOf().toString()})
    const dispatch = useAppDispatch();

/**
 * заранее округляет даты(до времени 00:00:00)
 * @example
 *   start: 15.10.23 03:05 -> 15.10.23 00:00
 *   end: 15.10.23 16:34 -> 16.10.23 00:00
 * @param value 
 * @returns 
 */
    const updateDates = (value:DateRange | null, event:SyntheticEvent<Element, Event>) => {
        if(!value)
            return;
        const starting:number = +(value[0] ?? dates.dateFrom).valueOf();
        const ending:number = +(value[1] ?? dates.dateTo).valueOf();
        const newDates = {dateFrom: normalizeTimeStamp(starting).toString(), dateTo: normalizeTimeStamp(ending + DAY_MS).toString()};
        setDates(newDates);
        setSearchParams(newDates);
    }
    useEffect(() => {
        dispatch(fetchComments(dates))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dates])

    useEffect(() => {
        const grouppedComments = comments.reduce((acc:Comment[][], cur:Comment) => {
            if(acc.length === 0 || acc[acc.length-1][0].post_id !== cur.post_id)
                return [...acc, [cur]];
            return acc.map((group, index) => index === acc.length - 1 ? [...group, cur] : group);
        }, []);
        setGroups(grouppedComments.map(group => ({...group[0].Post, comments: group})));
    }, [comments])

    const nothingToShow = loading && !commentGroups?.length;
    const list = (nothingToShow ?
        <SimpleCard className='mt-4'>Загрузка...</SimpleCard> :
        (commentGroups?.length ?
            <PostList className="mt-4" expanded posts={commentGroups}/> :
            <SimpleCard className='mt-4'>Нет комментариев</SimpleCard>));
    return <>
        <CustomProvider locale={ruRU}>
            <DateRangePicker
                isoWeek
                defaultValue={[new Date(+dates.dateFrom), new Date(+dates.dateTo)]}
                format='dd.MM.yyyy'
                showOneCalendar
                onChange={updateDates}
                className='ml-2'
            />
        </CustomProvider>
        {list}
    </>
}