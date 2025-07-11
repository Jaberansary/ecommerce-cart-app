import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import FinalizePage from "./pages/FinalizePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/finalize" element={<FinalizePage />} />
      </Routes>
    </>
  );
}

export default App;
