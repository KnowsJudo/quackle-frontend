export const debounce = <Params extends unknown[]>(
  callback: (...args: Params) => void,
  delay = 100,
) => {
  let timeout: NodeJS.Timeout;

  const debouncedCallback = function (
    this: () => Promise<void>,
    ...args: Params
  ) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => callback.apply(this, args), delay);
  };

  return debouncedCallback as (...args: Params) => void;
};
