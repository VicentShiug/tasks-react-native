import React, {useState, useEffect, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native' 
import {database} from '../../config/firebase-config'
import {FontAwesome} from '@expo/vector-icons'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc} from 'firebase/firestore/lite';
import styles from './style'

export default function Task ({navigation, route}) {
  const [task, setTask] = useState([])

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
  },[]))
  
  


  return (
    <View style={styles.container} >
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={({item}) => {
          return (
          <View style={styles.Tasks}>
            <TouchableOpacity
              style={styles.deleteTask}
              onPress={() => {
                deleteTask(item.id)
              }}
            >
              <FontAwesome
                name='star'
                size={23}
                color={'#f92e6a'}
              >

              </FontAwesome>
            </TouchableOpacity>

            <Text
              style={styles.DescriptionTask}
              onPress={() => {
                navigation.navigate('Details', {
                id: item.id,
                  description: item.description,
                  idUser: route.params.idUser
                })
              }}
            >
              {item.description}
            </Text>
          </View>
          )
        }}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={()=> navigation.navigate('New Task', {idUser: route.params.idUser})}
      >
        <Text
          style={styles.iconButton} >
          +
        </Text>
      </TouchableOpacity>
      
    </View>
  )
}
