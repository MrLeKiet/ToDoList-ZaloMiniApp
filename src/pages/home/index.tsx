import Header from "@/components/header";
import TaskItem from "@/components/task-item";
import TodoCard from "@/components/todo-card";
import "@/css/layout.scss";
import useTodoStore from "@/data/store";
import React from 'react';
import { Page, Text } from "zmp-ui";

const HomePage: React.FC = () => {
    const { cards, toggleTask } = useTodoStore();
    
    // Get all tasks from all cards
    const allTasks = cards.flatMap(card => card.tasks);
    // Get tasks due today
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = allTasks.filter(task => task.dueDate === today);

    return (
        <Page className="home-page">
            <Header />
            
            <div className="content-area">
                <div className="page-container">
                    <div className="welcome-section">
                        <Text size="large" className="font-semibold">Welcome Back!</Text>
                    </div>

                    <div className="todo-cards-scroll">
                        <div className="cards-container">
                            {cards.map((card) => (
                                <TodoCard
                                    key={card.id}
                                    card={card}
                                    onClick={() => console.log('Card clicked:', card.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-4">
                        <Text className="text-gray-600">
                            Your tasks for today ({todayTasks.length})
                        </Text>
                        {todayTasks.length > 0 ? (
                            todayTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                />
                            ))
                        ) : (
                            <Text className="text-center text-gray-500 py-4">
                                No tasks scheduled for today
                            </Text>
                        )}
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default HomePage;
