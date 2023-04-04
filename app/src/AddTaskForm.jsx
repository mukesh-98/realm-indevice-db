import {
  View,
  Text,
  Dimensions,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {RealmContext} from '../realm';
import RBSheet from 'react-native-raw-bottom-sheet';
import Slider from 'react-native-slider';
import {Formik} from 'formik';

const {useRealm} = RealmContext;
export default function AddTaskForm() {
  const rbRef = useRef();
  const realm = useRealm();
  const openModal = () => {
    rbRef.current.open();
  };

  const addTodo = form => {
    realm.write(() =>
      realm.create('Todos', {
        _id: Realm.BSON.ObjectId(),
        ...form,
      }),
    );
    rbRef.current.close();
  };
  return (
    <>
      <View
        style={[
          {
            position: 'absolute',
            bottom: 70,
            width: Dimensions.get('screen').width,
            zIndex: 999,
          },
        ]}>
        <Button onPress={openModal} title="Add Task" />
      </View>
      <RBSheet
        ref={rbRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: {padding: 10},
        }}>
        <Formik
          initialValues={{
            title: '',
            description: '',
            priority: 0,
          }}
          validate={values => {
            let errors = {};
            if (values.title.length === 0) {
              errors = {
                ...errors,
                title: 'Title for this task is required',
              };
            }
            if (values.description.length === 0) {
              errors = {
                ...errors,
                description: 'Desccription for this task is required',
              };
            }
            return errors;
          }}
          onSubmit={addTodo}>
          {({setFieldValue, handleSubmit, values: form, errors}) => (
            <ScrollView>
              <TextInput
                type="text"
                placeholder="Title"
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#00000050',
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                }}
                onChangeText={v => setFieldValue('title', v)}
              />
              {errors['title'] && (
                <Text style={{fontSize: 9, color: 'red'}}>
                  {errors['title']}
                </Text>
              )}
              <TextInput
                multiline
                numberOfLines={4}
                maxLength={40}
                placeholder="Description"
                onChangeText={v => setFieldValue('description', v)}
                value={form.description}
                style={{
                  height: 100,
                  borderWidth: 1,
                  borderColor: '#00000050',
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
              {errors['description'] && (
                <Text style={{fontSize: 9, color: 'red'}}>
                  {errors['description']}
                </Text>
              )}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  //   justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'grey'}}>Prioriy </Text>
                <Slider
                  style={{width: '100%'}}
                  value={form.priority / 10}
                  onValueChange={v => setFieldValue('priority', v * 10)}
                />
              </View>
              <Button
                onPress={handleSubmit}
                title="Submit"
                disabled={Object.keys(errors).length > 0}
              />
            </ScrollView>
          )}
        </Formik>
      </RBSheet>
    </>
  );
}
