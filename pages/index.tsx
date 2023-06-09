import Head from 'next/head';
import { useState, useMemo } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';
import Movie from '@/components/Movie';

import { MovieType } from '@/utils/movie.type';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [message, setMessages] = useState('');

  const cachedResults = useMemo(() => {
    if (typeof sessionStorage !== 'undefined') {
      const cached = sessionStorage.getItem(searchQuery);
      return cached ? JSON.parse(cached) : null;
    }
  }, [searchQuery]);

  const handleSearch = () => {
    const fetchData = async () => {
      setMessages('');
      setIsLoading(true);

      if (cachedResults) {
        setMovies(cachedResults);
        setIsLoading(false);
      } else {
        const res = await fetch(`/api/movie?search=${searchQuery}`);
        const data = await res.json();

        if (res.status === 200) {
          setMovies(data);
          sessionStorage.setItem(searchQuery, JSON.stringify(data));
        } else {
          setMessages(data);
        }

        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    } else {
      setMessages('The search query is empty');
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>create next app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col align-middle p-16 min-h-[80vh]">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Search your favorite movie
        </h1>

        <div className="flex mt-5">
          <input
            type="search"
            id="searchTerm"
            data-testid="searchField"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search anything..."
            onChange={(event) =>
              setSearchQuery(encodeURIComponent(event.target.value))
            }
            required
          />
          <button
            data-testid="searchButton"
            onClick={handleSearch}
            className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
        {isLoading && <Spinner />}
        {!!message && <p>{message}</p>}

        {!isLoading &&
          !!movies?.length &&
          movies.map((movie) => (
            <Movie key={movie.id} title={movie.title} image={movie.image} />
          ))}
      </main>
      <Footer />
    </div>
  );
}
