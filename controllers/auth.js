const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
  console.log(req.cookies)
    const token = req.cookies.token
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log('the data is ', data)
    try {
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth