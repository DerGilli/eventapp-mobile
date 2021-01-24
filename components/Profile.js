import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

function Profile() {

  const {logout} = useAuth()

  const Separator = () => (
  <View style={styles.separator} />
  );

  

  const handleLogOut = (e) => {
    logout()
  }

  return (
    <View style={{flex:1}}>
      <View style={{flex: 1}}>
        <Text>Profile Information</Text>
      </View>
      <View>
        <Separator />
        <Button title="Log Out" onPress={handleLogOut}/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Profile
