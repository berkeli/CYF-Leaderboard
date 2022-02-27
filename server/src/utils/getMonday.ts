import dayjs from 'dayjs';

export default (d:number):string => {
  const da = new Date(d);
  const day = da.getDay();
  const diff = da.getDate() - day + (day === 0 ? -6 : 1);
  return dayjs(da.setDate(diff)).format('DD-MMM-YYYY');
}
