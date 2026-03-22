const axios = require('axios');
const HttpError = require('../models/http-error');
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

async function getCoordsForAddress(address) {
  const response = await axios.get(NOMINATIM_URL, {
    params: {
      q: address,
      format: 'json',
      limit: 1,
    },
    headers: {
      'User-Agent': 'Guidiny/1.0 (chaymabaklouti59@gmail.com)'
    }
  });

  const data = response.data;

  if (!data || data.length === 0) {
    throw new HttpError('Could not find location for the specified address.', 422);
  }

  return { lat: data[0].lat, lng: data[0].lon };
}

module.exports = getCoordsForAddress;
