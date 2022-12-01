import React, { useEffect, useState } from "react";
// import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import Carousel from "../Carousel/Carousel";

const style = {
  width: "70%",
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: "50px",
  border: "none",
};

const ContentModal = ({ children, media_type, id }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchContentData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchContentData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        onClick={handleOpen}
        className="media"
        // color="inherit"
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className="ContentModal">
                <img
                  className="ContentModal__portrait "
                  alt={content.name || content.title}
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                />
                <img
                  className="ContentModal__landscape"
                  alt={content.name || content.title}
                  src={
                    content.poster_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline"> {content.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    // color="primary"
                    backgroundColor="#333"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    // style={{ margin: "10px 50px 20px 50px", fontWeight: 700 }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: "#777",
                      color: "#fff",
                      padding: "10px 0px",
                      margin: "20px 50px 10px 50px",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
};

export default ContentModal;
