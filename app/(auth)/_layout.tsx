import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
      <Stack.Screen name='index' options={{ title: "Welcome" }} />
      <Stack.Screen name='login' options={{ title: "Login" }} />
      <Stack.Screen name='signup' options={{ title: "Sign up" }} />
    </Stack>
  )
}

export default _layout
