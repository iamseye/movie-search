import { MovieType } from '@/utils/movie.type';
import { MOVIE_SEARCH_API } from '@/utils/url.const';
import type { NextApiRequest, NextApiResponse } from 'next';

type CacheMovieResultType = {
  [key: string]: MovieType;
};
const cacheMovieResult: CacheMovieResultType = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieType | string>
) {
  const { search } = req.query;

  if (search && typeof search === 'string') {
    if (cacheMovieResult[search]) {
      return res.status(200).json(cacheMovieResult[search]);
    }

    try {
      fetch(`${MOVIE_SEARCH_API}?q=${search}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.MOVIE_RAPID_API_KEY || '',
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          cacheMovieResult[search] = data.results;
          return res.status(200).json(data.results);
        });
    } catch (error) {
      return res.status(500).json('fetch movie API failed');
    }
  } else {
    return res.status(400).json('Invalid search parameters');
  }
}
