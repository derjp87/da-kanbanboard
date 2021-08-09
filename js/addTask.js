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
        <div onclick="addTaskAddUser(${i})">${userList[i]['displayName']}</div>`;
    }
}

function addTaskAddUser(i) {

    if (!assignedUsers.includes(userList[i]['displayName'])) {
        assignedUsers.push(userList[i]['displayName']);
        document.getElementById('addTaskAssignedTo').innerHTML = '';

        for (let i = 0; i < assignedUsers.length; i++) {
            document.getElementById('addTaskAssignedTo').innerHTML += `
            <div onclick="addTaskRemoveUser(${i})">${assignedUsers[i]}</div>`;
        }
    }

}

function addTaskRemoveUser(i) {

        assignedUsers.splice(i, 1);
        document.getElementById('addTaskAssignedTo').innerHTML = '';

        for (let i = 0; i < assignedUsers.length; i++) {
            document.getElementById('addTaskAssignedTo').innerHTML += `
            <div onclick="addTaskRemoveUser(${i})">${assignedUsers[i]}</div>`;
        }
    }


function addTaskCreate() {
    let title = document.getElementById('addTaskTitle').value;
    let date = document.getElementById('addTaskDueDate').value;
    let category = document.getElementById('addTaskCategory').value;
    let urgency = document.getElementById('addTaskUrgency').value;
    let description = document.getElementById('addTaskDescription').value;
    users = assignedUsers;
    title = title.trim();
    description = description.trim();  //trim löscht die leerzeichen am anfang und am ende eines textes

    var db = firebase.firestore();

    if (title.length == 0) {
        alert('Please enter a title!');
    } else {
        if (description.length == 0) {
            alert('Please enter a description!');
        } else {
            if (date.length == 0) {
                alert('Please enter a due date!');
            } else {
                if (assignedUsers.length == 0) {
                    alert('Please assign user!')
                } else {
                db.collection('tasks').add({
                    title: title,
                    duedate: date,
                    category: category,
                    urgency: urgency,
                    description: description,
                    assignedusers: users,
                    status: 'todo',
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        window.location.assign("board.html");

                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);

                    });
                }
            }
        }
    }
}
