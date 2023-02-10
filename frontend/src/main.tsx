import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LIFF_ID } from '@/config'
import liff from '@line/liff'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// LIFF初期化
liff
  .init({
    liffId: LIFF_ID
  })
  .then(() => {
    if (!liff.isLoggedIn()) {
      liff.login()
    }
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
  .catch(() => {
    console.error('liff init error!')
  })
