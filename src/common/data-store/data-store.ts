export interface DataStore<Type> {
    get(key: keyof Type, value: any): Promise<Type | undefined>;
    add(item: Type): Promise<void>;
    update(key: keyof Type, value: any, item: Type): Promise<Type>;
    remove(key: keyof Type, value: any): Promise<void>;
    getAll(): Promise<Type[]>;
}
