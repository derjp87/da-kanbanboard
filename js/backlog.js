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
  let backLogs = firebase.firestore().collection('tasks'); // hier wird definiert, auf was er bei backLogs zugreifen soll. Datenbankpfad zu den Tasks!
  let response = await backLogs.get(); // er soll warten bis er die "backLogs" heruntergeladen hat, deswegen await und deswegen ist dies eine "async function"
  response.forEach((i) => { // er soll jeden einzelnen Eintrag in der collection "tasks" herunterladen
    console.log(i.data(), i.id);
    let backLogs = i.data();
    backLogs.id = i.id;
    allBackLogs.push(backLogs);
  });
  
  let backlogContainer = document.getElementById('mainContent');

  if (allBackLogs.length > 0) {
    backlogContainer.innerHTML = ``;
    for (let i = 0; i < allBackLogs.length; i++) {

      backlogContainer.innerHTML += `
        <div class="todo-container">
          <div class="assigned-to">
            <div id="backlog-color" class="category-color" style="background-color: ${allBackLogs[i]['taskcolor']};"></div>
              <div class="personal-data">
                <span id="backlog-name" class="name">${allBackLogs[i]['assignedusers']}</span>
                  <a id="backlog-email" href="#"></a>
              </div>
          </div>
          <div id="backlog-category" class="category">${allBackLogs[i]['category']}</div>
          <div id="backlog-details" class="details"></div>
        </div>
        `;
    }  
  }
   else {
    backlogContainer.innerHTML = `<div class="todo-container no-entries">"Keine Einträge vorhanden..."</div>`;
   }
  }

