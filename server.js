var express = require('express');
var app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// mongodb://admin:node123@ds223343.mlab.com:23343/curso-node-batata
let mongoose = require('mongoose');
mongoose.connect(
    "mongodb://admin:node123@ds223343.mlab.com:23343/curso-node-batata",
    {useNewUrlParser: true}
);
let ToDo = require('./models/todo');

app.get('/', (req, res) => {
    res.send('Hello Word!!!!!');
});
app.get('/todo', (req, res) => {
    ToDo
        .find()
        .exec((err, todos) => {
            if(!err){
                res.json({success: true, message: "Todos buscados com sucesso", todos});
            }else{
                res.json({success: false, message: err.message, todos: []});
            }
        });
});
app.post('/todo', async(req, res) =>{
    try{
        let title = req.body.title;
        let newTodo = new ToDo({
            title: title
        });
        let savedTodo = await newTodo.save();
        res.json({success: true, message: "Sucesso", todo: savedTodo});
    } catch(err){
        res.json({success: false, message: err.message});
    }
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example listening on port ${port}`);
});

module.exports = app;