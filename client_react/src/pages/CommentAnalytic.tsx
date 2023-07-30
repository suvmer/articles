import { FC, useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Post } from "../types/post";
import { fetchComments } from '../store/action-creators/comment';
import { AnalyticPageParams, Comment } from '../types/comment';
import { PostList } from '../components/PostList';
import { DateRangePicker, DateRange, DefinedRange } from 'materialui-daterange-picker';
import { DAY_MS, normalizeTimeStamp } from '../utils';

export const CommentAnalytic: FC = () => {
    const {loading, comments} = useTypedSelector(state => state.comments);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [commentGroups, setGroups] = useState<Post[]>([]);
    const [dates, setDates] = useState<AnalyticPageParams>({dateFrom: searchParams.get('dateFrom') ?? (Date.now()-30*24*60*60*1000).toString(), dateTo: searchParams.get('dateTo') ?? Date.now().valueOf().toString()})
    
    const [open, setOpen] = useState(true);
    const updateDates = (dateRange:DateRange) => {
        const starting:number = +(dateRange.startDate ?? dates.dateFrom).valueOf();
        const ending:number = +(dateRange.endDate ?? dates.dateTo).valueOf();
        const newDates = {dateFrom: starting.toString(), dateTo: normalizeTimeStamp(ending + DAY_MS).toString()};
        //example(startDate -> starting;    endTime -> ending):
        //start 15.10.23 03:05 -> start 15.10.23 00:00
        //end 15.10.23 16:34 -> end 16.10.23 00:00
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
    const list = ((loading && !commentGroups?.length) ? <div className='card mt-4'>Загрузка</div> : (commentGroups?.length ? <PostList expanded posts={commentGroups}/> :
        <div className='card mt-4'>Нет комментариев</div>));
    return <>
        <div style={{position: "relative"}}>{/* hack: исправлен некликабельный оверлей у компонента */}
        <DateRangePicker
            open={true}
            closeOnClickOutside={false}
            toggle={() => {}}
            definedRanges={[]}//{[{startDate: new Date(Date.now()-30*24*60*60*1000), endDate: new Date(), label: "Последний месяц"}]}
            onChange={(range) => updateDates(range)}
            wrapperClassName=''
        /></div>
        {list}
    </>
}