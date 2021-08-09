function init() {
    loadTasks();
}

let allTasks = [];

async function loadTasks() {
    allTasks = [];
    let tasks = firebase.firestore().collection('tasks');
    let response = await tasks.get();
    response.forEach((i) => {
        console.log(i.data());
        allTasks.push(i.data());

    });
    document.getElementById('boardToDo').innerHTML = '';
    document.getElementById('boardInProgress').innerHTML = '';
    document.getElementById('boardTesting').innerHTML = '';
    document.getElementById('boardDone').innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        let tasksStatus = allTasks[i]['status'];

        if (tasksStatus == 'todo') {
            document.getElementById('boardToDo').innerHTML += `
            <div class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
        } else {
            if (tasksStatus == 'inprogress') {
                document.getElementById('boardInProgress').innerHTML += `
                <div class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
            } else {
                if (tasksStatus == 'testing') {
                    document.getElementById('boardTesting').innerHTML += `
                    <div class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
                } else {
                    document.getElementById('boardDone').innerHTML += `
                    <div class="board-task" onclick="tasksDetails(${i})">${allTasks[i]['title']}</div>`;
                }
            }
        }
    }
}

function tasksDetails(i) {

}