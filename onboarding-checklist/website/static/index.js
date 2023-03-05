
// Put Images, javascript, or css files in this folder
// src = "{{url_for('static', filename = 'index.js')}}"
function deleteNote(noteId) {
    fetch("/delete-note", {
      method: "POST",
      body: JSON.stringify({ noteId: noteId }),
    }).then((_res) => {
      window.location.href = "/";
    });
  }