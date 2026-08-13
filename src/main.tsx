import "./i18n";
import "../src/styles/theme.css";

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

import { UsersContextProviders } from "./providers/UsersContextProviders";
import { AccountContextProviders } from "./providers/AccountContextProviders";
import { ActionsContextProvider } from "./providers/ActionsContextProviders";
import { HistoryContextProvider } from "./providers/HistoryContextProviders";
import { ThemeContextProvider } from "./providers/ThemeContextProviders";


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <ThemeContextProvider>

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

    </ThemeContextProvider>

  </BrowserRouter >
)

