import Calendar from "@/components/calendar";
import Header from "@/components/header";
import TaskList from "@/components/task-list";
import "@/css/layout.scss";
import "@/css/pages/calendar.scss";
import useTodoStore from "@/data/store";
import React from "react";
import { Page, Sheet } from "zmp-ui";
const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
    const { cards, toggleTask } = useTodoStore();
    
    // Get all tasks for the selected date
    const selectedTasks = React.useMemo(() => {
        if (!selectedDate) return [];
        
        return cards.flatMap(card => 
            card.tasks
                .filter(task => task.dueDate === selectedDate)
                .map(task => ({
                    ...task,
                    cardTitle: card.title,
                    cardColor: card.color
                }))
        );
    }, [cards, selectedDate]);

    return (
        <Page className="calendar-page">
            <Header showBack />
            
            <div className="page-container calendar-container">
                <Calendar onSelectDate={setSelectedDate} />
            </div>

            <Sheet
                visible={!!selectedDate}
                onClose={() => setSelectedDate(null)}
                height={480}
                swipeToClose
                autoHeight
            >
                <div className="p-4">
                    {selectedDate && (
                        <TaskList
                            date={selectedDate}
                            tasks={selectedTasks}
                            onTaskToggle={toggleTask}
                        />
                    )}
                </div>
            </Sheet>
        </Page>
    );
};

export default CalendarPage;
