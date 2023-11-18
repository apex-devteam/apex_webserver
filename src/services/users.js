import axios from 'axios';
const userUrl = '/api/users';

const getAllUsers = async () => {
    const request = await axios.get(userUrl);
    console.log(request)
    return request.data;
}

const postUser = async (newUser) => {
    const response = await axios.post(userUrl, newUser)
    return response.data
}


export default { getAllUsers, postUser }; 