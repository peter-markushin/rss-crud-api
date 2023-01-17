import process from 'node:process';
import cluster from 'node:cluster';
import { DataStore } from './data-store';

export class MasterProcessStore<Type> implements DataStore<Type> {
    public async get(_: keyof Type, value: any): Promise<Type | undefined> {
        const responseObject = await this.sendCommandToMasterProcess('findById', [value]);

        if (!responseObject) {
            return undefined;
        }

        return await Promise.resolve(responseObject);
    }

    public async add(item: Type): Promise<void> {
        await this.sendCommandToMasterProcess('create', [item]);
    }

    public async update(_: keyof Type, value: any, item: Type): Promise<Type> {
        return await this.sendCommandToMasterProcess('update', [value, item]);
    }

    public async remove(_: keyof Type, value: any): Promise<void> {
        await this.sendCommandToMasterProcess('delete', [value]);
    }

    public async getAll(): Promise<Type[]> {
        return await this.sendCommandToMasterProcess('findAll');
    }

    // eslint-disable-next-line class-methods-use-this
    private async sendCommandToMasterProcess(method: string, parameters: any[] = []): Promise<any> {
        return await new Promise((resolve, reject) => {
            process.send!({ method, parameters });

            cluster.worker!.once('message', (msg) => {
                if (msg.method === method) {
                    resolve(msg.data);
                } else {
                    reject(msg);
                }
            });
        });
    }
}
