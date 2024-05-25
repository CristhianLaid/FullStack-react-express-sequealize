import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { GetTaskOneById } from "../../services";
import { useTaskStore } from "../../store";
import { CartMain } from "../../components";

export const OneTaskPage = () => {
    const { id } = useParams();
    const { getTaskById, oneTask } = useTaskStore(state => state)

    const getTaskOne = async () => {
        const res = await GetTaskOneById(id);
        getTaskById(res.data.id)

        // await GetTaskOneById(id).then((res) => {
        //     getTaskById(res.data.id)
        // });
    };

    useEffect(() => {
        getTaskOne();
        console.log(oneTask)
    }, [id]);

    return (
        <CartMain>
            {oneTask && (
                <>
                    <p>Creado por: {oneTask.User.username}</p>
                    <h1>{oneTask.title}</h1>
                    <p>{oneTask.description}</p>
                    <p>{oneTask.done}</p>
                </>
            )}
        </CartMain>
    )
}
