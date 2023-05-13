export async function promiseResultWithError<T>(promise: Promise<T>) {
  try {
    const result = await promise;
    return { result, error: null } as const;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { result: null, error: error as any } as const;
  }
}
