import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import App from './App';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Dismiss splash screen
setTimeout(() => {
  const splash = document.getElementById('ds-splash');
  if (splash) {
    splash.classList.add('ds-hide');
    setTimeout(() => splash.remove(), 600);
  }
}, 100);
