import { BrowserRouter } from 'react-router-dom'
import { UsersContextProviders } from './providers/UsersContextProviders.tsx'
import { AccountContextProviders } from './providers/AccountContextProviders.tsx'

import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AccountContextProviders>
      <UsersContextProviders>
        <App />
      </UsersContextProviders>
    </AccountContextProviders>
  </BrowserRouter>
)
