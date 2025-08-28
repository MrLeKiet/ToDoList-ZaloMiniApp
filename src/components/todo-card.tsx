import "@/css/components/todo-card.scss";
import type { TodoCard as TodoCardType } from '@/data/dummy-data';
import React from 'react';
import { Text } from "zmp-ui";

interface TodoCardProps {
    card: TodoCardType;
    onClick?: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ card, onClick }) => {
    const progressPercent = (card.completedTasks / card.totalTasks) * 100;
    const isCompleted = card.completedTasks === card.totalTasks;

    // Get priority indicator color
    const getPriorityColor = () => {
        const highPriorityTasks = card.tasks.filter(task => 
            task.priority === 'high' && !task.completed
        ).length;
        
        if (highPriorityTasks > 0) return '#ef4444';
        
        const mediumPriorityTasks = card.tasks.filter(task => 
            task.priority === 'medium' && !task.completed
        ).length;
        
        if (mediumPriorityTasks > 0) return '#f59e0b';
        return '#10b981';
    };

    return (
        <button
            className={`todo-card-container ${isCompleted ? 'completed' : ''}`}
            onClick={onClick}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            tabIndex={0}
        >
            <div className="card-content">
                {/* Priority indicator */}
                <div 
                    className="priority-indicator"
                    style={{ backgroundColor: getPriorityColor() }}
                />
                
                {/* Header */}
                <div className="card-header">
                    <Text size="large" className="card-title">
                        {card.title}
                    </Text>
                    
                    {isCompleted && (
                        <div className="completion-badge">
                            <span>✓</span>
                        </div>
                    )}
                </div>
                
                {/* Description */}
                {card.description && (
                    <Text size="small" className="card-description">
                        {card.description}
                    </Text>
                )}

                {/* Progress section */}
                <div className="progress-section">
                    <div className="progress-info">
                        <Text size="small" className="task-count">
                            {card.completedTasks}/{card.totalTasks} tasks
                        </Text>
                        <Text size="small" className="progress-percent">
                            {Math.round(progressPercent)}%
                        </Text>
                    </div>
                    
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar"
                            style={{ 
                                width: `${progressPercent}%`,
                                backgroundColor: isCompleted ? '#10b981' : getPriorityColor()
                            }}
                        />
                    </div>
                </div>

                {/* Due date if exists */}
                {card.dueDate && (
                    <div className="due-date">
                        <Text size="xSmall" className="due-date-text">
                            Due: {new Date(card.dueDate).toLocaleDateString()}
                        </Text>
                    </div>
                )}
            </div>
        </button>
    );
};

export default TodoCard;
