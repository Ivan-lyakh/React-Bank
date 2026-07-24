
import { useUser } from "../hooks/useUser"

export const Dashboard = () => {

  const { user } = useUser()

  console.log(user)

  return (
    <div>
      <h2>{user?.user_metadata.name}</h2>
    </div>
  )
}