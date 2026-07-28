import { BrowserRouter } from 'react-router-dom'
import { UsersContextProviders } from './providers/UsersContextProviders.tsx'
import { AccountContextProviders } from './providers/AccountContextProviders.tsx'
import { ActionsContextProvider } from './providers/ActionsContextProviders.tsx';
import { Toaster } from "react-hot-toast";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AccountContextProviders>
      <UsersContextProviders>

        <ActionsContextProvider>

          <Toaster
            position="bottom-center"
            reverseOrder={false}
          />

          <App />

        </ActionsContextProvider>

      </UsersContextProviders>
    </AccountContextProviders>
  </BrowserRouter>
)
