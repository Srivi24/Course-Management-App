import React from 'react';
import { Course } from '../types';

interface CourseItemProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onEdit, onDelete }) => {
  return (
    <div className="course-card">
      <div className="card-header">
        <h3>{course.title}</h3>
        <p className="instructor">by {course.instructor}</p>
      </div>
      <div className="card-body">
        <p>{course.description || 'No description available.'}</p>
      </div>
      <div className="card-footer">
        <span className="duration">{course.duration} hours</span>
        <div className="card-actions">
          <button className="btn btn-edit" onClick={() => onEdit(course)}>Edit</button>
          <button className="btn btn-delete" onClick={() => onDelete(course._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;

