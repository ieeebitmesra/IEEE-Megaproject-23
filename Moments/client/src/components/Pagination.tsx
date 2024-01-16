//@ts-nocheck
import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state: any) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/posts${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
      // renderItem={(item): any => {
      //   <PaginationItem {...item} component={Link} to={`/posts?page={${1}}`} />;
      // }}
    />
  );
};

export default Paginate;
