const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl); 

//TESTING
app.get('/klef/test', async function(req, res){
    //res.send("Koneru Lakshmaiah Education Foundation");
    res.json("Koneru Lakshmaiah Education Foundation");
});

app.post('/klef/cse', async function(req, res){
    res.json(req.body);
    //res.json("Computer Science and Engineering");
});

//REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP21');
        users = db.collection('Users');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//LOGIN MODULE
app.post('/login/signin', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP21');
        users = db.collection('Users');
        data = await users.count(req.body);
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP21');
        users = db.collection('Users');
        data = await users.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/Menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP21');
        menu = db.collection('Menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/Menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP21');
        menus = db.collection('Menus');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP21');
        users = db.collection('Users');
        data = await users.updateOne({emailid : req.body.emailid}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/api/submitFeedback', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('SDP21');
        const feedbackCollection = db.collection('Feedbacks');

        const feedbackData = req.body;
        if (!feedbackData.name || !feedbackData.email || !feedbackData.rating || !feedbackData.suggestions) {
            return res.status(400).json("Missing required fields in the request");
        }

        await feedbackCollection.insertOne(feedbackData);
        conn.close();
        
        res.status(200).json("Feedback submitted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});
app.post('/api/reportIssue', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('SDP21'); 
        const issuesCollection = db.collection('Issues');

        const issueData = req.body;
        if (!issueData.issueDescription || !issueData.sessionID) {
            return res.status(400).json("Missing required fields in the request");
        }

        await issuesCollection.insertOne(issueData);
        conn.close();
        
        res.status(200).json("Issue reported successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

app.post('/myprofile/info', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('SDP21');
        const users = db.collection('Users');

        const userInfo = await users.find({ emailid: req.body.emailid }).toArray();
        
        conn.close();
        res.status(200).json(userInfo);
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});


