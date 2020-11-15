import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

function UpdateForm(props) {
  const [movie, setMovie] = useState(initialState);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    setMovie(
      ...props.movies.filter((movie) => {
        return movie.id === Number(params.id);
      })
    );
  }, [params.id, props.movies]);

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
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        props.setMovieList(
          props.movies.map((mv) => {
            if (mv.id === Number(params.id)) return res.data;
            return mv;
          })
        );
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
          placeholder="Stars"
          value={movie.stars.join(",")}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;
