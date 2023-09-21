import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, addDoc } from 'firebase/firestore/lite';
import {database} from '../../config/firebase-config'
import styles from "./style"

export default function NewTask ({navigation, route}) {
  const [description, setDescription] = useState('')

  async function addTask () {
    try {
      await addDoc(collection(database, route.params.idUser), {
        description,
        status: false
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
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={()=>addTask()}
      >
        <Text style={styles.iconButtonSave}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}
