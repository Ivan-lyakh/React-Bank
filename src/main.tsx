import { BrowserRouter } from 'react-router-dom'
import { UsersContextProviders } from './providers/UsersContextProviders.tsx'

import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UsersContextProviders>
      <App />
    </UsersContextProviders>
  </BrowserRouter>
)
