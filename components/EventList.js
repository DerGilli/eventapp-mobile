import React from 'react';
import { FlatList, Text } from 'react-native';
//import "../css/EventList.css";
import EventListItem from "./EventListItem.js";


function EventList  ({ events, changeCurrentEvent, deleteEvent }) {

  return (
    <FlatList
      style={{ padding: 10 }}
      data={events}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <EventListItem
          key={item.id} event={item}
          changeCurrentEvent={changeCurrentEvent}
          deleteEvent={deleteEvent} />
      )}
    />
  )
}

export default EventList; 