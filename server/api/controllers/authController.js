const connection = require('../database/database');

const jwt      = require('jsonwebtoken');
const passport = require('passport');

class authController {

    signin(req, res) {

        const { login, password } = req.body;

        if(login && password) {

            const dbQuery = `select u.*, group_concat(distinct r.role) as roles, json_arrayagg(p.title) as entitlements
                from users u
                inner join user_roles ur on u.id = ur.user_id
                inner join roles r on ur.role_id = r.id
                inner join role_permissions rp on r.id = rp.role_id
                inner join permissions p on rp.permission_id = p.id
                where email = ?
                group by u.id`;

            connection.query(dbQuery, [login], function(err, result) {

                if (login !== 'test@test.com' || password !== 'test_test') {
                    return res.status(500).json({ message: 'User credentials does not match'});
                }
                else
                {
                    let payload = { id: 1 };
                    let token = jwt.sign(payload, 'secretKey', {expiresIn: '60m'});

                    return res.status(200).json({ authUser: result, token: 'Bearer ' + token });
                }
            });

        }
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