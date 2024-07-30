import './App.css';
import Date from '../src/component/date.js';
import Date2 from '../src/component/date2.js';
import ResTime from '../src/component/reservationTime.js';
import BoardMain from './component/boardMain.js';
import BoardPosting from './component/boardPosting.js';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <h1>Test</h1>
      <Date/>
      <h1>---------------</h1>
      <Date2/>
      <h1>----------------</h1>
      <ResTime/>
      <h1>-------------</h1>
      <BoardMain/>
      <Routes>
        <Route path='/boardPosting' element={<BoardPosting/>}/>
        <Route path='/boardMain' element={<BoardMain/>}/>
      </Routes>
      
    </div>
  );
}

export default App;