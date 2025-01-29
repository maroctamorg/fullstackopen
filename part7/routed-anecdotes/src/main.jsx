import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { NotificationContextProvider } from './context/NotificationContext'

ReactDOM
.createRoot(document.getElementById('root'))
.render(
    <Router>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </Router>
)