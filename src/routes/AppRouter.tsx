
import { HistoryPage } from "../pages/HistoryPage"
import { AuthPage } from "../pages/AuthPage"
import { HistoryDetailsPage } from "../pages/HistoryDetailsPage"
import { HomePage } from "../pages/HomePage"
import { ProfilePage } from "../pages/ProfilePage"
import { Routes, Route } from "react-router-dom"
import { MainLayout } from "../layout/MainLayout"


export const AppRouter = () => {

  return (
    <>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/id" element={<HistoryDetailsPage />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />

      </Routes>
    </>
  )

}