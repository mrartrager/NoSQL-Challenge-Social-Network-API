const express = require('express');
const db = require('./config/connection')
const routes = require ('./routes')

const PORT = 5001;
const app = express();

app.use (express.urlencoded({extened: true}));
app.use(express.json());
app.use(routes);

db.once('open', ()=>{
    app.listen(PORT, () =>{
        console.log(`Woohoo API server running on port ${PORT}!`);
    })
})
