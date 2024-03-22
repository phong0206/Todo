/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-children-prop */
import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { API_URL } from '../../utils/config';
const BlogContent = ({ blog }: any) => {
  return (
    <Box>
      <Typography sx={{ fontFamily: 'Times New Roman' }}>
        {blog.imageId && (
          <img
            src={`${API_URL}/${blog.path}`}
            alt="Blog Image"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        <ReactMarkdown children={blog.content} />
      </Typography>
    </Box>
  );
};

export default BlogContent;
