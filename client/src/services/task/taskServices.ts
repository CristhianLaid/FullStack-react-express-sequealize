import { taskAdapter, updateTask } from "../../adapters";
import axios from "../../config/axiosConfig";
import { TaskData, TaskDataResponse, TaskResponse } from "../../models";


export const GetTaskAll = async ():Promise<TaskDataResponse>  => axios.get('/task/taskAll');

export const MyTask = async (): Promise<TaskDataResponse> => axios.get('/task/taskAllOneUser');

export const GetTaskOneById = async (taskId: string | undefined): Promise<TaskDataResponse> => axios.get(`/task/${taskId}`)

export const AddTask = async (taskData: TaskData): Promise<TaskDataResponse> => axios.post('task', taskAdapter(taskData));

export const UpdateTask = async (id:string, taskData:  TaskResponse): Promise<TaskDataResponse> => axios.put(`/task/${id}`, updateTask(taskData));

export const DeleteTask = async (taskId: string): Promise<TaskDataResponse> => axios.delete(`/task/${taskId}`);