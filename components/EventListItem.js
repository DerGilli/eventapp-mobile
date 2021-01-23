import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

function EventListItem ({ event, deleteEvent, changeCurrentEvent }) {

  const handleClick = () => {
      changeCurrentEvent(event);
  }

  const handleDelete = (e) => {
    deleteEvent(event);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.eventName} onPress={handleClick}>
        <Text >{event.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={handleDelete}>
        <Text style={styles.btnDng}>X</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:5,
  },
  btnDng: {
    color: 'white',
    backgroundColor: 'red',
    padding:10,
  },
  eventName: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  }
})

export default EventListItem;