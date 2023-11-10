import axios from 'axios';
const userUrl = '/api/users';

const getAllUsers = async () => {
    const request = await axios.get(userUrl);
    console.log(request)
    return request.then(response => response.data);
}


export default { getAllUsers }; 