import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "./components/MovieCard";
import { Navbar } from "./components/Navbar";
import styles from "./App.module.css";

const API_KEY = "6be88ce5";

const API_RESPONSE_STATUSES = {
  TRUE: "true",
  FALSE: "false",
};

function App() {
  const [searchMoviesKeyword, setSearchMoviesKeyword] = useState("movie");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const fetchMovies = async () => {
    try {
      const apiURL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchMoviesKeyword}`;
      const response = await fetch(apiURL);
      const respJSON = await response.json();

      if (
        !response.ok ||
        (respJSON.Response && respJSON.Response.toLowerCase() === API_RESPONSE_STATUSES.FALSE)
      ) {
        throw respJSON;
      }

      const result = respJSON.Search.map((movie) => ({
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }));

      dispatch({ type: "INSERT_MOVIES", movies: result });
    } catch (err) {
      console.error("[fetchMovies]:", err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchMoviesKeyword(event.target.value);
  };

  const handleSearchClick = () => {
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className={styles.main}>
      <Navbar onSearchChange={handleSearchChange} onSearchClick={handleSearchClick} />
      <section className={styles.container}>
        <section className={styles.movieListContainer}>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <MovieCard key={index} title={movie.title} image_url={movie.poster} />
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;