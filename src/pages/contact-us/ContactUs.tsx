import {useSEO} from '@app/hooks/useSEO';

export const ContactUs = () => {
  useSEO();

  return (
    <article className="container-site py-12">
      <h1 className="text-accent text-3xl font-semibold md:text-4xl">
        Contact Us
      </h1>
      <p className="text-text mt-4">Content coming soon.</p>
    </article>
  );
};
