export interface Course {
  _id: string;
  title: string;
  instructor: string;
  description: string;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}
