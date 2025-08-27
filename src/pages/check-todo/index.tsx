import Header from "@/components/header";
import TaskGroup from "@/components/task-group";
import useTodoStore from "@/data/store";
import React from "react";
import { Page, Text } from "zmp-ui";
import "@/css/layout.scss";
const CheckTodoPage = () => {
    const [filter, setFilter] = React.useState<'all' | 'completed' | 'pending'>('all');
    const { cards, toggleTask } = useTodoStore();

    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Get all tasks with their card info
    const allTasks = cards.flatMap(card =>
        card.tasks.map(task => ({
            ...task,
            cardTitle: card.title,
            cardColor: card.color
        }))
    );

    // Group tasks by date and filter today's tasks
    const groupedTasks = React.useMemo(() => {
        const groups: { [key: string]: typeof allTasks } = {
            today: [],
            upcoming: [],
            noDueDate: [],
            past: []
        };

        allTasks.forEach(task => {
            if (!task.dueDate) {
                groups.noDueDate.push(task);
            } else if (task.dueDate === today) {
                groups.today.push(task);
            } else if (task.dueDate > today) {
                groups.upcoming.push(task);
            } else {
                groups.past.push(task);
            }
        });

        return groups;
    }, [allTasks, today]);

    return (
        <Page>
            <Header showBack />

            <div className="page-container space-y-6">
                <div className="space-y-2">
                    <Text.Title>Tasks</Text.Title>
                    <div className="flex space-x-2">
                        {(['all', 'pending', 'completed'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm ${filter === f
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <TaskGroup
                        title="Today's Tasks"
                        tasks={groupedTasks.today}
                        onTaskToggle={toggleTask}
                        filter={filter}
                    />

                    <TaskGroup
                        title="Upcoming Tasks"
                        tasks={groupedTasks.upcoming}
                        onTaskToggle={toggleTask}
                        filter={filter}
                    />

                    <TaskGroup
                        title="Past Tasks"
                        tasks={groupedTasks.past}
                        onTaskToggle={toggleTask}
                        filter={filter}
                    />

                    <TaskGroup
                        title="Tasks without Due Date"
                        tasks={groupedTasks.noDueDate}
                        onTaskToggle={toggleTask}
                        filter={filter}
                    />
                </div>

                {Object.values(groupedTasks).every(group =>
                    group.filter(t =>
                        filter === 'all' ||
                        (filter === 'completed' && t.completed) ||
                        (filter === 'pending' && !t.completed)
                    ).length === 0
                ) && (
                        <div className="text-center py-8 text-gray-500">
                            No {filter !== 'all' ? filter : ''} tasks found
                        </div>
                    )}
            </div>
        </Page>
    );
};

export default CheckTodoPage;
