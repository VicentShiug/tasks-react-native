import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore/lite';
import {database} from '../../config/firebase-config'
import styles from "./style"
import { Switch } from 'react-native-gesture-handler';

export default function Details ({ navigation, route }) {
  const { params } = route
  const { description, status, id } = params
  
  const [descriptionEdit, setDescriptionEdit] = useState(description)
  const [statusEdit, setStatusEdit] = useState(status)
  const idTask = id

  async function editTask (status, description, id) {
    try {
      await updateDoc(doc(database, route.params.idUser, id), {
        description,
        status
      })
      navigation.navigate('Task', {idUser: route.params.idUser})
    } catch (e) {
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
        onChangeText={setDescriptionEdit}
        value={descriptionEdit}
      />
      <Text style={styles.label}>
        Status
      </Text>
        <Switch
          style={styles.statusTask}
          onValueChange={setStatusEdit}
          value={statusEdit}
        />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={()=>editTask(statusEdit, descriptionEdit, idTask)}
      >
        <Text style={styles.iconButtonSave}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}
