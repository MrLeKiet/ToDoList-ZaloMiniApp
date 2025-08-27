import CreateTaskForm from "@/components/create-task-form";
import Header from "@/components/header";
import "@/css/layout.scss";
import "@/css/pages/create-todo.scss";
import useTodoStore from "@/data/store";
import React from "react";
import { Button, Input, Page, useNavigate } from "zmp-ui";
const CreateTodoPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [color, setColor] = React.useState('#161616ff');
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
        '#ff0000ff', '#007bffff', '#00ff00ff', '#ff00ffff',
        '#ffee00ff', '#00ffccff', '#ff6f00ff', '#004cffff'
    ];

    return (
        <Page className="create-todo-page">
            <Header title="Create Todo" showBack />
            
            <div className="page-container">
                <div className="form-section">
                    <div>
                        <label htmlFor="card-title-input" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Title
                        </label>
                        <Input
                            id="card-title-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter card title"
                        />
                    </div>

                    <div>
                        <label htmlFor="card-description-input" className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Optional)
                        </label>
                        <Input
                            id="card-description-input"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </div>

                    <div>
                        <label htmlFor="card-color-group" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Color
                        </label>
                        <fieldset id="card-color-group" className="flex flex-wrap gap-2" aria-label="Card Color">
                            <legend className="sr-only">Card Color</legend>
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    className={`w-8 h-8 rounded-full ${
                                        color === c 
                                            ? 'ring-2 ring-black ring-offset-2' 
                                            : 'border-2 border-gray-300'
                                    }`}
                                    style={{ backgroundColor: c }}
                                    onClick={() => setColor(c)}
                                    type="button"
                                    aria-label={`Select color ${c}`}
                                />
                            ))}
                        </fieldset>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Tasks</h2>
                        <span className="text-sm text-gray-500">
                            {tasks.length} tasks added
                        </span>
                    </div>

                    {tasks.length > 0 && (
                        <div className="space-y-2">
                            {tasks.map((task, index) => (
                                <div 
                                    key={`${task.title}-${task.dueDate}-${task.priority}`}
                                    className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-sm text-gray-500">
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {(() => {
                                        const priorityStyles = {
                                            high: 'bg-red-100 text-red-800',
                                            medium: 'bg-yellow-100 text-yellow-800',
                                            low: 'bg-blue-100 text-blue-800'
                                        };
                                        return (
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityStyles[task.priority]}`}>
                                                {task.priority}
                                            </span>
                                        );
                                    })()}
                                </div>
                            ))}
                        </div>
                    )}

                    <CreateTaskForm onAddTask={handleAddTask} />
                </div>

                <Button 
                    className="mt-6"
                    fullWidth
                    disabled={!title.trim() || tasks.length === 0}
                    onClick={handleCreateTodo}
                >
                    Create Todo Card
                </Button>
            </div>
        </Page>
    );
};

export default CreateTodoPage;
