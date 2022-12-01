import Badge from "@mui/material/Badge";
import React from "react";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const badgeStyle = {
    "& .MuiBadge-badge": {
      color: "white",
      fontWeight: 800,
    },
  };

  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        overlap="rectangular"
        badgeContent={vote_average.toFixed(1)}
        color={vote_average > 7 ? "primary" : "secondary"}
        sx={badgeStyle}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />

      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "Series" : "Film"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
