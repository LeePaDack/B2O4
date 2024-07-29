import './App.css';
import Date from '../src/component/date.js';
import Date2 from '../src/component/date2.js';
import ResTime from '../src/component/reservationTime.js';

function App() {
  return (
    <div>
      <h1>Test</h1>
      <Date/>
      <h1>---------------</h1>
      <Date2/>
      <h1>----------------</h1>
      <ResTime/>
    </div>
  );
}

export default App;