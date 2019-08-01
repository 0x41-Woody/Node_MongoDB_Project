const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    console.log(result);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // Look up course
    // If not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with the id: ${req.params.id}, was not found`);

    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Update course
    course.name = req.body.name;
    // Return the update course
    res.send(course);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with the id: ${req.params.id}, was not found`);
    res.send(course);
});

router.delete('/:id', (req, res) => {
    // Look up course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(`The course with the id: ${req.params.id}, was not found`);

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return result = Joi.validate(course, schema);
}

module.exports = router;