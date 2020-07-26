import React, { useState } from 'react';
import {
  View, Button, TouchableOpacity, Text, Image, FlatList, TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Icon from "react-native-vector-icons/FontAwesome5"

import color from "./components/color"

import anggur from '../assets/anggur.jpg'
import mark from '../assets/mark.jpg'
import toni from '../assets/toni.jpg'

const DATA = [
  {
    id: 1,
    name: 'Marc Marquez',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Mark_Zuckerberg_F8_2018_Keynote_%28cropped%29.jpg',
    newMessageCount: 1,
    lastUpdate: '12:34 PM',
    lastMessage: 'yailehhh.. ni fesbuk gw jual dah',
    email: 'marc@test.com',
    pin: '2IOP8JKL',
    bio: 'wong sugih',
    birthdate: '12-12-2013',
    location: {
      latitude: 37.453220,
      longitude: -122.183220,
      accuracy: 40
    }
  },
  {
    id: 2,
    name: 'Toni Blank',
    image: 'data:image/jpeg;base64,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',
    newMessageCount: 5,
    lastUpdate: '23:45 PM',
    lastMessage: 'SAPARATOZ BLANK!!!',
    email: 'toni@test.com',
    pin: '2IOP8JKL',
    bio: 'seorang filsuf',
    birthdate: '12-12-2014',
    location: {
      latitude: -3.430730,
      longitude: 114.810303,
      accuracy: 40
    }
  },
  {
    id: 3,
    name: 'Anggur',
    image: 'https://i1.wp.com/resepkoki.id/wp-content/uploads/2017/04/Red-grapes.jpg?fit=800%2C648&ssl=1',
    newMessageCount: 6,
    lastUpdate: '00:12 PM',
    lastMessage: 'capek nih.. dari tadi dianggurin',
    email: 'anggur@test.com',
    pin: '2IOP8JKL',
    bio: 'seonggok anggur',
    birthdate: '12-12-2015',
    location: {
      latitude: 12.371530,
      longitude: -1.519920,
      accuracy: 40
    }
  }
]


const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, zIndex: 1, backgroundColor: color.bg1, }}>
      <View style={{ flex: 1, position: 'absolute', right: 20, bottom: 20, zIndex: 2, }}>
        <TouchableOpacity onPress={() => navigation.navigate("AddUser")}>
          <View style={{ height: 65, width: 65, backgroundColor: color.bg2, alignItems: 'center', justifyContent: 'center', borderRadius: 35, elevation: 5 }}>
            <Icon name='user-plus' style={{ color: color.text4 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{ height: 50, zIndex: 1, backgroundColor: "rgba(190,190,190,0.4)", marginHorizontal: 15, justifyContent: "space-evenly", marginVertical: 10, paddingHorizontal: 10, alignItems: "center", flexDirection: 'row', borderRadius: 10 }}>
        <View style={{ flex: 10, overflow: 'hidden' }}>
          <TextInput placeholder='Search chat..' />
        </View>
        <View style={{ flex: 1 }}>
          <Icon name='search' style={{ color: 'rgba(0,0,0,0.4)' }} />
        </View>
      </View>
      <FlatList
        keyExtractor={(id, index) => id.toString() + index}
        data={DATA}
        renderItem={({ item: user }) =>
          <View style={{ height: 85, zIndex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
              <TouchableOpacity onPress={() => navigation.navigate('OtherProfile', { user })}
                style={{ height: 60, width: 60, borderRadius: 50, backgroundColor: 'black', elevation: 10 }}>
                <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 60, }} source={{ uri: user.image }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Chat', { user })}
              style={{ flex: 6, marginHorizontal: 5, marginRight: 10, borderBottomWidth: 1, borderBottomColor: color.primary, paddingVertical: 10 }}>
              <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 3 }}>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ paddingRight: 6, color: color.text2, fontSize: 22, fontWeight: 'bold' }}>{user.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: color.primary, fontSize: 12, fontWeight: 'bold' }}>{user.lastUpdate}</Text>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 6 }}>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ paddingRight: 6, overflow: 'hidden', color: color.text3, fontSize: 14 }}>{user.lastMessage}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  {user.newMessageCount !== 0 ? (
                    <View style={{ height: 25, width: 25, backgroundColor: color.secondary, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginRight: 10 }}>
                      <Text style={{ color: color.text1 }}>{user.newMessageCount}</Text>
                    </View>) :
                    null}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        }
      />


    </View>
  );
}

export default Home;
