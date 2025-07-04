// Dialer Integration
const axios = require('axios');

const sendToElision = async (lead) => {
  try {
    const response = await axios.post(process.env.ELISION_API_URL, {
      phone: lead.phone,
      name: lead.name,
      campaign: lead.campaign,
    });
    return response.data;
  } catch (err) {
    console.error('Elision API error:', err.message);
    return { success: false, error: err.message };
  }
};

module.exports = sendToElision;
