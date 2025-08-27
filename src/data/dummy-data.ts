import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TodoCard {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
  createdAt: string;
  dueDate?: string;
  color?: string;
  totalTasks: number;
  completedTasks: number;
}

export const dummyTodoCards: TodoCard[] = [
  {
    id: uuidv4(),
    title: "Work Projects",
    description: "Tasks for current sprint",
    tasks: [
      {
        id: uuidv4(),
        title: "Complete project documentation",
        completed: false,
        dueDate: "2025-08-30",
        priority: "high"
      },
      {
        id: uuidv4(),
        title: "Review pull requests",
        completed: true,
        priority: "medium"
      },
      {
        id: uuidv4(),
        title: "Setup development environment",
        completed: false,
        priority: "low"
      }
    ],
    createdAt: "2025-08-27",
    dueDate: "2025-09-01",
    color: "#ff0000ff",
    totalTasks: 3,
    completedTasks: 1
  },
  {
    id: uuidv4(),
    title: "Shopping List",
    description: "Items to buy this weekend",
    tasks: [
      {
        id: uuidv4(),
        title: "Groceries for the week",
        completed: false,
        priority: "medium"
      },
      {
        id: uuidv4(),
        title: "New headphones",
        completed: false,
        priority: "low"
      }
    ],
    createdAt: "2025-08-27",
    color: "#007bffff",
    totalTasks: 2,
    completedTasks: 0
  },
  {
    id: uuidv4(),
    title: "Home Tasks",
    description: "House maintenance tasks",
    tasks: [
      {
        id: uuidv4(),
        title: "Clean the garage",
        completed: true,
        priority: "medium"
      },
      {
        id: uuidv4(),
        title: "Fix kitchen sink",
        completed: false,
        dueDate: "2025-08-29",
        priority: "high"
      },
      {
        id: uuidv4(),
        title: "Water the plants",
        completed: false,
        priority: "low"
      },
      {
        id: uuidv4(),
        title: "Change light bulbs",
        completed: true,
        priority: "medium"
      }
    ],
    createdAt: "2025-08-26",
    dueDate: "2025-08-31",
    color: "#00ff00ff",
    totalTasks: 4,
    completedTasks: 2
  }
];
