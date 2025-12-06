const axios = require("axios");
const captainModel = require("../models/captain.model");



module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Unable to fetch coordinates`);
    }
  } catch (error) {
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(err)
    throw err;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    throw err;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radiusKm) => {
  // Validate inputs
  if (typeof ltd !== 'number' || typeof lng !== 'number') return [];
  if (ltd === 0 && lng === 0) return [];

  const radiusMeters = Math.max(100, (radiusKm || 2) * 1000);

  const captains = await captainModel.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, ltd] },
        $maxDistance: radiusMeters
      }
    }
  });

  return captains;
}