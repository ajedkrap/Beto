import React, { useState, useEffect } from 'react';
import {
  View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView,
  ToastAndroid, Platform, ActivityIndicator, Alert
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import valid from 'validator'

import { useDispatch, useSelector } from 'react-redux'
import { login, clearMessage } from '../redux/actions/auth'

import color from "./components/color"
import Icon from "react-native-vector-icons/FontAwesome5"

const Login = () => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const navigation = useNavigation()
  const { isLoading, isError, message: msg } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const onLogin = (email, password) => {
    if (!valid.isEmpty(email) && !valid.isEmpty(password)) {
      if (valid.isEmail(email)) {
        const data = {
          email, password
        }
        dispatch(login(data))
      } else {
        ToastAndroid.showWithGravityOffset(
          "Form Invalid",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          100
        )
      }
    } else {
      ToastAndroid.showWithGravityOffset(
        "Form Empty",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
      )
    }
  }


  useEffect(() => {
    if (msg) {
      if (isError) {
        if (msg.code === "auth/user-not-found")
          Alert.alert(msg.name, "user not found")
        if (msg.code === "auth/wrong-password")
          Alert.alert(msg.name, "Email or Password incorrect")
      } else {
        Alert.alert('Success')

      }
      dispatch(clearMessage())
    }
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: color.bg1, paddingHorizontal: 24, paddingVertical: 12 }}
    >
      <View style={{ marginVertical: 5, height: 200, borderBottomColor: color.bg1, borderBottomWidth: 2, backgroundColor: color.primary, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LOGO</Text>
      </View>
      <View style={{ marginVertical: 10, paddingHorizontal: 10, paddingBottom: 10, borderBottomColor: color.text2, borderBottomWidth: 2, justifyContent: 'center' }}>
        <View>
          <Text style={{ color: color.text2, }}>
            Email Address
            </Text>
          <TextInput onChangeText={changeEmail}
            style={{ color: color.text4, borderBottomColor: color.text2, borderBottomWidth: 2, fontSize: 18 }} />
        </View>
        <View>
          <Text style={{ color: color.text2, }}>
            Password
            </Text>
          <TextInput onChangeText={changePassword}
            style={{ color: color.text4, borderBottomColor: color.text2, borderBottomWidth: 2, fontSize: 18 }} />
        </View>
        <TouchableOpacity onPress={() => onLogin(email, password)}
          style={{ backgroundColor: color.bg2, height: 48, borderRadius: 5, marginTop: 18, alignItems: "center", justifyContent: 'center' }}>
          {isLoading ? <ActivityIndicator size='large' color={color.text4} /> : <Text style={{ color: color.text4, fontSize: 18 }}>
            MLEBU!!!
            </Text>}
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 3, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={{ backgroundColor: color.google, height: 48, borderRadius: 5, marginVertical: 3, alignItems: "center", justifyContent: "space-around", flexDirection: 'row' }}>
          <Icon style={{ color: color.text1, fontSize: 20 }} name='google' />
          <Text style={{ color: color.text1, fontSize: 18 }}>
            MLEBU KARO GUGEL
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: color.fb, height: 48, borderRadius: 5, marginVertical: 3, alignItems: "center", justifyContent: "space-around", flexDirection: 'row' }}>
          <Icon style={{ color: color.text1, fontSize: 20 }} name='facebook-square' />
          <Text style={{ color: color.text1, fontSize: 18 }}>
            MLEBU KARO FESBUK
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginVertical: 8, flexDirection: 'row', justifyContent: "center" }}>
          <Text style={{ fontSize: 16, color: color.text2 }}>New Member?&nbsp;&nbsp;</Text>
          <Text style={{ fontSize: 16, color: color.primary, textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate("Register")}
          >
            Just Register</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


export default Login;
