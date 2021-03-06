import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from './Dashboard'
import Login from './Login'
import Signup from './Signup';
import AddEvent from './AddEvent';
import Profile from './Profile'

const Stack = createStackNavigator();

function Views() {
  const { currentUser } = useAuth();
  return (
    <Stack.Navigator>
      {currentUser != null ? (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Add Event" component={AddEvent} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
        ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>            
        )
      } 
    </Stack.Navigator>
  )
}

export default Views
