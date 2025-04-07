import { state } from "./model";
import TaskView from "./TaskView";

const addTaskController = function(data){
    const task = {
        'task': data.value,
        'state': 'ongoing'
    }

    state.ongoingTasks.push(task);
    TaskView.render(state.ongoingTasks);
}

const markTaskCompleteController = function(taskId){
    const comTask = state.ongoingTasks.at(taskId);
    state.ongoingTasks.splice(taskId, 1);
    comTask.state = 'completed';
    state.completedTasks.push(comTask);
    TaskView.render(state.ongoingTasks);
}

const markTaskIncompleteController = function(taskId){
    const comTask = state.completedTasks.at(taskId);
    state.completedTasks.splice(taskId, 1);
    comTask.state = 'ongoing';
    state.ongoingTasks.push(comTask);
    TaskView.render(state.completedTasks);
}

const showCompletedTasksController = function(){
    TaskView.render(state.completedTasks);
}
const showOngoingTasksController = function(){
    TaskView.render(state.ongoingTasks);
}


const init = function(){
    TaskView.addHandlerTask(addTaskController);
    TaskView.addHandlerComplete(markTaskCompleteController);
    TaskView.addHandlerShowCompleted(showCompletedTasksController);
    TaskView.addHandlerShowOngoing(showOngoingTasksController);
    TaskView.addHandlerRemoveComplete(markTaskIncompleteController);
}

init();