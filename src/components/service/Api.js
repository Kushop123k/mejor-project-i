import axios from "axios";

const userUrl = 'http://localhost:8090';

export const addUser = async (user) => {
    try {
        return await axios.post(`${userUrl}/user`, user);
    } catch (error) {
        console.log('Error while calling addUser API', error.message);
    }
};

export const getUsers = async () => {
    try {
        return await axios.get(`${userUrl}/users`);
    } catch (error) {
        console.log('Error while calling getUsers API', error.message);
    }
};

export const getUser = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${userUrl}/users/${id}`);
    } catch (error) {
        console.log('Error while calling getUser API', error.message);
    }
};

export const editUser=async(user,id)=>{
    try{
    return await axios.put(`${userUrl}/user` ,user)
    }catch(error){
        console.log("error while calling update api",error.message);

    }
}

export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${userUrl}/user/${id}`);
    } catch (error) {
        console.log("Error while calling deleteUser API", error.message);
    }
};

export const addHotel = async (hotel) => {
    try {
        console.log(hotel);
        return await axios.post(`${userUrl}/addhotel`, hotel, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('Error while calling addHotel API', error.message);
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${userUrl}/login`, { email, password });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error while calling login API', error.message);
        throw error; // Rethrowing the error to be handled or displayed by the calling component
    }
};

export const getHotels = async () => {
    try {
        return await axios.get(`${userUrl}/gethotels`);
    } catch (error) {
        console.log('Error while calling getHotels API', error.message);
    }
};
