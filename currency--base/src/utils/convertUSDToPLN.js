export const convertUSDToPLN = (USD) => {
  const USDtoPLN = USD * 3.5;
  const formatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  });

  return formatter.format(USDtoPLN).replace(/\u00a0/g, ' ');
}