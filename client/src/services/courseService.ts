import axios from 'axios';
import { Course } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/courses';

export const getAllCourses = async (): Promise<Course[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCourse = async (courseData: Omit<Course, '_id'>): Promise<Course> => {
  const response = await axios.post(API_URL, courseData);
  return response.data;
};

export const updateCourse = async (id: string, courseData: Partial<Course>): Promise<Course> => {
  const response = await axios.put(`${API_URL}/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const generateDescriptionAI = async (title: string, instructor: string): Promise<{ description: string }> => {
  const response = await axios.post(`${API_URL}/generate-description`, { title, instructor });
  return response.data;
};
