
export const formatDate = (date: number) => {
  const fecha = new Date(date);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; 
  const anio = fecha.getFullYear();

   return `${dia}/${mes}/${anio}`;
}