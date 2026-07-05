import {useSEO} from '@app/hooks/useSEO';
import {IMAGES} from '@src/constants/images';
import {OUR_INSPIRATION_CONTENT} from './constants/textConstants';

const InspirationImage = ({name, imageSrc, className}: {name: string; imageSrc?: string; className?: string}) => (
  <div className={`flex flex-col items-center gap-2 ${className}`}>
    {imageSrc ? (
      <img src={imageSrc} alt={name} className="w-full h-auto object-cover shadow-md" />
    ) : (
      <div className="flex w-full aspect-[4/3] items-center justify-center bg-gray-800 p-4 text-center text-white shadow-md">
        <span className="text-sm font-medium leading-tight">Placeholder: {name}</span>
      </div>
    )}
    <span className="text-sm text-text text-center">{name}</span>
  </div>
);

export const OurInspiration = () => {
  useSEO({
    title: 'Our Inspiration - Pratima Chandra Foundation',
    description: 'Learn about the life and legacy of Smt. Pratima Chandra.',
  });

  const {about, programs, life} = OUR_INSPIRATION_CONTENT;

  return (
    <article aria-label="Our Inspiration" className="animate-page">
      {/* Hero Banner */}
      <header className="relative w-full h-40 md:h-56 lg:h-72 overflow-hidden bg-surface">
        <img
          src={IMAGES.HERO_HEADER}
          alt="Foundation header banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <h1 className="!text-white text-4xl md:text-5xl lg:text-6xl font-semibold drop-shadow-md">
            Our Inspiration
          </h1>
        </div>
      </header>

      {/* About Section */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-site">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl text-primary">
            {about.heading.normal} <span className="text-gold">{about.heading.gold}</span>
          </h2>
          <div className="flex flex-col gap-6 text-text text-lg">
            {about.paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                <strong className="text-accent font-semibold">{p.bold}</strong>{p.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-[#f5f5f5] py-16 md:py-20">
        <div className="container-site">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl text-primary max-w-3xl">
            {programs.heading.normal} <span className="text-gold">{programs.heading.gold}</span>
          </h2>
          <ul className="list-disc pl-6 flex flex-col gap-4 text-text marker:text-text text-lg">
            {programs.list.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-2">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Life Section 1: Early Life */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-site">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl text-primary">
            {life.heading.normal} <span className="text-gold">{life.heading.gold}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="flex flex-col gap-6 text-text text-lg order-2 md:order-1">
              {life.section1.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  <strong className="text-accent font-semibold">{p.bold}</strong>{p.text}
                </p>
              ))}
            </div>
            <div className="order-1 md:order-2 w-full max-w-md mx-auto">
              <InspirationImage name={life.section1.image.name} imageSrc={life.section1.image.imageSrc} className="w-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {life.gurus.map((guru, idx) => (
              <InspirationImage key={idx} name={guru.name} imageSrc={guru.imageSrc} />
            ))}
          </div>
        </div>
      </section>

      {/* Life Section 2: Awards */}
      <section className="bg-[#f5f5f5] py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-text text-lg">
              {life.section2.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  <strong className="text-accent font-semibold">{p.bold}</strong>{p.text}
                </p>
              ))}
            </div>
            <div className="w-full max-w-md mx-auto">
              <InspirationImage name={life.section2.image.name} imageSrc={life.section2.image.imageSrc} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Life Section 3: Later Life */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 w-full max-w-md mx-auto">
              <InspirationImage name={life.section3.image.name} imageSrc={life.section3.image.imageSrc} className="w-full" />
            </div>
            <div className="flex flex-col gap-6 text-text text-lg order-1 md:order-2">
              {life.section3.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  <strong className="text-accent font-semibold">{p.bold}</strong>{p.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

    </article>
  );
};
