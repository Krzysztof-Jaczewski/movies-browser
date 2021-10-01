import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie, selectMovie, selectMovieCredits, selectMovieImages } from "./movieSlice";
import { useEffect } from "react";
import { Backdrop } from "../../common/Backdrop";
import { Container } from "../../common/Container";
import { MovieInfo } from "../../common/MovieInfo";
import { Tile } from "../../common/Tile";
import { useGenres } from "../../fetchGenres";
import { Title } from "../../common/Tile/styled";

export const MovieDetails = () => {
  const { id } = useParams();
  const { backdrop_path, original_title, overview, profile_path, release_date, vote_average, vote_count, production_countries, poster_path } = useSelector(selectMovie);
  const { cast, crew } = useSelector(selectMovieCredits);
  console.log();
  console.log(id);
  const genres = useGenres();
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchMovie({ id })), [dispatch, id]);
  const nameMovieGenres = (genre_ids) =>
  genres && genre_ids.map((tag) => genres.find(({ id }) => id === tag).name);

  return (
    <>
      <Backdrop
          title={original_title}
          poster={backdrop_path}
          rate={vote_average}
          votes={vote_count}
        />
      <MovieInfo 
        poster={poster_path}
        title={original_title}
        description={overview}
        date={release_date}
        rate={vote_average}
        votes={vote_count}
        countries={production_countries && production_countries.map(({name}) => name)}
      />
      {cast && (
        <>
        <Title>Cast</Title>
          <Container person>
              {cast.map(
                ({
                  id,
                  name,
                  profile_path,
                  character,
                }) => {
                  return (
                    <Tile 
                    person
                      key={id}
                      poster={profile_path}
                      character={character}
                      title={name}
                    />
                  );
                }
              )}
          </Container>
        </>
      )}
      {crew && (
        <>
          <Title>Crew</Title>
            <Container person>
              {crew.map(
                ({
                  name,
                  profile_path,
                  department,
                  id,
                }) => {
                  return (
                    <Tile 
                      person
                      key={id}
                      poster={profile_path}
                      character={department}
                      title={name}
                    />
                  );
                }
              )}
            </Container>
        </>
      )}
 </>
 );
};