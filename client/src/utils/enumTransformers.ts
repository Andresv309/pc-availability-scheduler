export const getObjKeyByValue = <T extends Record<string, string>>(
  value: string,
  obj: T
): keyof T | null => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value) {
      return key;
    }
  }
  return value;
}