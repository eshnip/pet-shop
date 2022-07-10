export const delay = (ms: number): Promise<any> => new Promise(_ => setTimeout(_, ms))
