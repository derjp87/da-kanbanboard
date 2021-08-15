function init() {

  firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
          // User is signed in.
          includeHTML();
          //loadTasks();
          //showUserList();
          renderBacklog();
          //initNavBar(user);
          //setDateMinToday();
          //setTasks(user.uid);
          //setUsers();
      } else {
          // No user is signed in.
          window.location.assign("index.html");
      }
  });
}

let allBackLogs = [];

function renderBacklog() {
  let backlogContainer = document.getElementById('mainContent');

  if(allBackLogs.length > 0) {
// backlogContainer.innerHTML = ``;
 // for (let i = 0; i < allBacklogs.length; i++) {
   // let backlog = allBacklogs[i];
    backlogContainer.innerHTML += `
    <div class="todo-container">
    <div class="assigned-to">
      <div id="backlog-color" class="category-color"></div>
      <img id="backlog-img" class="personal-img" src=""/>
      <div class="personal-data">
        <span id="backlog-name" class="name"></span>
        <a id="backlog-email" href="#"></a>
      </div>
    </div>
    <div id="backlog-category" class="category"></div>
    <div id="backlog-details" class="details">
    </div>
  </div>
    `;    
} else {
  backlogContainer.innerHTML = `<div class="todo-container no-entries">"Keine Einträge vorhanden..."</div>`;

}

}
