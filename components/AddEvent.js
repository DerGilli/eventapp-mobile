import React, { useState } from 'react';
import useStorage from '../hooks/useStorage';
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Progressbar from './Progressbar';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as documentPicker from "expo-document-picker";

const AddEvent = ({ navigation }) => {

  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState(new Date().setHours(24,0,0,0));
  const [time, setTime] = useState(new Date().setHours(24,0,0,0));
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const allowedTypes = ['image/png', 'image/jpeg'];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (e, selectedDate) => {
    const newDate = selectedDate || date
    setShowDatePicker(false)
    setDate(newDate);
  }

    const handleTimeChange = (e, selectedTime) => {
    const newTime = selectedTime || time
    setShowTimePicker(false)
    setTime(newTime);
  }

  const handleDocumentPicker = async () => {
    try {
      const file = await documentPicker.getDocumentAsync({ type: "image/*" })
      console.log(file)
      setImageUrl(null)
      setFile(file)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddEvent = () => {
    const event ={
      name: eventName,
      date: date.toString(),
      url: imageUrl
    }
    setImageUrl(null)
    setFile(null)
    navigation.navigate('Dashboard', {event})
  }

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour:"2-digits", minutes:"2-digits"}

  return (
        <View style={{flex:1, justifyContent:'center', alignItems:"center"}}>
          <View style={{ justifyContent: 'center', alignItems: 'stretch', backgroundColor: "white", padding: 20, width: "80%", }}>
            <View style={{ alignItems: "center", marginBottom: 20, paddingBottom: 5, borderBottomColor: "silver", borderBottomWidth: 1}}><TextInput style={ styles.header} placeholder="Event Name" value={eventName} onChangeText={(txt) => setEventName(txt)}></TextInput></View>
            <View style={styles.formGroup}>
              <Text style={styles.btnDescription}>Datum</Text>
              <TouchableOpacity style={styles.btn} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.btnText}>{new Date(date).toLocaleDateString('de-DE', options)}</Text>
              </TouchableOpacity>
            {showDatePicker && <DateTimePicker
              onChange={handleDateChange}
              value={date}
              mode="date"
              />}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.btnDescription}>Uhrzeit</Text>
              <TouchableOpacity style={styles.btn} onPress={() => setShowTimePicker(true)}>
                <Text style={styles.btnText}>{new Date(time).getHours() + ':' + new Date(time).getMinutes()}</Text>
              </TouchableOpacity>
              {showTimePicker && <DateTimePicker
              onChange={handleTimeChange}
              value={time}
              mode="time"
              />}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.btnDescription}>Hintergrund</Text>
              <TouchableOpacity style={styles.btn} onPress={() => handleDocumentPicker()}>
                <Text style={styles.btnText}>{file === null ? "Auswählen" : file.name}</Text>
              </TouchableOpacity>
            </View>
            {file !== null && <Progressbar file={file} setFile={setFile} setImageUrl={ setImageUrl}/>}
            <Button title="save" onPress={handleAddEvent}/>
          </View>
        </View>
  )

}

const styles = StyleSheet.create({
  header: {
    fontSize: 20
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  btnDescription: {
    flex: 1
  },
  btn: {
    backgroundColor: "steelblue",
    padding: 5,
    flex:1,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  }
})

export default AddEvent;