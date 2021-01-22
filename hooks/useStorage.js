import { useState, useEffect } from "react";
import { projectStorage } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage)
    }, (err) => {
      //handle error
    }, async () => {
      const url = await storageRef.getDownloadURL();
      setUrl(url);
    })
  }, [file])

  return { progress, url }

}

export default useStorage;