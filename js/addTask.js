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
            showUserList();
        } else {
            window.location.assign("index.html"); 
        }
    });
}

let userList = [];
let assignedUsers = [];

/**
 * This function displays the selectable UserList:
 * 
 * Loads user data from firestore server
 * Pushes user data into userList array + log data into console.
 * Displays selectable userlist at addTask - except for anonymous user "null".
 */

async function showUserList() {
    userList = [];
    let users = firebase.firestore().collection('users');
    let response = await users.get();
    response.forEach((i) => {
        console.log(i.data());
        userList.push(i.data());
    });
    document.getElementById('addTaskUserList').innerHTML = '';
    for (let i = 0; i < userList.length; i++) {
        if (JSON.stringify(userList[i]['displayName']) !== "null") {
            document.getElementById('addTaskUserList').innerHTML += `
        <div class="addTask-addUser" onclick="addTaskAddUser(${i})">${userList[i]['displayName']}</div>`; }
    } 
}


/**
 * This function adds and displays selected User to Assigned Users:
 * 
 * If selected user from displayed userList is not included as assignedUsers, push data into assignedUsers array.
 * Displays assigned users from assignedUsers array.
 * 
 * @param {index} i - This is the index of the specific user.
 */

function addTaskAddUser(i) {
    if (!assignedUsers.includes(userList[i]['displayName'])) {
        assignedUsers.push(userList[i]['displayName']);
        document.getElementById('addTaskAssignedTo').innerHTML = '';

        for (let i = 0; i < assignedUsers.length; i++) {
            document.getElementById('addTaskAssignedTo').innerHTML += `
            <div class="addTask-removeUser" onclick="addTaskRemoveUser(${i})">${assignedUsers[i]}</div>`;
        } 
    }
}


/**
 * This function removes a selected assigned-User from assignedUsers-array.
 * Then clears and displays updated assigned users-list.
 * 
 * @param {index} i - This is the index of the specific user.
 */

function addTaskRemoveUser(i) {
    assignedUsers.splice(i, 1);
    document.getElementById('addTaskAssignedTo').innerHTML = '';
    for (let i = 0; i < assignedUsers.length; i++) {
        document.getElementById('addTaskAssignedTo').innerHTML += `
        <div class="addTask-removeUser" onclick="addTaskRemoveUser(${i})">${assignedUsers[i]}</div>`;
    } 
}

/**
 * This function checks if at least one User has been assigned to Task in order to submit.
 */

function addTaskCreateCheck() {
    if (assignedUsers.length > 0) {
        document.getElementById('addTask-assignedTo-required').required = false;
    }
}

/**
 * This function submits the input Task:
 * 
 * Pushes input data.value of addTask-inputfields into collection 'tasks' at firestore server.
 * Assigns user after submit to board.html.
 */

function addTaskCreate() {
    var db = firebase.firestore();
    db.collection('tasks').add({
        title: document.getElementById('addTaskTitle').value.trim(),
        duedate: document.getElementById('addTaskDueDate').value,
        category: document.getElementById('addTaskCategory').value,
        urgency: document.getElementById('addTaskUrgency').value,
        description: document.getElementById('addTaskDescription').value.trim(),
        assignedusers: assignedUsers,
        status: 'todo',
        taskcolor: document.getElementById('addTaskColor').value,
    }) 
        .then((docRef) => {
            window.location.assign("board.html");
        }); 
}

/**
 * This function changes the background-color of the shown addTaskColor-field to the selected option-color.
 */

function changeColorOfMenu() {
    let mymenu = document.getElementById('addTaskColor');
    mymenu.style = `background-color: ${mymenu.value};`;
}
