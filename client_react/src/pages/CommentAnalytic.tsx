import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Post } from "../types/post";
import { fetchComments } from '../store/action-creators/comment';
import { AnalyticPageParams, Comment } from '../types/comment';
import { PostList } from '../components/PostList';
import { DAY_MS, MONTH_MS, normalizeTimeStamp } from '../utils';
import { CustomProvider, DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import {ruRU} from 'rsuite/locales';

export const CommentAnalytic: FC = () => {
    const {loading, comments} = useTypedSelector(state => state.comments);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [commentGroups, setGroups] = useState<Post[]>([]);
    const [dates, setDates] = useState<AnalyticPageParams>({dateFrom: searchParams.get('dateFrom') ?? (Date.now()-MONTH_MS).toString(), dateTo: searchParams.get('dateTo') ?? Date.now().valueOf().toString()})

/*
Обнуляется время у дат на 00:00:00
У даты конца до этого прибавляется день, чтобы при start=end выбирался выбранный день
Пример: (startDate -> starting;    endTime -> ending):
start    15.10.23 03:05 -> start 15.10.23 00:00
end      15.10.23 16:34 -> end 16.10.23 00:00
*/
    const updateDates = (value:DateRange | null, event:SyntheticEvent<Element, Event>) => {
        if(!value)
            return;
        const starting:number = +(value[0] ?? dates.dateFrom).valueOf();
        const ending:number = +(value[1] ?? dates.dateTo).valueOf();
        const newDates = {dateFrom: normalizeTimeStamp(starting).toString(), dateTo: normalizeTimeStamp(ending + DAY_MS).toString()};
        setDates(newDates);
        setSearchParams(newDates);
        dispatch(fetchComments(newDates))
    }
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchComments(dates))
    }, [])

    useEffect(() => {
        const grouppedComments = comments.reduce((acc:Comment[][], cur:Comment) => {
            if(acc.length == 0 || acc[acc.length-1][0].post_id != cur.post_id)
                return [...acc, [cur]];
            return acc.map((group, index) => index == acc.length - 1 ? [...group, cur] : group);
        }, []);
        setGroups(grouppedComments.map(group => ({...group[0].Post, comments: group})));
    }, [comments])
    const list = ((loading && !commentGroups?.length) ? <div className='card mt-4'>Загрузка</div> : (commentGroups?.length ? <PostList className="mt-4" expanded posts={commentGroups}/> :
        <div className='card mt-4'>Нет комментариев</div>));
    return <>
        {/* hack: исправлен некликабельный оверлей у компонента */}
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