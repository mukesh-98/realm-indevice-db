import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RealmContext} from '../realm';
const {useRealm, useObject} = RealmContext;
export default function TodoItem({item}) {
  const realm = useRealm();
  const todo = useObject('Todos', item._id);

  return (
    <View style={{padding: 5}}>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: item?.priority
            ? item?.priority < 5
              ? 'orange'
              : 'red'
            : 'gray',
        }}>
        <View>
          <Text>{item?.title}</Text>
          <Text style={{color: 'grey'}}>{item?.description}</Text>
        </View>
        <Icon
          name="delete"
          size={30}
          color="#900"
          onPress={() => {
            realm.write(() => (todo.deleted = true));
          }}
        />
      </View>
    </View>
  );
}
