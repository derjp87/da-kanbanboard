function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
            loadTasks();
            //showUserList();
            //initNavBar(user);
            //setDateMinToday();
            //setTasks(user.uid);
            //setUsers();
        } else {
            // No user is signed in.
            window.location.assign("index.html");
        }
    });
  }

let allTasks = [];

async function loadTasks() {
    allTasks = [];
    let tasks = firebase.firestore().collection('tasks');
    let response = await tasks.get();
    response.forEach((i) => {
         console.log(i.data(), i.id);
         let task = i.data();
         task.id = i.id;
         allTasks.push(task);

    });
    loadAllTasks();
}

function loadAllTasks() {
    document.getElementById('boardToDo').innerHTML = '';
    document.getElementById('boardInProgress').innerHTML = '';
    document.getElementById('boardTesting').innerHTML = '';
    document.getElementById('boardDone').innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'todo') {
            document.getElementById('boardToDo').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails()"><div>${allTasks[i]['title']}</div><img onclick='deleteTask(${JSON.stringify(allTasks[i]['id'])})' class="board-delete-task-icon" src="img/delete.png"></div>`;
        } else {
            if (tasksStatus == 'inprogress') {
                document.getElementById('boardInProgress').innerHTML += `
                <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails()"><div>${allTasks[i]['title']}</div><img onclick='deleteTask(${JSON.stringify(allTasks[i]['id'])})' class="board-delete-task-icon" src="img/delete.png"></div>`;
            } else {
                if (tasksStatus == 'testing') {
                    document.getElementById('boardTesting').innerHTML += `
                    <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails()"><div>${allTasks[i]['title']}</div><img onclick='deleteTask(${JSON.stringify(allTasks[i]['id'])})' class="board-delete-task-icon" src="img/delete.png"></div>`;
                } else {
                    document.getElementById('boardDone').innerHTML += `
                    <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails()"><div>${allTasks[i]['title']}</div><img onclick='deleteTask(${JSON.stringify(allTasks[i]['id'])})' class="board-delete-task-icon" src="img/delete.png"></div>`;
                }
            }
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
    let taskToMove = allTasks.find ( task => task.id == currentDraggedElement );
    taskToMove.status = status;
    loadAllTasks();
    firebase.firestore().collection('tasks').doc(currentDraggedElement).set(taskToMove);
}

function showDetails() {
    document.getElementById('tasksDetails').classList.remove('d-none');
}

function closeDetails() {
    document.getElementById('tasksDetails').classList.add('d-none');
}
