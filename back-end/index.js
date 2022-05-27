const experess = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { query } = require('express');
const app = experess();


app.use(cors());
app.use(bodyParser.json());


// connection à la base de donnée
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nico_1234',
    database:'claim_db',
    port:'3306'
});

// verification de la connexion
db.connect(err=>{
    if(err){console.log(err,"une erreur s'est produit lors de la connection..");}
    else{console.log("La base de donnée est connectée..");}

});


// récupérer les données
app.get("/country",(req,res)=>{
    let query = "select * from country";
    db.query(query,(err,result)=>{
        if(err){
            console.log(err,"error");
        }
        if(result){
            res.send({
                message:'Les pays',
                data:result
            });
        }
        
    });
});

app.get("/member",(req,res)=>{
    let query = "select * from member";

    db.query(query,(err, result)=>{
        if(err){
            console.log(err,"error");
        }
        if(result){
            res.send({
                message:'Les informations des membres',
                data: result
            });
        }
    });
})


app.get("/claim", (req,res)=>{
    let query = "select * from claim "
    db.query(query,(err,result)=>{
        if(err){
            console.log(err,"error");
        }
        if(result){
            res.send({
                message: 'Les reclamation',
                data: result
            });
        }
    });
})

// Ajouter des données

app.post("/country", (req,res)=>{
    let ctry_name = req.body.name_country;
    let desc = req.body.description;

    let query = `insert into country(name_country,description) values ('${ctry_name}','${desc}')`;
    db.query(query,(err, result)=>{
        if(err){
            console.log(err,'error');
        }
        console.log(result)
            res.send({
                message:'Insertion réuissi '
            });
    });
})

app.post("/member", (req,res)=>{
    let fname = req.body.firstName;
    let lname = req.body.lastName;
    let birthdate = req.body.birthdate;
    let description = req.body.description;
    let code_country = req.body.code_country;
    let query = `insert into member(firstName,lastName,birthdate,description,code_country) 
    values(
        '${fname}',
        '${lname}',
        '${birthdate}',
        '${description})',
        ${code_country})`;
    db.query(query,(err, result)=>{
        if(err){
            console.log(err,'error');
        }
        console.log(result)
            res.send({
                message:'Insertion réuissi '
            });
    });
})

app.post("/claim",(req,res)=>{
    let code_member = req.body.code_member;
    let date_amount = req.body.date;
    let amount = req.body.amount;

    let query = `insert into claim(amount,date,code_member) values(${amount},'${date_amount}',${code_member})`;
    
    db.query(query,(err,result)=>{
        if(err){
            console.log(err,"error");
        }
        res.send({
            message:'Insertion réuissi'
        })
    })
})

app.listen(3000,()=>{
    console.log('app run on port 3000')
})