import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "./Muvielist.module.css";

export type Muvie = {
  id?: number;
  title: string;
  genre: string;
  year: number;
  director: string;
  rating: number;
  image: string;
  comments: string[];
};

const getMuvies = async (): Promise<Muvie[]> => {
  const response = await axios.get("http://localhost:3001/movies");
  return response.data;
};

const deleteMuvie = async (id: number) => {
  const response = await axios.delete(`http://localhost:3001/movies/${id}`);
  return response.data;
};

const MuvieList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: movies = [] } = useQuery("movies", getMuvies);

  const deleteMuvieMutation = useMutation(deleteMuvie, {
    onSuccess: () => {
      queryClient.invalidateQueries("movies");
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      deleteMuvieMutation.mutate(id);
    }
  };

  return (
    <div className={styles.movies_list}>
      <h1>List of Movies!</h1>

      <div className={styles.movies_cards}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movie_card}>
            <div className={styles.image}>
            <NavLink to={`/movie/${movie.id}`}>
              <img src={movie.image} alt={`Image for ${movie.director}`} />
            </NavLink>
            </div>
            <div className={styles.text}>
              <span>
                <strong>Title:</strong> {movie.title}
              </span>
              <br />
              <span>
                <strong>Director:</strong> {movie.director}
              </span>
              <br />
              <span>
                <strong>Genre:</strong> {movie.genre}
              </span>
              <br />
              <span>
                <strong>Rating:</strong> {movie.rating}
              </span>
              <br />
              <span>
                <strong>Year:</strong> {movie.year}
              </span>
              <br />
            </div>
            <div className={styles.delete_button}>
              <button onClick={() => movie.id && handleDelete(movie.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuvieList;
