import { useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../../layouts/base/BaseLayout";
import { useEffect, useState } from "react";
import { SEARCH_TYPE } from "../../utils/constant";
import movieApi from "../../api/movieApi";
import handleError from "../../services/HandleErrors";
import MovieCard from "../../components/card/movie/MovieCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchType = query.get('type').toLowerCase();
  const searchTerm = query.get('query').toLowerCase();
  const [searchMovies, setSearchMovies] = useState([]);

  useEffect(() => {
    if (!searchType || !searchTerm || !Object.values(SEARCH_TYPE).includes(searchType)) {
      navigate("/");
    }

    const fetchData = async () => {
      try {
        const searchMovie = await movieApi.Search(searchTerm, searchType);
        console.log(searchMovie);
        setSearchMovies(searchMovie);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, [searchType, searchTerm]);

  return (
    <BaseLayout>
      <main>
        <section className="container py-4 mt-5" id="movies">
          <h5 className="heading">Search results</h5>

          {searchMovies.length > 0 ? (
            <div className="row">
              {searchMovies.map((movie) => (
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0" key={movie.movieId}>
                  <MovieCard movie={movie}></MovieCard>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3">
              <p className="text-center">No data</p>
            </div>
          )}
        </section>
      </main>
    </BaseLayout>
  );
};

export default SearchPage;