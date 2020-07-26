import React, { useState, useEffect } from 'react';
import {
  View, Image, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useGeolocation from '../../utils/getGeolocation'
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'

import { useSelector } from "react-redux"

import profile from '../../assets/profile.jpg'
import GetGeolocation from '../../utils/getGeolocation';

const user = {
  name: '',
  image: profile,
  email: 'test@gmail.com',
  pin: '2IOP8JKL',
  bio: 'orang biasa-biasa aja',
  birthdate: '12-12-2012',
}



const UserProfile = () => {
  const [user1, getUser] = useState({})
  const getCurrentUser = auth().currentUser
  const navigation = useNavigation();
  const loc = useGeolocation()



  useEffect(() => {
    firestore().collection("users").doc(getCurrentUser.uid)
      .onSnapshot(result => {
        if (Object.keys(user1).length === 0) {
          getUser(result.data())
        }
      })
    if (user1.location) {
      if (
        loc.latitude !== user1.location.latitude &&
        loc.longitude !== user1.location.longitude
      ) {
        firestore().collection("users").doc(getCurrentUser.uid)
          .update({
            location: new firebase.firestore.GeoPoint(loc.latitude, loc.longitude)
          })
      }
    }
  })

  // item['location'] = useGeolocation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyProfile', { user: user1 })}>
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 12 }}>
        <View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: 'black', elevation: 10 }}>
          <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 50, }} source={{ uri: user1.image }} />
        </View>
      </View>
    </TouchableOpacity>
  );

}


export default UserProfile
