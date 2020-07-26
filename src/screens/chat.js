import React from 'react';
import {
  View, Text, Image, TouchableOpacity, KeyboardAvoidingView, FlatList
} from 'react-native'

import color from './components/color'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Chat = (props) => {
  const { route, navigation } = props
  const { item } = route.params
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <View style={{ backgroundColor: color.primary, height: 64, flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name='caret-left' style={{ color: color.text1, fontSize: 24 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: 40, width: 40, borderRadius: 50, backgroundColor: 'black', elevation: 10 }}>
            <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 60, }} source={item.image} />
          </View>
        </View>
        <View style={{ flex: 6, marginLeft: 12, alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text>
            {item.user}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: color.bg1 }}>
        <Text>asdasdasd</Text>
      </View>
      <View style={{ height: 64, backgroundColor: color.bg2 }}>
        <Text>asdasdasd</Text>
      </View>
    </KeyboardAvoidingView>
  );

}

export default Chat;
