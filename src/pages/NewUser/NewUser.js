import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import { app } from '../../config/firebase-config'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './style'

export default function NewUser ({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorRegister, setErrorRegister] = useState(false)

  const register = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Task', {idUser: user.uid})
      })
      .catch((error) => {
        setErrorRegister(true)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>
        Create Task account
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
      {errorRegister === true ?
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
        style={styles.buttonRegister }
        onPress={() => { register() }}
      >
        <Text
          style={styles.textButtonRegister}
        >Register</Text>

      </TouchableOpacity>
      <Text style={styles.login}>
        Already register ? 
        <Text
          style={styles.linkLogin}
          onPress={() => { navigation.navigate('Login') }}
        >
          Login
        </Text>
      </Text>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}