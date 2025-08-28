import "@/css/components/create-task-form.scss";
import React from 'react';
import { Button, Input, Text } from 'zmp-ui';

interface CreateTaskFormProps {
    onAddTask: (task: { title: string; dueDate: string; priority: 'low' | 'medium' | 'high' }) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium');
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !dueDate) return;

        onAddTask({
            title: title.trim(),
            dueDate,
            priority
        });

        setTitle('');
        setDueDate('');
        setPriority('medium');
        setIsExpanded(false);
    };

    const priorityOptions = [
        { value: 'low', label: 'Low', icon: '🟢', color: '#059669' },
        { value: 'medium', label: 'Medium', icon: '🟡', color: '#d97706' },
        { value: 'high', label: 'High', icon: '🔴', color: '#dc2626' }
    ] as const;

    return (
        <div className="create-task-form">
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="add-task-trigger"
                >
                    <span className="trigger-icon">+</span>
                    <span className="trigger-text">Add new task</span>
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-header">
                        <Text size="large" className="form-title">New Task</Text>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="close-form-btn"
                        >
                            ×
                        </button>
                    </div>

                    <div className="form-field">
                        <label htmlFor="taskTitle" className="field-label">
                            Task Title <span className="required">*</span>
                        </label>
                        <Input
                            id="taskTitle"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What needs to be done?"
                            className="field-input"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="dueDate" className="field-label">
                            Due Date <span className="required">*</span>
                        </label>
                        <input
                            id="dueDate"
                            type="date"
                            className="field-input date-input"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <span className="field-label">Priority</span>
                        <div className="priority-selector">
                            {priorityOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className={`priority-option ${priority === option.value ? 'selected' : ''}`}
                                    style={{
                                        borderColor: priority === option.value ? option.color : 'transparent',
                                        backgroundColor: priority === option.value ? `${option.color}10` : 'transparent'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="priority"
                                        value={option.value}
                                        checked={priority === option.value}
                                        onChange={() => setPriority(option.value)}
                                        className="priority-radio"
                                    />
                                    <span className="priority-icon">{option.icon}</span>
                                    <span className="priority-label">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <Button
                            variant="secondary"
                            size="small"
                            onClick={() => setIsExpanded(false)}
                            className="cancel-btn"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            size="small"
                            disabled={!title.trim() || !dueDate}
                            className="add-btn"
                            onClick={handleSubmit}
                        >
                            <span>Add Task</span>
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CreateTaskForm;
