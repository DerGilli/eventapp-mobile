import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { currentUser, logout } = useAuth()

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Event App</Text>
      {currentUser && <Button onPress={logout} title="Log Out" />}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    backgroundColor: "#777",
  },
  logo: {
    color: "white",
  }
})

export default Header
