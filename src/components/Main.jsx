import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider } from '@mui/material';
import Markdown from 'markdown-to-jsx';

function Main({ posts, title }) {

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        <Markdown>{title}</Markdown>
      </Typography>
      <Divider />
        <Markdown>{posts}</Markdown>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;