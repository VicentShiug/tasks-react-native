import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native' 
import database from '../../config/firebase-config'
import {FontAwesome} from '@expo/vector-icons'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc} from 'firebase/firestore/lite';
import styles from './style'

export default function Task ({navigation}) {
  const [task, setTask] = useState([])

  async function deleteTask (id) {
    await deleteDoc(doc(database, 'Tasks', id))
  }

  useEffect(() => {
    const getAll = async () => {
      const q = query(collection(database, 'Tasks'))
      const querySnapshot = await getDocs(q)
      const list = []
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setTask(list)
    }
    getAll()


  }, [])
  
  


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
                description: item.description
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
        onPress={()=> navigation.navigate('New Task')}
      >
        <Text
          style={styles.iconButton} >
          +
        </Text>
      </TouchableOpacity>
      
    </View>
  )
}
