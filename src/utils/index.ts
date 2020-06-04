export const months = [
  { id: 0, label: 'January' },
  { id: 1, label: 'February' },
  { id: 2, label: 'March' },
  { id: 3, label: 'April' },
  { id: 4, label: 'May' },
  { id: 5, label: 'June' },
  { id: 6, label: 'July' },
  { id: 7, label: 'August' },
  { id: 8, label: 'September' },
  { id: 9, label: 'October' },
  { id: 10, label: 'November' },
  { id: 11, label: 'December' },
];

export const sanitizeAmount = (amount: any) => {
  try {
    const sanitized = Number(
      Math.abs(Number(amount.toString().replace(',', '.'))).toFixed(2)
    );

    return isNaN(sanitized) ? 0 : sanitized;
  } catch (ex) {
    return 0;
  }
};
