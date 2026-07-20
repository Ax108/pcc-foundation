import {useSEO} from '@app/hooks/useSEO';

import {useState, useEffect} from 'react';
import {ScrollReveal} from '@app/components/ScrollReveal';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';

export const ApplicationForm = () => {
  useSEO({
    title: 'Application Form - Pratima Chandra Foundation',
    description: 'Submit your application form for the Pratima Chandra Foundation competition.',
  });

  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [showModal, setShowModal] = useState(false);
  const [formStage, setFormStage] = useState<1 | 2>(1);

  useEffect(() => {
    // Small delay so it feels deliberate
    const timer = setTimeout(() => setShowModal(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Download Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-md shadow-2xl p-6 md:p-8 max-w-lg w-full relative animate-fadeIn flex flex-col items-center text-center">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="overflow-hidden rounded-xl mb-6 w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5">
              <img
                src={IMAGES.HOME_APPLICATION_POSTER}
                alt="Download Application Form"
                width={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.width}
                height={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover"
              />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">
              Join the Foundation
            </h3>
            <p className="text-gray-600 mb-6">
              Would you like to download the application form for offline submission?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <a 
                href="/assets/documents/aruprataner-sandhane-2025-form.pdf"
                download="aruprataner-sandhane-2025-form.pdf"
                onClick={() => setShowModal(false)}
                className="bg-accent hover:bg-accent/90 !text-white px-8 py-3.5 rounded-lg font-medium transition-colors shadow-md w-full sm:w-auto text-center"
              >
                Download Form
              </a>
              <button 
                onClick={() => setShowModal(false)}
                className="px-8 py-3.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors cursor-pointer w-full sm:w-auto"
              >
                No, thanks
              </button>
            </div>
          </div>
        </div>
      )}

      <article aria-label="Application Form" className="animate-page relative">
      <header className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface flex items-center pt-16 md:pt-24 border-b border-gold/10">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gold/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />
        
        <div className="container-site relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-8 py-8 md:py-12">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
            <ScrollReveal animation="fade-in" delay={0.1}>
              <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="w-8 md:w-12 h-[2px] bg-gold"></span>
                <p className="text-primary tracking-[0.2em] uppercase text-xs md:text-sm font-bold">Join the Competition</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <h1 className="text-primary text-5xl md:text-6xl lg:text-7xl font-serif font-bold drop-shadow-sm tracking-wide leading-[1.1] mb-6">
                {language === 'bn' ? 'আবেদনপত্র' : 'Application'} <br className="hidden md:block" />
                <span className="text-gold italic font-medium">{language === 'bn' ? '' : 'Form'}</span>
              </h1>
            </ScrollReveal>
          </div>

          <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center md:justify-end order-1 md:order-2">
            <ScrollReveal animation="scale-up" delay={0.2}>
              <div className="relative w-48 sm:w-56 md:w-80 lg:w-[450px] aspect-[16/9]">
                <div className="absolute inset-0 bg-gold/30 -translate-x-3 -translate-y-3 md:-translate-x-5 md:-translate-y-5 rounded-[3rem] -z-10" />
                <img
                  src="/assets/gallery/ARS-2018-Judges-2-1-scaled.jpg"
                  alt="Foundation Application"
                  className="w-full h-full object-cover object-center rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 md:border-8 border-white"
                />
                <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white/95 backdrop-blur-sm p-3 md:p-5 shadow-xl border-r-4 border-primary rounded-l-sm z-20">
                  <p className="text-primary font-serif font-bold text-sm md:text-lg leading-tight text-right">
                    Register <br/> Now
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <section className="bg-[#f5f5f5] py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-sm overflow-hidden p-8 md:p-12 mb-12 relative">
            
            {/* Language Toggle Switch */}
            <ScrollReveal animation="fade-in" delay={0.1}>
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-full p-1.5 flex relative w-56 shadow-inner border border-gray-200">
                  <div
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${
                      language === 'en' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setLanguage('bn')}
                    className={`flex-1 relative z-10 py-2 text-sm font-bold transition-colors duration-300 ${
                      language === 'bn' ? 'text-accent' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`flex-1 relative z-10 py-2 text-sm font-bold transition-colors duration-300 ${
                      language === 'en' ? 'text-accent' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <div className="text-center mb-10">
              <ScrollReveal animation="fade-up" delay={0.2}>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {language === 'bn' ? 'অরূপরতনের সন্ধানে ২০২৫' : 'Aruprataner Sandhane 2025'}
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={0.3}>
                <p className="text-primary/80 text-lg mb-2">
                  {language === 'bn' ? 'রবীন্দ্রগানে প্রতিমা চন্দ পুরস্কার' : 'Rabindra Gaane Pratima Chandra Puroshkar'}
                </p>
                <p className="text-accent font-semibold text-sm">
                  {language === 'bn' ? 'অনুগ্রহ করে নিচের সমস্ত ঘর পূরণ করুন' : 'Please fill out all the fields below'}
                </p>
              </ScrollReveal>
            </div>
            
            <form 
              className="flex flex-col gap-6 relative"
              onSubmit={(e) => {
                e.preventDefault();
                
                if (formStage === 1) {
                  setFormStage(2);
                  return;
                }
                
                const formElement = e.target as HTMLFormElement;
                const formData = new FormData(formElement);
                
                const idProofFile = formData.get('idProof');
                const passportPhotoFile = formData.get('passportPhoto');
                const songFile = formData.get('songFile');
                const idProofName = idProofFile instanceof File ? idProofFile.name : '';
                const passportPhotoName = passportPhotoFile instanceof File ? passportPhotoFile.name : '';
                const songFileName = songFile instanceof File ? songFile.name : '';
                
                const payload = {
                  fullName: formData.get('fullName'),
                  dob: formData.get('dob'),
                  phone: formData.get('phone'),
                  email: formData.get('email'),
                  address: formData.get('address'),
                  pincode: formData.get('pincode'),
                  auditionLocation: formData.get('auditionLocation'),
                  idProof: idProofName,
                  passportPhoto: passportPhotoName,
                  songFile: songFileName,
                };

                console.log('Application Form Payload:', JSON.stringify(payload, null, 2));
                alert(language === 'bn' ? 'আপনার আবেদন জমা দেওয়ার জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব!' : 'Thank you for submitting your application. We will get back to you soon!');
                formElement.reset();
                setFormStage(1);
              }}
            >
              {/* Stage 1 */}
              <div className={formStage === 1 ? 'flex flex-col gap-6 animate-fadeIn' : 'hidden'}>


              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-sm font-medium text-text">
                  {language === 'bn' ? 'নাম *' : 'Name *'}
                </label>
                <input required type="text" id="fullName" name="fullName" className="border border-border rounded px-4 py-3 focus:outline-none focus:border-accent text-primary placeholder-gray-400" placeholder={language === 'bn' ? 'আপনার সম্পূর্ণ নাম লিখুন' : 'Enter your full name'} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dob" className="text-sm font-medium text-text">
                    {language === 'bn' ? 'জন্ম তারিখ *' : 'Date of Birth *'}
                  </label>
                  <input required type="date" id="dob" name="dob" className="border border-border rounded px-4 py-3 focus:outline-none focus:border-accent text-primary" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-text">
                    {language === 'bn' ? 'ফোন *' : 'Phone *'}
                  </label>
                  <input required type="tel" id="phone" name="phone" className="border border-border rounded px-4 py-3 focus:outline-none focus:border-accent text-primary placeholder-gray-400" placeholder={language === 'bn' ? 'আপনার ফোন নম্বর লিখুন' : 'Enter your phone number'} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-text">
                  {language === 'bn' ? 'ই-মেল *' : 'E-mail *'}
                </label>
                <input required type="email" id="email" name="email" className="border border-border rounded px-4 py-3 focus:outline-none focus:border-accent text-primary placeholder-gray-400" placeholder={language === 'bn' ? 'আপনার ইমেল ঠিকানা লিখুন' : 'Enter your email address'} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-medium text-text">
                  {language === 'bn' ? 'ঠিকানা *' : 'Address *'}
                </label>
                <textarea required id="address" name="address" rows={3} className="border border-border rounded px-4 py-3 focus:outline-none focus:border-accent text-primary placeholder-gray-400 resize-none" placeholder={language === 'bn' ? 'আপনার সম্পূর্ণ ঠিকানা লিখুন' : 'Enter your full address'}></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pincode" className="text-sm font-medium text-text">
                  {language === 'bn' ? 'পিনকোড *' : 'Pincode *'}
                </label>
                <input required type="text" id="pincode" name="pincode" className="border border-border rounded px-4 py-3 focus:outline-none focus:border-accent text-primary placeholder-gray-400" placeholder={language === 'bn' ? 'আপনার পিনকোড লিখুন' : 'Enter your pincode'} />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <label className="text-sm font-medium text-text">
                  {language === 'bn' ? 'অডিশন স্থান নির্ণয় করুন *' : 'Select Audition Location *'}
                </label>
                <div className="flex flex-col sm:flex-row gap-6 mt-1">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input required type="radio" name="auditionLocation" value="Kolkata" className="peer appearance-none w-5 h-5 border-2 border-border rounded-full checked:border-accent transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-accent absolute opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-primary group-hover:text-accent transition-colors">
                      {language === 'bn' ? 'কলকাতা' : 'Kolkata'}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input required type="radio" name="auditionLocation" value="Santiniketan" className="peer appearance-none w-5 h-5 border-2 border-border rounded-full checked:border-accent transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-accent absolute opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-primary group-hover:text-accent transition-colors">
                      {language === 'bn' ? 'শান্তিনিকেতন' : 'Santiniketan'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-8 border-t border-border mt-4">
                <button type="submit" className="bg-accent hover:bg-accent/90 !text-white font-medium py-3.5 px-8 rounded transition-colors w-full text-lg shadow-md">
                  {language === 'bn' ? 'পরবর্তী' : 'Next'}
                </button>
              </div>
            </div>

            {/* Stage 2 */}
            <div className={formStage === 2 ? 'flex flex-col gap-6 animate-fadeIn' : 'hidden'}>
              <div className="flex flex-col gap-2">
                <label htmlFor="idProof" className="text-sm font-medium text-text">
                  {language === 'bn' ? 'পরিচয় পত্র *' : 'ID Proof *'}
                </label>
                <input required={formStage === 2} type="file" id="idProof" name="idProof" accept="image/*,.pdf" className="border border-border rounded px-3 py-2 focus:outline-none focus:border-accent text-primary bg-white file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all cursor-pointer" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="passportPhoto" className="text-sm font-medium text-text">
                  {language === 'bn' ? 'পাসপোর্ট সাইজ ছবি *' : 'Passport Size Photo *'}
                </label>
                <input required={formStage === 2} type="file" id="passportPhoto" name="passportPhoto" accept="image/*" className="border border-border rounded px-3 py-2 focus:outline-none focus:border-accent text-primary bg-white file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all cursor-pointer" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="songFile" className="text-sm font-medium text-text">
                  {language === 'bn' ? 'গানের রেকর্ডিং আপলোড করুন (MP3) *' : 'Upload Song Recording (MP3) *'}
                </label>
                <input required={formStage === 2} type="file" id="songFile" name="songFile" accept="audio/mpeg,.mp3,audio/*" className="border border-border rounded px-3 py-2 focus:outline-none focus:border-accent text-primary bg-white file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all cursor-pointer" />
              </div>

              <div className="pt-8 border-t border-border mt-4 flex gap-4">
                <button type="button" onClick={() => setFormStage(1)} className="px-8 py-3.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors cursor-pointer text-lg">
                  {language === 'bn' ? 'পিছনে' : 'Back'}
                </button>
                <button type="submit" className="flex-1 bg-accent hover:bg-accent/90 !text-white font-medium py-3.5 px-8 rounded transition-colors text-lg shadow-md">
                  {language === 'bn' ? 'জমা দিন' : 'Submit'}
                </button>
              </div>
            </div>
            </form>
          </div>

          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-sm overflow-hidden p-8 md:p-12">
            <h2 className="text-2xl font-bold text-primary mb-8 border-b border-border pb-4">Guidelines & Rules</h2>
            
            <div className="flex flex-col gap-4">
              <details className="group border border-border rounded-lg bg-[#f9f9f9] open:bg-white transition-colors duration-200">
                <summary className="font-semibold text-lg text-primary cursor-pointer list-none flex justify-between items-center p-5">
                  Introduction
                  <span className="transition-transform duration-300 group-open:-rotate-180 text-accent">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-text/90 space-y-3 leading-relaxed border-t border-border mt-1">
                  <p><strong>Pratima Chandra Foundation</strong> is pleased to organize the 8th edition of <strong>Rabindra Gaane Pratima Chandra Puroshkar</strong> titled <strong>"ARUPRATANER SANDHANE"</strong> in 2025.</p>
                  <p>The objective of the competition is to encourage and promote Rabindra Sangeet in its original form and style.</p>
                  <p className="font-semibold pt-2 text-primary">The terms and condition to participate are as follows :-</p>
                </div>
              </details>

              <details className="group border border-border rounded-lg bg-[#f9f9f9] open:bg-white transition-colors duration-200">
                <summary className="font-semibold text-lg text-primary cursor-pointer list-none flex justify-between items-center p-5">
                  General Rules
                  <span className="transition-transform duration-300 group-open:-rotate-180 text-accent">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-text/90 space-y-3 leading-relaxed border-t border-border mt-1">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>The competition is open to participants aged 15 to 40 years as on 01.01.2025.</li>
                    <li>There is no Gender restrictions.</li>
                    <li>The Winner, First Runner-up and Second Runner-up of previous <strong>Rabindra Gaane Pratima Chandra Puroshkar</strong> titled <strong>"ARUPRATANER SANDHANE"</strong> or otherwise shall not be permitted to participate again.</li>
                    <li>The Application Form, along with Song Recording, Photo ID Proof and Age Proof copies are non-returnable. However, the Organizers shall not share and/or transmit the same to any third party.</li>
                    <li>The Organizers shall NOT bear the cost of lodging, fooding, transportation and associated expenses of any participant of the competition.</li>
                    <li>The Organizers shall reserve the right to record the performance of the participants by Still Photography and Videography. Such recordings shall be the sole property of the <strong>Pratima Chandra Foundation</strong> and may be used in Print and Digital Media publicity at the discretion of the <strong>Pratima Chandra Foundation</strong>.</li>
                    <li>The decision of the Judges shall be final in all the rounds of the competition and is not subject to challenge and/or protest and/or appeal. Further, any disruption caused on grounds of the opinion and/or judgment of the Judges shall result in immediate disqualification.</li>
                    <li>The Organizers reserve the right to postpone, delay and/or cancel the competition at any stage, as a consequence of any unforeseen circumstances.</li>
                    <li>The Organizers reserve the right to disqualify any participant and/or finalist at any stage of the competition on grounds of unruly and/or undesirable behavior and/or misconduct.</li>
                  </ol>
                </div>
              </details>

              <details className="group border border-border rounded-lg bg-[#f9f9f9] open:bg-white transition-colors duration-200">
                <summary className="font-semibold text-lg text-primary cursor-pointer list-none flex justify-between items-center p-5">
                  Application
                  <span className="transition-transform duration-300 group-open:-rotate-180 text-accent">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-text/90 space-y-3 leading-relaxed border-t border-border mt-1">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>The Application Form for the competition shall be available in the Website and on Social Media pages of the Foundation by 1st August 2025.</li>
                    <li>No Application Fee is payable by the participant either for the Form or for the application.</li>
                    <li>In order to participate the participants shall submit the following to our official e-mail arupratan2025@gmail.com.
                      <ul className="list-[lower-alpha] pl-5 mt-1 space-y-1">
                        <li>A duly filled out Form clearly mentioning all particulars;</li>
                        <li>A scanned copy of the participant's photo Identification with proof of age;</li>
                        <li>1 (One) complete Rabindra Sangeet song sung solo by the participant, in MP3 format.</li>
                      </ul>
                    </li>
                    <li>The song submitted may be from any Genre (Parjaay) of the participant's choice.</li>
                    <li>The song submitted should be accompanied by either Harmonium or Tanpura (either acoustic or electronic).</li>
                    <li>The song submitted may be accompanied by Tabla, if required.</li>
                    <li>The song submitted may be recorded in a recording device of the participant's choice; however the use of pitch correction and/or "Auto tune" and/or other methods of correcting vocal deficiencies and/or shortcoming, including the use of professional studios are strictly prohibited.</li>
                    <li>The participants may choose between Kolkata and Santiniketan as their location for the next stage of the competition. No modification and/or alteration of the selected location shall be permitted.</li>
                    <li>Incomplete entries and/or entries without the 1 (One) accompanying song of any Genre (Parjaay) and/or violation of any of the abovementioned terms and conditions in the application, shall be rejected forthwith.</li>
                    <li>The last date for submission shall be 2nd November 2025. However, the Organizers reserve the right to extend the deadline at their sole discretion.</li>
                  </ol>
                </div>
              </details>

              <details className="group border border-border rounded-lg bg-[#f9f9f9] open:bg-white transition-colors duration-200">
                <summary className="font-semibold text-lg text-primary cursor-pointer list-none flex justify-between items-center p-5">
                  Preliminary Selection
                  <span className="transition-transform duration-300 group-open:-rotate-180 text-accent">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-text/90 space-y-3 leading-relaxed border-t border-border mt-1">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>The Preliminary Selection shall be done by the Preliminary Judges by verifying the Applications and by judging the recorded songs submitted by the applicants.</li>
                    <li>Upto 70 (Seventy) best submissions for Kolkata and upto 50 (Fifty) best submissions for Santiniketan, in the opinion of the Preliminary Judges shall be shortlisted for the next round of Auditions.</li>
                    <li>The shortlisted candidates shall be communicated about their selection, along with the date, time and venue for the physical Auditions.</li>
                  </ol>
                </div>
              </details>

              <details className="group border border-border rounded-lg bg-[#f9f9f9] open:bg-white transition-colors duration-200">
                <summary className="font-semibold text-lg text-primary cursor-pointer list-none flex justify-between items-center p-5">
                  Audition Round
                  <span className="transition-transform duration-300 group-open:-rotate-180 text-accent">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-text/90 space-y-3 leading-relaxed border-t border-border mt-1">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>The Audition will be held at Kolkata and at Santiniketan in the month of November 2025 at a date, time and venue to be decided and communicated by the Organizers.</li>
                    <li>At the Audition, the participants shall be required to sing 1 (One) Rabindra Sangeet song from any Genre (Parjaay) of the participants choice, live and in the presence of the Audition Judges, to be adjudicated based on the knowledge and experience of the Audition Judges.</li>
                    <li>However, the Audition Judges shall reserve the right to ask questions and/or test the participant's knowledge and understanding of Rabindra Sangeet further, at their sole discretion.</li>
                    <li>A team of Musicians, appointed by the Organizers, shall accompany all the participants in the Audition. No Musicians and/or musical instruments apart from those provided shall be permitted.</li>
                    <li>The 10 (Ten) best auditioning participants in the opinion of the Audition Judges shall be selected to proceed to the Grand Finale. The successful participants shall be referred to as "Finalist" and shall be communicated of their selection by the Organizers.</li>
                  </ol>
                </div>
              </details>

              <details className="group border border-border rounded-lg bg-[#f9f9f9] open:bg-white transition-colors duration-200">
                <summary className="font-semibold text-lg text-primary cursor-pointer list-none flex justify-between items-center p-5">
                  Briefing Session
                  <span className="transition-transform duration-300 group-open:-rotate-180 text-accent">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-text/90 space-y-3 leading-relaxed border-t border-border mt-1">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>A Briefing Session for the Finalists will be held offline at Kolkata in the month of December 2025. The date, time and venue for the same shall be communicated to the Finalists.</li>
                    <li>All Finalists must attend the Briefing Session. Any Finalist who fails to attend the Briefing Session may be disqualified at the discretion of the Organizers.</li>
                  </ol>
                </div>
              </details>

              <details className="group border border-border rounded-lg bg-[#f9f9f9] open:bg-white transition-colors duration-200">
                <summary className="font-semibold text-lg text-primary cursor-pointer list-none flex justify-between items-center p-5">
                  Grand Finale
                  <span className="transition-transform duration-300 group-open:-rotate-180 text-accent">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-text/90 space-y-3 leading-relaxed border-t border-border mt-1">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>The winners – 1st, 2nd and 3rd will be selected by the Finale Judges based on their knowledge and experience at the end of the Grand Finale.</li>
                    <li>The Winner will be awarded a prize money of Rs.40,000/- (Rupees Forty Thousand only), the First Runner-up shall be awarded a prize money of Rs.20,000/- (Rupees Twenty Thousand only) and the Second Runner-up shall be awarded Rs.10,000/- (Rupees Ten Thousand Only). All such prize money shall be awarded by Cheque only.</li>
                    <li>The Winner, First Runner-up and Second Runner-up shall also be awarded Mementoes and Certificates.</li>
                    <li>The Winner, First Runner-up and Second Runner-up shall also be given an opportunity for recording of 1 (One) Rabindra Sangeet song, sung by them.</li>
                    <li>The Grand Finale shall be held at Kolkata in the month of December 2025. The date, time and venue of the Grand Finale shall be communicated to the Finalists.</li>
                    <li>The Grand Finale shall consist of 2 (Two) rounds.</li>
                    <li>The First Round of the Grand Finale, shall require the Finalist to sing 1 (One) Rabindra Sangeet song from any Genre (Parjaay) of the Finalist's Choice.</li>
                    <li>The Second Round of the Grand Finale shall require the finalist to sing 1 (One) Rabindra Sangeet song from any Genre (Parjaay) of the Finale Judges' Choice.</li>
                    <li>In addition to the above, the Finale Judges reserves the right to ask questions and/or test the Finalist's knowledge and understanding of Rabindra Sangeet further, at their sole discretion and at any stage of the Grand Finale.</li>
                    <li>A team of Musicians, appointed by the Organizers, shall accompany the Finalist in the Grand Finale. No Musicians and/or musical instruments apart from those provided shall be permitted.</li>
                  </ol>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </article>
    </>
  );
};
