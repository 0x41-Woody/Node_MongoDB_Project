const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

//Get all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find()
        .sort('name');
    res.send(genres);
});

//Create new genre
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    var genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});

//Update genre
router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if(!genre) return res.status(404).send(`Course with the id: ${req.params.id}, does not exist`)

    res.send(genre);
});

//Delete genre
router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send(`Course with the id: ${req.params.id}, does not exist`);

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send(`Genre with the id: ${req.params.id}, does not exist`);

    res.send(genre);
});

module.exports = router;