import React, { useState } from 'react';
//import Progressbar from './Progressbar';
import { Button, Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddEvent = ({ addNewEvent }) => {

  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const allowedTypes = ['image/png', 'image/jpeg'];

  //Modal
  const [show, setShow] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleClose = () => setShow(false);



  const handleDateChange = (e, selectedDate) => {
    const newDate = selectedDate || date
    setShowDatePicker(false)
    setDate(newDate);
  }

  const handleNameChange = (e) => {
    setEventName(e.target.value)
  }

  const handleFileChange = (e) => {
    setImageUrl(null)
    let selectedFile = e.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile)
    } else {
      setFile(null)
    }
  }

  const handleAddEvent = (e) => {
    e.preventDefault()
    handleClose()
    addNewEvent({
      name: eventName,
      date: date,
      url: imageUrl
    })
    setImageUrl(null)
  }


  // let button =
  //   <>
  //     <Modal animation={false} show={show} onHide={handleClose}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Add New Event</Modal.Title>
  //       </Modal.Header>

  //       <Modal.Body>
  //         <Form>
  //           <Form.Group controlId="formEventName">
  //             <Form.Label>Event Name</Form.Label>
  //             <Form.Control type="text" placeholder="Enter event name" value={eventName} onChange={handleNameChange} />
  //           </Form.Group>

  //           <Form.Group controlId="formEventDate">
  //             <Form.Label>Event Date</Form.Label>
  //             <Form.Control type="datetime-local" value={eventDate} onChange={handleDateChange} />
  //           </Form.Group>

  //           <Form.Group>
  //             <Form.File id="formFileControl" label="Background Image" onChange={handleFileChange} />
  //             {file && <Progressbar file={file} setFile={setFile} setImageUrl={setImageUrl} />}
  //           </Form.Group>

  //           <Button className="w-100" variant="primary" type="submit" onClick={handleAddEvent} disabled={file && !imageUrl ? true : false}>
  //             Save
  //           </Button>
  //         </Form>
  //       </Modal.Body>
  //     </Modal>
  //   </>

  return (
<>
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems:'stretch', backgroundColor: "white"}}>
          <Button title="Datum auswählen" onPress={() => setShowDatePicker(true)}/>
          {showDatePicker && <DateTimePicker
            onChange={handleDateChange}
            value={date}
            mode="date"
          />}
          <Text>{new Date(date).toLocaleDateString()}</Text>
          <Text>Name</Text>
          <TextInput placeholder="z.B. Geburtstag" value={eventName} onChangeText={(txt) => setEventName(txt)}></TextInput>
          <Button title="close" onPress={() => setShow(!show)}/>
          <Button title="save" onPress={handleAddEvent}/>
      </View>

    </Modal>
      <Button title="Add" onPress={() => setShow(true)} />
      </>
  )

}

export default AddEvent;