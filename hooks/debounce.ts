export function debounce(func: (...args: any[]) => void, timeout: number = 400) {
  let timer: any | undefined;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}
