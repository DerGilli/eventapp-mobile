import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage';
//mport '../css/ProgressBar.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Progressbar = ({ file, setFile, setImageUrl }) => {

  const { url, progress } = useStorage(file)

  useEffect(() => {
    if (url) {
      setImageUrl(url)
      setFile(null)
    }
  }, [url, setFile, setImageUrl])

  return (
    <ProgressBar now={progress} label={`${Math.floor(progress)}%`}></ProgressBar>
  )
}
export default Progressbar;