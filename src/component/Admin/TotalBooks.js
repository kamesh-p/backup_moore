import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import "./TotalBooks.css";
import axios from "axios";
const TotalBooks = () => {
  const [book, setbooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/books")
      .then((response) => response.json())
      .then((data) => setbooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log("book", book);

  const handleDeleteBook = async (id) => {
    await axios.delete(`http://localhost:4000/books/delete-user/${id}`);
    setbooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };
  return (
    <div className="books-grid">
      {book.map((book, index) => (
        <Card
          key={index}
          sx={{ maxWidth: 345 }}
          className="Card-indiv-book-search-about"
        >
          <CardActionArea className="container-about-content-detail">
            <CardMedia
              component="img"
              height="140"
              image={book.imagelink}
              alt={book.title}
            />

            <CardContent className="CardContent-details">
              <Typography
                gutterBottom
                variant="p"
                component="div"
                className="CardContent-title"
              >
                {book.title}
              </Typography>
            </CardContent>
            <div className="btn-container-About">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteBook(book._id)}
              >
                Delete
              </Button>
            </div>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default TotalBooks;
