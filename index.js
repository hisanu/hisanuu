const express=require('express');
const app=express();
const cors = require('cors');
const {MongoClient} = require('mongodb');

let user =[]
let db='';

async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
   ;
 }
 
 
app.use(cors())
app.use(express.json())


app.get('/users', async function (req, res) {
    let output = await db.collection('user').find({}).toArray();
    res.json(output);
});

app.post('/reg', async function(req, res) {
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);
    user.push(output)
})
app.post('/log', async function(req, res) {
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);
    if(output.length==0){
        res.json('email not found')
    }
    else{
        if(output[0].password==req.body.password){
            return res.json(output[0])
    
        }
        return res.json('password not matched')
    }
    
})
app.listen(5000,function(){
    console.log('server is ready,listening on port 5000 ');
    mongoConnect();
})





// app.get('/users',function(req,res){
//     res.json(user)
// })



// app.post('/reg',function(req,res){
//     console.log(req.body);
//     for(let i=0;i<user.length;i++){
//         if(user[i].email==req.body.email){
//             if(user[i].password==req.body.password){
//                 return res.json(user[i]);
//             }
//         }
//     }
//     return res.json("email not found")
// })



