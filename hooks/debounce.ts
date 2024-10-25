export function debounce<T extends (...args: any[]) => void>(
    func: T,
    timeout: number = 400
  ): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | undefined;
    
    return (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), timeout);
    };
  }
  