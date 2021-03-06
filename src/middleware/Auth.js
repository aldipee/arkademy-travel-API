const jwt = require('jsonwebtoken')

module.exports = {
  validAuthToken: (req, res, next) => {
    const { authorization } = req.headers
    // if there is token request
    if (authorization && authorization.startsWith('Bearer')) {
      try {
        // get token
        let token = authorization.slice(7, authorization.length)
        token = jwt.verify(token, process.env.AUTH_KEY)
        if (token) {
          // if token valid, then set some basic data to req.user as session

          req.user = token
          next()
        } else {
          res
            .status(403)
            .send({ success: false, status: 403, message: 'Unauthorization', error_code: '1006' })
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({ status: 500, message: error })
      }
    } else {
      res
        .status(403)
        .send({ success: false, status: 403, message: 'Authorization needed', error_code: '1007' })
    }
  }
}
