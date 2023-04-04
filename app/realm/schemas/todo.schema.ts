import {Realm} from '@realm/react';

export const todoSchema = {
  name: 'Todos',
  properties: {
    _id: 'objectId',
    title: 'string',
    description: 'string',
    priority: {type: 'int', optional: true},
    createdOn: {type: 'date', default: new Date()},
    done: {type: 'bool', default: false},
    deleted: {type: 'bool', default: false},
  },
  primaryKey: '_id',
};

export class ToDoSchema extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: String;
  description!: String;
  priority!: Number;
  createdOn!: Date;
  done!: Boolean;
  deleted!: Boolean;

  static schema = todoSchema;
}
