const axios = require('axios')

const handler = async function (e) {
  const { hook, key, msg } = e.queryStringParameters;
  try {
    const response = await axios.post(
      `https://maker.ifttt.com/trigger/${hook}/with/key/${key}`, { value1: msg }
    );
    
    if (response.status >= 200 && response.status < 300) {
      return { statusCode: response.status, body: response.data }
    }
    const result = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: result.data }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
