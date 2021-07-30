function addTaskCreate() {


    let title = document.getElementById("input-title").value;
    title = title.trim();
    if (title.length == 0) {
        console.error("Title is Empty");
    } else {
        
        // Add a new document with a generated id.
        db.collection("tasks").add({
            //TODO Gibt die Werte aus dem Formular hier rein.
            title: title,
            description: "Japan",
            urgency: "",
            datum: "",
            //:::::
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);

            })
            .catch((error) => {
                console.error("Error adding document: ", error);

            });
    }
}