const userModel = require('../models/User');

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
        //TODO add User Model and sorting possibility
        return res.status(200).send({
            success: 'true',
            message: 'Get all users list',
            data: [
                {
                    id: 2,
                    name: 'Andrii Terekh',
                    email: 'none@gmail.com',
                    password: 'md5_hash',
                    created_at: '16.02.2020',
                    updated_at: '16.02.2020'
                },
                {
                    id: 1,
                    name: 'Volodymyr Terekh',
                    email: 'hellsing.vova@ukr.net',
                    password: 'md5_hash',
                    created_at: '16.02.2020',
                    updated_at: '16.02.2020'
                }
            ],
            pagination: [
                {
                    page: req.query.page,
                    pageSize: req.query.pageSize,
                    rowCount: 1,
                    pageCount: 1
                }
            ]
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
        return res.status(200).send({
            success: 'true',
            message: 'Create new user'
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