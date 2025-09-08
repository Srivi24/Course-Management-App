import React, { useState, useEffect } from 'react';
import { Course } from './types';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import * as courseService from './services/courseService';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const fetchedCourses = await courseService.getAllCourses();
        setCourses(fetchedCourses);
        setError(null);
      } catch (err) {
        setError('Failed to fetch courses. Please make sure the server is running.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };
  
  const handleSaveCourse = async (courseData: Omit<Course, '_id'>) => {
    try {
      if (editingCourse) {
        const updatedCourse = await courseService.updateCourse(editingCourse._id, courseData);
        setCourses(courses.map(c => c._id === editingCourse._id ? updatedCourse : c));
      } else {
        const newCourse = await courseService.createCourse(courseData);
        setCourses([newCourse, ...courses]);
      }
      handleCloseModal();
    } catch (err) {
      setError('Failed to save course.');
      console.error(err);
    }
  };
  
  const handleDeleteCourse = async (id: string) => {
    try {
      await courseService.deleteCourse(id);
      setCourses(courses.filter(c => c._id !== id));
    } catch (err) {
      setError('Failed to delete course.');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Course Management Dashboard</h1>
      </header>
      <main>
        <div className="toolbar">
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            + Add New Course
          </button>
        </div>
        
        <CourseForm 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveCourse} 
          editingCourse={editingCourse}
        />

        {error && <p className="error-message">{error}</p>}
        {isLoading ? (
          <p>Loading courses...</p>
        ) : (
          <CourseList
            courses={courses}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteCourse}
          />
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 iamironlady.com Screening Project</p>
      </footer>
    </div>
  );
}

export default App;

