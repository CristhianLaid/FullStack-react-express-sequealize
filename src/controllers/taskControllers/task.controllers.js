import User from "../../models/authModels/auth.models.js";
import Task from "../../models/taskModels/task.models.js";

class TaskController {
    static async getTaskAll(req, res) {
        try {
            const getTitle = await Task.findAll({include: User});
            if (getTitle.length === 0) return res.status(402).json({ message: ['The task not is found'] });
    
            return res.status(202).json(getTitle);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    };

    static async taskAllOneUser(req, res) {
        const { username } = req.user;
        try {
            const getUser = await User.findOne({ where: { username } })
            if (!getUser) return res.status(402).json({ message: ['Usuario not found'] });
            const task = await Task.findAll({ where: { userId: getUser.id } });
            if (task.length === 0) return res.status(402).json({ message: ['Does not exist task for user'] })

            return res.status(202).json(task)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        };
    };

    static async taskOneById(req, res) {
        const { id } = req.params;
        const taskId = Number(id);

        if (!taskId) return res.status(404).json({ message: ['Id is not provided'] });

        if (isNaN((taskId))) return res.status(404).json({ message: ['Id is a number'] });

        try {
            const getTask = await Task.findOne({ where: { id: taskId } });
            if (!getTask) return res.status(402).json({ message: ['Task not found'] });

            const taskWithUser = await Task.findByPk(getTask.id, { include: User });

            return res.status(202).json(taskWithUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    static async addTask(req, res) {
        const { title, description } = req.body;
        const username = req.user.username;
        console.log(req.user)

        try {

            const user = await User.findOne({ where: { username } });

            if (!user) return res.status(404).json({ message: ['User not found'] });

            const FoundTitle = await Task.findOne({ where: { title } });

            if (FoundTitle) return res.status(404).json({ message: ['A task with that title already exists'] });

            const newTask = new Task({
                title,
                description,
                userId: user.id
            });

            const savedTask = await newTask.save();

            // Consultar nuevamente la tarea para incluir la información del usuario asociado
            // const taskWithUser = await Task.findByPk(newTask.id, { include: User });
            return res.status(202).json(savedTask);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        };
    };

    static async updateTask(req, res) {
        const { id } = req.params;
        const taskId = Number(id);
        const { title, description, done } = req.body;

        if (!taskId) return res.status(404).json({ message: ['Id is not provided'] });

        if (isNaN((taskId))) return res.status(404).json({ message: ['Id is a number'] });

        try {
            const taskToUpdate = await Task.findByPk(taskId);

            if (!taskToUpdate) return res.status(404).json({ message: ['Task not found'] });
            if (taskToUpdate.userId !== req.user.id) return res.status(404).json({ message: ['task cannot be updated'] });

            taskToUpdate.title = title;
            taskToUpdate.description = description;
            taskToUpdate.done = done;

            await taskToUpdate.save();

            return res.status(200).json({ message: ['Task updated successfully'] });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    static async deleteTask(req, res) {
        const { id } = req.params;
        const taskId = Number(id);

        if (!taskId) return res.status(404).json({ message: ['Id is not provided'] });

        if (isNaN(taskId)) return res.status(404).json({ message: ['Id is not a number'] });

        try {
            const foundTask = await Task.findByPk(taskId);
            if (!foundTask) return res.status(404).json({ message: ['Task not found'] });
            if (foundTask.userId !== req.user.id) return res.status(404).json({ message: ['task cannot be deleted'] });

            await foundTask.destroy();

            return res.status(204).end();
        } catch (error) {

            return res.status(500).json({ error: error.message });
        };
    };

}

export default TaskController;