function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {  // User is signed in.
            includeHTML();
            loadTasks();
        } else {  // No user is signed in.
            window.location.assign("index.html");
        }
    });
}

let allTasks = [];

async function loadTasks() {
    allTasks = [];
    let tasks = firebase.firestore().collection('tasks');
    let response = await tasks.get(); //load tasks data from firestore server.
    response.forEach((i) => {
        console.log(i.data(), i.id);  // log dataset and id forEach stored task into console.
        let task = i.data();  // assign each dataset to an individual task. 
        task.id = i.id;  // assign each id to the individual task.
        allTasks.push(task); //push individual task into allTasks-Array.

    });
    loadAllTasks();
}

function loadAllTasks() {
    clearTaskStatus();
    loadTaskStatus();
}

function clearTaskStatus() {
    document.getElementById('boardToDo').innerHTML = '';
    document.getElementById('boardInProgress').innerHTML = '';
    document.getElementById('boardTesting').innerHTML = '';
    document.getElementById('boardDone').innerHTML = '';
}

function loadTaskStatus() {
    loadTasksToDo();
    loadTasksInProgress();
    loadTasksTesting();
    loadTasksDone();
}

function loadTasksToDo() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'todo') { //check if an individual tasksStatus from allTasks equals 'todo'. If true continue to display individual task from allTasks as structured below into 'boardToDo'-section. 
            document.getElementById('boardToDo').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

function loadTasksInProgress() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'inprogress') { //check if an individual tasksStatus from allTasks equals 'inprogress'. If true continue to display individual task from allTasks as structured below into 'boardInProgress'-section.
            document.getElementById('boardInProgress').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

function loadTasksTesting() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'testing') { //check if an individual tasksStatus from allTasks equals 'testing'. If true continue to display individual task from allTasks as structured below into 'boardTesting'-section.
            document.getElementById('boardTesting').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

function loadTasksDone() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'done') { //check if an individual tasksStatus from allTasks equals 'done'. If true continue to display individual task from allTasks as structured below into 'boardDone'-section.
            document.getElementById('boardDone').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

function deleteTask(id) {
    let index = allTasks.findIndex(t => t.id == id); 
    allTasks.splice(index, 1);
    loadAllTasks();
    firebase.firestore().collection('tasks').doc(id).delete();

}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(status) {
    let taskToMove = allTasks.find(task => task.id == currentDraggedElement);
    taskToMove.status = status;
    loadAllTasks();
    firebase.firestore().collection('tasks').doc(currentDraggedElement).set(taskToMove);
}

function showDetails(i) {
    document.getElementById('tasksDetails').classList.remove('d-none');

    showDetailsTitle(i);
    showDetailsAssignedUsers(i);
    showDetailsDueDate(i);
    showDetailsCategory(i);
    showDetailsUrgency(i);
    showDetailsDescription(i);
    showDetailsDelete(i)
}

function showDetailsTitle(i) {
    document.getElementById('tasksDetails').innerHTML += `
        <div class="details-box" id="details-box" style="background-color: ${allTasks[i]['taskcolor']}";>
        <div class="details-box-titel">${allTasks[i]['title']}</div>
        </div>
    `
}

function showDetailsAssignedUsers(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Users:</div>
            <div class="details-box-content details-box-content-overflow">${allTasks[i]['assignedusers'].join(", ")}</div>
        </div>
    `;
}

function showDetailsDueDate(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Due Date:</div>
            <div class="details-box-content">${allTasks[i]['duedate']}</div>
        </div>
    `; 
}

function showDetailsCategory(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Category:</div>
            <div class="details-box-content">${allTasks[i]['category']}</div>
        </div>
    `; 
}

function showDetailsUrgency(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Urgency:</div>
            <div class="details-box-content">${allTasks[i]['urgency']}</div>                    
        </div>
`; 
}

function showDetailsDescription(i) {
    document.getElementById('details-box').innerHTML += `
        <div>
            <div class="details-box-headline">Description:</div>
            <div class="details-box-content details-box-content-overflow">${allTasks[i]['description']}</div>
        </div>
    `; 
}

function showDetailsDelete(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="detail-box-delete">delete<img onclick='deleteTask(${JSON.stringify(allTasks[i]['id'])})' class="board-delete-task-icon" src="img/delete.png"></div>
    `; 
}

function closeDetails() {
    document.getElementById('tasksDetails').innerHTML = '';
    document.getElementById('tasksDetails').classList.add('d-none');
}
