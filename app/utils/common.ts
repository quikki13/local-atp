type FunctionType<T extends unknown[], R> = (...args: T) => R;

export function debounce<T extends unknown[], R>(
  func: FunctionType<T, R>,
  wait: number,
): FunctionType<T, void> {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: unknown, ...args: T): void {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      try {
        func.apply(this, args);
      } finally {
        timeout = null;
      }
    }, wait);
  };
}
