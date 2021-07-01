import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

const ImageDropzone = props => {
  const { handleImageUpload } = props

  const onDrop = useCallback(acceptedFiles => {
    handleImageUpload(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*"
  })

  const acceptedFileItems = acceptedFiles.map(file => (
    <div key={file.path}>
      <i className="far fa-file-image fa-2x"></i>
      <span>
        {file.path} - {file.size} bytes
      </span>
    </div>
  ))

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop your image here, or click to select files</p>
      )}
      <aside>{acceptedFileItems}</aside>
    </div>
  )
}

export default ImageDropzone
