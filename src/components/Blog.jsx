import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Button, Container, Typography, Box, TextField } from "@mui/material";

const BlogEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Jodit Editor Configuration
  const config = {
    readonly: false, // Allows text editing
    toolbar: true,
    height: 400,
    language: "en", // Sets the language to English

    // Image upload configuration
    uploader: {
      insertImageAsBase64URI: true, // Set to true if you want to store images as Base64
      url: "your-upload-endpoint", // Your API endpoint to handle image uploads
      filesVariableName: function () {
        return "file"; // The name of the file form field to handle on the server
      },
      format: "json",
      method: "POST", // You can set it to "POST" or "PUT" based on your API
      withCredentials: false,
      isSuccess: (resp) => resp.success, // Handle response success
      process: (resp) => resp.data.fileURL, // Handle the URL returned after successful upload
      error: (e) => {
        console.log(e);
      }
    },
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title for the post!");
      return;
    }
    if (!content.trim()) {
      alert("Please enter content for the article!");
      return;
    }

    const blogPost = {
      title,
      content,
      date: new Date().toISOString(),
    };

    const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    existingPosts.push(blogPost);
    localStorage.setItem("blogPosts", JSON.stringify(existingPosts));
    alert("The article has been saved successfully!");
    setTitle("");
    setContent("");
  };

  return (
    <Container maxWidth="md" className="container" sx={{ mt: 5 }}>
      <Typography variant="h4" className="title-text" gutterBottom>
        Blog Editor
      </Typography>
      <Box sx={{ mb: 2 }} className="textfield-title">
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Box>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        className="jodit-editor"
        onBlur={(newContent) => setContent(newContent)}
        onChange={() => {}}
      />
      <Box sx={{ mt: 2 }} className="save-button">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Post
        </Button>
      </Box>
    </Container>
  );
};

export default BlogEditor;
