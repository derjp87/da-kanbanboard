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
      renderBacklog();
    } else { 
      window.location.assign("index.html");
    }
  });
}

let allBackLogs = [];

/**
 * This function renders the Backlog:
 * 
 * Loads tasks data from firestore server.
 * Logs dataset and id forEach stored task into console.
 * Assigns each dataset to an individual backlog.
 * Assigns each id to the individual backlog.
 * Pushes individual backlog into allBackLogs-Array.
 * Initializes function to display allBackLogs-Array.
 */

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

/**
 * This function displays the Backlog (from allBackLogs-Array):
 * 
 * If at least one backlog has been created, continue to load (and display) each.
 * If not displays : "no-entries".
 */

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

/**
 * This function displays a list with each individual backlog. Each individual backlog-object is taken from allBackLogs-array.
 * 
 * @param {index} i - This is the index of a specific backlog-object.
 */

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
  `;  
}

/**
 * This function assigns user via individual backlog-onclick to board.html.
 */

function openBoard() {
  window.location.href = 'board.html'; 
}
