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
  let response = await backLogs.get();
  response.forEach((i) => {
    console.log(i.data(), i.id);
    let backLogs = i.data();
    backLogs.id = i.id;
    allBackLogs.push(backLogs);
  });
  showBacklog();
}

function showBacklog() {
  if (allBackLogs.length > 0) {
    document.getElementById('mainContent').innerHTML = ``;
    for (let i = 0; i < allBackLogs.length; i++) {
      loadBacklogs(i);
  }
  } else {
    backlogContainer.innerHTML = `<div class="todo-container no-entries">"Keine Einträge vorhanden..."</div>`;
  }
}

function loadBacklogs(i) {
  document.getElementById('mainContent').innerHTML += `
  <div class="todo-container" onclick="openBoard()">
    <div class="assigned-to">
      <div id="backlog-color" class="category-color" style="background-color: ${allBackLogs[i]['taskcolor']};"></div>
        <div class="personal-data">
          <span id="backlog-name" class="name">${allBackLogs[i]['assignedusers']}</span>
            <a id="backlog-email" href="#"></a>
        </div>
    </div>
    <div id="backlog-category" class="category">${allBackLogs[i]['category']}</div>
    <div id="backlog-details" class="details">${allBackLogs[i]['title']}</div>
  </div>
  `;
}

function openBoard() {
  window.location.href = 'board.html';
}
