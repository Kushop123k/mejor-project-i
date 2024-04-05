import axios from "axios";

const userUrl='http://localhost:8090';

export const addUser=async(user)=>{
    try{
        return await axios.post(`${userUrl}/user`,user)
    }catch(error)
    {
        console.log('Error while calling adduser Api ',error.message);
    }

    }


    
   