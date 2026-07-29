import {useParams, Link, Navigate} from 'react-router-dom';
import {useState} from 'react';
import {EVENT_DETAILS} from './constants/eventDetailsData';
import type {EventBlock} from './constants/eventDetailsData';
import {useSEO} from '@app/hooks/useSEO';
import {ScrollReveal} from '@app/components/ScrollReveal';
import {Lightbox} from '@app/components/Lightbox';
import {Download, Award, Gift, Star} from 'lucide-react';

// Helper to group consecutive images together
const groupBlocks = (blocks: EventBlock[]) => {
  const grouped: (EventBlock | {type: 'image-group'; images: EventBlock[]})[] =
    [];
  let currentGroup: EventBlock[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === 'image') {
      currentGroup.push(block);
    } else {
      if (currentGroup.length > 0) {
        grouped.push({type: 'image-group', images: currentGroup});
        currentGroup = [];
      }
      grouped.push(block);
    }
  }
  if (currentGroup.length > 0) {
    grouped.push({type: 'image-group', images: currentGroup});
  }

  return grouped;
};

// Helper icon to separate sections like in the design
const SectionDivider = () => (
  <div className="my-8 flex justify-center opacity-40 md:my-12">
    <Star className="text-primary h-5 w-5" />
  </div>
);

export const EventDetails = () => {
  const {eventId} = useParams();
  const event = eventId ? EVENT_DETAILS[eventId] : null;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useSEO({
    title: event
      ? `${event.title} - Pratima Chandra Foundation`
      : 'Event Details',
    description:
      event?.baseData?.description?.substring(0, 160) || 'Event Details',
  });

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const featuredImage = event.baseData?.imageSrc;
  const groupedBlocks = groupBlocks(event.blocks);
  let textBlockCount = 0;

  // Collect all images for the lightbox
  const allImages: { imageSrc: string; alt: string; id: string }[] = [];
  if (featuredImage) {
    allImages.push({
      imageSrc: featuredImage,
      alt: event.title,
      id: 'featured',
    });
  }

  event.blocks.forEach((block, idx) => {
    if (block.type === 'image') {
      allImages.push({
        imageSrc: block.src,
        alt: `Event capture ${idx}`,
        id: `img-${idx}`,
      });
    }
  });

  const openLightbox = (src: string) => {
    const index = allImages.findIndex(img => img.imageSrc === src);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <article
      aria-label="Event Details"
      className="min-h-screen overflow-x-hidden bg-[#FAF7F2] pb-32 font-sans">
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={allImages}
        initialIndex={lightboxIndex}
      />
      <div className="container-site pt-24 md:pt-32">
        {/* Back Navigation - Centered like design */}
        <ScrollReveal animation="fade-in" delay={0.1}>
          <div className="mb-8 flex justify-center">
            <Link
              to="/events"
              className="hover:text-primary inline-flex items-center gap-2 text-xs font-medium tracking-[0.1em] text-gray-500 uppercase transition-colors">
              <span>←</span>
              BACK TO EVENTS
            </Link>
          </div>
        </ScrollReveal>

        {/* Title Area - Centered like design */}
        <div className="mx-auto mb-12 max-w-5xl px-4 text-center">
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1 className="text-primary mb-6 font-serif text-4xl leading-tight font-bold break-words md:text-5xl lg:text-6xl">
              {event.title.replace(/\u00A0/g, ' ')}
            </h1>

            {event.baseData?.year && (
              <div className="flex items-center justify-center gap-4">
                <span className="text-xs font-medium tracking-[0.2em] text-gray-500 uppercase md:text-sm">
                  FOUNDATION EVENT
                </span>
                <span className="h-[1px] w-8 bg-gray-300"></span>
                <span className="text-xs font-medium tracking-[0.2em] text-gray-500 uppercase md:text-sm">
                  {event.baseData.year}
                </span>
              </div>
            )}
          </ScrollReveal>
        </div>

        {/* Featured Image with Fade Overlay like design */}
        {featuredImage && (
          <div className="relative mx-auto mb-16 w-full max-w-5xl px-4">
            <ScrollReveal animation="fade-in" delay={0.3}>
              <div
                className="group relative flex cursor-pointer justify-center overflow-hidden rounded-xl bg-black/5 shadow-sm"
                onClick={() => openLightbox(featuredImage)}>
                <img
                  src={featuredImage}
                  alt={event.title}
                  className="h-[40vh] w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 md:h-[60vh]"
                />
                {/* Gradient overlay at bottom of image like design */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent opacity-80" />
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* Main Content */}
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          {groupedBlocks.map((block, idx) => {
            if (block.type === 'text') {
              textBlockCount++;

              // We style different text blocks based on their order to match the varied editorial design

              if (textBlockCount === 1) {
                // Drop cap for the first paragraph
                return (
                  <ScrollReveal key={idx} animation="fade-up" delay={0.1}>
                    <p className="first-letter:text-primary mb-10 text-base leading-relaxed break-words text-[#333333] first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold md:text-lg md:leading-loose md:first-letter:text-6xl">
                      {block.content.replace(/\u00A0/g, ' ')}
                    </p>
                  </ScrollReveal>
                );
              } else if (
                textBlockCount === 2 ||
                block.content.includes('judged')
              ) {
                // Important pull-quote style (tinted box with left border)
                return (
                  <ScrollReveal key={idx} animation="fade-up" delay={0.1}>
                    <div className="bg-primary/5 border-primary my-10 rounded-r-lg border-l-4 p-6 shadow-sm md:p-8">
                      <p className="font-serif text-lg leading-relaxed break-words text-[#333333] italic md:text-xl">
                        {block.content.replace(/\u00A0/g, ' ')}
                      </p>
                    </div>
                    {textBlockCount === 2 && <SectionDivider />}
                  </ScrollReveal>
                );
              } else if (
                block.content.includes('Congratulation') ||
                block.content.includes('Winners') ||
                block.content.includes('Prize') ||
                block.content.includes('December:')
              ) {
                // Results / Awards section styling
                const isTitle = block.content.includes('December:');
                return (
                  <ScrollReveal key={idx} animation="fade-up" delay={0.1}>
                    {isTitle ? (
                      <div className="mt-16 mb-6">
                        <span className="bg-primary mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
                          RESULTS
                        </span>
                        <h2 className="text-primary mb-6 font-serif text-2xl font-bold break-words md:text-3xl">
                          {block.content.replace(/\u00A0/g, ' ')}
                        </h2>
                      </div>
                    ) : (
                      <div className="my-6 rounded-xl bg-[#F5F0E6] p-6 md:p-8">
                        <div className="flex items-start gap-4">
                          {block.content.includes('Congratulation') ? (
                            <Award className="text-primary mt-1 h-6 w-6 shrink-0" />
                          ) : (
                            <Gift className="text-primary mt-1 h-6 w-6 shrink-0" />
                          )}
                          <p className="text-sm leading-relaxed break-words text-[#444444] md:text-base">
                            {block.content.replace(/\u00A0/g, ' ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>
                );
              } else {
                // Standard text
                const isShortText = block.content.trim().length < 64;
                return (
                  <ScrollReveal key={idx} animation="fade-up" delay={0.1}>
                    <p
                      className={`mb-8 leading-relaxed text-[#333333] md:leading-loose break-words ${
                        isShortText
                          ? 'font-bold text-xl md:text-2xl text-primary font-serif mb-12 mt-4'
                          : 'text-base md:text-lg'
                      }`}>
                      {block.content.replace(/\u00A0/g, ' ')}
                    </p>
                  </ScrollReveal>
                );
              }
            } else if (block.type === 'image-group') {
              // Dynamic Collage Grid based on number of images
              const count = block.images.length;

              const renderImage = (
                img: any,
                imgIdx: number,
                extraClasses: string = '',
              ) => (
                <div
                  key={imgIdx}
                  className={`group relative w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md ${extraClasses}`}
                  onClick={() => openLightbox(img.src)}>
                  <img
                    src={img.src}
                    alt={`Event capture ${idx}-${imgIdx}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              );

              return (
                <ScrollReveal key={idx} animation="fade-up" delay={0.1}>
                  <div className="my-12">
                    {count === 1 && (
                      <div className="w-full">
                        {renderImage(
                          block.images[0],
                          0,
                          'aspect-[16/9] md:aspect-[21/9]',
                        )}
                      </div>
                    )}
                    {count === 2 && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                        {renderImage(block.images[0], 0, 'aspect-[4/3]')}
                        {renderImage(block.images[1], 1, 'aspect-[4/3]')}
                      </div>
                    )}
                    {count === 3 && (
                      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {renderImage(block.images[0], 0, "w-full md:w-[calc(50%-12px)] aspect-[4/3]")}
                        {renderImage(block.images[1], 1, "w-full md:w-[calc(50%-12px)] aspect-[4/3]")}
                        {/* 3rd image centered on bottom with same size */}
                        {renderImage(block.images[2], 2, "w-full md:w-[calc(50%-12px)] aspect-[4/3]")}
                      </div>
                    )}
                    {count === 4 && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                        {block.images.map((img: any, i: number) =>
                          renderImage(img, i, 'aspect-[4/3]'),
                        )}
                      </div>
                    )}
                    {count > 4 && (
                      <div className="columns-1 gap-4 space-y-4 md:columns-2 md:gap-6 md:space-y-6">
                        {block.images.map((img: any, i: number) => (
                          <div
                            key={i}
                            className="group relative w-full cursor-pointer break-inside-avoid overflow-hidden rounded-xl bg-white shadow-md"
                            onClick={() => openLightbox(img.src)}>
                            <img
                              src={img.src}
                              alt={`Event capture ${idx}-${i}`}
                              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <SectionDivider />
                </ScrollReveal>
              );
            }
            return null;
          })}
        </div>

        {/* Call to Action - Centered at bottom like design */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="mt-24 mb-12 flex flex-col items-center text-center">
            <h3 className="mb-6 font-serif text-xl text-[#333] italic md:text-2xl">
              Interested in participating next year?
            </h3>
            <Link
              to="/application-form"
              className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded px-8 py-3 text-sm font-medium tracking-widest text-white uppercase shadow-lg transition-colors">
              <Download className="h-4 w-4" />
              Download Form
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
};
