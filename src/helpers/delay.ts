export const delay = (ms: number): Promise<void | null> => new Promise(_ => setTimeout(_, ms))
