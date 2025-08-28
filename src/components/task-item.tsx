import "@/css/components/task-item.scss";
import type { Task } from '@/data/dummy-data';
import React from 'react';
import { Checkbox, Text } from "zmp-ui";

interface TaskItemProps {
    task: Task;
    onToggle?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
    const priorityConfig = {
        high: { 
            color: '#dc2626', 
            bg: '#fef2f2', 
            label: 'High',
            icon: '🔴'
        },
        medium: { 
            color: '#d97706', 
            bg: '#fef3c7', 
            label: 'Medium',
            icon: '🟡'
        },
        low: { 
            color: '#059669', 
            bg: '#d1fae5', 
            label: 'Low',
            icon: '🟢'
        }
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
    const isDueToday = task.dueDate === new Date().toISOString().split('T')[0];

    // Helper functions for cleaner JSX
    const getDueDateIcon = () => {
        if (isOverdue) return '⚠️';
        if (isDueToday) return '📅';
        return '📆';
    };

    const getDueDateText = () => {
        if (isOverdue) return 'Overdue';
        if (isDueToday) return 'Today';
        return new Date(task.dueDate!).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <div className={`task-item-container ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
            <div className="task-checkbox">
                <Checkbox
                    checked={task.completed}
                    value={task.id}
                    onChange={() => onToggle?.(task.id)}
                />
            </div>
            
            <div className="task-content">
                <div className="task-header">
                    <Text 
                        className={`task-title ${task.completed ? 'completed-text' : ''}`}
                    >
                        {task.title}
                    </Text>
                    
                    <div className="task-badges">
                        {/* Priority badge */}
                        <span 
                            className="priority-badge"
                            style={{ 
                                color: priorityConfig[task.priority].color,
                                backgroundColor: priorityConfig[task.priority].bg
                            }}
                        >
                            <span className="priority-icon">
                                {priorityConfig[task.priority].icon}
                            </span>
                            {priorityConfig[task.priority].label}
                        </span>
                        
                        {/* Due date badge */}
                        {task.dueDate && (
                            <span className={`due-badge ${isDueToday ? 'due-today' : ''} ${isOverdue ? 'overdue' : ''}`}>
                                {getDueDateIcon()}
                                {getDueDateText()}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
