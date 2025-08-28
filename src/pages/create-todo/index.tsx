import CreateTaskForm from "@/components/create-task-form";
import Header from "@/components/header";
import "@/css/layout.scss";
import "@/css/pages/create-todo.scss";
import useTodoStore from "@/data/store";
import React from "react";
import { Button, Input, Page, Text, useNavigate } from "zmp-ui";

const CreateTodoPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [color, setColor] = React.useState('#667eea');
    const [tasks, setTasks] = React.useState<Array<{
        title: string;
        dueDate: string;
        priority: 'low' | 'medium' | 'high';
        completed: boolean;
    }>>([]);

    const addCard = useTodoStore(state => state.addCard);

    const handleAddTask = (task: { title: string; dueDate: string; priority: 'low' | 'medium' | 'high' }) => {
        setTasks([...tasks, { ...task, completed: false }]);
    };

    const handleRemoveTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleCreateTodo = () => {
        if (!title.trim() || tasks.length === 0) return;

        addCard({
            title: title.trim(),
            description: description.trim(),
            tasks: tasks.map(task => ({
                ...task,
                id: crypto.randomUUID()
            })),
            color,
        });

        navigate('/');
    };

    const colors = [
        { color: '#667eea', name: 'Purple' },
        { color: '#764ba2', name: 'Violet' },
        { color: '#f093fb', name: 'Pink' },
        { color: '#4facfe', name: 'Blue' },
        { color: '#43e97b', name: 'Green' },
        { color: '#fa709a', name: 'Rose' },
        { color: '#ffecd2', name: 'Peach' },
        { color: '#a8edea', name: 'Mint' }
    ];

    return (
        <Page className="create-todo-page">
            <Header title="Create Project" showBack />

            <div className="page-container">
                {/* Form Section */}
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="card-title-input" className="form-label">
                            <span className="label-text">Project Title</span>
                            <span className="label-required">*</span>
                        </label>
                        <Input
                            id="card-title-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Work Projects, Shopping List"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card-description-input" className="form-label">
                            <span className="label-text">Description</span>
                            <span className="label-optional">(Optional)</span>
                        </label>
                        <Input
                            id="card-description-input"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of this project"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <span className="label-text">Project Color</span>
                        </label>
                        <div className="color-grid">
                            {colors.map((colorOption) => (
                                <button
                                    key={colorOption.color}
                                    className={`color-option ${color === colorOption.color ? 'selected' : ''
                                        }`}
                                    style={{ backgroundColor: colorOption.color }}
                                    onClick={() => setColor(colorOption.color)}
                                    type="button"
                                    aria-label={`Select ${colorOption.name} color`}
                                    title={colorOption.name}
                                >
                                    {color === colorOption.color && (
                                        <span className="color-check">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="tasks-section">
                    <div className="section-header">
                        <Text size="large" className="section-title">Tasks</Text>
                        <div className="task-counter">
                            <span className="counter-number">{tasks.length}</span>
                            <span className="counter-label">added</span>
                        </div>
                    </div>

                    {tasks.length > 0 && (
                        <div className="tasks-list">
                            {tasks.map((task, index) => {
                                let priorityIcon = '🟢';
                                if (task.priority === 'high') {
                                    priorityIcon = '🔴';
                                } else if (task.priority === 'medium') {
                                    priorityIcon = '🟡';
                                }
                                return (
                                    <div key={`${task.title}-${index}`} className="task-preview-item">
                                        <div className="task-content">
                                            <div className="task-header">
                                                <Text className="task-title">{task.title}</Text>
                                                <button
                                                    onClick={() => handleRemoveTask(index)}
                                                    className="remove-task-btn"
                                                    aria-label="Remove task"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div className="task-meta">
                                                <span className="task-date">
                                                    📅 {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                                <span className={`task-priority priority-${task.priority}`}>
                                                    {priorityIcon}
                                                    {task.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="add-task-section">
                        <CreateTaskForm onAddTask={handleAddTask} />
                    </div>
                </div>

                {/* Create Button */}
                <div className="create-button-section">
                    <Button
                        className={`create-btn ${(!title.trim() || tasks.length === 0) ? 'disabled' : 'enabled'}`}
                        fullWidth
                        disabled={!title.trim() || tasks.length === 0}
                        onClick={handleCreateTodo}
                    >
                        <span className="btn-icon">🚀</span>
                        Create Project ({tasks.length} task{tasks.length !== 1 ? 's' : ''})
                    </Button>
                </div>
            </div>
        </Page>
    );
};

export default CreateTodoPage;
