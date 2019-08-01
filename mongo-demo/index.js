const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
                //do some async work
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v) 
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8,
    });
    
    try {
      const result = await course.save();
      console.log(result);
    }catch (err) {
        for (field in err.errors)
            console.error(err.errors[field].message);
    }
    
}

async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in
    //nin (not in)

    //or
    //and

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        // .find({ price: { $gte: 10, $lte: 20 } })
        //.find({ price: { $in: [10, 15, 20] } })

        // .find()
        // .or([ { author: 'Mosh' }, { isPublished: true } ])

        // .find({ author: /^Mosh/ })
        // .find({ author: /Hamedani$/i })
        //.find({ author: /.*Mosh.*/ })
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        .count();
    console.log(courses);
}
//getCourses();

async function updateCourse(id) {
    // Approach: Query first
    // findById()
    // Mod property
    // save()
    // const course = await Course.findById(id);
    // if(!course) {console.log('OOPS');return;}
    // // course.isPublished = true;
    // // course.author = 'Another Author';
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });
    // const result = await course.save();
    // console.log(result);
    // Approach: Update first
    // Update directly
    // Optionally: get the updated doc
    const course = await Course.update(id);

}
// updateCourse('5d2ffd999aa6fa7338296b26');
createCourse();

