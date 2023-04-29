import { MovieType, ImageType } from '@/utils/movie.type';
import Image from 'next/image';
import React from 'react';

type MovieProps = Pick<MovieType, 'title' | 'image'>;

const Movie = ({ title, image }: MovieProps) => {
  console.log(image);
  return (
    <div className="flex justify-evenly items-center mb-2 mt-2">
      <div>
        <h1>{title}</h1>
      </div>

      {image?.url && (
        <Image alt={title} src={image.url} width={300} height={300} />
      )}
    </div>
  );
};

export default Movie;
