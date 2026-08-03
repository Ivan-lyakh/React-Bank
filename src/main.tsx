import { BrowserRouter } from 'react-router-dom'
import { UsersContextProviders } from './providers/UsersContextProviders.tsx'
import { AccountContextProviders } from './providers/AccountContextProviders.tsx'
import { ActionsContextProvider } from './providers/ActionsContextProviders.tsx';
import { HistoryContextProvider } from './providers/HistoryContextProviders.tsx';
import { Toaster } from "react-hot-toast";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <UsersContextProviders>

      <AccountContextProviders>

        <ActionsContextProvider>

          <HistoryContextProvider>

            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />

            <App />

          </HistoryContextProvider>

        </ActionsContextProvider>

      </AccountContextProviders>

    </UsersContextProviders >

  </BrowserRouter >
)

