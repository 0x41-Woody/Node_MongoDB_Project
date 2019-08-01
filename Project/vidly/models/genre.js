const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new  mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().required(),
    };
    return result = Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;