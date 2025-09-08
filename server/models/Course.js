const mongoose = require('mongoose');

// Define the schema for the Course model
// This structure will be enforced by the database
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title.'],
    trim: true
  },
  instructor: {
    type: String,
    required: [true, 'Please provide an instructor name.'],
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  duration: {
    type: Number,
    required: [true, 'Please provide the course duration in hours.']
  }
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true
});

// Create and export the Course model based on the schema
// Mongoose will create a 'courses' collection in the database
module.exports = mongoose.model('Course', courseSchema);
