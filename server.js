const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('.'));

let accessToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post('https://osu.ppy.sh/oauth/token', {
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: 'public'
    });

    accessToken = response.data.access_token;
    tokenExpiry = now + (response.data.expires_in * 1000) - 60000;
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error.response?.data || error.message);
    throw error;
  }
}

app.get('/api/user', async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://osu.ppy.sh/api/v2/users/${process.env.OSU_USER_ID}/osu`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.get('/api/user/best', async (req, res) => {
  try {
    console.log('Fetching best scores for user:', process.env.OSU_USER_ID);
    const token = await getAccessToken();
    console.log('Got access token');
    
    // First, try to get user data to get user ID
    let userId = process.env.OSU_USER_ID;
    try {
      const userResponse = await axios.get(`https://osu.ppy.sh/api/v2/users/${process.env.OSU_USER_ID}/osu`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      userId = userResponse.data.id;
      console.log('Using user ID:', userId);
    } catch (err) {
      console.log('Could not get user data, trying with username directly');
    }
    
    // Now try to get best scores with user ID
    const response = await axios.get(`https://osu.ppy.sh/api/v2/users/${userId}/scores/best`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        mode: 'osu',
        limit: 100
      }
    });
    
    console.log('Best scores fetched, count:', response.data.length);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching best scores:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Message:', error.message);
    }
    res.status(500).json({ error: error.response?.data || error.message || 'Failed to fetch scores' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
