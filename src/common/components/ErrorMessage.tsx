import { Alert } from '@mui/material'
import React from 'react'

interface ErrorMessageProps{
    errorMessage: string;
} // 굳이 type을 모델이 안만들고 여기에 정의한 이유는 
// 이건 이 컴포넌트 안에서만 사용되어지기 때문에 여기에다 정의함.

const ErrorMessage = ({errorMessage}: ErrorMessageProps) => {
  return (
    <Alert severity="error">{errorMessage}</Alert>
  )
}

export default ErrorMessage