export type MemoryRecord = {
  key: string;
  value: string;
  createdAt: string;
};

export class PromptMemory {
  private readonly records = new Map<string, MemoryRecord>();

  set(key: string, value: string) {
    this.records.set(key, {
      key,
      value,
      createdAt: new Date().toISOString()
    });
  }

  get(key: string) {
    return this.records.get(key);
  }
}
