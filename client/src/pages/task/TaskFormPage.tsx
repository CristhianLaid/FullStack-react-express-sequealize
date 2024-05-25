import { CartMain } from "../../components/iu/CartMain";
import { useForm } from "react-hook-form";
import { TaskResponse } from "../../models";
import { useNavigate, useParams } from "react-router-dom";
import { useTaskStore } from "../../store";
import { AddTask, GetTaskOneById, UpdateTask } from "../../services";
import { useEffect } from "react";
import { Button, CartFormTask, Input, Label, Textarea } from "./components";
import { Message } from "../../components";
// dayjs.extend(utc);

export const TaskFormPage = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<TaskResponse>();
    const { errors: errorTask, setTasks, updateTask: TaskUpdate, getTaskById, setError } = useTaskStore(state => state)
    const params = useParams();
    const navigate = useNavigate();


    const onSubmit = async (data: TaskResponse) => {
        try {
            if (params.id) {
                const updateTask = await UpdateTask(params.id, data)
                TaskUpdate(params.id, {
                    ...updateTask.data,
                    // date: dayjs.utc(data.date).format(),
                });
                console.log(updateTask)
            } else {
                const newTask = await AddTask(data)
                setTasks([
                    newTask.data,
                    // date: dayjs.utc(data.date).format(),
                ]);
            }

            navigate("/tasks");
        } catch (error:any) {
            console.log(error.response.data)
            setError(error.response.data.message)
        }
    };

    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                const task = await GetTaskOneById(params.id)
                getTaskById(task.data.id);
                setValue("title", task.data.title);
                setValue("description", task.data.description);
                setValue("done", task.data.done);
            }
        };
        loadTask();
    }, []);

    useEffect(() => {
        if (errorTask.length > 0) {
            const timer = setTimeout(() => {
                setError([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorTask]);



    return (
        <CartMain>
            <h1 className="text-3xl font-bold text-center mb-4">TaskFormPage</h1>
            {errorTask.map((error, i) => (
                <Message message={error} key={i} />
            ))}
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <CartFormTask>
                    <Label htmlFor="title">
                        Title
                    </Label>
                    <Input
                        type="text"
                        id="title"
                        {...register("title", { required: true })}
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">Title is required</span>
                    )}
                </CartFormTask>

                <CartFormTask>
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        {...register("description", { required: true })}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm">Description is required</span>
                    )}
                </CartFormTask>

                <CartFormTask>
                    <Label htmlFor="done">
                        Done
                    </Label>
                    <input
                        className="mr-2"
                        type="checkbox"
                        id="done"
                        {...register("done")}
                    />
                </CartFormTask>

                <Button>
                    Submit
                </Button>
            </form>
        </CartMain>
    );
};
