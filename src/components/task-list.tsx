import type { Task } from '@/data/dummy-data';
import React from 'react';
import { Text } from 'zmp-ui';
import TaskItem from './task-item';

interface TaskListProps {
    date: string;
    tasks: Array<Task & { cardTitle: string; cardColor?: string }>;
    onTaskToggle: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ date, tasks, onTaskToggle }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Group tasks by priority
    const groupedTasks = {
        high: tasks.filter(t => t.priority === 'high'),
        medium: tasks.filter(t => t.priority === 'medium'),
        low: tasks.filter(t => t.priority === 'low')
    };

    return (
        <div className="space-y-4">
            <Text.Title>{formattedDate}</Text.Title>

            {Object.entries(groupedTasks).map(([priority, priorityTasks]) => {
                if (priorityTasks.length === 0) return null;

                let priorityColorClass = '';
                if (priority === 'high') {
                    priorityColorClass = 'text-red-600';
                } else if (priority === 'medium') {
                    priorityColorClass = 'text-yellow-600';
                } else {
                    priorityColorClass = 'text-blue-600';
                }

                return (
                    <div key={priority} className="space-y-2">
                        <Text 
                            className={`font-medium ${priorityColorClass}`}
                        >
                            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                        </Text>
                        
                        {priorityTasks.map(task => (
                            <div key={task.id} className="space-y-1">
                                <Text size="xSmall" className="text-gray-500">
                                    {task.cardTitle}
                                </Text>
                                <TaskItem
                                    task={task}
                                    onToggle={onTaskToggle}
                                />
                            </div>
                        ))}
                    </div>
                );
            })}

            {tasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No tasks scheduled for this date
                </div>
            )}
        </div>
    );
};

export default TaskList;
