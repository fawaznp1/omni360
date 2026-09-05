import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/layout/Layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import ServicesPage from '@/pages/ServicesPage/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage/ServiceDetailPage';
import CategoryPage from '@/pages/CategoryPage/CategoryPage';
import SearchPage from '@/pages/SearchPage/SearchPage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import ContactPage from '@/pages/ContactPage/ContactPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ai" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
