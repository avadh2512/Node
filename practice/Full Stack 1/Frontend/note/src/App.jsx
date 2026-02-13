import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  
  function getData() {
    axios.get("https://node-l1id.onrender.com/api/notes").then((res) => {

      
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("https://node-l1id.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        getData();
      });
  }

  function deleteNote(id) {
    axios.delete("https://node-l1id.onrender.com/api/notes/" + id).then((res) => {
      console.log(res.data);
      getData();
    });

    console.log(id);
  }

  function updateHandler(id, description) {
    const newDescription = prompt();
    axios
      .patch("https://node-l1id.onrender.com/api/notes/" + id, {
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        getData();
      });
  }

  return (
    <>
      <form className="input-field" onSubmit={submitHandler}>
        <input type="text" required name="title" placeholder="title" />
        <input
          type="text"
          required
          name="description"
          placeholder="description"
        />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  deleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updateHandler(note._id, note.description);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
