import type { TodoCard as TodoCardType } from '@/data/dummy-data';
import React from 'react';
import { Text } from "zmp-ui";

interface TodoCardProps {
    card: TodoCardType;
    onClick?: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ card, onClick }) => {
    const progressPercent = (card.completedTasks / card.totalTasks) * 100;

    return (
        <button
            className="flex-shrink-0 w-64 p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 text-left"
            style={{ backgroundColor: card.color || '#ffffff' }}
            onClick={onClick}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            tabIndex={0}
        >
            <div className="space-y-3">
                <Text size="large" className="font-semibold line-clamp-1">
                    {card.title}
                </Text>
                
                {card.description && (
                    <Text size="small" className="text-gray-600 line-clamp-2">
                        {card.description}
                    </Text>
                )}

                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span>{card.completedTasks}/{card.totalTasks} tasks</span>
                        <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-primary transition-all duration-300 ease-in-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>
        </button>
    );
};

export default TodoCard;
