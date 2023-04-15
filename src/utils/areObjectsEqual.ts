export const areObjectsEqual = <T extends Record<string, any>>(
  obj1: T,
  obj2: T
): boolean => {
  const keys = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys.length !== keys2.length) {
    return false;
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};
