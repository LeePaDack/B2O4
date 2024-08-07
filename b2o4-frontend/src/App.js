import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './Signup.css';
import Signup from './component/Signup';
import Footer from './component/Footer';
import Header from './component/Header';



function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/'element={<Signup/>}/>

      </Routes>
      <Footer/>
    </Router>


  );
}

export default App;
