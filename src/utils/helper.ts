export const insertIf = <T>(condition?: any, ...elements: T[]) =>
  condition ? elements : [];