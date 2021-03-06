import { put, call, all, takeLatest } from "@redux-saga/core/effects";
import { getAPI } from "../../logic/getAPI";
import { getDetailsURLpath } from "../../logic/getURLpath";
import {
  fetchMovie,
  fetchMovieCreditsSuccess,
  fetchMovieError,
  fetchMovieSuccess,
} from "./movieSlice";

function* fetchMovieHandler({ payload: { id } }) {
  const movieURL = getDetailsURLpath("movie/" + id);
  const creditsURL = getDetailsURLpath("movie/" + id + "/credits");
  try {
    const [movie, credits] = yield all([
      call(getAPI, movieURL),
      call(getAPI, creditsURL),
    ]);
    yield all([
      put(fetchMovieSuccess(movie)),
      put(fetchMovieCreditsSuccess(credits)),
    ]);
  } catch (error) {
    yield put(fetchMovieError());
  }
}

export function* movieSaga() {
  yield takeLatest(fetchMovie.type, fetchMovieHandler);
}
