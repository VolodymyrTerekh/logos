const express = require('express');
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");
const path = require('path');


const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');

const server = express();
const jsonParser = bodyParser.json();

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromHeader("access_token");
jwtOptions.secretOrKey = 'secretKey';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);

    const select = `select * from users where id=?`
    connection.query(select, [jwt_payload.id] ,(err, result) => {
        if (result !== "undefined"){
            next(null, result)
        }
        else{
            next(null, false)
        }
    })
});

passport.use(strategy);

/* ===========================SERVER USE=========================== */
server.use(express.static(__dirname + '/dist/user-system'))

server.use(jsonParser);

server.use(passport.initialize())

server.use(bodyParser.urlencoded({extended: true}))

server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, access_token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    // Pass to next layer of middleware
    next();
});
/* ================================================================ */




/* =====================CONNECT DATABASE MYSQL===================== */
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "root"
});

// const connection = mysql.createConnection('mysql://b5bec95840a84d:f8461cf6@us-cdbr-iron-east-04.cleardb.net/heroku_711fe32cc04199e?reconnect=true')
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});


/* ============================================================== */



/* ============================================================== */

server.get("/users", passport.authenticate("jwt", {session: false}), function(req, res){
    const select = `select * from users`
    connection.query(select, (err, result) => {
        if (err){
            res.status(500).json({err: 'mysql failed'})
        }
        res.status(200).json(result)
        return
    })
})

server.post("/users", passport.authenticate("jwt", {session: false}), function (req, res) {
  const date = new Date()
  const currentDate = formatDate(date);

  let insertUser = `INSERT INTO users (name, login, email, password, created_at, update_at, admin) VALUES (?,?,?,?,?,?,?)`
  let valuesUser = [req.body.name,req.body.name,req.body.name+'@gmail.com', 123456, currentDate,currentDate,false];

  connection.query(insertUser,valuesUser, function(err, result){
    if (err) return res.status(500).json({err: err})

    let insertEnti = 'INSERT INTO entitlements (can_view_users, user_id) VALUES (?,?)';
    let valuesEnti = [true,result.insertId];
    connection.query(insertEnti,valuesEnti, function(err, result){

      if (err) return res.status(500).json({err: err})
      return res.status(200).json(`Users ${req.body.name} added`)
    })
  })
})


server.get("/users/:id", passport.authenticate("jwt", {session: false}), function (req, res) {
    const id = req.params.id
    const select = `
          select u.id, u.name, u.login, u.email, u.created_at, u.update_at, u.admin, e.can_view_users, e.can_edit_users,
          e.can_delete_users, e.can_view_details, e.can_view_details_full, e.can_edit_users_full from users u
          join entitlements e on e.user_id = u.id
          where u.id=?`
    connection.query(select, [id], function(err, result) {
        if (err){
            res.status(500).json({err: err})
        }
        res.json({user: result[0]})
    })
})
// return all entitlements
server.get("/users/:id/entitlements", passport.authenticate("jwt", {session: false}), function (req, res) {
    const id = req.params.id
    const select = `select e.can_view_users, e.can_edit_users, e.can_delete_users, e.can_view_details,
                  e.can_view_details_full, e.can_edit_users_full from entitlements e where user_id =?`
    connection.query(select, [id], function(err, result) {
        if (err){
            res.status(500).json({err: err})
        }
        res.json({user: result[0]})
    })
})
// Update user entitlements
server.put("/users/:id/add-entitlements", passport.authenticate("jwt", {session: false}), function (req, res){
    const { id, entitlements } = req.body;
  //first variant query
    const update = `update entitlements set ${entitlements}=true where user_id=?`
//second variant query
    //const update = `update entitlements  set entitlements.can_edit_users=true, entitlements.can_delete_users=true,
   // entitlements.can_view_details=true, entitlements.can_view_details_full=true, entitlements.can_edit_users_full=true where user_id=?`
  const update_1 = `update entitlements  set entitlements.can_edit_users=true where user_id=?`;
  connection.query(update, [id], function(err, result){
        if (err){
            res.status(500).json({err: err})
            return
        }
        const select = `select e.can_view_users, e.can_edit_users, e.can_delete_users, e.can_view_details,
                    e.can_view_details_full, e.can_edit_users_full from entitlements e where user_id =?`
        connection.query(select, [id], function(err, result){
            if (err){
                res.status(500).json({err: err})
                return
            }
            res.status(200).json({msg: `User update`, entitlements: result[0]})
        })
    })
});

server.put("/users/:id/delete-entitlements", passport.authenticate("jwt", {session: false}), function (req, res){
    const { id, entitlements } = req.body;
    const update = ` update entitlements set ${entitlements}=false where user_id=?`;
    connection.query(update, [id], function(err, result){
        if (err){
            res.status(500).json({err: err});
            return
        }
        const select = `select e.can_view_users, e.can_edit_users, e.can_delete_users, e.can_view_details,
                    e.can_view_details_full, e.can_edit_users_full from entitlements e where user_id =?`
        connection.query(select, [id], function(err, result){
            if (err){
                res.status(500).json({err: err})
                return
            }
            res.status(200).json({msg: `User update`, entitlements: result[0]})
        })
    })
})

// Updated User
server.put("/users/:id", passport.authenticate("jwt", {session: false}), function (req, res){
  const {id, name, login } = req.body
  const update_at = formatDate(new Date())
  const update = 'update users set name=?, login=?, update_at=? where id=?'
  connection.query(update, [name,login, update_at,id], function(err, result){
    if (err){
      res.status(500).json({err: err})
      return
    }
    res.status(200).json({msg: `User ${name} update`})
  })
})

server.delete("/users/:id", passport.authenticate("jwt", {session: false}), function (req, res) {

  const userId = req.params.id;
  const fieldEnti = `DELETE FROM entitlements WHERE user_id = ${userId}`

  connection.query(fieldEnti, function(err, result){
    const fieldUser = `DELETE FROM users WHERE id = ${userId}`
    connection.query(fieldUser, function( err, result ){

      if (err) return res.status(500).json({err: err})

      return res.status(200).json({msg: `User delete`})
    })
  })
})
// LOGIN
server.post("/auth/login", function(req, res, next) {
  const { login, password } = req.body;
  if (login && password ) {
    const select = `
    select u.id, u.name, u.login, u.email, u.password, u.created_at, u.update_at, u.admin, e.can_view_users, e.can_edit_users,
           e.can_delete_users, e.can_view_details, e.can_view_details_full, e.can_edit_users_full from users u
           join entitlements e on e.user_id = u.id
           where login=?`;

    connection.query(select, [login], function(err, result){
      if (err){
        res.status(500).json({err: err});
      }
      console.log(result)
      try{
        if (result.length === 0){
          throw ({msg: "User not found", status: 403})
        }
        if (result[0].login !== login){
          throw ({msg: "login is incorrect", status: 403})
        }
        if (result[0].password !== password){
          throw ({msg: "Password is incorrect", status: 403})
        }
        if (result[0].password == password && result[0].login == login){

          let payload = { id: result[0].id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn:'15m'});
          let refreshToken = uuid()
          saveRefreshToken(result[0].id, refreshToken)
          res.status(200).json({user: result[0], token: token, refreshToken: refreshToken})
          return
        }

      } catch(err){
        res.send(err)
        return
      }
    })

  }

})
// LOGOUT
server.post("/auth/logout", passport.authenticate("jwt", {session: false}), function(req, res){
    const {refreshToken} = req.body
    deleteRefreshToken(refreshToken)
    res.status(200).json({msg: 'succes'})
    return

})
// Return renewed auth tiket witch user for system access (Authorization - required)
server.post("/auth/refreshToken", function (req, res){
    const { refreshToken } = req.body;
    const select = 'select * from refreshToken where refreshToken=?'
    connection.query(select, [refreshToken], function(err, result){
        if (err){
            res.status(500).json({err: err})
            return
        }
        if (result.length !== 0){
            deleteRefreshToken(refreshToken)
            let payload = { id: result[0].id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn:'15m'});
            const newRefreshToken = uuid()
            saveRefreshToken(result[0].users_id, newRefreshToken)
            res.json({msg: "ok", token: token, refreshToken: newRefreshToken})
            return
        }
    })
})

function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();

    return yy + '-' + mm + '-' + dd;
}

function saveRefreshToken(id, refreshToken){
    const insert = `insert into refreshToken (user_id, refreshToken) values ("${id}", "${refreshToken}")`
    connection.query(insert, function(err, result){

    })
}

function deleteRefreshToken(refreshToken){
    const deleteRefreshToken = 'delete from refreshToken where refreshToken=?'
    connection.query(deleteRefreshToken, [refreshToken], function(err, result){

    })
}

server.use(function(err, req, res, next) {
    if (err.status == 401){
        res.json({msg: "No Auth"})
    }
});

// server.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/user-system/index.html'))
// });

//server.listen(process.env.PORT || 8000);
server.listen(3001, function () {
    console.log('Example app listening on port 3001');
});

