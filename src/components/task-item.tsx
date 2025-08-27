import type { Task } from '@/data/dummy-data';
import React from 'react';
import { Checkbox, Text } from "zmp-ui";

interface TaskItemProps {
    task: Task;
    onToggle?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
    const priorityColors = {
        low: 'bg-blue-100 text-blue-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm flex items-center space-x-3">
            <Checkbox
                checked={task.completed}
                value={task.id}
                onChange={() => onToggle?.(task.id)}
            />
            
            <div className="flex-1">
                <Text 
                    className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}
                >
                    {task.title}
                </Text>
                
                {task.dueDate && (
                    <Text size="xSmall" className="text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Text>
                )}
            </div>

            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
            </span>
        </div>
    );
};

export default TaskItem;
