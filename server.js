const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
// simulate network delay
app.use((req, res, next) => setTimeout(next, Math.random() * 1000 + 500));
// simulate unstable backend
app.use((req, res, next) => {
    if (Math.random() < 0.2) {
        res.status(500).send();
    } else {
        next();
    }
});

let id = 1;
let items = [];

app.get('/', (req, res) => res.send('Hello World!'));

// item list
app.get('/items', (req, res) => res.json({items}));

// item detail
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);

    res.json({item});
});

// add item
app.post('/items', (req, res) => {
    const item = {
        ...req.body,
        id: id++,
    };
    items.push(item);
    res.json({item});
});

// update item
app.post('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedItem = {
        ...req.body,
        id,
    };
    items = items.map(item => (item.id === id ? updatedItem : item));
    res.json({
        item: updatedItem,
    });
});

// remove item
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    items = items.filter(item => item.id !== id);
    res.send();
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));
