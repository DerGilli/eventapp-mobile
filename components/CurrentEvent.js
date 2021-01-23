import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

function CurrentEvent ({ event }){

  //we only need this date state because of the tick function that will rerender the component every second
  //disable error message for unused vars
  // eslint-disable-next-line
  const [date, setDate] = useState(new Date());
  const tick = () => {
    setDate(new Date())
  }

  //hook up the timer on mount, clear timer on unmount. This is done in the return.
  useEffect(() => {
    const timerID = setInterval(
      () => tick(),
      1000
    )
    return () => {
      clearInterval(timerID)
    }
  }, [])

  if (event === null) return <Text>No event selected</Text>

  //do the math to calculate the countdown
  let countdownDate = new Date(event.date).getTime()
  let now = new Date().getTime()
  let dist = countdownDate - now
  let d = Math.floor(dist / (1000 * 60 * 60 * 24))
  let h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
  let s = Math.floor((dist % (1000 * 60)) / 1000);

  return (
    <View style={styles.event}>
      <ImageBackground style={styles.image} source={{ uri: event.url }}>
        <View style={styles.eventDescription}>
        <Text style={{textAlign: 'center', fontSize:20}}>{event.name}</Text>
        <Text>{d} Days, {h} Hours, {m} Minutes, {s} Seconds</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  event: {
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center',
  },
  eventDescription: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255, 0.6)',
  }
})

export default CurrentEvent;