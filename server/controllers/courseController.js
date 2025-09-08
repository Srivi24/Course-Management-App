const Course = require('../models/Course');
const axios = require('axios');


// @desc    Get all courses
// @route   GET /api/courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 }); // Get all, sorted by newest
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, instructor, description, duration } = req.body;

    // Basic validation
    if (!title || !instructor || !duration) {
      return res.status(400).json({ message: 'Please provide title, instructor, and duration.' });
    }

    const newCourse = new Course({
      title,
      instructor,
      description,
      duration
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse); // 201 status for successful creation
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an existing course
// @route   PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const course = await Course.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true // Ensure the update follows schema rules
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(444).json({ message: 'Course not found.' });
    }

    res.status(200).json({ message: 'Course deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// GENERATE course description using AI
const generateCourseDescription = async (req, res) => {
  const { title, instructor } = req.body;

  if (!title || !instructor) {
    return res.status(400).json({ message: 'Title and instructor are required to generate a description.' });
  }

  const prompt = `Generate a concise and professional course description for a course titled "${title}" taught by "${instructor}". The description should be engaging for prospective students and cover the key topics they might expect to learn. Do not use markdown or special formatting. And the content should short and crisp, do not go over 1 short paragraph.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ message: 'AI API key not found.' });
    }
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const response = await axios.post(apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    const generatedText = response.data.candidates[0].content.parts[0].text;
    res.status(200).json({ description: generatedText.trim() });

  } catch (error) {
    console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to generate AI description.' });
  }
};


// Export all the controller functions
module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  generateCourseDescription,
};
