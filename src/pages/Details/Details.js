import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore/lite';
import {database} from '../../config/firebase-config'
import styles from "./style"

export default function Details ({ navigation, route }) {
  const { params } = route
  const { description, id } = params
  
  const [descriptionEdit, setDescriptionEdit] = useState(description)
  const idTask = id

  async function editTask (description, id) {
    try {
      await updateDoc(doc(database, route.params.idUser, id), {
        description
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
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={()=>editTask(descriptionEdit, idTask)}
      >
        <Text style={styles.iconButtonSave}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}
