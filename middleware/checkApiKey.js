require("dotenv").config()

exports.checkApiKey = (req, res, next) => {
	const apiKey = req.header("x-api-key")

	if (apiKey && apiKey === process.env.SECRET_API_KEY) {
		next() 
	} else {
		res.status(403).json({ error: "Forbidden: Invalid API Key" })
	}
}