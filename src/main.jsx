import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AOS from 'aos';

// AOS global CSS
import 'aos/dist/aos.css'

// Initialize AOS
AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(

    <App />
  ,
)
