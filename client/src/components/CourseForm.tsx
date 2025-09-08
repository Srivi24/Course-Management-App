import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import * as courseService from '../services/courseService';

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Omit<Course, '_id'>) => void;
  editingCourse: Course | null;
}

const CourseForm: React.FC<CourseFormProps> = ({ isOpen, onClose, onSave, editingCourse }) => {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [formError, setFormError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title);
      setInstructor(editingCourse.instructor);
      setDescription(editingCourse.description || '');
      setDuration(editingCourse.duration.toString());
    } else {
      setTitle('');
      setInstructor('');
      setDescription('');
      setDuration('');
    }
    setFormError('');
  }, [editingCourse, isOpen]);

  const handleGenerateDescription = async () => {
    if (!title || !instructor) {
        setFormError('Please enter a Title and Instructor first.');
        return;
    }
    setIsGenerating(true);
    setFormError('');
    try {
        const result = await courseService.generateDescriptionAI(title, instructor);
        setDescription(result.description);
    } catch (error) {
        setFormError('Failed to generate description.');
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !instructor || !duration) {
      setFormError('Title, Instructor, and Duration are required.');
      return;
    }
    onSave({ title, instructor, description, duration: parseInt(duration, 10) });
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingCourse ? 'Edit Course' : 'Add a New Course'}</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="course-form">
          {formError && <p className="error-message form-error">{formError}</p>}
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Advanced React" required />
          </div>
          <div className="form-group">
            <label htmlFor="instructor">Instructor</label>
            <input type="text" id="instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="e.g., Jane Doe" required />
          </div>
          <div className="form-group">
            <div className="label-with-action">
              <label htmlFor="description">Description</label>
              <button type="button" className="btn-ai" onClick={handleGenerateDescription} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : '✨ Generate with AI'}
              </button>
            </div>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe the course content" rows={4}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (hours)</label>
            <input type="number" id="duration" value={duration} min={1} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 40" required />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingCourse ? 'Update Course' : 'Add Course'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;

