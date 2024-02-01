import TaskItem from '@project/components/molecules/TaskItem'

const TaskList = () => {
  return [1,2,3].map(task => (<TaskItem key={task} />))
}

export default TaskList
