import React, { Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import PlaylistDetailPage from './pages/PlaylistDetailPage/PlaylistDetailPage';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage';
import SearchWithPage from './pages/SearchWithPage/SearchWithPage';
import LoadingSpinner from './common/components/LoadingSpinner';
import useExchangeToken from './hooks/useExchangeToken';
import LibraryPage from './pages/LibraryPage/LibraryPage';
const AppLayout = React.lazy(() => import('./layout/AppLayout'))
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'))
// 라우터 세팅
//0. 사이드바 있어야함 (플레이리스트, 메뉴) => AppLayout
//1. 홈페이지 /
//2. 서치페이지 /search
//3. 서치 결과 페이지 /search/:keyword
//4. 플레이리스트 디테일 페이지 /playlist/:id
//5. (모바일버전) 플레이리스트 보여주는 페이지 /playlist

//lazy 랜더링 최적화 세팅팅
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  let codeVerifier = localStorage.getItem('code_verifier');
  const {mutate : exchangeToken} = useExchangeToken();
  // mutate 사용법?

  useEffect(()=>{
    if(code && codeVerifier){
      exchangeToken({code, codeVerifier});
    }
  }, [code, codeVerifier, exchangeToken]);
  return (//suspense는 lazy이기 떄문에 로딩시에 처리해주는 
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:keyword' element={<SearchWithPage />} />
          <Route path='playlist/:id' element={<PlaylistDetailPage />} />
          <Route path='/playlist' element={<PlaylistPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Route>
        {/* <Route path='/admin' element= */}
      </Routes>
    </Suspense>
  );
}

export default App;
