import { useNavigate } from "react-router-dom"
import { Setteding } from "../components/Setteding"
import { useUser } from "../hooks/useUser"
import { useEffect } from "react"

export const SetedingPage = () => {

  const navigate = useNavigate()

  const { user } = useUser()

  useEffect(() => {
    if (user === null) {
      navigate("/auth");
    }
  }, [user, navigate]);


  return <Setteding />
}