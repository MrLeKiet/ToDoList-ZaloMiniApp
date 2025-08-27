import { create } from 'zustand';
import type { Task, TodoCard } from './dummy-data';
import { dummyTodoCards } from './dummy-data';

interface TodoStore {
    cards: TodoCard[];
    toggleTask: (taskId: string) => void;
    addCard: (card: Omit<TodoCard, 'id' | 'createdAt' | 'totalTasks' | 'completedTasks'>) => void;
    addTask: (cardId: string, task: Omit<Task, 'id'>) => void;
    deleteCard: (cardId: string) => void;
    deleteTask: (cardId: string, taskId: string) => void;
}

function getUpdatedCompletedTasks(card: TodoCard, taskId: string): number {
    const foundTask = card.tasks.find(t => t.id === taskId);
    if (!foundTask) return card.completedTasks;
    return foundTask.completed
        ? card.completedTasks - 1
        : card.completedTasks + 1;
}

function getUpdatedTasks(tasks: Task[], taskId: string): Task[] {
    return tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
    );
}

function toggleTaskHelper(cards: TodoCard[], taskId: string): TodoCard[] {
    return cards.map(card => {
        const hasTask = card.tasks.some(t => t.id === taskId);
        const completedTasks = hasTask
            ? getUpdatedCompletedTasks(card, taskId)
            : card.completedTasks;
        return {
            ...card,
            tasks: getUpdatedTasks(card.tasks, taskId),
            completedTasks
        };
    });
}

const useTodoStore = create<TodoStore>((set) => ({
    cards: dummyTodoCards,

    toggleTask: (taskId) => set((state) => ({
        cards: toggleTaskHelper(state.cards, taskId)
    })),

    addCard: (newCard) => set((state) => {
        const card: TodoCard = {
            ...newCard,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            totalTasks: newCard.tasks.length,
            completedTasks: newCard.tasks.filter(t => t.completed).length
        };
        return { cards: [...state.cards, card] };
    }),

    addTask: (cardId, newTask) => set((state) => ({
        cards: state.cards.map(card =>
            card.id === cardId
                ? {
                    ...card,
                    tasks: [...card.tasks, { ...newTask, id: crypto.randomUUID() }],
                    totalTasks: card.totalTasks + 1,
                    completedTasks: card.completedTasks + (newTask.completed ? 1 : 0)
                }
                : card
        )
    })),

    deleteCard: (cardId) => set((state) => ({
        cards: state.cards.filter(card => card.id !== cardId)
    })),

    deleteTask: (cardId, taskId) => set((state) => ({
        cards: state.cards.map(card =>
            card.id === cardId
                ? {
                    ...card,
                    tasks: card.tasks.filter(t => t.id !== taskId),
                    totalTasks: card.totalTasks - 1,
                    completedTasks: card.completedTasks - (
                        card.tasks.find(t => t.id === taskId)?.completed ? 1 : 0
                    )
                }
                : card
        )
    }))
}));

export default useTodoStore;
