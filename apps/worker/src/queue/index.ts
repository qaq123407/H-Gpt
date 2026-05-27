export type QueueJob<T = unknown> = {
  id: string;
  type: string;
  payload: T;
};

export type QueueHandler<T = unknown> = (job: QueueJob<T>) => Promise<void>;

export class InMemoryQueue<T = unknown> {
  private readonly handlers = new Map<string, QueueHandler<T>>();

  register(type: string, handler: QueueHandler<T>) {
    this.handlers.set(type, handler);
  }

  async dispatch(job: QueueJob<T>) {
    const handler = this.handlers.get(job.type);
    if (!handler) {
      throw new Error(`No queue handler registered for ${job.type}`);
    }

    await handler(job);
  }
}
