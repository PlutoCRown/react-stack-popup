type Callable<P> = (args: P) => void | Promise<void>;

export class EventBus<T extends Record<string, unknown>> {
    private events = {} as { [K in keyof T]: Set<Callable<any>> };
    private onceWrappers = new WeakMap<Callable<any>, Callable<any>>();

    on<K extends keyof T>(eventName: K, callback: Callable<T[K]>) {
        if (!this.events[eventName]) {
            this.events[eventName as keyof T] = new Set();
        }
        this.events[eventName as keyof T].add(callback);
        return () => this.off(eventName, callback);
    }
    emit<K extends keyof T>(eventName: K, args: T[K]) {
        const listeners = this.events[eventName];
        if (!listeners) return;
        Array.from(listeners).forEach((callback) => callback(args as T[K]));
    }
    off<K extends keyof T>(eventName: K, callback: Callable<T[K]>) {
        const listeners = this.events[eventName];
        if (!listeners) return;
        if (listeners.delete(callback as Callable<any>)) return;
        const wrapped = this.onceWrappers.get(callback as Callable<any>);
        if (!wrapped) return;
        listeners.delete(wrapped);
        this.onceWrappers.delete(callback as Callable<any>);
    }
    once<K extends keyof T>(eventName: K, callback: Callable<T[K]>) {
        const fn: Callable<T[K]> = (args: T[K]) => {
            callback(args);
            this.off(eventName, callback);
        };
        this.onceWrappers.set(callback as Callable<any>, fn);
        this.on(eventName, fn);
        return () => this.off(eventName, callback);
    }
}
