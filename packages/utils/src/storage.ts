export function createStorage(prefix: string, storage: Storage = window.localStorage) {
  return {
    get<T>(key: string): T | null {
      const value = storage.getItem(`${prefix}:${key}`);
      return value ? (JSON.parse(value) as T) : null;
    },
    set<T>(key: string, value: T) {
      storage.setItem(`${prefix}:${key}`, JSON.stringify(value));
    },
    remove(key: string) {
      storage.removeItem(`${prefix}:${key}`);
    }
  };
}
