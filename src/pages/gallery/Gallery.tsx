import {useSEO} from '@app/hooks/useSEO';

export const Gallery = () => {
  useSEO();

  return (
    <article className="container-site py-12">
      <h1 className="text-accent text-3xl font-semibold md:text-4xl">
        Gallery
      </h1>
      <p className="text-text mt-4">Content coming soon.</p>
    </article>
  );
};
