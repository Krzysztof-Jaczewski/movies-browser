import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../common/Container";
import { Header } from "../../common/Header";
import { Pager } from "../../common/Pager";
import { Tile } from "../../common/Tile";
import { useGenres } from "../../fetchGenres";
import { useURLParameter } from "../../useURLParameters";
import {
  fetchMovies,
  selectMovies,
  selectStatus,
  selectTotalMoviesPages,
} from "./moviesSlice";

export const MoviesList = () => {
  const movies = useSelector(selectMovies);
  const status = useSelector(selectStatus);
  const totalMoviesPages = useSelector(selectTotalMoviesPages);
  const genres = useGenres();
  const pageParameter = +useURLParameter("page");
  const page = pageParameter < 1 || pageParameter > 500 ? 1 : pageParameter;

  console.log(status);

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchMovies({ page })), [dispatch, page]);
  const nameMovieGenres = (genre_ids) =>
    genres && genre_ids.map((tag) => genres.find(({ id }) => id === tag).name);

  return (
    <>
      <Header title={"Popular movies"} />
      <Container>
        {movies &&
          movies.map(
            ({
              id,
              poster_path,
              title,
              release_date,
              genre_ids,
              vote_average,
              vote_count,
            }) => {
              return (
                <Tile
                  key={id}
                  poster={poster_path}
                  title={title}
                  subtitle={release_date.slice(0, 4)}
                  genres={nameMovieGenres(genre_ids)}
                  rate={vote_average}
                  votes={vote_count}
                />
              );
            }
          )}
      </Container>
      <Pager page={page} totalPages={totalMoviesPages} />
    </>
  );
};