import axios from 'axios';
const merchantUrl = "/api/merchants";

const getMerchants = async (userId) => {
    const response = await axios.get(`${merchantUrl}/${userId}`)
    return response.data;
}

// const getMerchant = () => {

// }

export default { getMerchants }