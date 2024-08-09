import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header.js";
import Footer from "./component/layout/Footer.js";
import GoodsShop from "./component/GoodsShop";
import GoodsDetail from "./component/GoodsDetail";
import ShoppingBasket from "./component/ShoppingBasket.js";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GoodsShop />} /> 
        <Route path="/goodsDetail/:goodsNo" element={<GoodsDetail />} />
        <Route path="/shoppingBasket/:memberNo" element={<ShoppingBasket />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
