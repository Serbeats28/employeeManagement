let express = require('express')
let mysql = require('mysql')
let cors = require('cors')
let multer = require('multer')
let path = require('path')
let jwt = require("jsonwebtoken")
let cookieParser = require("cookie-parser")





let app = express()
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["POST, GET"],
        credentials:true
    }
))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))


let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:"java_test"
})

let storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null,'public/images')
    },
    filename:(req, file, cb)=>{
      cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))  
    }

})
let uploaded = multer({
    storage:storage
})

app.post('/react/store',uploaded.single('avatar'),(req, res) =>{
    let email = req.body.email
    let Fname = req.body.first_name
    let Lname = req.body.last_name
    let position = req.body.position
    let salary = req.body.salary
    let avatar = req.file.filename

    let validate = `SELECT * FROM tblemployee WHERE email = '${email}'`;
     con.query(validate,(err, checking) => {
        if(err) return res.json({Status:"Error", Message:"Server not running"})
        if(checking.length > 0){
            return res.json({Status:"error", Message:"Employee is already added"})
        }else{      
        const sql = `INSERT INTO tblemployee(email, first_name, last_name, position, salary, avatar)
        VALUES('${email}', '${Fname}', '${Lname}', '${position}','${salary}', '${avatar}')`;
        con.query(sql,(err, result) =>{
        if(err) return res.json({Status:"Error", Error:"Server not running"})
        if(result) return res.json({Status:"success", Message:"Inserted Successfully"})
        })
        }
     })
})

app.get('/react/getData', (req, res)=>{
    let sql = `SELECT * FROM tblemployee`;
    con.query(sql,(err, result)=>{
        if(err) return res.json({Status:"Error", Message:"Server not running"})
        if(result) return res.json({Status:"success", Result:result})
    })
})


app.get('/react/getEmp/:id',(req, res)=>{
    let id = req.params.id
      let sql = `SELECT * FROM tblemployee WHERE id = '${id}'`
      con.query(sql,(err, result)=>{
        if(err)return res.json({Status:"Error", Message:"Server is not running"})
        if(result.length > 0){
            return res.json({Status:'success', result:result})
        }else{
            return res.json({Status:"Error", Message:"Employee not found"})
        }
      })
})


app.post('/react/UpdateEmp',(req, res)=>{
    let id = req.body.id;
    let email = req.body.email;
    let Fname = req.body.first_name;
    let Lname = req.body.last_name;
    let position = req.body.position;

      let sql = `UPDATE tblemployee SET email = '${email}', first_name = '${Fname}', last_name = '${Lname}',
       position = '${position}' WHERE id = '${id}'`;
   con.query(sql,(err, result)=>{
     if(err) return res.json({Status:"Error", Message:"Server not running"})
     if(result) return res.json({Status:"success", Message:"Updated successfully"})
   })
})


app.post('/react/delData',(req,res)=>{
   let id = req.body.userID
    let sql = `DELETE FROM tblemployee WHERE id ='${id}'`;
    con.query(sql,(err, result)=>{
        if(err) return res.json({Status:"Error", Message:"Server not running"})
        if(result)return res.json({Status:"success", Message:"Deleted Successfully"})
    })
})

app.post('/react/login',(req, res) =>{
   let username = req.body.username;
   let password = req.body.password;
     let sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
     con.query(sql,(err, result)=>{
        if(err)return res.json({Status:"Error", Message:"server not running"});
        if(result.length > 0){
            let id = result[0].id
            let token = jwt.sign({id}, "jwt-secret-key", {expiresIn:'1d'})
            res.cookie("token", token)
            return res.json({Status:"success"})
        }else{
            return res.json({Status:"error", Message:"Wrong Credentials"});
        }
     })

})

let verifyUser = (req, res, next) =>{
    let token = req.cookies.token;
    if(!token){
        return res.json({Error:"Your not authenticated"})
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded)=>{
            if(err) return res.json({Error:"wrong token"})
            next()
        })
    }
}

app.get('/react/home', verifyUser,(req, res)=>{
    return res.json({Status:"success"})
})

app.get('/react/logout',(req,res)=>{
    res.clearCookie("token");
    return res.json({Status:"success"})
})

let imgStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,('public/adminImg'));
    },
    filename:(req, file, cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

let imgUp = multer({
    storage:imgStorage
})

app.post('/react/imageStore',imgUp.single('profile'),(req, res)=>{
   let id = req.body.admin_id;
   let profile = req.file.filename
    let sql = `UPDATE user SET picture = '${profile}' WHERE id='${id}'`;
    con.query(sql,(err, result)=>{
        if(err) return res.json({Status:"Error", Message:"Server not running"})
        if(result) return res.json({Status:"success", Message:"Profile Picture updated successfully"})
    })
   
})


app.get('/react/Admin_info',(req, res)=>{
    let sql = `SELECT * FROM user`;
    con.query(sql,(err, result)=>{
        if(err) return res.json({Status:"Error", Message:"Server not running"})
        if(result) return res.json({Status:"success", result:result})
    })
})


app.get('/react/upadateInfo/:id', (req,res)=>{
    let adminID = req.params.id
    let sql = `Select * from user Where id = ${adminID}`;

       con.query(sql, (err, result)=>{
          if(err) return res.json({Status:"error", Message:"Error in server"});
          if(result) return res.json({Status:"Success", result:result});
       })
})


app.post('/react/updateData', (req, res)=>{
    let id = req.body.id;
    let Username = req.body.Username;
    let Fname = req.body.firstName;
    let Lname = req.body.lastName;
    let number = req.body.contact_number;

     let sql = `UPDATE user SET username = '${Username}', Fname = '${Fname}', Lname = '${Lname}',
     number = '${number}' WHERE id = '${id}'`;
     con.query(sql, (err, result)=>{
        if(err) return res.json({Status:"error", Message:"Error in Server"});
        if(result) return res.json({Status:"success",Message:"Updated Successfully"});
     })
})


app.get('/react/getID/:id',(req, res)=>{
    let id = req.params.id
    return res.json({id:id})
})

app.post('/react/updatePass',(req, res)=>{
    let id = req.body.admin_id
    let oldPass = req.body.oldPass
    let newPass = req.body.newPass

    let sql1 = `Select password from user Where id = '${id}' And password = '${oldPass}'`;
    con.query(sql1,(err, result)=>{
        if(err) return res.json({Status:"error", Message:"error in server"});
        if(result.length > 0){
            let sql2 = `Update user set password = '${newPass}' Where id = '${id}'`;
             con.query(sql2, (err, result2)=>{
               if(err) return res.json({Status:"error", Message:"Wrong query"});
               if(result2) return res.json({Status1:"success1", Message1:"Password updated successfully"});
             })
        }else{
           return res.json({Status:"success", Message:"Old Password is incorrect"})
        }
    })
})


app.get('/react/getAdminTotal',(req, res)=>{
    let sql = `SELECT Count(*) as adminCount from user`;
    con.query(sql,(err, result)=>{
        if(err) return res.json({Status:"error",Message:"error in server"});
        let adminCount = result[0].adminCount
        if(result) return res.json({Status:"success", result:adminCount})

    })
})


app.get('/react/getEmployeeTotal',(req, res)=>{
    let sql = `SELECT Count(*) as EmpTotal From tblemployee`;
     con.query(sql, (err, result)=>{
        if(err) return res.json({Status:"error", Message:"error in server"});
        let empTotal = result[0].EmpTotal;
        if(result) return res.json({Status:"success", result:empTotal});
     })
});


app.get('/react/data',(req,res)=>{
    let sql = `Select * from tblemployee`;
      con.query(sql,(err, result)=>{
        if(err) return res.json({Status:"error", Message:"error in server"});
        if(result) return res.json({Status:"success", result:result});
      });
});


app.get('/react/details/:id', (req, res)=>{
    let id = req.params.id;
      let sql = `Select *from tblemployee Where id = '${id}'`;
      con.query(sql,(err, result)=>{
        if(err) return res.json({Status:"error", Message:"error in server"});
        if(result) return res.json({Status:"success", result:result});
      });
});

con.connect((err)=>{
    if(err)throw err;
    console.log('connection successfully');
})

app.listen(8080, ()=>{
    console.log('the port is 8080');
})