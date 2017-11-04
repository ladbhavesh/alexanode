

var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

var port = process.env.PORT || 8999;

var router = express.Router();

router.get('/', function (req, res) {

    res.json({ message: 'spellout is running!' });
    
});

router.route('/spell')
    .post(function (req, res) {
        var reqObj = req.body.request;

        console.log(req.body);

        var response = {
            version: "1.0",
            response: {
                outputSpeech: {
                    type: "SSML",
                    ssml: "<speak>Spelling of  " + reqObj.intent.slots.WORD.value + " is  <say-as interpret-as='spell-out'>" + reqObj.intent.slots.WORD.value +"</say-as></speak>"
                },
                shouldEndSession: true
            }
        };

        res.json(response);
    });

app.use('/api', router);

app.listen(port);
console.log('app is running on ' + port);

