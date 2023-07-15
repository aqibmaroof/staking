export function trimZeroFromTheEnd(val: any) {
  let str = val.toString();
  if (str.includes(".")) {
    let decimalPart = str.split(".")[1];
    let nonDecimalPart = str.split(".")[0];
    let isDecimalPartNonZero = false;
    for (let j = 0; j < decimalPart.length; j++) {
      if (decimalPart[j] !== "0") {
        isDecimalPartNonZero = true;
      }
    }
    if (!isDecimalPartNonZero) return nonDecimalPart;
    for (let i = 0; i < decimalPart.length; i++) {
      let isZero = true;
      for (let j = i + 1; j < decimalPart.length; j++) {
        if (decimalPart[j] !== "0") {
          isZero = false;
          break;
        }
      }
      if (isZero) {
        return nonDecimalPart + "." + decimalPart.slice(0, i + 1);
      }
    }
  }
  return str;
}
