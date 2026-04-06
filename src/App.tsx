import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const CatalogPage = lazy(() => import('./pages/Catalog/CatalogPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetail/ProductDetailPage'));
const CheckoutPage = lazy(() => import('./pages/Checkout/CheckoutPage'));
const AcademyPage = lazy(() => import('./pages/Academy/AcademyPage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const ProductsAdmin = lazy(() => import('./pages/Admin/ProductsAdmin'));
const CategoriesAdmin = lazy(() => import('./pages/Admin/CategoriesAdmin'));
const StoreSettings = lazy(() => import('./pages/Admin/StoreSettings'));

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/academy" element={<AcademyPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Login — sin Navbar/Footer */}
              <Route path="/login" element={<LoginPage />} />

              {/* Admin — layout propio */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="categories" element={<CategoriesAdmin />} />
                <Route path="settings" element={<StoreSettings />} />
              </Route>

              {/* Public — Navbar + Footer */}
              <Route path="/*" element={<PublicLayout />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
