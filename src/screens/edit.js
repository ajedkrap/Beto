import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity,
  ScrollView, Alert, ActivityIndicator, ToastAndroid
} from 'react-native'

import { useNavigation } from "@react-navigation/native"

import firestore from "@react-native-firebase/firestore"

import color from "./components/color"

import auth from "@react-native-firebase/auth"

const Edit = () => {
  const [day, changeDay] = useState('')
  const [month, changeMonth] = useState('')
  const [year, changeYear] = useState('')
  const [bio, changeBio] = useState('')
  const [name, changeName] = useState('')
  const { uid } = auth().currentUser
  const navigation = useNavigation();

  const onUpdate = (update) => {
    const { day, month, year } = update
    const dateFilled = day !== '' || month.length !== '' || year.length !== ''
    if (dateFilled && !(
      day.length === 2 &&
      month.length === 2 &&
      year.length === 4)) {
      ToastAndroid.showWithGravityAndOffset(
        "Date Error",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        120
      )
    } else {
      update['birthdate'] = [day, month, year].join("-")
      delete update.day
      delete update.month
      delete update.year
      for (const key in update) {
        if (update[key] === null || update[key] === '') {
          delete update[key]
        }
      }
      firestore().collection("users").doc(uid).update(update)
        .then(success => {
          Alert.alert("Update Success")
          navigation.navigate('Home')
        })
        .catch(error =>
          Alert.alert("Error"))
    }
  }

  // const onRegister = (email, password, cPassword) => {
  //   if (email !== '' && password !== '' && cPassword !== '') {
  //     if (valid.isEmail(email) && valid.equals(password, cPassword)) {
  //       const data = { email, password }
  //       dispatch(register(data))
  //     } else {
  //       ToastAndroid.showWithGravityAndOffset(
  //         "Form invalid",
  //         ToastAndroid.SHORT,
  //         ToastAndroid.BOTTOM,
  //         0,
  //         120
  //       )
  //     }
  //   } else {
  //     ToastAndroid.showWithGravity(
  //       "Form empty",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //       0,
  //       120
  //     )
  //   }
  // }

  // useEffect(() => {
  //   if (msg) {
  //     if (isError) {
  //       Alert.alert(msg.name, "Email already used")
  //     } else {
  //       Alert.alert('Success')
  //       const data = {
  //         email, image, uid
  //       }
  //       dispatch(createProfile(data))
  //       setTimeout(() => {
  //         navigation.navigate('Login')
  //       }, 3000);
  //     }
  //     dispatch(clearMessage())
  //   }
  // })

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
            Edit Your Profile
          </Text>
          <Text style={{ color: color.text1, }}>
            Name
            </Text>
          <TextInput onChangeText={changeName} maxLength={20}
            style={{ color: color.text3, borderBottomColor: color.text1, borderBottomWidth: 2, fontSize: 18 }} />
          <Text style={{ color: color.text1, }}>
            Birthdate
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomColor: color.text1, borderBottomWidth: 2, }}>
            <TextInput onChangeText={changeDay} maxLength={2} placeholder="DD" keyboardType='number-pad' autoCompleteType="cc-number"
              style={{ color: color.text3, fontSize: 18 }} />
            <TextInput onChangeText={changeMonth} maxLength={2} placeholder="MM" keyboardType='number-pad' autoCompleteType="cc-exp-month"
              style={{ color: color.text3, fontSize: 18 }} />
            <TextInput onChangeText={changeYear} maxLength={4} placeholder="YYYY" keyboardType='number-pad' autoCompleteType="cc-exp-year"
              style={{ color: color.text3, fontSize: 18 }} />
          </View>
          <Text style={{ color: color.text1, }}>
            Bio
          </Text>
          <TextInput onChangeText={changeBio} multiline={true} numberOfLines={3} textAlignVertical="top" maxLength={80}
            style={{ color: color.text3, borderBottomColor: color.text1, borderBottomWidth: 2, fontSize: 18 }} />

          <TouchableOpacity onPress={() => onUpdate({ day, month, year, bio, name })}
            style={{ backgroundColor: color.bg2, marginTop: 15, height: 48, borderRadius: 5, alignItems: "center", justifyContent: 'center' }}>
            <Text style={{ color: color.text4, fontSize: 18 }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Edit;
