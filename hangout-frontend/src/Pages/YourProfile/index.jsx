import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/auth.context";

import axios from "axios";

function YourProfilePage() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken")

  const [userData, setUserData] = useState(null)

  useEffect(()=> {
      const getUserData = async () =>  {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/userprofile`, {
                headers: { Authorization: `Bearer ${storedToken}`},
            })
            setUserData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
      }
      getUserData()
  }, [])


  return (
    <div>
        {user && <p>Welcome, {user.name}</p>}
    </div>
  );
}

export default YourProfilePage;
