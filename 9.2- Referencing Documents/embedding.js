const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId }, {
    // unset
    $set: {
      'author.name': 'John Smith'
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  course.authors.id(authorId).remove();
  course.save();
}

addAuthor('5d439d6d1593ea071def65a4', new Author({ name: 'Steve' }));

removeAuthor('5d439d6d1593ea071def65a4','5d439d6d1593ea071def65a3');

//updateAuthor('5d432f6fc7fa384340c3bde0');
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Mosh' })
// ]);
