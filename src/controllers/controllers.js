const getLocationAndWeather = require("../utils/helpers");

const getTemperatureInLocation = async (req, res) => {
  const visitorName = req.query.visitor_name || "Guest";
  const clientIp = req.ip;

  try {
    const { location, temperature } = await getLocationAndWeather(clientIp);
    res.status(200).json({
      client_ip: clientIp,
      location: location,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTemperatureInLocation;
