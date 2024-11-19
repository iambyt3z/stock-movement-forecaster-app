import './index.css'
import App from './App.tsx'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <App />
        </LocalizationProvider>
    </StrictMode>,
)
