/**
 * This function initializes the site:
 * 
 * Checks if a user is signed in
 * Initializes site if true
 * Assigns back to Index if not
 */

function init() {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {  
            includeHTML();
            loadTasks();
        } else {  
            window.location.assign("index.html");
        }
    });
}



let allTasks = [];

/**
 * This function loads Tasks:
 * 
 * Loads tasks data from firestore server.
 * Logs dataset and id forEach stored task into console.
 * Assigns each dataset to an individual task.
 * Assigns each id to the individual task.
 * Pushes individual task into allTasks-Array.
 * Initializes function continuing to display loaded Tasks. 
 */

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

/**
 * This function initializes functions to update; clear and display current Tasks.
 */

function loadAllTasks() {
    clearTaskStatus();
    loadTaskStatus();
}

/**
 * This function clears the board display.
 */

function clearTaskStatus() {
    document.getElementById('boardToDo').innerHTML = '';
    document.getElementById('boardInProgress').innerHTML = '';
    document.getElementById('boardTesting').innerHTML = '';
    document.getElementById('boardDone').innerHTML = '';
}

/**
 * This function initializes functions to display Tasks into specific sections.
 */

function loadTaskStatus() {
    loadTasksToDo();
    loadTasksInProgress();
    loadTasksTesting();
    loadTasksDone();
}

/**
 * This function displays all specific tasks into "To Do"-Section:
 * 
 * Checks if an individual tasksStatus from allTasks equals 'todo'. 
 * If true continues to display individual task from allTasks as structured below into 'boardToDo'-section. 
 */

function loadTasksToDo() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'todo') { 
            document.getElementById('boardToDo').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

/**
 * This function displays all specific tasks into "In Progress"-Section:
 * 
 * Checks if an individual tasksStatus from allTasks equals 'inprogress'. 
 * If true continues to display individual task from allTasks as structured below into 'boardInProgress'-section. 
 */

function loadTasksInProgress() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'inprogress') { 
            document.getElementById('boardInProgress').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

/**
 * This function displays all specific tasks into "Testing"-Section:
 * 
 * Checks if an individual tasksStatus from allTasks equals 'testing'. 
 * If true continues to display individual task from allTasks as structured below into 'boardTesting'-section. 
 */

function loadTasksTesting() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'testing') { 
            document.getElementById('boardTesting').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

/**
 * This function displays all specific tasks into "Done"-Section:
 * 
 * Checks if an individual tasksStatus from allTasks equals 'done'. 
 * If true continues to display individual task from allTasks as structured below into 'boardDone'-section. 
 */

function loadTasksDone() {
    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'done') { 
            document.getElementById('boardDone').innerHTML += `
            <div draggable="true" ondragstart='startDragging(${JSON.stringify(allTasks[i]['id'])})' class="board-task" style="background-color: ${allTasks[i]['taskcolor']};" onclick="showDetails(${i})"><div>${allTasks[i]['title']}</div></div>`;
        }
    }
}

/**
 * This function deletes a selected Task:
 * 
 * Searches for index of Task with specific Id in AllTasks-array.
 * Deletes Task from Array with specific Index.
 * Initializes function to update; clear and display current Tasks.
 * Deletes Task from firestore-collection with specific Id.
 * 
 * @param {string} id - This is the id of the selected task.
 */

function deleteTask(id) {
    let index = allTasks.findIndex(t => t.id == id); 
    allTasks.splice(index, 1);
    loadAllTasks();
    firebase.firestore().collection('tasks').doc(id).delete();

}

/**
 * This function initializes the dragging of an element.
 * 
 * Sets id of specific element equal to currentDraggedElement.
 * 
 * @param {string} id - This is the id of the dragged element.
 */

function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * This function allows drop of dragged Element without otherwise initialized onclick-function.
 * 
 * @param {ondragover} event - this is the element you want to drag and drop
 */

function allowDrop(event) {
    event.preventDefault();
}

/**
 * This function sets a moved(dragged) Task to the specific status.
 * 
 * @param {*} status 
 */

function moveTo(status) {
    let taskToMove = allTasks.find(task => task.id == currentDraggedElement);
    taskToMove.status = status;
    loadAllTasks();
    firebase.firestore().collection('tasks').doc(currentDraggedElement).set(taskToMove);
}

/**
 * This function initializes functions in order to displays the details of a specific task.
 * 
 * @param {index} i - This is the index of the specific task. 
 */

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

/**
 * This function displays the title and chosen color of a specific task.
 * 
 * @param {index} i - This is the index of the specific task.
 */

function showDetailsTitle(i) {
    document.getElementById('tasksDetails').innerHTML += `
        <div class="details-box" id="details-box" style="background-color: ${allTasks[i]['taskcolor']}";>
        <div class="details-box-titel">${allTasks[i]['title']}</div>
        </div>
    `
}

/**
 * This function displays the assigned users of a specific task.
 * 
 * @param {index} i - This is the index of the specific task.
 */

function showDetailsAssignedUsers(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Users:</div>
            <div class="details-box-content details-box-content-overflow">${allTasks[i]['assignedusers'].join(", ")}</div>
        </div>
    `;
}

/**
 * This function displays the due date of a specific task.
 * 
 * @param {index} i - This is the index of the specific task.
 */

function showDetailsDueDate(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Due Date:</div>
            <div class="details-box-content">${allTasks[i]['duedate']}</div>
        </div>
    `; 
}

/**
 * This function displays the category of a specific task.
 * 
 * @param {index} i - This is the index of the specific task.
 */

function showDetailsCategory(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Category:</div>
            <div class="details-box-content">${allTasks[i]['category']}</div>
        </div>
    `; 
}

/**
 * This function displays the urgency of a specific task.
 * 
 * @param {index} i - This is the index of the specific task.
 */

function showDetailsUrgency(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="details-box-line">
            <div class="details-box-headline">Urgency:</div>
            <div class="details-box-content">${allTasks[i]['urgency']}</div>                    
        </div>
`; 
}

/**
 * This function displays the description of a specific task.
 * 
 * @param {index} i - This is the index of the specific task.
 */

function showDetailsDescription(i) {
    document.getElementById('details-box').innerHTML += `
        <div>
            <div class="details-box-headline">Description:</div>
            <div class="details-box-content details-box-content-overflow">${allTasks[i]['description']}</div>
        </div>
    `; 
}

/**
 * This function renders the option to delete a specific task.
 * 
 * @param {index} i - This is the index of the specific task.
 */

function showDetailsDelete(i) {
    document.getElementById('details-box').innerHTML += `
        <div class="detail-box-delete">delete<img onclick='deleteTask(${JSON.stringify(allTasks[i]['id'])})' class="board-delete-task-icon" src="img/delete.png"></div>
    `; 
}

/**
 * This function clears and hides the detail window of specific tasks.
 */

function closeDetails() {
    document.getElementById('tasksDetails').innerHTML = '';
    document.getElementById('tasksDetails').classList.add('d-none');
}
