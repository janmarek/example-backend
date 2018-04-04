const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let id = 1;
let contacts = [];

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/contacts', (req, res) => res.json({contacts}));

app.get('/contacts/:id', (req, res) => {
    const arr = contacts.filter(c => c.id == req.params.id);

    res.json({contact: arr.length > 0 ? arr[0] : null});
});

app.post('/contacts', (req, res) => {
    const newContact = {
        ...req.body,
        id: id++,
    };
    contacts.push(newContact);
    res.json({
        contact: newContact,
    });
});

app.post('/contacts/:id', (req, res) => {
    const newContact = {
        ...req.body,
        id,
    };
    contacts = contacts.map(c => c.id == req.params.id ? newContact : c);
    res.json({
        contact: newContact,
    });
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));
