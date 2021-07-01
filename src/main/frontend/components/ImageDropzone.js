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
    <div>
      <div {...getRootProps({ className: "upload text-center" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <i className="fas fa-cloud-upload-alt fa-5x"></i>
            <p>Drag 'n' drop your image here, or click to select files</p>
          </div>
        )}
      </div>
      <aside>{acceptedFileItems}</aside>
    </div>
  )
}

export default ImageDropzone
