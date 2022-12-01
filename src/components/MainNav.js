import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "6vh",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#FA4067",
    zIndex: 100,
  },
});

const MainNav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/films");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onClick={() => window.scrollTo(0, 0)}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "white", fontWeight: 900 }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white", fontWeight: 900 }}
        label="Films"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white", fontWeight: 900 }}
        label="Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white", fontWeight: 900 }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
};

export default MainNav;
