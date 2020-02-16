const userModel = require('../models/User');

class authController {

    signin(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'Sign in',
            access_token: 'Some token generated',
            expires_at: '20.02.2020'
        });
    }

    token(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'Token generating',
            access_token: 'Some token generated',
            expires_at: '20.02.2020'
        });
    }
}

module.exports = authController;