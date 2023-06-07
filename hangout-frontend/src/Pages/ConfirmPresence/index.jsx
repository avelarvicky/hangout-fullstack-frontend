import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import hangoutsService from '../../Services/hangout.service';

import axios from 'axios';

function ConfirmPresence(props) {
    const {hangoutId} = useParams();
    const [userData, setUserData] = useState(null)
    const [confirmations, setConfirmations] = useState([])

    const storedToken = localStorage.getItem("authToken")

    
    useEffect(()=> {
        const getUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/userprofile`, {
                    headers: { Authorization: `Bearer ${storedToken}`},
                })
                setUserData(response.data.name)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData();
    }, [])
    
    const addConfirmation = () => {
        let requestBody = { name: userData }
   
        hangoutsService
        .createConfirmation(hangoutId, requestBody)
        .then(()=> {
            /* console.log(response.data)
            setConfirmations(response.data) */
            props.refreshHangout()
        })
        .catch((error)=> {
            console.log(error)
        })
    }

  return (
    <div>
        <button onClick={addConfirmation}>Click to confirm presence</button>
    </div>
  )
}

export default ConfirmPresence