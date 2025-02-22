import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/NotificationContext'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={new QueryClient()}>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </QueryClientProvider>
)