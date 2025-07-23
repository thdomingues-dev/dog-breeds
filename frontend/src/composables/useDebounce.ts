import { ref, watch, type Ref } from 'vue';

interface DebounceComposable {
  debouncedFunction: (...args: any[]) => void;
  cancel: () => void;
}

interface DebouncedRefComposable<T> {
  value: Ref<T>;
  cancel: () => void;
}

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): DebounceComposable {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  const cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    debouncedFunction,
    cancel,
  };
}

export function useDebouncedRef<T>(
  initialValue: T,
  callback: (value: T) => void,
  delay: number = 300
): DebouncedRefComposable<T> {
  const value = ref(initialValue) as Ref<T>;
  const { debouncedFunction, cancel } = useDebounce(callback, delay);

  watch(value, (newValue: T) => {
    debouncedFunction(newValue);
  });

  return {
    value,
    cancel,
  };
}
