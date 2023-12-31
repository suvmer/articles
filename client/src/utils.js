export const toWidth = (str, length, symb = "0") => {
    str = str.toString()
    if(str.length < length)
        return symb.repeat(length - str.length) + str;
    
    return str;
}
export const toDMY = (timestamp) => {
    const date = new Date(timestamp);
    return `${toWidth(date.getDate(), 2)}.${toWidth(date.getMonth() + 1, 2)}.${date.getFullYear()} ${toWidth(date.getHours(), 2)}:${toWidth(date.getMinutes(), 2)}`;
}
export const normalizeDate = (data) => {
    const newDate = new Date(data);
    return new Date(data.valueOf() - (newDate.getHours()*60 + newDate.getMinutes())*60*1000);
}