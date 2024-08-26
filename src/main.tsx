import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './layouts/Dashboard'
import { InteractiveMap } from './components/InteractiveMap'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route index element={<div>Dashboard Home Content</div>} />
                    <Route path="interactive-map" element={<InteractiveMap />} />
                </Route>
            </Routes>
        </Router>
    </StrictMode>
)