import { create } from 'zustand'
import { TaskResponse } from '../../models';

type State = {
    tasks: TaskResponse[];
    oneTask: TaskResponse | undefined;
    errors: string[];
}

type Actions = {
    setTasks: (tasks: TaskResponse[]) => void;
    updateTask: (id: string, task: TaskResponse) => void;
    deleteTask: (id: string) => void;
    getTaskById: (id: string | undefined) => void;
    setError: (errors: any) => void;
}

export const useTaskStore = create<State & Actions>((set) => ({
    tasks: [],
    oneTask: undefined,
    errors: [],
    setTasks: (tasks: TaskResponse[]) => set((state) => ({ ...state, tasks })),
    updateTask: (id: string, task: TaskResponse) => set((state) => ({
        ...state,
        tasks: state.tasks.map(existingTask => existingTask.id === id ? task : existingTask)
    })),
    deleteTask: (id: string) => set((state) => ({
        ...state,
        tasks: state.tasks.filter(task => task.id !== id)
    })),
    getTaskById: (id: string | undefined) => set((state) => ({
        oneTask: state.tasks.find(task => task.id === id)
    })),
    setError: (errors: any) => set({errors})
}));
