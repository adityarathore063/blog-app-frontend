import React from "react";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom"
import axios from "axios"
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`)
  }

  const deleteRequest = async () => {
    const res = await axios.delete(`https://blog-app-api-s3xz.onrender.com/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"));
  }
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        marginTop: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon color="warning"/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error"/>
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName[0]}
          </Avatar>
        }
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      
      <CardContent>
      <hr/>
      <br/>
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b> {":"} {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
