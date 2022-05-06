export const formatCurency = (price: number) => {
  const x = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  return x;
};
