import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Views from './components/Views'
import Header from './components/Header'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AuthProvider>
          <StatusBar/>
          <Views/>
        </AuthProvider>
      </View>
    </NavigationContainer>
  );
}