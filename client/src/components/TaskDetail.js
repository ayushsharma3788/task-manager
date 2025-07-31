import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { FaEdit, FaArrowLeft, FaCalendar, FaClock } from 'react-icons/fa';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById } = useTasks();
  
  const task = getTaskById(id);

  if (!task) {
    return (
      <div style={{ padding: '20px 0' }}>
        <div className="card">
          <div className="text-center">
            <h3>Task not found</h3>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
            >
              <FaArrowLeft style={{ marginRight: '5px' }} />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'in-progress': return 'badge-progress';
      case 'completed': return 'badge-completed';
      default: return 'badge-pending';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'low': return 'badge-low';
      case 'medium': return 'badge-medium';
      case 'high': return 'badge-high';
      default: return 'badge-medium';
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="card-title">Task Details</h2>
            <div className="d-flex gap-2">
              <button
                onClick={() => navigate(`/tasks/${id}/edit`)}
                className="btn btn-primary"
              >
                <FaEdit style={{ marginRight: '5px' }} />
                Edit Task
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary"
              >
                <FaArrowLeft style={{ marginRight: '5px' }} />
                Back
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 0' }}>
          <div className="mb-4">
            <h3 style={{ marginBottom: '10px', color: '#333' }}>{task.title}</h3>
            {task.description && (
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                {task.description}
              </p>
            )}
          </div>

          <div className="d-flex gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
            <div>
              <strong>Status:</strong>
              <span className={`badge ${getStatusBadgeClass(task.status)}`} style={{ marginLeft: '8px' }}>
                {task.status}
              </span>
            </div>
            <div>
              <strong>Priority:</strong>
              <span className={`badge ${getPriorityBadgeClass(task.priority)}`} style={{ marginLeft: '8px' }}>
                {task.priority}
              </span>
            </div>
          </div>

          <div className="d-flex gap-4" style={{ flexWrap: 'wrap' }}>
            <div>
              <strong>Created:</strong>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <FaCalendar style={{ marginRight: '5px' }} />
                {new Date(task.createdAt).toLocaleDateString()} at {new Date(task.createdAt).toLocaleTimeString()}
              </p>
            </div>
            
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <div>
                <strong>Last Updated:</strong>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <FaClock style={{ marginRight: '5px' }} />
                  {new Date(task.updatedAt).toLocaleDateString()} at {new Date(task.updatedAt).toLocaleTimeString()}
                </p>
              </div>
            )}
            
            {task.dueDate && (
              <div>
                <strong>Due Date:</strong>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <FaCalendar style={{ marginRight: '5px' }} />
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail; 