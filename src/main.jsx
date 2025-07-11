import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Router/Router.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ React Toastify setup
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Create Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <div className='bg-white'>
          <RouterProvider router={router} />
        </div>

        {/* ✅ Toast container must be inside QueryClientProvider / context provider */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          style={{ zIndex: 9999 }} // make sure toast is visible above all
        />
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>
);
