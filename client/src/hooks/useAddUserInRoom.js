import { useState } from "react"
import roomContext from "../context/roomContext";


const useAddUserInRoom = () => {

    const [errorToAdd, setErrorToAdd] = useState(null);
    const selectedRoom = roomContext((state) => state.selectedRoom);

    const addUser = async () => {
        try {
            // const response
            
        } catch (error) {
            setErrorToAdd(error.response?.data?.error);
        }
    }

}