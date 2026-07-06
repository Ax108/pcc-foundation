import {useSEO} from '@app/hooks/useSEO';
import {IMAGES} from '@src/constants/images';

export const ContactUs = () => {
  useSEO({
    title: 'Contact Us - Pratima Chandra Foundation',
    description: 'Get in touch with the Pratima Chandra Foundation.',
  });

  return (
    <article aria-label="Contact Us" className="animate-page">
      {/* Hero Banner */}
      <header className="relative w-full h-40 md:h-56 lg:h-72 overflow-hidden bg-surface">
        <img
          src={IMAGES.HERO_HEADER}
          alt="Foundation contact banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <h1 className="!text-white text-4xl md:text-5xl lg:text-6xl font-semibold drop-shadow-md">
            Contact Us
          </h1>
        </div>
      </header>

      {/* Main Content (Contact Card) */}
      <section className="bg-[#f5f5f5] py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row bg-white shadow-xl rounded-sm overflow-hidden">
            {/* Left Pane - Quick Contact */}
            <div className="md:w-1/3 bg-accent text-white p-8 md:p-10 flex flex-col">
              <h2 className="!text-white text-2xl font-semibold mb-8">Quick Contact</h2>
              
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>P-35, CIT Road, Kolkata - 700 014</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>033-22498193</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all">pratimachandrafoundation@gmail.com</span>
                </div>
              </div>

              <div className="mt-auto pt-12 flex gap-4">
                <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gold transition-colors" aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM10.006 15.021l5.962-3.021-5.962-3.022v6.043z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Pane - Form */}
            <div className="md:w-2/3 bg-white p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">Get in touch!</h2>
              <form 
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for contacting us. We will get back to you soon!');
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-medium text-text">Name</label>
                  <input required type="text" id="name" name="name" className="border border-border rounded px-3 py-2 focus:outline-none focus:border-accent text-primary placeholder-gray-400" placeholder="Name" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-1">
                    <label htmlFor="phone" className="text-sm font-medium text-text">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="border border-border rounded px-3 py-2 focus:outline-none focus:border-accent text-primary placeholder-gray-400" placeholder="Phone Number" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-text">Email</label>
                    <input required type="email" id="email" name="email" className="border border-border rounded px-3 py-2 focus:outline-none focus:border-accent text-primary placeholder-gray-400" placeholder="Email" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-sm font-medium text-text">Message</label>
                  <textarea required id="message" name="message" rows={4} className="border border-border rounded px-3 py-2 focus:outline-none focus:border-accent text-primary placeholder-gray-400 resize-none" placeholder="Message"></textarea>
                </div>

                <button type="submit" className="bg-accent hover:bg-accent/90 !text-white font-medium py-3 px-6 rounded transition-colors w-full mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-96">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.7195526557707!2d88.3716118!3d22.552176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276e54b14c47f%3A0x335e972edf16476e!2sCIT%20Rd%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1783278199173!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{border: 0}} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Pratima Chandra Foundation Map Location"
        />
      </section>
    </article>
  );
};
