function init() {
    loadTasksToDo();
    loadTasksInProgress();
    loadTasksTesting();
    loadTasksDone();
}

let tasksToDo = [];
let tasksInProgress = [];
let tasksTesting = [];
let tasksDone = [];

async function loadTasksToDo() {
    tasksToDo = [];
    let toDo = firebase.firestore().collection('tasks').doc('allTasks').collection('tasks-todo');
    let response = await toDo.get();
    response.forEach((i) => {
        console.log(i.data());
        tasksToDo.push(i.data());
        
    });
    document.getElementById('boardToDo').innerHTML = '';

    for (let i = 0; i < tasksToDo.length; i++) {

        document.getElementById('boardToDo').innerHTML += `
        <div class="board-task" onclick="tasksDetails(${i})">${tasksToDo[i]['title']}</div>`;
    }
}

async function loadTasksInProgress() {
    tasksInProgress = [];
    let inProgress = firebase.firestore().collection('tasks').doc('allTasks').collection('tasks-inprogress');
    let response = await inProgress.get();
    response.forEach((i) => {
        console.log(i.data());
        tasksInProgress.push(i.data());
        
    });
    document.getElementById('boardInProgress').innerHTML = '';

    for (let i = 0; i < tasksInProgress.length; i++) {

        document.getElementById('boardInProgress').innerHTML += `
        <div class="board-task">${tasksInProgress[i]['title']}</div>`;
    }
}

async function loadTasksTesting() {
    tasksTesting = [];
    let testing = firebase.firestore().collection('tasks').doc('allTasks').collection('tasks-testing');
    let response = await testing.get();
    response.forEach((i) => {
        console.log(i.data());
        tasksTesting.push(i.data());
        
    });
    document.getElementById('boardTesting').innerHTML = '';

    for (let i = 0; i < tasksTesting.length; i++) {

        document.getElementById('boardTesting').innerHTML += `
        <div class="board-task">${tasksTesting[i]['title']}</div>`;
    }
}

async function loadTasksDone() {
    tasksDone = [];
    let done = firebase.firestore().collection('tasks').doc('allTasks').collection('tasks-done');
    let response = await done.get();
    response.forEach((i) => {
        console.log(i.data());
        tasksDone.push(i.data());
        
    });
    document.getElementById('boardDone').innerHTML = '';

    for (let i = 0; i < tasksDone.length; i++) {

        document.getElementById('boardDone').innerHTML += `
        <div class="board-task">${tasksDone[i]['title']}</div>`;
    }
}

function tasksDetails (i) {

}