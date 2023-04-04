import {createRealmContext} from '@realm/react';
import {ToDoSchema} from './schemas/todo.schema';

export const realmConfig = {
  schema: [ToDoSchema],
};

export const RealmContext = createRealmContext(realmConfig);
