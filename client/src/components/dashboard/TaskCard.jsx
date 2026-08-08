const TaskCard = ({ tasks = [] }) => {
  const todayTasks = tasks.slice(0, 5);

  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-5 app-title">
        📋 Today's Tasks
      </h2>

      {todayTasks.length === 0 ? (
        <p className="app-muted">
          No tasks available.
        </p>
      ) : (
        <ul className="space-y-4">

          {todayTasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between gap-4"
            >

              <span
                className={
                  task.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "app-title"
                }
              >
                {task.title}
              </span>

              <span
                className={`text-sm font-semibold ${
                  task.completed
                    ? "app-success"
                    : "app-warning"
                }`}
              >
                {task.completed
                  ? "Completed"
                  : "Pending"}
              </span>

            </li>
          ))}

        </ul>
      )}

    </div>
  );
};

export default TaskCard;