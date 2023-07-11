"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'
import dynamic from 'next/dynamic';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Provider } from 'react-redux';
import store from '../store';
import 'animate.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loading from './loading';
import { Suspense } from 'react';

const queryClient = new QueryClient();
const ToastContainer = dynamic(() => import('react-toastify').then((module) => module.ToastContainer), {
  ssr: false,
});
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
        
      <body suppressHydrationWarning={true} style={{backgroundColor: '#F3F6FC'}}>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
                <Navbar/>
        <main>
      
        <Suspense fallback={<Loading />}>{children}</Suspense>
     
        </main>
        <Footer/>
    </QueryClientProvider>
      <ToastContainer/>
      </Provider>
        </body>
       
    </html>
  )
}
