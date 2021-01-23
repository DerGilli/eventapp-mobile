import React, { useState, useEffect } from 'react'
import CurrentEvent from './CurrentEvent';
import AddEvent from './AddEvent';
import EventList from './EventList';
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { Button, View, StyleSheet } from 'react-native';

function Dashboard({navigation, route}) {

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser, logout } = useAuth()

  function saveEventToDB(newEvent) {
    return db.collection("Events").add({
      Name: newEvent.name,
      Date: newEvent.date,
      User: currentUser.uid,
      Url: newEvent.url
    })
  }

  const HandleNewEvent = async () => {
    try {
      const newEvents = []
      if (route.params?.event) {
        console.log(route.params.event)
        await saveEventToDB(route.params.event)
        route.params = null
      }
      const snapshot = await db.collection("Events").where("User", "==", currentUser.uid).get()
      snapshot.docs.forEach(doc => {
        newEvents.push({ id: doc.id, name: doc.data().Name, date: Date.parse(doc.data().Date), url: doc.data().Url })
      })
      setEvents(newEvents)
    } catch (error) {
      console.log("Handle New Event Error " + error)
    }
  }

  useEffect(() => {
    if (currentUser != null) {
      HandleNewEvent().then(setIsLoading(false))
    }
  }, [currentUser, route.params?.event])

  let selectedEvent;
  events.length > 0 ? selectedEvent = events[0] : selectedEvent = null;


  const [currentEvent, setCurrentEvent] = useState(selectedEvent);


  const handleLogOut = (e) => {
    logout()
  }

  const changeCurrentEvent = (selectedEvent) => {
    setCurrentEvent(selectedEvent);
  }

  const deleteEvent = (eventToDelete) => {
    // slice the events object to create a new object instead of just pointing to the same position in memory.
    // only this way react will notice a change an rerender child components
    const tmpEvents = events.slice();
    tmpEvents.splice(events.indexOf(eventToDelete), 1).slice()
    try {
      removeEventfromDB(eventToDelete)
    } catch (error) {
      console.log(error)
    }
    setEvents(tmpEvents)
  }

  function removeEventfromDB(eventToDelete) {
    db.collection("Events").doc(eventToDelete.id).delete().then()
  }

  const Separator = () => (
  <View style={styles.separator} />
  );
  
  if(isLoading) return <View></View>

  return (
    <View style={{flex:1, justifyContent: "flex-start"}}>
      <CurrentEvent event={currentEvent} />
      <EventList
        events={events}
        changeCurrentEvent={(selectedEvent) => changeCurrentEvent(selectedEvent)}
        deleteEvent={(eventToDelete) => deleteEvent(eventToDelete)} />
      <Button title="+" onPress={() => navigation.navigate("Add Event")} />
      <Separator/>
      <Button title="Log Out" onPress={handleLogOut}/>
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    flex:1,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Dashboard
