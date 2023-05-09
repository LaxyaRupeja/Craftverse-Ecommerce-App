var jwt = require('jsonwebtoken');
const { UserModel } = require('../Models/user.model');

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'shhhhh', async (err, decoded) => {
        if (decoded) {
            let user = await UserModel.find({ _id: decoded.userID });
            if (user.length) {
                next()
            }
            else {
                res.status(404).json({ 'msg': 'Please login first!' })
            }
        }
        if (err) {
            res.status(404).json({ 'msg': 'Please login first!' })
        }
    });
}
module.exports = { auth }