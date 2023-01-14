const express = require('express');
const db = require('./') // will be ./config/connection just havent created file path yet
const routes = require ('./') //will be ./routes just havent created file path yet

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
