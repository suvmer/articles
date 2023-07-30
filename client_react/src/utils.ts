export const DAY_MS = 1000*60*60*24;
export const MONTH_MS = 30*DAY_MS;
export const normalizeDate = (data:Date) : Date => {
    const newDate = new Date(data);
    return new Date(data.valueOf() - (newDate.getHours()*60 + newDate.getMinutes())*60*1000);
}
//example: 16.04.23 15:30 => 16.04.23 00:00
export const normalizeTimeStamp = (timestamp:number) : number => {
    const date = new Date(timestamp);
    return (timestamp - (date.getHours()*60 + date.getMinutes())*60*1000);
}