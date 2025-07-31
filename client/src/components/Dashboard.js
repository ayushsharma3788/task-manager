import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilter } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const { tasks, loading, error, deleteTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="card-title">My Tasks</h2>
            <Link to="/tasks/new" className="btn btn-primary">
              <FaPlus style={{ marginRight: '5px' }} />
              New Task
            </Link>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="d-flex gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
          <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
            <label htmlFor="filter">Filter by Status</label>
            <select
              id="filter"
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
            <label htmlFor="sortBy">Sort by</label>
            <select
              id="sortBy"
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Date Created</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>

        {sortedTasks.length === 0 ? (
          <div className="text-center" style={{ padding: '40px 0' }}>
            <p style={{ fontSize: '18px', color: '#666' }}>
              {filter === 'all' ? 'No tasks yet. Create your first task!' : `No ${filter} tasks.`}
            </p>
            {filter === 'all' && (
              <Link to="/tasks/new" className="btn btn-primary">
                <FaPlus style={{ marginRight: '5px' }} />
                Create First Task
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {sortedTasks.map(task => (
              <div key={task._id} className="card" style={{ margin: 0 }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                    {task.title}
                  </h3>
                  <div className="d-flex gap-1">
                    <Link to={`/tasks/${task._id}`} className="btn btn-secondary" style={{ padding: '5px 8px' }}>
                      <FaEye />
                    </Link>
                    <Link to={`/tasks/${task._id}/edit`} className="btn btn-primary" style={{ padding: '5px 8px' }}>
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn btn-danger"
                      style={{ padding: '5px 8px' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p style={{ color: '#666', marginBottom: '10px', fontSize: '14px' }}>
                    {task.description}
                  </p>
                )}

                <div className="d-flex gap-2 mb-2">
                  <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>

                {task.dueDate && (
                  <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 