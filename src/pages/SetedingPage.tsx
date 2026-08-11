import { useNavigate } from "react-router-dom"
import { Seteding } from "../components/Seteding"
import { useUser } from "../hooks/useUser"
import { useEffect } from "react"
import { useAccount } from "../hooks/useAccount"

export const SetedingPage = () => {

  const navigate = useNavigate()

  const { user } = useUser()

  const { loadAccount } = useAccount()

  useEffect(() => {
    if (!user) return;

    loadAccount();
  }, [user]);

  useEffect(() => {
    if (user === null) {
      navigate("/auth");
    }
  }, [user, navigate]);


  return <Seteding />
}