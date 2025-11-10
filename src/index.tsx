import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const root = ReactDOM.createRoot(
  document.getElementById('content') as HTMLElement
);
const queryClient = new QueryClient(); // 리액트 쿼리를 생성하기 위한 것
root.render( //CssBaseline은 css 브라우저 마다 기본값을 동일하게 설정해주는거?
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
