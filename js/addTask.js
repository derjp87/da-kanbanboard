function init() {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
            showUserList();
        } else {
            window.location.assign("index.html"); //if no user is signed in assign to index.
        }
    });
}

let userList = [];
let assignedUsers = [];

async function showUserList() {
    userList = [];
    let users = firebase.firestore().collection('users');
    let response = await users.get();
    //load user data from firestore server.
    response.forEach((i) => {
        console.log(i.data());
        userList.push(i.data());
    });
    //push user data into userList array + log data into console.
    document.getElementById('addTaskUserList').innerHTML = '';
    for (let i = 0; i < userList.length; i++) {
        if (JSON.stringify(userList[i]['displayName']) !== "null") {
            document.getElementById('addTaskUserList').innerHTML += `
        <div class="addTask-addUser" onclick="addTaskAddUser(${i})">${userList[i]['displayName']}</div>`;
        }
    } //display selectable userlist at addTask - except for anonymous user "null".
}

function addTaskAddUser(i) {
    if (!assignedUsers.includes(userList[i]['displayName'])) {
        assignedUsers.push(userList[i]['displayName']);
        //if selected user from displayed userList is not included as assignedUsers, push data into assignedUsers array.
        document.getElementById('addTaskAssignedTo').innerHTML = '';

        for (let i = 0; i < assignedUsers.length; i++) {
            document.getElementById('addTaskAssignedTo').innerHTML += `
            <div class="addTask-removeUser" onclick="addTaskRemoveUser(${i})">${assignedUsers[i]}</div>`;
        } //display assigned users from assignedUsers array.
    }
}

function addTaskRemoveUser(i) {
    assignedUsers.splice(i, 1);
    // remove selected assigned-user from assignedUsers array.
    document.getElementById('addTaskAssignedTo').innerHTML = '';
    for (let i = 0; i < assignedUsers.length; i++) {
        document.getElementById('addTaskAssignedTo').innerHTML += `
        <div class="addTask-removeUser" onclick="addTaskRemoveUser(${i})">${assignedUsers[i]}</div>`;
    } //clear and display updated assigned users.
}

function addTaskCreateCheck() {
    if (assignedUsers.length > 0) {
        document.getElementById('addTask-assignedTo-required').required = false;
    }
}

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
    }) //push input data.value of addTask-inputfields into collection 'tasks' at firestore server.
        .then((docRef) => {
            window.location.assign("board.html");
        }); //assign user after submit to board.html.
}

function changeColorOfMenu() {
    let mymenu = document.getElementById('addTaskColor');
    mymenu.style = `background-color: ${mymenu.value};`;
    // change shown addTaskColor-field to selected option-color.
}
