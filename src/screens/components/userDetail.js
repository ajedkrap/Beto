import React from 'react';
import {
  View, Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import color from './color'

const userDetail = (props) => {
  const { data, icon } = props

  return (
    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} style={{ color: color.text1, fontSize: 18 }} />
      </View>
      <View style={{ flex: 4, paddingLeft: 20 }}>
        <Text style={{ fontSize: 18, color: color.text1, fontWeight: 'bold' }}>
          {data}
        </Text>
      </View>
    </View>
  );

}


export default userDetail;
