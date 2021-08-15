function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
            //loadTasks();
            //showUserList();
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