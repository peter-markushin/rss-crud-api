import { registerRoutes } from './routes';
import { Router } from '../../common/router';
import { User } from './models';
import { DataStore } from '../../common/data-store/data-store';
import { MemoryStore } from '../../common/data-store/memory-store';
import { Repository } from './repository';
import { MasterProcessStore } from '../../common/data-store/master-process-store';

export const register = async (router: Router, isClusterMode: boolean) => {
    let dataStore: DataStore<User>;

    if (isClusterMode) {
        dataStore = new MasterProcessStore<User>();
    } else {
        dataStore = new MemoryStore<User>();
    }

    const userRepository = new Repository(dataStore);

    registerRoutes(router, userRepository);
};
