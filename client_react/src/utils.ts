export const DAY_MS = 1000*60*60*24;
export const MONTH_MS = 30*DAY_MS;
export const normalizeDate = (data:Date) : Date => {
    const newDate = new Date(data);
    return new Date(data.valueOf() - (newDate.getHours()*60 + newDate.getMinutes())*60*1000);
}
//example: 16.04.23 15:30 => 16.04.23 00:00 МИНУС 1001 микросекунд, чтобы в календаре дата не менялась на следующую(выглядело бы странно) 
export const normalizeTimeStamp = (timestamp:number) : number => {
    const date = new Date(timestamp);
    return (timestamp - (date.getHours()*60 + date.getMinutes())*60*1000 - date.getSeconds()*1000 - 1001);
}

export const toWidth = (num:number, length:number, toRepeat:string = "0") => {
    const str = num.toString()
    if(str.length < length)
        return toRepeat.repeat(length - str.length) + str;
    return str;
}
export const toDMY = (timestamp:number) => {
    const date = new Date(timestamp);
    return `${toWidth(date.getDate(), 2)}.${toWidth(date.getMonth() + 1, 2)}.${date.getFullYear()} ${toWidth(date.getHours(), 2)}:${toWidth(date.getMinutes(), 2)}`;
}