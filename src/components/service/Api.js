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

export const editUser = async (user, id) => {
    try {
        return await axios.put(`${userUrl}/user`, user);
    } catch (error) {
        console.log("error while calling update api", error.message);
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

export const login = async (email, password, userType) => {
    try {
        const response = await axios.get(`${userUrl}/login?email=${email}&password=${password}&userType=${userType}`, { email, password, userType });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed. Please try again.');
    }
};

export const getHotels = async (location) => {
    try {
        return await axios.get(`${userUrl}/hotels/${location}`);
    } catch (error) {
        console.log('Error while calling getHotels API', error.message);
    }
};

export const getAllHotels = async () => {
    try {
        return await axios.get(`${userUrl}/gethotels`);
    } catch (error) {
        console.log('Error while calling getHotels API', error.message);
    }
};

export const getBookings = async (token) => {
    try {
        return await axios.get(`${userUrl}/fetchbooking`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log('Error while calling getBookings API', error.message);
    }
};

export const cancelBooking = async (bookingId) => {
    try {
        return await axios.delete(`${userUrl}/deletebooking/${bookingId}`);
    } catch (error) {
        console.log('Error while calling cancelBooking API', error.message);
    }
};

export const getHotelById = async (id) => {
    try {
        return await axios.get(`${userUrl}/hotel/${id}`);
    } catch (error) {
        console.log('Error while calling getHotelById API', error.message);
    }
};

export const addbooking = async (body) => {
    try {
        return await axios.post(`${userUrl}/addbooking`, body);
    } catch (error) {
        console.log('Error while calling addbooking API', error.message);
    }
};
