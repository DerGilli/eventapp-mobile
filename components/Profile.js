import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
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
    <View style={{flex:1, padding: 10, justifyContent: "center", alignItems: "stretch"}}>
      <View style={{ alignSelf: "center", alignItems: "center"}}>
          <Image style={{width: 100, height: 100}} source={require('../assets/placeholder.jpg')}/>
        </View>
      <View style={{ flex: 1, padding: 10, justifyContent: "center", alignItems: "stretch" }}>
        <View style={styles.formGroup}>
          <Text style={styles.text}>Name</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.text}>Email</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.text}>Password</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
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
  formGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    flex: 1,
  },
  input: {
    flex: 2,
    borderColor: "silver",
    borderWidth: 1,
    borderStyle: "solid"
  }
});

export default Profile
