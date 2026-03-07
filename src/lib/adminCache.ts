type CacheEntry<T> = {
    data: T;
    timestamp: number;
};

const TTL = 30_000; // 30 seconds

class AdminCache {
    private store = new Map<string, CacheEntry<unknown>>();

    get<T>(key: string): T | undefined {
        const entry = this.store.get(key);
        return entry ? (entry.data as T) : undefined;
    }

    has(key: string): boolean {
        return this.store.has(key);
    }

    isStale(key: string): boolean {
        const entry = this.store.get(key);
        if (!entry) return true;
        return Date.now() - entry.timestamp > TTL;
    }

    set<T>(key: string, data: T): void {
        this.store.set(key, { data, timestamp: Date.now() });
    }

    invalidate(...keys: string[]): void {
        keys.forEach(k => this.store.delete(k));
    }

    invalidatePattern(prefix: string): void {
        for (const key of this.store.keys()) {
            if (key.startsWith(prefix)) {
                this.store.delete(key);
            }
        }
    }
}

// Module-level singleton — survives React navigations within a session
export const adminCache = new AdminCache();
