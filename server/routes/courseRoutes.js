const express = require('express');
const router = express.Router();

const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  generateCourseDescription
} = require('../controllers/courseController');


// Route for GETting all courses and POSTing a new course
router.route('/')
  .get(getCourses)
  .post(createCourse);

// Route for PUTting (updating) and DELETEing a specific course by its ID
router.route('/:id')
  .put(updateCourse)
  .delete(deleteCourse);

router.post('/generate-description', generateCourseDescription);


module.exports = router;
