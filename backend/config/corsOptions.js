const allowedOrigins = require('./allowedOrigins')
const corsOptions = { //options object
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){ //if it's in the whitelist
            callback(null, true) //null means no errors & the origin will be sent back saying its ok
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, //request origin, callback function
    optionsSuccessStatus: 200
}

module.exports = corsOptions
