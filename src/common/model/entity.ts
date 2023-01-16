export class Entity {
    id: string;

    constructor({ id }: { id: string }) {
        this.id = id;
    }

    public static fromAny(obj: Record<keyof Entity, any>): Entity {
        return new Entity(obj.id);
    }
}
