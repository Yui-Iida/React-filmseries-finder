import { Button, Tab, Tabs } from "@mui/material";
import { TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Search.css";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [contents, setContents] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&include_adult=false&query=${searchText}&page=${page}`
    );
    setContents(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <>
      <div style={{ display: "flex", margin: "50px 30px" }}>
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginLeft: 15 }}
          onClick={fetchSearch}
        >
          <SearchOutlinedIcon />
        </Button>
      </div>

      <Tabs
        value={type}
        indicatorColor="secondary"
        textColor="secondary"
        style={{
          paddingBottom: "20px",
        }}
        onChange={(e, newVal) => {
          setType(newVal);
          setPage(1);
        }}
      >
        <Tab style={{ width: "50%" }} label="Search Films" />
        <Tab style={{ width: "50%" }} label="Search Series" />
      </Tabs>

      <div className="results">
        {contents &&
          contents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ y: "10px", opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              // viewport={{ root: scrollRef }}
              transition={{ duration: 1 }}
            >
              <SingleContent
                key={content.id}
                id={content.id}
                poster={content.poster_path}
                title={content.title || content.name}
                date={content.first_air_date || content.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={content.vote_average}
              />
            </motion.div>
          ))}
        {/* {searchText && contents.length === 0 && ( */}
        {searchText && <h3 style={{ marginTop: "100px" }}>No Content Found</h3>}
      </div>

      {numOfPages > 1 && (
        <motion.div initial={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        </motion.div>
      )}
    </>
  );
};

export default Search;
