import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Muvie as MovieType } from "../Muvielist_folder/Muvielist";
import { useMutation, useQueryClient } from "react-query";
import styles from "./Muvie_open_page.module.css";

const MuvieOpenPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [movie, setMovie] = useState<MovieType | undefined>();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${id}`).then(({ data }) => {
      setMovie(data);
      setComments(data.comments || []);
    });
  }, [id]);

  const addCommentMutation = useMutation(
    async (newComment: string) => {
      if (!movie) return;
      const { comments } = movie;
      const response = await axios.put(`http://localhost:3001/movies/${id}`, {
        id: movie?.id,
        title: movie?.title,
        genre: movie?.genre,
        year: movie?.year,
        director: movie?.director,
        rating: movie?.rating,
        image: movie?.image,
        comments: [...comments, newComment],
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setComments(data.comments || []);
        axios.get(`http://localhost:3001/movies/${id}`).then(({ data }) => {
          setMovie(data);
          setComments(data.comments || []);
        });

        setCommentText("");
      },
      onError: (error) => {
        console.error("Error adding comment:", error);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["movie", id]);
      },
    }
  );

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      addCommentMutation.mutate(commentText);
    }
  };

  if (!movie) {
    return null;
  }

  const handleDelete = async (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    await axios.put(`http://localhost:3001/movies/${id}`, {
      id: movie?.id,
      title: movie?.title,
      genre: movie?.genre,
      year: movie?.year,
      director: movie?.director,
      rating: movie?.rating,
      image: movie?.image,
      comments: updatedComments,
    });
    await axios.get(`http://localhost:3001/movies/${id}`).then(({ data }) => {
      setMovie(data);
      setComments(data.comments || []);
    });
  };

  return (
    <div className={styles.movie_wrapper}>
      <div className={styles.movie}>
        <h1>{movie.title}</h1>
        <img src={movie.image} alt={movie.title} />
        <div className={styles.text}>
          <span>
            <strong>Director:</strong> {movie.director}
          </span>
          <span>
            <strong>Genre:</strong> {movie.genre}
          </span>
          <span>
            <strong>Rating:</strong> {movie.rating}
          </span>
          <span>
            <strong>Year:</strong> {movie.year}
          </span>

          <div className={styles.comments}>
            <strong>Comments:</strong>
            <ul>
              {comments.map((comment, index) => (
                <div className={styles.li_btn}>
                  <li key={index}>{comment}</li>
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          </div>

          <div className={styles.addComment}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              onClick={handleAddComment}
              disabled={addCommentMutation.isLoading}
            >
              {addCommentMutation.isLoading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuvieOpenPage;
