import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialState = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

function AddForm(props) {
  const [movie, setMovie] = useState(initialState);
  const history = useHistory();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]:
        e.target.name === "stars" ? e.target.value.split(",") : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => {
        props.setMovieList(res.data);
        setMovie(initialState);
        history.push("/");
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="save-wrapper">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          placeholder="Stars (separate by comma)"
          value={movie.stars.join(",")}
          onChange={handleChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddForm;
