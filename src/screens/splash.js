import React from 'react';
import {
  View, Text
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import color from './components/color'

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("")
    }, 5000);
  })

  return (
    <View style={{ backgroundColor: color.primary }}>
      <Text>Logo</Text>
    </View>
  )

}


export default Splash;
