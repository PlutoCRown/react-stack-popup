type Callable<P extends object | null> = (args: P) => void | Promise<void>;

export class EventBus<T extends Record<string, object | null>> {
    private events = {} as { [K in keyof T]: Callable<any>[] };

    on<K extends keyof T>(eventName: K, callback: Callable<T[K]>) {
        if (!this.events[eventName]) {
            this.events[eventName as keyof T] = [];
        }
        this.events[eventName as keyof T].push(callback);
        return () => this.off(eventName, callback);
    }
    emit<K extends keyof T>(eventName: K, args: T[K]) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName].forEach((callback) => callback(args as T[K]));
    }
    off<K extends keyof T>(eventName: K, callback: Callable<T[K]>) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
    }
    once<K extends keyof T>(eventName: K, callback: Callable<T[K]>) {
        const fn = (args: T[K]) => {
            callback(args);
            this.off(eventName, fn);
        };
        this.on(eventName, fn);
        return () => this.off(eventName, fn);
    }
}