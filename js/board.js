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
    document.getElementById('boardToDo').innerHTML = '';
    document.getElementById('boardInProgress').innerHTML = '';
    document.getElementById('boardTesting').innerHTML = '';
    document.getElementById('boardDone').innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'todo') {
            document.getElementById('boardToDo').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
        } else {
            if (tasksStatus == 'inprogress') {
                document.getElementById('boardInProgress').innerHTML += `
                <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
            } else {
                if (tasksStatus == 'testing') {
                    document.getElementById('boardTesting').innerHTML += `
                    <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
                } else {
                    document.getElementById('boardDone').innerHTML += `
                    <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
                }
            }
        }
    }
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
    firebase.firestore().collection('tasks').document(currentDraggedElement).set(taskToMove);
    reloadTasks();
}

function reloadTasks() {
    document.getElementById('boardToDo').innerHTML = '';
    document.getElementById('boardInProgress').innerHTML = '';
    document.getElementById('boardTesting').innerHTML = '';
    document.getElementById('boardDone').innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'todo') {
            document.getElementById('boardToDo').innerHTML += `
            <div draggable="true" ondragstart="startDragging(${allTasks[i]['id']})" class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
        } else {
            if (tasksStatus == 'inprogress') {
                document.getElementById('boardInProgress').innerHTML += `
                <div draggable="true" ondragstart="startDragging(${allTasks[i]['id']})" class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
            } else {
                if (tasksStatus == 'testing') {
                    document.getElementById('boardTesting').innerHTML += `
                    <div draggable="true" ondragstart="startDragging(${allTasks[i]['id']})" class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
                } else {
                    document.getElementById('boardDone').innerHTML += `
                    <div draggable="true" ondragstart="startDragging(${allTasks[i]['id']})" class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
                }
            }
        }
    }
}

function tasksDetails(i) {

}