import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Films.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { motion } from "framer-motion";
import Genres from "../../components/Genres";
import useGenres from "../../hooks/useGenre";

const Films = ({ theme }) => {
  const [page, setPage] = useState(1);
  const [contents, setContents] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const fetchFilms = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
    );
    setContents(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchFilms();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  const scrollRef = useRef(null);

  return (
    <div>
      <span className="pageTitle">Films</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="films">
        {contents &&
          contents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ y: "10px", opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ root: scrollRef }}
              transition={{ duration: 1 }}
            >
              <SingleContent
                key={content.id}
                id={content.id}
                poster={content.poster_path}
                title={content.title || content.name}
                date={content.first_air_date || content.release_date}
                media_type="movie"
                vote_average={content.vote_average}
                theme={theme}
              />
            </motion.div>
          ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <CustomPagination
          setPage={setPage}
          numOfPages={numOfPages}
          theme={theme}
        />
      </motion.div>
    </div>
  );
};

export default Films;
