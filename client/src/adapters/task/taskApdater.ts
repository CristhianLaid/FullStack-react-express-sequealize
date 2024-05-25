import { TaskData } from "../../models"

export const taskAdapter = (taskData:TaskData) => {
    const formatoTask = {
        title: taskData.title,
        description: taskData.description,
        done: taskData.done
    };
    return formatoTask;
};

export const updateTask = (taskData:TaskData)=> {
    const updateTask = {
        title: taskData.title,
        description: taskData.description,
        done: taskData.done,
        updatedAt: taskData.updatedAt
    };
    return updateTask;
};