import { useState, useEffect } from "react";
import { projectStorage } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file !== null) {
      const storageRef = projectStorage.ref(file.name);
      fetch(file.uri).then(res => {
        res.blob().then(blob => {
          storageRef.put(blob).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage)
          }, (err) => {
            console.log(err)
          }, async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
          })
        })
      })
      // storageRef.put(file).on('state_changed', (snap) => {
      //   let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      //   setProgress(percentage)
      // }, (err) => {
      //   console.log(err)
      // }, async () => {
      //   const url = await storageRef.getDownloadURL();
      //   setUrl(url);
      // })
    }
  }, [file])

  return { progress, url }

}

export default useStorage;