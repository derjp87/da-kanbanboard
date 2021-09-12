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
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        } else {
            if (tasksStatus == 'inprogress') {
                document.getElementById('boardInProgress').innerHTML += `
                <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
            } else {
                if (tasksStatus == 'testing') {
                    document.getElementById('boardTesting').innerHTML += `
                    <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
                } else {
                    document.getElementById('boardDone').innerHTML += `
                    <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
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

function showDetails(i) {
    document.getElementById('tasksDetails').classList.remove('d-none');
    document.getElementById('tasksDetails').innerHTML = `
    <div class="details-box" style="background-color: ${allTasks[i]['taskcolor']}";>
    <div class="details-box-titel">${allTasks[i]['title']}</div>
    <div class="details-box-line">
        <div class="details-box-headline">Users:</div>
        <div class="details-box-content details-box-content-overflow">${allTasks[i]['assignedusers']}</div>
    </div>
    <div class="details-box-line">
        <div class="details-box-headline">Due Date:</div>
        <div class="details-box-content">${allTasks[i]['duedate']}</div>
    </div>
    <div class="details-box-line-double">
        <div>
            <div class="details-box-headline">Category:</div>
            <div class="details-box-content">${allTasks[i]['category']}</div>
        </div>
        <div class="details-box-urgency">
            <div class="details-box-headline">Urgency:</div>
            <div class="details-box-content">${allTasks[i]['urgency']}</div>                    
        </div>
    </div>
    <div>
        <div class="details-box-headline">Description:</div>
        <div class="details-box-content details-box-content-overflow">${allTasks[i]['description']}</div>
    </div>
    <div class="detail-box-delete">delete<img onclick='deleteTask(${JSON.stringify(allTasks[i]['id'])})' class="board-delete-task-icon" src="img/delete.png"></div>
</div>
    `;
}

function closeDetails() {
    document.getElementById('tasksDetails').classList.add('d-none');
}
