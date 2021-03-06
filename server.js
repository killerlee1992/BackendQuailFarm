const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cageRoutes = express.Router();
const PORT = 4000;

let Cage = require('./cage.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/quailfarm', { useNewUrlParser: true },{ useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

cageRoutes.route('/').get(function(req, res) {
    Cage.find(function(err, cages) {
        if (err) {
            console.log(err);
        } else {
            res.json(cages);
        }
    });
});

cageRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Cage.findById(id, function(err, cage) {
        res.json(cage);
    });
});

cageRoutes.route('/update/:id').post(function(req, res) {
    Cage.findById(req.params.id, function(err, cage) {
        if (!cage)
            res.status(404).send("data is not found");
        else
            cage.cage_name = req.body.cage_name;
            cage.cage_hen = req.body.cage_hen;
            cage.cage_roo = req.body.cage_roo;
            cage.cage_total = req.body.cage_total;
    

            cage.save().then(cage => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

cageRoutes.route('/add').post(function(req, res) {
    let cage = new Cage(req.body);
    cage.save()
        .then(cage => {
            res.status(200).json({'cage': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/cages', cageRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});