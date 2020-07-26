import React from 'react';
import {
  View, Text
} from 'react-native'

import UserProfile from './components/profile'

const MyProfile = (props) => {
  const { route } = props
  const { user } = route.params
  return (
    <View>
      <UserProfile user={user} isUser={true} />
    </View>
  );

}

export default MyProfile;
