import React from 'react';
import { Course } from '../types';
import CourseItem from './CourseItem';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onEdit, onDelete }) => {
  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseItem
              key={course._id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p>No courses found. Please add a new course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;

