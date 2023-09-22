import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Send as SendIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import "./bookdetail.css";

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(8),
  display: "flex",
  alignItems: "center",
}));

const Media = styled(CardMedia)(({ theme }) => ({
  height: 400,
  width: 300,
  position: "relative",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(0.9)",
  },
}));

const BookDetailsPage = ({ books, handleAddToCartrent }) => {
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log("carttbook details", cartItems);
  const user = useSelector((state) => state.auth.user);
  const [isLiked, setIsLiked] = useState(false);

  if (user) {
    console.log("kkkkk", user.Users.name);
  }
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { bookId } = useParams();
  const book = books.find((book) => book._id === bookId);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log("commenet", comments);
  // Function to handle comment submission
  const handleCommentSubmit = () => {
    const newobj = {
      user: user.Users.name,
      bookid: bookId,
      comments: newComment,
    };
    if (newComment.trim() !== "") {
      // Create a new comment object with a unique id
      const comment = { id: comments.length + 1, text: newComment };

      // Add the new comment to the comments list
      setComments([...comments, comment]);

      axios.post("http://localhost:4000/comments/create-user", newobj);
      // Clear the input field
      setNewComment("");
    }
  };
  const handleLikeClick = () => {
    // axios.post("http://localhost:4000/fav/create-user", obj);

    setIsLiked(!isLiked);

    // Assuming you have a unique bookId for the book being liked/disliked
    const bookId = book._id; // Replace this with your actual book ID

    // Update the server with the new liked status
    axios
      .put(`http://localhost:4000/fav/update-user/${user.Users._id}`, {
        bookId: bookId,
        isLiked: !isLiked,
      })
      .then((response) => {
        console.log(response.data);
        // Update any necessary state or UI based on the response
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if needed
      });
  };

  if (!bookId) {
    return <div>Book ID not provided.</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  // Calculate star width based on ratingh
  const maxRating = 5;
  const starRating = parseFloat(book.Rating.$numberDecimal) * (maxRating / 10);
  const fullStars = Math.floor(starRating);
  const remainingStars = starRating - fullStars;
  const hasHalfStar = remainingStars >= 0.25 && remainingStars < 0.75;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book details
      </Typography>

      <Container>
        <div className="bookdetails-card-componenet">
          <div className="product-image">
            <Media image={book.imagelink} title={book.title} />
          </div>

          <div className="product-details">
            <CardContent className="cardcontent-book-details">
              <Typography
                className="booktit"
                variant="h5"
                gutterBottom
                style={{ textAlign: "left" }}
              >
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "#BB2525",
                  }}
                >
                  {book.title}
                </span>
              </Typography>
              <Typography
                className="autitle"
                variant="subtitle1"
                gutterBottom
                style={{ textAlign: "left" }}
              >
                <span style={{ fontWeight: "bold", color: "#BB2525" }}>
                  Author:{" "}
                </span>
                {book.author}
              </Typography>
              <Typography
                // variant="subtitle1"
                paragraph
                sx={{ textAlign: "justify" }}
                className="bookdetails-para"
              >
                <span style={{ fontWeight: "bold", color: "#BB2525" }}>
                  About the book:
                </span>{" "}
                {book.description}
              </Typography>
              <div className="product-rating">
                {starRating.toFixed(1)}:
                {Array.from({ length: fullStars }, (_, index) => (
                  <StarIcon key={index} className="staric" />
                ))}
                {hasHalfStar && <StarHalfIcon className="staric" />}
                {isAuthenticated && (
                  <IconButton
                    color={isLiked ? "error" : "default"}
                    onClick={handleLikeClick}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </div>

              {isAuthenticated && (
                <div className="comments-section">
                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  <div className="comment-form">
                    <TextField
                      label="Write a comment"
                      variant="outlined"
                      fullWidth
                      multiline
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                      onClick={handleCommentSubmit}
                    >
                      Send
                    </Button>
                  </div>
                  <List className="comment-list">
                    {comments
                      .filter((comment) => comment.bookid === bookId)
                      .map((comment) => (
                        <React.Fragment key={comment._id}>
                          <ListItem className="comment-item">
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1">
                                  <span className="comment-user">
                                    {comment.user}
                                  </span>{" "}
                                  <span className="comment-date">
                                    {/* You can format the date here */}
                                  </span>
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body1"
                                  className="comment-text"
                                >
                                  {comment.comments}
                                </Typography>
                              }
                            />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                  </List>
                </div>
              )}

              <div className="btn-shop-book-book-details">
                <Button
                  variant="contained"
                  color="error"
                  className="Btn-Buy-shop-book-details"
                  onClick={() => handleAddToCartrent(book)}
                >
                  Add Cart
                </Button>

                <Button
                  className="Btn-Buy-rent-book-details"
                  variant="outlined"
                  color="error"
                  onClick={() => handleAddToCartrent(book, true)}
                >
                  Rent
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookDetailsPage;
