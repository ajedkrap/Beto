import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity,
  ScrollView, Alert, ActivityIndicator, ToastAndroid
} from 'react-native'

import color from "./components/color"
import Icon from "react-native-vector-icons/FontAwesome5"
import valid from "validator"

import storage from "@react-native-firebase/storage"

import { useNavigation, NavigationContainer } from "@react-navigation/native"

import { useDispatch, useSelector } from "react-redux"
import { register, clearMessage } from "../redux/actions/auth"
import { createProfile } from "../redux/actions/profile"

const Register = () => {
  const [name, changeName] = useState('')
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [cPassword, changeCPassword] = useState('');
  const [image, addImage] = useState(null)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth)

  const { isLoading, isError, message: msg, getUid: uid } = auth

  // storage()
  //       .ref("public/default.png")
  //       .getDownloadURL()
  //       .then(url => {
  //         addImage(url)
  //       })

  const onRegister = (name, email, password, cPassword) => {
    if (email !== '' && password !== '' && cPassword !== '' && name !== "") {
      if (valid.isEmail(email) && valid.equals(password, cPassword)) {
        const data = { email, password }
        dispatch(register(data))
      } else {
        ToastAndroid.showWithGravityAndOffset(
          "Form invalid",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          120
        )
      }
    } else {
      ToastAndroid.showWithGravity(
        "Form empty",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        120
      )
    }
  }

  useEffect(() => {
    if (image === null) {
      storage()
        .ref("public/default.png")
        .getDownloadURL()
        .then(url => {
          addImage(url)
        })
    }
    if (msg) {
      if (isError) {
        Alert.alert(msg.name, "Email already used")
      } else {
        Alert.alert('Success')
        const data = {
          name, email, image, uid
        }
        dispatch(createProfile(data))
        setTimeout(() => {
          navigation.navigate('Login')
        }, 3000);
      }
      dispatch(clearMessage())
    }
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
      style={{ flex: 1, backgroundColor: color.primary, paddingHorizontal: 24, justifyContent: 'flex-end' }}
    >
      <ScrollView indicatorStyle={false} >
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: color.bg1 }}>
          <Text>
            IEU TEMPATNA LOGO
        </Text>
        </View>
        <View style={{ marginVertical: 10, paddingHorizontal: 10, paddingBottom: 10, justifyContent: 'center' }}>
          <Text style={{ color: color.text1, textAlign: 'center', fontSize: 36, fontFamily: "IndieFlower-Regular", marginVertical: 10 }}>
            Register
          </Text>
          <Text style={{ color: color.text1, }}>
            Name
            </Text>
          <TextInput onChangeText={changeName} maxLength={20}
            style={{ color: color.text3, borderBottomColor: color.text1, borderBottomWidth: 2, fontSize: 18 }} />
          <Text style={{ color: color.text1, }}>
            Email Address
            </Text>
          <TextInput onChangeText={changeEmail}
            style={{ color: color.text3, borderBottomColor: color.text1, borderBottomWidth: 2, fontSize: 18 }} />
          <Text style={{ color: color.text1, }}>
            Password
            </Text>
          <TextInput onChangeText={changePassword} secureTextEntry={true} autoCapitalize="none"
            style={{ color: color.text3, borderBottomColor: color.text1, borderBottomWidth: 2, fontSize: 18 }} />
          <Text style={{ color: color.text1, }}>
            Confirm Password
            </Text>
          <TextInput onChangeText={changeCPassword} secureTextEntry={true} autoCapitalize="none"
            style={{ color: color.text3, borderBottomColor: color.text1, borderBottomWidth: 2, fontSize: 18 }} />

          <TouchableOpacity onPress={() => onRegister(name, email, password, cPassword)}
            style={{ backgroundColor: color.bg2, marginTop: 15, height: 48, borderRadius: 5, alignItems: "center", justifyContent: 'center' }}>
            {isLoading ? <ActivityIndicator size='large' color={color.text4} /> : <Text style={{ color: color.text4, fontSize: 18 }}>
              Register
            </Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Register;
