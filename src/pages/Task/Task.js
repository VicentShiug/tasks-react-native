import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { database, app } from '../../config/firebase-config'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore/lite';
import { getAuth, signOut } from "firebase/auth";

import styles from './style'

export default function Task ({ navigation, route }) {
  const [task, setTask] = useState([])

  function logOut () {
    const auth = getAuth(app)
    signOut(auth).then(() => {
      navigation.navigate('Login')
    }).catch((error) => {
      console.log(error)
    })
  }

  async function deleteTask (id) {
    await deleteDoc(doc(database, route.params.idUser, id))
    await getAll()
  }

  const getAll = async () => {
    const q = query(collection(database, route.params.idUser))
    const querySnapshot = await getDocs(q)
    const list = []
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id })
    })
    setTask(list)
  }


  useFocusEffect(useCallback(() => {
    getAll()
  }, []))




  return (
    <View style={styles.container} >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={({ item }) => {
          return (
            <View style={styles.Tasks}>
              <Text
                style={item.status ? styles.DescriptionTaskOk : styles.DescriptionTask }
                onPress={() => {
                  navigation.navigate('Details', {
                    id: item.id,
                    description: item.description,
                    status: item.status,
                    idUser: route.params.idUser
                  })
                }}
              >
                {item.description}
              </Text>
              <TouchableOpacity
                style={styles.deleteTask}
                onPress={() => {
                  deleteTask(item.id)
                }}
              >
                <FontAwesome
                  name='trash'
                  size={23}
                  color={'#f92e6a'}
                >

                </FontAwesome>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => navigation.navigate('New Task', { idUser: route.params.idUser })}
      >
        <Text
          style={styles.iconButton} >
          +
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonLogOut}
        onPress={() => logOut()}
      >
        <Text style={styles.iconButtonLogOut}>
          <MaterialCommunityIcons name='location-exit' size={32} color={'#f9266a'} />
        </Text>
      </TouchableOpacity>

    </View>
  )
}
