// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stepper = (fn: any) => (mock?: any) => fn.next(mock).value;
