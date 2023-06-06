import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";

import axios from "axios";

function YourProfilePage() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
      const getProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/userprofile/${user._id}`);
            setUserData(response.data)
        } catch (error) {
            console.log(error)
        }
      }
      getProfile();
  }, []);


  return (
    <div>
        {user && <p>Welcome, {user.name}</p>}
    </div>
  );
}

export default YourProfilePage;
