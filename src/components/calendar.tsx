import useTodoStore from '@/data/store';
import React from 'react';
import { Text } from 'zmp-ui';

interface CalendarProps {
    onSelectDate?: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const cards = useTodoStore(state => state.cards);

    // Get all tasks with their dates
    const allTasks = cards.flatMap(card => card.tasks.map(task => ({
        ...task,
        cardTitle: card.title,
        cardColor: card.color
    })));

    // Get days in month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    // Get first day of month (0 = Sunday)
    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Previous and next month navigation
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    // Get tasks for a specific date
    const getTasksForDate = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
        return allTasks.filter(task => task.dueDate === date);
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="space-y-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    &larr;
                </button>
                <Text.Title size="large">{monthYear}</Text.Title>
                <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    &rarr;
                </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first day of month */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-start-${currentDate.getMonth()}-${index}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const tasks = getTasksForDate(day);
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                    return (
                        <button
                            key={day}
                            onClick={() => {
                                const date = new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth(),
                                    day
                                ).toISOString().split('T')[0];
                                onSelectDate?.(date);
                            }}
                            className={`aspect-square p-1 relative rounded-lg border ${
                                isToday ? 'border-primary' : 'border-transparent'
                            } hover:border-primary/50 transition-colors`}
                        >
                            <div className={`text-sm ${isToday ? 'font-bold text-primary' : ''}`}>
                                {day}
                            </div>
                            {tasks.length > 0 && (
                                <div className="absolute bottom-1 right-1 left-1 flex gap-1">
                                    {tasks.slice(0, 3).map((task, i) => (
                                        <div
                                            key={task.id}
                                            className="flex-1 h-1 rounded-full"
                                            style={{ backgroundColor: task.cardColor || '#E2E8F0' }}
                                        />
                                    ))}
                                    {tasks.length > 3 && <div className="flex-1 h-1 rounded-full bg-gray-300" />}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
