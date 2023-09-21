import React, { useState, useEffect } from 'react'

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import { app } from '../../config/firebase-config'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function Login ({ navigation }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const loginFirebase = () => {


    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Task', {idUser: user.uid})
      })
      .catch((error) => {
        setError(true)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  useEffect(() => { }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>
        Tasks
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Enter your e-mail'
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder='Enter your e-mail'
        onChangeText={setPassword}
        value={password}
      />
      {error === true ?
        <View style={styles.contentAlert}>
          <MaterialCommunityIcons
            name='alert-circle'
            size={24}
            color={'#bdbdbd'}
          />
          <Text style={styles.warningAlert}>
            Invalid e-mail or password
          </Text>
        </View>
        : <View />
      }
      <TouchableOpacity
        disabled={!email || !password}
        style={styles.buttonLogin}
        onPress={() => { loginFirebase() }}
      >
        <Text
          style={styles.textButtonLogin}
        >Login</Text>

      </TouchableOpacity>
      <Text style={styles.registration}>
        Don't have account?
        <Text
          style={styles.linkSubscribe}
          onPress={() => { navigation.navigate('NewUser') }}
        >
          Create account
        </Text>
      </Text>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}