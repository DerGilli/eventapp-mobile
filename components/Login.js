import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, TouchableOpacity} from 'react-native';
import { useAuth } from "../contexts/AuthContext";

function Login({navigation}) {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setloading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setloading(true)
      await login(email, password)
      setloading(false)
    } catch (error) {
      setError(error.message)
      setloading(false)
      return
    }
  }

  const handlePasswordChange = (pw) => {
    setPassword(pw)
  }

  const handleEmailChange = (mail) => {
    setEmail(mail)
  }

  return (
    <View style={styles.container}>
      {error!="" && <Text style={styles.error}>{error}</Text>}
      <Text>E-Mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"/>
      <Text>Password</Text>
      <TextInput   
        style={styles.input}  
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        autoCapitalize="none"
        textContentType="password"/>
      <Button onPress={handleSubmit} title="Log In" disabled={loading}/>
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center" }}>Need an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{textAlign:'center', color: 'blue', padding: 10}}>Sign Up</Text>
          </TouchableOpacity>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    alignSelf: "center",
    width: 250,
    paddingTop: 50,
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#777',
    borderWidth: 1,
    marginBottom: 15,
  },
  error: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 0, 0, 0.1)"
  }
})

export default Login
