function init() {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
            showUserList();
        } else {
            window.location.assign("index.html");
        }
    });
  }

let userList = [];
let assignedUsers = [];

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
        document.getElementById('addTaskUserList').innerHTML += `
        <div class="addTask-addUser" onclick="addTaskAddUser(${i})">${userList[i]['displayName']}</div>`;
    }
}

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

function addTaskRemoveUser(i) {
    assignedUsers.splice(i, 1);
    document.getElementById('addTaskAssignedTo').innerHTML = '';
    for (let i = 0; i < assignedUsers.length; i++) {
        document.getElementById('addTaskAssignedTo').innerHTML += `
        <div class="addTask-removeUser" onclick="addTaskRemoveUser(${i})">${assignedUsers[i]}</div>`;
    }
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
        })
        .then((docRef) => {
        window.location.assign("board.html");
        });
}

function changeColorOfMenu() {
    let mymenu = document.getElementById('addTaskColor');
    mymenu.style = `background-color: ${mymenu.value};`;
}
