const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// port for app
const port = 3000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        //must be an array of objects
        members: [
            {
                email_address: email,
                status: "subscribed",
                //other fields to add to mail chimp
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/a8ca195d79",
        method: "POST",
        headers: {
            "Authorization": "travis11 3f12e234c9fe3e882feaa05b6fe0f5c1-us20"
        },
        body: jsonData
    };

    request(options, (error, response, body) =>{
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });


});


// faliure post route

app.post("/failure", (req, res) => {
    res.redirect("/");
});




app.listen(process.env.PORT || 3000, (req, res) =>{
    console.log(`The app is running on port ${port}.`);
});

// apiKey: 3f12e234c9fe3e882feaa05b6fe0f5c1-us20

// server: us20

// list id: a8ca195d79
