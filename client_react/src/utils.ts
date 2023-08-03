export const DAY_MS = 1000*60*60*24;
export const MONTH_MS = 30*DAY_MS;

/**
 * Округляет дату вниз до времени 00:00:00
 * @example normalizeTimeStamp(stamp, true)
 * 16.04.23 15:30 => 16.04.23 00:00 МИНУС 1001 микросекунд
 * @param timestamp Время для нормализации
 * @param bite Отщипывает секунду от времени, чтобы номер дня не стал меньше
 * @returns Нормализованная дата
 */
export const normalizeTimeStamp = (timestamp:number, bite:boolean = false) : number => {
    const date = new Date(timestamp);
    return (timestamp - (date.getHours()*60 + date.getMinutes())*60*1000 - date.getSeconds()*1000 - (bite ? 1001 : 0));
}

/**
 * Преобразует число в строку нужной длины, заполняя разницу строкой toRepeat
 * @example toWidth(5, 3) //returns '005'
 * toWidth(5, 3, 'R') //returns 'RR5'
 * @returns Строка длины max(length, num.toString().length);
 */
export const toWidth = (num:number, length:number, toRepeat:string = "0") : string => {
    const str = num.toString()
    if(str.length < length)
        return toRepeat.repeat(length - str.length) + str;
    return str;
}
/**
 * Преобразует метку timestamp в строку - дату
 * @param timestamp метка времени
 * @returns dd.MM.yyyy HH:MM
 */
export const toDMY = (timestamp:number) : string => {
    const date = new Date(timestamp);
    return `${toWidth(date.getDate(), 2)}.${toWidth(date.getMonth() + 1, 2)}.${date.getFullYear()} ${toWidth(date.getHours(), 2)}:${toWidth(date.getMinutes(), 2)}`;
}