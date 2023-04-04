import {Dimensions, FlatList, Text, View} from 'react-native';
import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({data}) {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item._id.toHexString()}
      ListEmptyComponent={() => (
        <View
          style={{
            height: Dimensions.get('window').height,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', color: 'grey'}}>
            There so to task yet ...
          </Text>
        </View>
      )}
      renderItem={p => <TodoItem {...p} />}
    />
  );
}
