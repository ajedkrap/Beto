import React from 'react';
import {
  View, Text
} from 'react-native'

import UserProfile from './components/profile'

const OtherProfile = (props) => {
  const { route } = props
  const { user } = route.params
  return (
    <View>
      <UserProfile user={user} isUser={false} />
    </View>
  );

}

export default OtherProfile;
