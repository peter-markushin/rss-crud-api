export interface Repository<Type> {
    findAll(): Promise<Type[]>;
    findById(id: string): Promise<Type | undefined>;
    create(obj: Type | Record<keyof Type, any>): Promise<Type>;
    update(id: string, obj: Type): Promise<Type>;
    delete(id: string): Promise<void>;
}
