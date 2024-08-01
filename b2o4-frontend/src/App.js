import logo from './logo.svg';
import './App.css';
import MyPage from './MyPage/MyPage';
import MyPageContext from './MyPage/MyPageContext';
import { useState } from 'react';
import Login from './MyPage/testLogin';

function App() {
  const [loginMember, setLoginMember] = useState(null);
  return (
    <MyPageContext.Provider value={{loginMember, setLoginMember}}>
      
      <Login/>
    </MyPageContext.Provider>
  );
}

export default App;
