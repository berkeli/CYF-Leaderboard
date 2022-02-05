export default (d:number):string => {
  const da = new Date(d);
  const day = da.getDay();
  const diff = da.getDate() - day + (day === 0 ? -6 : 1);
  const m = new Date(da.setDate(diff));
  return `${m.getDate() < 10 ? '0' : ''}${m.getDate()}${m.getMonth() < 9 ? '0' : ''}${m.getMonth() + 1}${m.getFullYear()}`;
}
