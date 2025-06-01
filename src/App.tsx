import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
/*
const url = 'https://api.themoviedb.org/3/authentication';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTk2NGQzOTFjYzE0Y2FiMGNlNzg1ODQ1NDg5MWNhMyIsIm5iZiI6MTc0ODY4NjgxMy45MTgwMDAyLCJzdWIiOiI2ODNhZDdkZDVjZDI4OTc4NWVkMjBkNmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.frXIiJRuTyxKc17itPu9MerKQFkQr9fjXLQXeuzbIVc'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
*/

const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTk2NGQzOTFjYzE0Y2FiMGNlNzg1ODQ1NDg5MWNhMyIsIm5iZiI6MTc0ODY4NjgxMy45MTgwMDAyLCJzdWIiOiI2ODNhZDdkZDVjZDI4OTc4NWVkMjBkNmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.frXIiJRuTyxKc17itPu9MerKQFkQr9fjXLQXeuzbIVc";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTk2NGQzOTFjYzE0Y2FiMGNlNzg1ODQ1NDg5MWNhMyIsIm5iZiI6MTc0ODY4NjgxMy45MTgwMDAyLCJzdWIiOiI2ODNhZDdkZDVjZDI4OTc4NWVkMjBkNmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.frXIiJRuTyxKc17itPu9MerKQFkQr9fjXLQXeuzbIVc",
  },
};
const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState("false");

  const fetchMovies = async () => {
    setIsLoading("true");
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      // console.log(response);
      // alert(response)
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading("false");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="../public/hero.png" alt="hero-banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the hassle.
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setsearchTerm} />
        </header>

        {/* <h1 className="text-white">{searchTerm}</h1> */}
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading === "true" ? (
            <Spinner />
          ) : // <p className="text-white">Loading...</p>
          errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
