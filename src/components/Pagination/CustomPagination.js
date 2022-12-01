import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 50,
      }}
    >
      <Pagination
        count={numOfPages}
        onChange={(e) => handlePageChange(e.target.textContent)}
        hideNextButton
        hidePrevButton
        size="large"
      />
    </div>
  );
};

export default CustomPagination;
