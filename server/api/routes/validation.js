var Joi = require('joi');

module.exports = {

    /* Validation - Get all users [GET - '/api/v1/users'] */
    getUsers: {
        query: {
            page: Joi.number(),
            pageSize: Joi.number()
        },
        headers: {
            accesstoken: Joi.string(), //TODO make required
            userId: Joi.string() //TODO make required
        }
    },

    /* Validation - Get user detail [GET - '/api/v1/users/:id'] */
    getUser: {
        params: {
            id: Joi.number().required()
        },
        headers: {
            accesstoken: Joi.string(), //TODO make required
            userId: Joi.string() //TODO make required
        }
    },

    /* Validation - Post new user [POST - '/api/v1/users'] */
    postUser: {
        body: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        },
        headers: {
            accesstoken: Joi.string(), //TODO make required
            userId: Joi.string() //TODO make required
        }
    },

    putUser: {
        headers: {
            accesstoken: Joi.string(), //TODO make required
            userId: Joi.string() //TODO make required
        },
        params: {
            id: Joi.number().required()
        },
        body: {
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string()
        }
    },

    deleteUser: {
        headers: {
            accesstoken: Joi.string(), //TODO make required
            userId: Joi.string() //TODO make required
        },
        params: {
            id: Joi.number().required()
        }
    }

};