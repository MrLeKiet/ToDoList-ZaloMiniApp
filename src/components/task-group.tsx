import type { Task } from '@/data/dummy-data';
import React from 'react';
import { Text } from 'zmp-ui';
import TaskItem from './task-item';

interface TaskGroupProps {
    title: string;
    tasks: Array<Task & { cardTitle: string; cardColor?: string }>;
    onTaskToggle: (taskId: string) => void;
    filter: 'all' | 'completed' | 'pending';
}

const TaskGroup: React.FC<TaskGroupProps> = ({ title, tasks, onTaskToggle, filter }) => {
    const filteredTasks = React.useMemo(() => {
        switch (filter) {
            case 'completed':
                return tasks.filter(t => t.completed);
            case 'pending':
                return tasks.filter(t => !t.completed);
            default:
                return tasks;
        }
    }, [tasks, filter]);

    if (filteredTasks.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Text.Title size="small">{title}</Text.Title>
                <Text size="small" className="text-gray-500">
                    {filteredTasks.length} tasks
                </Text>
            </div>

            <div className="space-y-2">
                {filteredTasks.map(task => (
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
        </div>
    );
};

export default TaskGroup;
