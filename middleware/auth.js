const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const bearer = token.split(" ");
        req.user = jwt.verify(bearer[1], config.TOKEN_KEY);
        console.log(req.user)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;