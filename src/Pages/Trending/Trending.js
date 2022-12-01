import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { motion } from "framer-motion";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [contents, setContents] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&include_adult=false`
    );
    setContents(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  const scrollRef = useRef(null);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {contents &&
          contents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ y: "80%", opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ root: scrollRef }}
              transition={{ duration: 0.8 }}
            >
              <SingleContent
                key={content.id}
                id={content.id}
                poster={content.poster_path}
                title={content.title || content.name}
                date={content.first_air_date || content.release_date}
                media_type={content.media_type}
                vote_average={content.vote_average}
              />
            </motion.div>
          ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <CustomPagination setPage={setPage} />
      </motion.div>
    </div>
  );
};

export default Trending;
