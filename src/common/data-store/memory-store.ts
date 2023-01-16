import { DataStore } from './data-store';

export class MemoryStore<Type> implements DataStore<Type> {
    private items: Type[] = [];

    // eslint-disable-next-line max-len
    public get = async (key: keyof Type, value: any): Promise<any> => this.items.find((item) => item[key] === value);

    public add = async (item: Type): Promise<void> => {
        this.items.push(item);
    };

    public update = async (key: keyof Type, value: any, updatedItem: Type): Promise<Type> => {
        this.items = this.items.map((item: Type): Type => {
            if (item[key] === value) {
                return updatedItem;
            }

            return item;
        });

        return updatedItem;
    };

    public remove = async (key: keyof Type, value: any): Promise<void> => {
        this.items = this.items.filter((item: Type) => item[key] !== value);
    };

    public clear = async (): Promise<void> => {
        this.items = [];
    };

    public getAll = async (): Promise<Type[]> => this.items;
}
