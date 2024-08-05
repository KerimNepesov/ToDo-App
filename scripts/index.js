const addBtn = document.querySelector('.add-btn')
const taskInput = document.querySelector('.input')
const tasksList = document.querySelector('.tasks')
const emptyList = document.querySelector('.empty-list')
const clearBtn = document.querySelector('.clear-btn-img')

const personal = document.querySelector('.personal')
const professional = document.querySelector('.professional')

const taskIcon1 = "./img/done.png"
const taskIcon2 = "./img/Vector.png"


let tasks = [];


let activeStatus = localStorage.getItem('currcat') ? localStorage.getItem('currcat') : 'personal-tasks'
console.log(activeStatus);



personal.addEventListener('click',toggleStatus)
professional.addEventListener('click',toggleStatus)




getLocalStorage()

const setStatus = (() => {
    if (activeStatus === 'personal-tasks') personal.classList.toggle('active')
    else professional.classList.toggle('active')
})()

function toggleStatus() {
    tasksList.innerHTML = ''
    personal.classList.toggle('active')
    professional.classList.toggle('active')
    if(personal.classList.contains('active')) activeStatus = 'personal-tasks' 
    else  activeStatus =  'professional-tasks'
    localStorage.setItem('currcat', activeStatus)
    getLocalStorage()
    checkEmptyList()
}

// toggleStatus()



function getLocalStorage() {
    if(localStorage.getItem(activeStatus)){
        tasks = JSON.parse(localStorage.getItem(activeStatus))
    }

    tasks.forEach(taskLS => {
    renderTask(taskLS)
    })      
}





checkEmptyList()

addBtn.addEventListener('click',addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)


function addTask() {

    const taskText = taskInput.value

    if(taskText.trim() != ''){
        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false,
        };

        tasks.push(newTask);
        saveToLocalStorage(activeStatus)
        renderTask(newTask)
        checkEmptyList()
    }
    
    

    taskInput.value =""
    taskInput.focus()
}

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') return;
  
    const parentNode = event.target.closest('.task-inner');

    const id = Number (parentNode.id)

    tasks = tasks.filter((task) => task.id !== id)


    saveToLocalStorage(activeStatus)

    parentNode.remove()

    checkEmptyList()
}

function doneTask(event) {

    if(event.target.dataset.action !== "done") return ;
    
        const parentNode = event.target.closest('.task-inner')
        

        const id = Number (parentNode.id)

        const task = tasks.find((task) => task.id === id)  
        
        task.done =  !task.done
        
        saveToLocalStorage(activeStatus)

        const taskTitle = parentNode.querySelector('.task-text')

        taskTitle.classList.toggle('task-done')

        if (task.done) {
            parentNode.querySelector('.icon').src = taskIcon1
        } else {
            parentNode.querySelector('.icon').src = taskIcon2
        }

}

function checkEmptyList() {
    if(tasks.length === 0){
        const emptyListHTML = 
        ` 
            <div class="empty-list">
                    EMPTY LIST
            </div>     
        `
        tasksList.insertAdjacentHTML('afterbegin',emptyListHTML)
    }

    if(tasks.length > 0){
        const emptyListEL = document.querySelector('.empty-list')
        emptyListEL ? emptyListEL.remove() : null 
    }
}

function saveToLocalStorage(status) {
    localStorage.setItem(status,JSON.stringify(tasks))
}

function renderTask(item) {
    const cssClass = item.done ? 'task-done' : null 
    const task = document.createElement('div')
    
    const taskImg = item.done ? taskIcon1 : taskIcon2

    task.classList.add('task-inner')

    task.id = (item.id)
    task.innerHTML =
    `       
        <button data-action ="done" class = "img btn-action  "><img class="icon" src="${taskImg}" alt="huy"></button>
        <div class="task-text ${cssClass}">${item.text}</div>
        <button data-action ="delete" class = "btn-action"> <img class="icon-2" src="./img/musor.png.png" alt=""></button>
    `                
    tasksList.append (task)
}

function clearCompletedTasks() {
    
    tasks =  tasks.filter((task) => task.done !== true)

    saveToLocalStorage(activeStatus)
    location.reload()
    checkEmptyList()
    console.log(tasks);
    
}

clearBtn.addEventListener("click" , clearCompletedTasks)   