import { useEffect } from "react";
import { 
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Cancel from "./scenes/checkout/Cancel";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import SummerSale from "./scenes/special/SummerSale"

//to start each page at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;

}

function App() {
  return <div className="app">
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="summer-sale" element={<SummerSale />} />
        <Route path="item/:itemId" element={<ItemDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<Confirmation />} />
        <Route path="checkout/cancel" element={<Cancel />} />
      </Routes>
      <CartMenu />
      <Footer />
    </BrowserRouter>


  </div>;
}

export default App;
