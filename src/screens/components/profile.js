import React, { useState, useEffect } from 'react';
import {
  View, Text, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, Alert
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import Clipboard from '@react-native-community/clipboard'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { useNavigation } from "@react-navigation/native"

import color from './color'
import UserDetail from './userDetail'

import getCoordinate from '../../utils/getCoordinate'

import ImagePicker from "react-native-image-picker"

import { useDispatch } from 'react-redux'
import { logout } from "../../redux/actions/auth"

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const options = {
  title: 'Pick your Image',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose From Library'
}

const Profile = (props) => {
  const { user, isUser } = props
  const { lat, long, latDel, longDel } = getCoordinate(user.location)
  const [image, getImage] = useState(null)
  const { uid } = auth().currentUser
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
  }

  const copyToClipboard = (pin) => {
    try {
      Clipboard.setString(pin)
      ToastAndroid.show(
        'Pin Copied to Clipboard',
        ToastAndroid.SHORT
      );
    }
    catch (e) {
      console.log(e)
    }
  }

  const uploadImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      const reference = storage().ref(`user/user_${uid}`)
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        Alert.alert(
          "Are You sure?",
          "You are attempt to upload image",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Sure",
              onPress: () => {
                reference.putFile(response.uri)
                  .then(_ =>
                    reference.getDownloadURL()
                      .then(url => {
                        firestore().collection('users').doc(uid).update({
                          image: url
                        })
                        Alert.alert("Upload Success")
                        navigation.navigate("Home")
                      }).catch(error =>
                        Alert.alert(error.code, error.message)
                      )).catch(error =>
                        Alert.alert(error.code, error.message))
              }
            }
          ],
          { cancelable: false }
        )
      }
    })
  }

  return (
    <ScrollView >
      <View style={{ backgroundColor: color.primary, padding: 24, zIndex: 1, alignItems: 'center' }}>
        {isUser &&
          <TouchableOpacity onPress={() => uploadImage()}
            style={profile.edit} >
            <Icon name='pencil-alt' style={{ color: color.text3, fontSize: 18 }} />
          </TouchableOpacity>}
        <View style={{ position: 'relative', height: 180, width: 180, borderRadius: 180, borderColor: color.text1, borderWidth: 5, zIndex: 1 }}>
          <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 180, }} source={{ uri: user.image }} />
        </View>
        <View style={{ flex: 1, flexDirection: "row", alignContent: "center", justifyContent: "center", marginTop: 20, }}>
          <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: color.bg2, borderRadius: 5, }}>
            <Text style={{ color: color.text3, fontSize: 28 }}>
              {user.pin}
            </Text>
          </View>
          <TouchableOpacity onLongPress={(user) => copyToClipboard(user.pin)}
            style={{ justifyContent: "center", alignItems: "center", marginLeft: 12 }}>
            <Icon name="copy" style={{ color: color.bg2, fontSize: 32 }} />
          </TouchableOpacity>
        </View>
        <View style={{ width: deviceWidth, marginTop: 5, }}>
          <UserDetail data={user.name !== '' ? user.name : user.email} icon="user-alt" />
          <UserDetail data={user.birthdate} icon="calendar-alt" />
          <UserDetail data={user.bio !== '' ? user.bio : '-'} icon="biohazard" />
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Edit")}
          style={{ width: deviceWidth - 40, marginVertical: 5, backgroundColor: color.bg2, height: 48, borderRadius: 5, alignItems: "center", justifyContent: 'center' }}>
          <Text style={{ color: color.text4, fontSize: 18 }}>
            EDIT PROFILE
            </Text>
        </TouchableOpacity> */}
        <View style={profile.mapContainer} >
          <MapView style={profile.map}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: latDel,
              longitudeDelta: longDel,
            }} >
            <Marker
              coordinate={{
                latitude: lat,
                longitude: long,
              }}
              title={"You"} />
          </MapView>
        </View>
        <View style={{ marginTop: 350, borderBottomWidth: 10, borderBottomColor: color.text4, }} />
        {isUser && <View style={{ marginVertical: 5, paddingVertical: 5, borderTopWidth: 1, borderTopColor: color.text4 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Edit")}
            style={{ width: deviceWidth - 40, marginVertical: 5, backgroundColor: color.bg2, height: 48, borderRadius: 5, alignItems: "center", justifyContent: 'center' }}>
            <Text style={{ color: color.text4, fontSize: 18 }}>
              EDIT PROFILE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onLogout()}
            style={{ width: deviceWidth - 40, marginVertical: 5, backgroundColor: color.google, height: 48, borderRadius: 5, alignItems: "center", justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              LOG OUT
            </Text>
          </TouchableOpacity>
        </View>}
      </View>
    </ScrollView >
  );
}

export default Profile;

const profile = StyleSheet.create({
  edit: {
    ...StyleSheet.absoluteFillObject,
    left: deviceWidth - (deviceWidth * 40 / 100),
    position: 'absolute',
    top: deviceHeight - (deviceHeight * 76 / 100),
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: color.secondary,
    zIndex: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: deviceHeight - (deviceHeight * (30 / 100)),
    flex: 1,
    height: deviceHeight - (deviceHeight * (60 / 100)),
    margin: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: color.secondary,
    backgroundColor: color.bg1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    height: null,
    width: null,
    borderRadius: 140
  }
})