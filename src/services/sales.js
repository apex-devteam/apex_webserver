import axios from 'axios';
const salesUrl = "/api/sales";

const getSales = async (merchantId) => {
    const response = await axios.get(`${salesUrl}/${merchantId}`)
    return response.data;
}

export default { getSales }