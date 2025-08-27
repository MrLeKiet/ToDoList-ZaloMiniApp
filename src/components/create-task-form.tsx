import React from 'react';
import { Button, Input } from 'zmp-ui';

interface CreateTaskFormProps {
    onAddTask: (task: { title: string; dueDate: string; priority: 'low' | 'medium' | 'high' }) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAddTask({
            title: title.trim(),
            dueDate,
            priority
        });

        setTitle('');
        setDueDate('');
        setPriority('medium');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                </label>
                <Input
                    id="taskTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                />
            </div>

            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                </label>
                <input
                    id="dueDate"
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                </label>
                <input type="hidden" id="priority" value={priority} />
                <div className="flex space-x-2">
                    {(['low', 'medium', 'high'] as const).map((p) => (
                        <Button
                            key={p}
                            size="small"
                            variant={priority === p ? 'primary' : 'secondary'}
                            onClick={() => setPriority(p)}
                            className="capitalize"
                        >
                            {p}
                        </Button>
                    ))}
                </div>
            </div>

            <Button variant="primary" fullWidth onClick={handleSubmit}>
                Add Task
            </Button>
        </form>
    );
};

export default CreateTaskForm;
