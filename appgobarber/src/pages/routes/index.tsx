import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn } from '../signin'
import { SignUp } from '../signup'

const Auth = createNativeStackNavigator()

export const Routes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#312e38' }
    }}
  >

    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
)
