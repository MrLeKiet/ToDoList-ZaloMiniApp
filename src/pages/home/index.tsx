import Header from "@/components/header";
import TaskItem from "@/components/task-item";
import TodoCard from "@/components/todo-card";
import "@/css/layout.scss";
import "@/css/pages/home.scss";
import useTodoStore from "@/data/store";
import React from 'react';
import { Button, Page, Text } from "zmp-ui";

const HomePage: React.FC = () => {
    const { cards, toggleTask } = useTodoStore();
    
    // Get all tasks from all cards
    const allTasks = cards.flatMap(card => card.tasks);
    
    // Get tasks due today
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = allTasks.filter(task => task.dueDate === today);
    
    // Calculate stats
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const highPriorityTasks = todayTasks.filter(task => task.priority === 'high' && !task.completed).length;
    
    // Sort today's tasks by priority (create new array instead of mutating)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sortedTodayTasks = [...todayTasks].sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1; // Completed tasks go to bottom
        }
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning!";
        if (hour < 17) return "Good Afternoon!";
        return "Good Evening!";
    };

    return (
        <Page className="home-page">
            <Header />
            
            <div className="content-area">
                <div className="page-container container-responsive">
                    {/* Enhanced Welcome Section */}
                    <div className="welcome-section spacing-responsive">
                        <div className="greeting-container">
                            <Text size="xLarge" className="greeting-text heading-responsive">
                                {getGreeting()}
                            </Text>
                            <Text size="small" className="date-text">
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </Text>
                        </div>
                        
                        {/* Stats Overview */}
                        <div className="stats-overview grid-responsive cols-3-md">
                            <div className="stat-item touch-friendly">
                                <Text size="small" className="stat-number">{pendingTasks}</Text>
                                <Text size="xSmall" className="stat-label">Pending</Text>
                            </div>
                            <div className="stat-item touch-friendly">
                                <Text size="small" className="stat-number">{completedTasks}</Text>
                                <Text size="xSmall" className="stat-label">Completed</Text>
                            </div>
                            <div className="stat-item touch-friendly">
                                <Text size="small" className="stat-number">{cards.length}</Text>
                                <Text size="xSmall" className="stat-label">Projects</Text>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions flex-responsive row-md spacing-responsive">
                        <Button 
                            className="quick-action-btn create-btn touch-friendly"
                            size="small"
                            onClick={() => console.log('Create task')}
                        >
                            <span className="action-icon">+</span>{' '}
                            Quick Add
                        </Button>
                        <Button 
                            className="quick-action-btn view-btn touch-friendly"
                            size="small"
                            variant="secondary"
                            onClick={() => console.log('View all')}
                        >
                            <span className="action-icon">📋</span>{' '}
                            View All
                        </Button>
                    </div>

                    {/* Project Cards Section */}
                    <div className="section-container">
                        <div className="section-header">
                            <Text size="large" className="section-title">Your Projects</Text>
                            <Text size="xSmall" className="section-subtitle">
                                {cards.length} active project{cards.length !== 1 ? 's' : ''}
                            </Text>
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
                    </div>

                    {/* Today's Tasks Section */}
                    <div className="section-container">
                        <div className="section-header">
                            <div className="section-title-row">
                                <Text size="large" className="section-title">Today's Focus</Text>
                                {highPriorityTasks > 0 && (
                                    <div className="priority-badge">
                                        <span className="priority-dot"></span>
                                        {highPriorityTasks} high priority
                                    </div>
                                )}
                            </div>
                            <Text size="xSmall" className="section-subtitle">
                                {todayTasks.length} task{todayTasks.length !== 1 ? 's' : ''} scheduled
                            </Text>
                        </div>

                        <div className="today-tasks-container">
                            {sortedTodayTasks.length > 0 ? (
                                <div className="tasks-list">
                                    {sortedTodayTasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onToggle={toggleTask}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">🎯</div>
                                    <Text className="empty-title">All caught up!</Text>
                                    <Text size="xSmall" className="empty-subtitle">
                                        No tasks scheduled for today
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default HomePage;
