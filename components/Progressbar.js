import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage';
import { View, Text } from 'react-native';

const Progressbar = ({ file, setFile, setImageUrl }) => {

  const { url, progress } = useStorage(file)

  useEffect(() => {
    if (url) {
      setImageUrl(url)
    }
  }, [url, setImageUrl])

  return (
    <View style={{ width: (progress + '%'), height: 12, backgroundColor: 'steelblue', flexDirection: 'row', justifyContent:'center', alignItems:'center', marginBottom:5 }}>
      <Text style={{fontSize:8, color: "white", }}>{'File Upload: ' + Math.floor(progress) + "%"}</Text>
    </View>
  )
}

export default Progressbar;