/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiFile } from 'react-icons/fi'

import * as S from './FileUploadStyles'

interface FileUploadProps {
  onDropHandeler: (file: File[]) => void
  dropTextActive?: string
  dropTextInactive?: string
  icon?: JSX.Element
}

const DROP_TEXT_INACTIVE =
  'Drag and drop some files here, or click to select files'
const DROP_TEXT_ACTIVE = 'Drop the files here ...'

const FileUpload = ({
  onDropHandeler,
  dropTextActive = undefined,
  dropTextInactive = undefined,
  icon = <FiFile size={16} />,
}: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onDropHandeler(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <S.Wrapper {...getRootProps()}>
      <S.Inner>
        <input {...getInputProps()} />
        {icon}
        {isDragActive ? (
          <p>{dropTextActive ?? DROP_TEXT_ACTIVE}</p>
        ) : (
          <p>{dropTextInactive ?? DROP_TEXT_INACTIVE}</p>
        )}
      </S.Inner>
    </S.Wrapper>
  )
}

export default FileUpload
