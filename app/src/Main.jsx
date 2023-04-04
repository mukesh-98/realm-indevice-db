import {Realm} from '@realm/react';
import React, {useEffect} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {RealmContext} from '../realm';
import {ToDoSchema} from '../realm/schemas/todo.schema';
import AddTaskForm from './AddTaskForm';
import TodoList from './TodoList';
const {useQuery} = RealmContext;

export default function Main() {
  const backgroundStyle = {
    backgroundColor: '#fffff2',
  };

  const todos = useQuery(ToDoSchema);
  let x = todos.sorted('createdOn', true).filtered('deleted=false');

  return (
    <SafeAreaView style={{backgroundStyle}}>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
          }}>
          Todo
        </Text>
      </View>
      <View style={{height: '100%'}}>
        <TodoList data={x} />
      </View>
      <AddTaskForm />
    </SafeAreaView>
  );
}
