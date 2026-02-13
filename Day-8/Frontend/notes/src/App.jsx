import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function fetchHandler() {
    axios.get("http://localhost:5000/api/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data.note);
    });
  }
  function submitHandler(e) {
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:5000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchHandler();
      });
  }

  useEffect(() => {
    fetchHandler();
  }, []);

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
              <p>{note.discription}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
