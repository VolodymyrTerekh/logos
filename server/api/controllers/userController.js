const connection = require('../database/database');

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
        connection.query('SELECT * FROM users ORDER BY name ASC', (error, results) => {
           if (error) {
               throw error;
           }

            return res.status(200).send({
                success: 'true',
                message: 'Get all users list',
                data: results,
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
        const dbQuery = `select u.*, group_concat(distinct r.role) as roles, json_arrayagg(p.title) as entitlements
                from users u
                inner join user_roles ur on u.id = ur.user_id
                inner join roles r on ur.role_id = r.id
                inner join role_permissions rp on r.id = rp.role_id
                inner join permissions p on rp.permission_id = p.id
                where u.id = ?
                group by u.id`;

        connection.query(dbQuery, [id], function(err, results) {

            if (err) {
                return res.status(500).json({ message: err});
            }

            return res.status(200).send({
                success: 'true',
                message: 'Show user info',
                data: results
            });
        });
    }

    store(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        connection.beginTransaction(function(err) {
           if (err) {
               throw err;
           }
        });

        const user_query = "insert into `users` (`name`, `email`, `password`) values ('" + name + "', '" + email + "', '" + password + "')";
        connection.query(user_query, email, function(err, results) {
            if(err) {
                return connection.rollback(function() {
                   throw err;
                });
            }

            const user_role = "insert into `user_roles` (`role_id`, `user_id`) values (2, '" + results.insertId + "')";
            connection.query(user_role, function(err, results) {
               if(err) {
                   return connection.rollback(function() {
                      throw err;
                   });
               }
               connection.commit(function(err) {
                  if (err) {
                      connection.rollback(function() {
                         throw err;
                      });
                  }
                  return res.status(200).send({
                      success: 'true',
                      message: 'Create new user'
                  });
               });
            });
        });
    }

    destroy(req, res) {
        const id = parseInt(req.params.id, 10);

        const dbQuery = "delete from `users` WHERE id=?";

        connection.query(dbQuery, [id], function(err, results) {

            if (err) {
                return res.status(500).json({ message: err});
            }

            return res.status(200).send({
                success: 'true',
                message: 'Deleted'
            });
        });
    }

    update(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const id = parseInt(req.params.id, 10);

        const dbQuery = "update `users` set name=?, email=?, password=? WHERE id=?";

        connection.query(dbQuery, [name, email, password, id], function(err, results) {

            if (err) {
                return res.status(500).json({ message: err});
            }

            return res.status(200).send({
                success: 'true',
                message: 'Updated'
            });
        });
    }

}

module.exports = userController;