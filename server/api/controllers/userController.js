const pool = require('../database/database');

class userController {

    /**
     * Method to get all users
     *
     * @param req
     * @param res
     *
     * @returns {*|void}
     */

    index(req, res) {
        pool.query('SELECT * FROM users ORDER BY name ASC', (error, results) => {
           if (error) {
               throw error;
           }

            return res.status(200).send({
                success: 'true',
                message: 'Get all users list',
                data: results.rows,
                pagination: [
                    {
                        page: req.query.page,
                        pageSize: req.query.pageSize,
                        rowCount: 1,
                        pageCount: 1
                    }
                ]
            });

        });
    }

    show(req, res) {
        const id = parseInt(req.params.id, 10);
        return res.status(200).send({
            success: 'true',
            message: 'Get user info',
            data: [
                {
                    id: 2,
                    name: 'Andrii Terekh',
                    email: 'none@gmail.com',
                    password: 'md5_hash',
                    created_at: '16.02.2020',
                    updated_at: '16.02.2020'
                }
            ]
        });
    }

    store(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const date = new Date();

        const dbQuery = 'with new_user as ( ' +
            'insert into users (id, name, email, password, created_at, updated_at) ' +
            'values ((select max(id)+1 from users), $1, $2, $3, $4, $4) ' +
            'returning id ) ' +
            'insert into user_roles (id, role_id, user_id) ' +
            'values ((select max(id)+1 from user_roles), 2, (select id from new_user))';

        pool.query(dbQuery, [name, email, password, date], (error, results) => {

            if (error) {
                throw error;
            }

            return res.status(200).send({
                success: 'true',
                message: 'Create new user'
            });
        });
    }

    destroy(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'Delete user'
        });
    }

    update(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'Update user'
        });
    }

}

module.exports = userController;