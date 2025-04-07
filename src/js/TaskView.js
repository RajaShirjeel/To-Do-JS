class TaskView {
    __parentEl = document.querySelector('.task-list');
    __addTaskBtn = document.querySelector('.add-task-btn');
    __addTaskInput = document.querySelector('.add-task--input');
    __completedTasks = document.querySelector('.completed');
    __ongoingTasks = document.querySelector('.ongoing');


    addHandlerShowOngoing(handler){
        this.__ongoingTasks.addEventListener('click', () => {
            this.__completedTasks.classList.remove('active');
            this.__ongoingTasks.classList.add('active');
            handler();
        })
    }

    addHandlerShowCompleted(handler){
        this.__completedTasks.addEventListener('click', () => {
            this.__completedTasks.classList.add('active');
            this.__ongoingTasks.classList.remove('active');
            handler();
        })
    }

    addHandlerComplete(handler){
        this.__parentEl.addEventListener('change', (e) => {
            if (e.target.classList.contains('completed')) return;
            const taskId = e.target.closest('.task-item').dataset.id;
            handler(taskId);
        })
    }

    addHandlerRemoveComplete(handler){
        this.__parentEl.addEventListener('change', (e) => {
            if (!e.target.classList.contains('completed')) return;
            const taskId = e.target.closest('.task-item').dataset.id;
            handler(taskId);
        })
    }

    addHandlerTask(handler){
        this.__addTaskBtn.addEventListener('click', (e) => {
            if (!this.__addTaskInput.value) return;
            handler(this.__addTaskInput);
            this.__addTaskInput.value = '';
            this.__completedTasks.classList.remove('active');
            this.__ongoingTasks.classList.add('active');
        })
    }

    render(data) {
        const markup = this.#generateMarkup(data);
        this.__parentEl.innerHTML = '';
        this.__parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    #generateMarkup(data){
        let tasksMarkup = '';
        data.forEach((obj, i) => {
            const markup = `
            <li class="task-item" data-id="${i}">
                <div class="item">
                    <input type="checkbox" class="task-checkbox ${obj.state === 'completed' ? 'completed': ''}" ${obj.state === 'completed' ? 'checked': ''}>
                    <p class="task-text">${obj.task}</p>
                    <ion-icon name="trash-outline" class="trash-icon"></ion-icon>
                </div>
            </li>
            `
            tasksMarkup += markup
        })
        return tasksMarkup;
    }
}

export default new TaskView();
