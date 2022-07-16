export const delay = (ms: number): Promise<void> => new Promise(_ => setTimeout(_, ms))
