import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setError('');
      const response = await axios.post('/api/tasks', taskData);
      setTasks(prevTasks => [response.data, ...prevTasks]);
      return { success: true, task: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      setError(message);
      return { success: false, error: message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setError('');
      const response = await axios.put(`/api/tasks/${id}`, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === id ? response.data : task
        )
      );
      return { success: true, task: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      setError(message);
      return { success: false, error: message };
    }
  };

  const deleteTask = async (id) => {
    try {
      setError('');
      await axios.delete(`/api/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      setError(message);
      return { success: false, error: message };
    }
  };

  const getTaskById = (id) => {
    return tasks.find(task => task._id === id);
  };

  const clearError = () => {
    setError('');
  };

  const value = {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    fetchTasks,
    clearError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}; 