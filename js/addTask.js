let userlist = [];

async function showUserList() {
    userlist = [];
    let users = firebase.firestore().collection('users');
    let response = await users.get();
    response.forEach((i) => {
        console.log(i.data());
        userlist.push(i.data());
    });
    document.getElementById('addTaskUserList').innerHTML ='';

    for (let i = 0; i < userlist.length; i++) {
        
        document.getElementById('addTaskUserList').innerHTML += `
        <div onclick="addTaskAddUser(${i})">${userlist[i]['displayName']}</div>`;
    }
}

function addTaskAddUser(i) {
    document.getElementById('addTaskAssignedTo').innerHTML += `
    <div>${userlist[i]['displayName']}</div>`;
}

function addTaskCreate() {
    let title = document.getElementById('addTaskTitle').value;
    let date = document.getElementById('addTaskDueDate').value;
    let category = document.getElementById('addTaskCategory').value;
    let urgency = document.getElementById('addTaskUrgency').value;
    let description = document.getElementById('addTaskDescription').value;
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
                db.collection("tasks-todo").add({
                    title: title,
                    duedate: date,
                    category: category,
                    urgency: urgency,
                    description: description,
                    
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
