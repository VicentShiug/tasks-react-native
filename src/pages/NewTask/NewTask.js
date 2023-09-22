import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, addDoc } from 'firebase/firestore/lite';
import {database} from '../../config/firebase-config'
import styles from "./style"
import { Switch } from 'react-native-gesture-handler';

export default function NewTask ({navigation, route}) {
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(false)

  async function addTask () {
    try {
      await addDoc(collection(database, route.params.idUser), {
        description,
        status
      })
      navigation.navigate('Task', {idUser: route.params.idUser})
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <View style={styles.container} >
      <Text style={styles.label}>
        Description
      </Text>
      <TextInput
        style={styles.inputText}
        placeholder='Ex: Estudar JavaScript'
        onChangeText={setDescription}
        value={description}
      />
      <Text style={styles.label}>
        Status
      </Text>
      <Switch
        style={styles.statusTask}
        onValueChange={setStatus}
        value={status}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={()=>addTask()}
      >
        <Text style={styles.iconButtonSave}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}
