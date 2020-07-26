import React from 'react';
import {
  Text, View
} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import firestore, { firebase } from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

import useGeolocation from "../../utils/getGeolocation"

import { useSelector } from 'react-redux'

import Home from "../home"
import MyProfile from "../myProfile"
import OtherProfile from "../otherProfile"
import Login from "../login"
import Register from "../register"
import Chat from "../chat"
import AddUser from "../addUser"
import Edit from "../edit"

import color from "./color"

import UserProfile from "./userProfile"

const Stack = createStackNavigator();

const Stacks = () => {
  const { isLogin } = useSelector(state => state.auth);
  return (
    <Stack.Navigator headerMode='screen'>
      {!isLogin && <>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{
            headerTitle: null,
            headerTintColor: color.text1,
            headerStyle: {
              backgroundColor: color.primary,
              elevation: 0,
            }
          }} />
      </>}
      {isLogin && <>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Between Togetherness',
            headerLeft: null,
            headerStyle: {
              backgroundColor: color.primary,
              height: 72
            },
            headerTitleStyle: {
              color: color.text1,
              fontSize: 20,
              fontWeight: '500',
              fontFamily: "IndieFlower-Regular"
            },
            headerRight: props => (
              <UserProfile {...props} />
            )
          }}
        />
        <Stack.Screen
          name='MyProfile'
          component={MyProfile}
          options={{
            title: 'Isn\'t this you ?',
            headerTintColor: color.text1,
            headerStyle: {
              backgroundColor: color.primary,
              elevation: 0,
            }
          }}
        />
        <Stack.Screen
          name='OtherProfile'
          component={OtherProfile}
          options={{
            title: 'Profile',
            headerTintColor: color.text1,
            headerStyle: {
              backgroundColor: color.primary,
              elevation: 0,
            }
          }}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AddUser'
          component={AddUser}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Edit'
          component={Edit}
          options={{
            headerTitle: "Edit Profile",
            headerTintColor: color.text1,
            headerStyle: {
              backgroundColor: color.primary,
              elevation: 0,
            }
          }}
        />
      </>}
    </Stack.Navigator>
  );
}



export default Stacks;
