import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import CatalogPage from './pages/Catalog/CatalogPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import AcademyPage from './pages/Academy/AcademyPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/academy" element={<AcademyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
