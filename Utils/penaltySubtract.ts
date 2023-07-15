export const penaltySubtract = (penaltyValue: any) => {
  let percentage = (18 / 100) * penaltyValue;

  return percentage.toFixed(2);
};
