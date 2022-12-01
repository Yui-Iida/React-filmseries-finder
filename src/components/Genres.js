import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";
// import Chip from "@mui/material/Chip";

const Genres = ({
  type,
  selectedGenres,
  genres,
  setGenres,
  setSelectedGenres,
  setPage,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    fetchGenres();
    // return () => {
    //   setGenres({});
    // };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "10px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          label={genre.name}
          key={genre.id}
          // sx={{
          //   margin: 3,
          //   backgroundColor: "#777",
          //   color: "#fff",
          //   fontWeight: 600,
          // }}
          style={{ margin: 3, backgroundColor: "#bbb" }}
          size="small"
          clickable
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          variant="outlined"
          label={genre.name}
          key={genre.id}
          style={{ margin: 3, fontWeight: 600, color: "#777" }}
          size="small"
          clickable
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
