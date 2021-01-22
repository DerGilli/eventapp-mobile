import React from 'react';
import { View, Text, Button } from 'react-native';

function EventListItem ({ event, deleteEvent, changeCurrentEvent }) {

  const handleClick = (e) => {
    if (!e.target.classList.contains("btn")) {
      changeCurrentEvent(event);
    }
  }

  const handleDelete = (e) => {
    deleteEvent(event);
  }

  return (
    <View>
      <Text>{event.name}</Text>
      <Button title="delete" onPress={handleDelete}/>
    </View>
  )
}

export default EventListItem;