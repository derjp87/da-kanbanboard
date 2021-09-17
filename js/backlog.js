function init() {
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) { // User is signed in.
      includeHTML();
      renderBacklog();
    } else { // No user is signed in.
      window.location.assign("index.html");
    }
  });
}

let allBackLogs = [];

async function renderBacklog() {
  allBackLogs = [];
  let backLogs = firebase.firestore().collection('tasks');
  let response = await backLogs.get(); //load tasks data from firestore server.
  response.forEach((i) => {
    console.log(i.data(), i.id); // log dataset and id forEach stored task into console.
    let backLogs = i.data(); // assign each dataset to an individual backlog. 
    backLogs.id = i.id; // assign each id to the individual backlog.
    allBackLogs.push(backLogs); //push individual backlog into allBackLogs-Array.
  });  
  showBacklog();
}

function showBacklog() {
  if (allBackLogs.length > 0) {
    document.getElementById('mainContent').innerHTML = ``;
    for (let i = 0; i < allBackLogs.length; i++) {
      loadBacklogs(i); // if at least one backlog has been created, continue to load (and display) each.
    }
  } else {
    backlogContainer.innerHTML = `<div class="todo-container no-entries">"Keine Einträge vorhanden..."</div>`;
  } //otherwise display "no-entries".
}

function loadBacklogs(i) {
  document.getElementById('mainContent').innerHTML += `
  <div class="todo-container" onclick="openBoard()">   
    <div class="assigned-to">
      <div id="backlog-color" class="category-color" style="background-color: ${allBackLogs[i]['taskcolor']};"></div>
        <div class="personal-data">
          <span id="backlog-name" class="name">${allBackLogs[i]['assignedusers'].join(", ")}</span>
            <a id="backlog-email" href="#"></a>
        </div>
    </div>
    <div id="backlog-category" class="category">${allBackLogs[i]['category']}</div>
    <div id="backlog-details" class="details">${allBackLogs[i]['title']}</div>
  </div>
  `; //display a list of each individual backlog as structured above. Each individual backlog-dataset-object is taken from allBackLogs-array. 
}

function openBoard() {
  window.location.href = 'board.html'; // assign user via individual backlog-onclick to board.html.
}
