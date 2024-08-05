import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GoodsShop from "./component/GoodsShop";
import GoodsDetail from "./component/GoodsDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoodsShop/>} />
        <Route path="/goodsDetail/:goodsNo" element={<GoodsDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
