import {EVENTS_DATA} from './eventsConstants';
import {assetUrl} from '@src/constants/assetBase';

export type EventBlock =
  | {type: 'text'; content: string}
  | {type: 'image'; src: string};

export type EventDetail = {
  id: string;
  title: string;
  blocks: EventBlock[];
  baseData?: (typeof EVENTS_DATA)[0];
};

export const EVENT_DETAILS: Record<string, EventDetail> = {
  'event-0': {
    id: 'event-0',
    title: 'রবীন্দ্র গানে প্রতিমা চন্দ্র পুরস্কার – ২০২৩ অরূপরতনের সন্ধানে',
    blocks: [
      {
        type: 'text',
        content:
          'The Grand Finale of the 6th edition ofRabindra Gaane Pratima Chandra Puroshkartitled“Aruprataner Sandhane”was held on Sunday, 3rd December, 2023 at ICCR Auditorium, Kolkata. The competition is an initiative ofPratima Chandra Foundation.This year 130 Rabindra Sangeet enthusiasts from different parts of West Bengal, as well as from Assam, Jharkhand and Tripura, applied to participate in the competition. Out of them, 100 participants were auditioned at Kolkata and at Santiniketan. The Audition Judges at Kolkata were Sri Debashish Raychaudhuri, Smt. Rina Mukhopadhyay, Smt. Aditi Gupta, Sri Chandan Roy Choudhury, Smt. Nibedita Sengupta and Sri Debangshu Mukherjee and at Santiniketan were Smt. Bulbul Basu, Smt. Binata Nandy and Sri Malay Sankar Chattopadhyay. The Audition Judges selected 10 participants for the Grand Finale. These participants performed live in front of the judges and the audience, through 2 rounds of competition.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_3064-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_0010-300x196.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_0009-300x196.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_0011-300x196.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_0008-300x196.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_0007-300x298.jpg'),
      },
      {
        type: 'text',
        content:
          'Sri Pratip Kumar RayandSri Chandan Roy Choudhury, Music Director were the Advisers of Aruprataner Sandhane 2023 and have mentored and arranged the competition this year.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_0013-300x203.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_0012-300x196.jpg'),
      },
      {
        type: 'text',
        content:
          'Eminent Rabindra Sangeet Artiste Smt. Srabani Sen, along with eminent Singers Smt. Sreeradha Banerjee and Sri Manomay Bhattacharya judged the Grand Finale.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_3120-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_3160-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_3158-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_3131-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/DSC_9783-300x200.jpg'),
      },
      {
        type: 'text',
        content: '3rd December: The contestants –',
      },
      {
        type: 'text',
        content:
          'Ms. Anjana Roy || Ms. Indradattaa Basu || Mr. Pritam Chakraborty || Ms. Samarpita Baral || Ms. Sanchari Sengupta || Ms. Sanjana Sarkar || Mr. Sayanta Majumder || Ms. Sreepurna Datta || Ms. Sritama Chakraborty || Ms. Taniya Chakraborty',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Ms.Sanjana Sarkar of Paschim Putiary, Kolkata won the First Prize. The Second Prize was won by Ms. Sreepurna Datta of Hazra, Kolkata. Ms. Sritama Chakraborty of Madhyamgram, North 24 Parganas won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The winners were awarded total prize money of Rs. 70,000/- (Rupees Seventy Thousand) and Trophies.Sri U. K. Chandra, Managing DirectorofP. C. Chandra Jewellers,graced the occasion and gave away the winners’ trophies.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2023/featured-image-1.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-0');
    },
  },
  'event-1': {
    id: 'event-1',
    title: 'রবীন্দ্র গানে প্রতিমা চন্দ্র পুরস্কার – ২০২২ অরূপরতনের সন্ধানে',
    blocks: [
      {
        type: 'text',
        content:
          'The Grand finale of the fifth edition ofRabindra Gaane Pratima Chandra Puroshkartitled“Aruprataner Sandhane”was held on Sunday, 17th April, 2022 at ICCR Auditorium, Kolkata. The competition was organised byPratima Chandra Foundation, in association withSri Chandan Roy Choudhury, Music Director. Rabindra Sangeet enthusiasts from different parts of West Bengal, and even from Bangladesh, showed interest for the auditions. Out of which 56 applicants were called for audition on 27thMarch, 2022 at P. C. Chandra Garden, Kolkata. The judges selected 10 participants for the grand finale. These participants performed live in front of the judges and the audience, through 2 rounds of competition.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1118-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1084-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1100-300x199.jpg'),
      },
      {
        type: 'text',
        content:
          'Sri Chandan Roy Choudhury, Music Director mentored and arranged the competition in 2022.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1235-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1111-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1236-300x199.jpg'),
      },
      {
        type: 'text',
        content:
          'Eminent Rabindra Sangeet artiste Smt. Srabani Sen and eminent singers Sri Srikanta Acharya and Smt. Lopamudra Mitra judged the Grand Finale.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_4444-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_4412-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_4415-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'The Auditions were judged bySri Alok Roychowdhury, Sri Debashish RaychaudhuriandSri Priyam Mukherjee.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1345-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1332-300x199.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/DSC_1335-300x199.jpg'),
      },
      {
        type: 'text',
        content: '17th April: The contestants –',
      },
      {
        type: 'text',
        content:
          'Ms. Abriti Chakraborty || Ms. Surangana Gupta || Ms. Sudeshna Saha || Ms. Suparna Ghosh || Mr. Pritam Chakraborty || Ms. Shrestha Chatterjee || Ms. Shreya Chakraborty || Ms. Sharannya Sengupta || Ms. Satavisha Ghosh || Ms. Puja Rajak',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Ms.Sharannya Sengupta of Santiniketan, Birbhum won the First Prize. The Second Prize was won by Ms. Shreya Chakraborty of Shimuliyapara, North 24 Parganas. Ms. Shrestha Chatterjee of Tallygunge, Kolkata won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The winners were awarded total prize money of Rs. 61,000/- (Rupees Sixty One Thousand) and Trophies.The Managing DirectorofP. C. Chandra Jewellers, Sri U. K. Chandragraced the occasion and gave away the winners’ trophies.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2022/Header2022.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-1');
    },
  },
  'event-2': {
    id: 'event-2',
    title: 'রবীন্দ্র গানে প্রতিমা চন্দ্র পুরস্কার – ২০১৯ অরূপরতনের সন্ধানে',
    blocks: [
      {
        type: 'text',
        content:
          'The Grand finale of the fourth edition ofRabindra Gaane Pratima Chandra Puroshkartitled“Aruprataner Sandhane”was held on Saturday, 7th December, 2019 at ICCR Auditorium, Kolkata. The competition was organised byPratima Chandra Foundation, in association withDaakGhar. Rabindra Sangeet enthusiasts from different parts of West Bengal showed interest for the auditions. Out of which 55 applicants were called for audition on 9thNovember, 2019 at Rotary Sadan, Kolkata. The judges selected 10 participants for the grand finale. These participants performed live in front of the judges and the audience, through 3 rounds of competition.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-Event-9-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-Event-2-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-Event-3-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Famous singers Smt. Srabani Sen and Smt. Kamalini Mukherji and famous Music Director Sri Joy Sarkar inaugurated the event and also released the Audio CD of the winners of the third edition of “Aruprataner Sandhane”.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-1st-Sumeli-Chakraborty-3-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-2nd-Reema-Dasgupta-3-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-3rd-Rodosee-Ghosh-3-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Sri Manoj Murali Nair,eminent Rabindra Sangeet Singer and founder ofDaakGharmentored and arranged the entire competition.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-Judges-3-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-Judges-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/ARS-2019-Judges-2-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Eminent Rabindra Sangeet artistes Smt. Srabani Sen and Smt. Kamalini Mukherji and eminent Music Director Sri Joy Sarkar judged the Grand Finale.',
      },
      {
        type: 'text',
        content:
          'The Auditions were judged bySmt. Ranjini Mukherjee, Smt. Debika DuttaandSri Subrata Mukherjee.',
      },
      {
        type: 'text',
        content: '7th December: The contestants –',
      },
      {
        type: 'text',
        content:
          'Ms. Reema Dasgupta || Ms. Shreya Chakraborty || Ms. Rodosee Ghosh || Ms. Sudeshna Saha || Mr. Arya Shaon Bhattacharya || Ms. Moumita Sen || Ms. Puja Rajak || Ms. Prakriti Mukherjee || Ms. Sumeli Chakraborty || Ms. Ankita Ghosh',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Ms. Sumeli Chakraborty of Garifa, Kolkata won the First Prize. The Second Prize was won by Ms. Reema Dasgupta of Santiniketan, Birbhum. Ms. Rodosee Ghosh of Garia, Kolkata won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The winners were awarded Musical Instruments worth Rs. 70,000/- (Rupees Seventy Thousand) and Trophies.The Managing DirectorofP. C. Chandra Jewellers, Sri U. K. Chandragraced the occasion and gave away the winners’ trophies.',
      },
      {
        type: 'text',
        content:
          'RABINDRA GAANE PRATIMA CHANDRA PUROSHKAR 2019 “ARUPRATANER SANDHANE” Judges Details',
      },
      {
        type: 'text',
        content: 'Smt. Srabani Sen',
      },
      {
        type: 'text',
        content:
          'Srabani Sen is a Bengali Indian exponent of Rabindra Sangeet and Bengali songs. She is the daughter of singer Sumitra Sen, and the younger sister of another Rabindra Sangeet exponent Indrani Sen. She is a successor to the gharana, which has contributed to the spread of Tagore’s music across the world.',
      },
      {
        type: 'text',
        content:
          'She was schooled at Patha Bhavan school in Kolkata. Later she studied geography at the Gokhale Memorial Girls’ College, a women’s college affiliated with the University of Calcutta and earned a postgraduate degree from the same university.[4]She started as a journalist for the Bengali magazine Manorama, before opting for a full-time career in music. Sen’s tutelage commenced under her mother’s guidance was followed by training at Geetabitan Music Institute. She has sung on the soundtracks of many films, including Dekha, Baariwali, Swapner Feriwalla, Sanjhbaatir Rupkothara, Ballygunge Court , and Hemanter Pakhi. In 2000, she was awarded the B.F.J.A award for the best female playback singer[5]for her soulful rendition of Rabindra Sangeet Amala Dhabala Paaley in director Rituparno Ghosh’s film, Utsab.',
      },
      {
        type: 'text',
        content: 'Smt. Kamalini Mukherji',
      },
      {
        type: 'text',
        content:
          'Smt. Kamalini Mukherji is one of the leading exponents of Rabindranath Tagore’s songs, known in India and Bangladesh as “Rabindra Sangeet”. She has been trained from an early age at Dakshinee, a leading Rabindrasangeet academy in Kolkata, India. Over the last 11 years she has performed extensively in India, US, Canada, and Bangladesh, and has been a regular face on Bengali television in India, Bangladesh, and the Bengali diaspora across the globe, including the US. In 2013 she went to Mauritius on a mission to teach and spread Tagore’s music in that country on a joint initiative between the Govt. of Mauritius and UNESCO, in commemoration of Tagore’s 150th birth anniversary. She has given a solo concert for the President of India, Sri Pranab Mukherjee, at Rashtrapati Bhavan in 2015. She has had solo and group performances at the North American Bengali Conferences (NABC) in 2013 in Toronto, and in 2016 in New York City. She sang for the 2005 movie Nishijapon, directed by Sandip Ray. Kamalini has 12 albums with one of the leading music labels in India, Saregama, 7 of them solo. This includes a prestigious “Best of Kamalini” collection. A student of South Point school, Kolkata, Kamalini completed her Bachelor’s in English Literature from Jadavpur University, India with a gold medal in 2001. She then won the (Bill) Gates Cambridge Scholarship and went to St John’s College, Cambridge, UK for a master’s degree. On completing her degree, she spent a year in Collegio Ghislieri, University of Pavia, Italy on an exchange program with St. John’s College. She aspires to take Tagore’s music to a wider international audience, cutting across generations and geographical boundaries. She currently divides her time between Kolkata and San Francisco.',
      },
      {
        type: 'text',
        content: 'Sri Joy Sarkar',
      },
      {
        type: 'text',
        content:
          'Sourav Sarkar,popularly known asJoy Sarkar,is a Kolkata based Indian Bengali film music composer. He mainly works in Bengali cinema and albums. He composed soundtracks for Jodi Ekdin (2010), Accident (2012), Muktodhara (2012), Bicycle Kick (2013), Half Serious (2013), Rupkatha Noy (2013), The play (2013), Antaraal (2013), Women Prayed and Preyed Upon (2013), Ek Phali Rodh (2014), Abby Sen (2015), Kiriti Roy (2016), Nayikar Bhumikay (2017), Bilu Rakkhosh (2017), Pupa (2018), Reunion (2019), Shesher Golpo (2019), and Parcel (2019).',
      },
      {
        type: 'text',
        content:
          'Joy Sarkar was born in Kolkata, to Sudhin Sarkar, who is a Bengali singer, and Kalyani Sarkar. He is married to eminent Bengali Singer Lopamudra Mitra since 2001. They have worked together and composed many Bengali songs. He started his musical journey with the Guitar, learning from Subrata Karmakar, Nepal Shaw and Amyt Dutta. Travelling extensively around the country and the globe he slowly started doing sessions, arrangements and composing. He started his career in 1998 when he composed the first song of his life that was “Chhelebelar Brishti”. He got Radio Mirchi Best Upcoming Singer Award in 2013 for the song “Dhoro Kono Katha Holo Na” from the film Accident.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2019/Header.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-2');
    },
  },
  'event-3': {
    id: 'event-3',
    title: 'প্রতিমা চন্দ্র মেমোরিয়াল অ্যাওয়ার্ড – ২০১৬',
    blocks: [
      {
        type: 'text',
        content:
          'It was a unique opportunity for 27 promising female Hindustani Classical Vocalists to prove their mettle at the maidenPratima Chandra Memorial Award 2016held from the3rd to 5th of November, 2016at theSeminar Hall of Science City, Kolkata.This music-filled event, organised byPratima Chandra Foundation,in association withThe Dover Lane Music ConferenceandThe Dover Lane Music Academy.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/event_desc5-300x164.jpg'),
      },
      {
        type: 'text',
        content:
          'Sri Bappa Sen, General Secretary of The Dover Lane Music Conferencementored and arranged this competition for Hindustani Classical vocalists. With the supportive management of The Dover Lane Music Conference, the Foundation introduced the event through display advertisements in leading dailies, inviting talented vocalists specializing in Kheyal and Thumri (Jat & Aadhaa Taal). By the end of the first week of October a sizeable pool of talented vocalists responded and ultimately twenty-seven got selected for the final round.',
      },
      {
        type: 'text',
        content:
          'The eminent judges who graced the event were Pandit Falguni Mitra, Pandit Mohanlal Mishra and Vidushi Subhada Paradkar – each of them authorities in their respective musical domain.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/event_desc5-300x164.jpg'),
      },
      {
        type: 'text',
        content: '3rd November: The contestants –',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/PCMA-2016-1st-Atri-Kotal-300x218.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/PCMA-2016-2nd-Nilanjana-De-300x231.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/PCMA-2016-3rd-Sohini-Singha-Majumdar-300x233.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/PCMA-2016-Event-300x208.jpg'),
      },
      {
        type: 'text',
        content:
          'Silpi Das Biswas || Swyamduti Majumdar || Vedantika Chatterjee Mukherjee || Debasri Chakraborty || Shibani Halder || Sreemati Mukherjee Das || Tanula Chakrovorty || Gopa Biswas || Minakshi Karmakar || Bithika Roy || Priyanka Dutta',
      },
      {
        type: 'text',
        content: '4th November: The contestants –',
      },
      {
        type: 'text',
        content:
          'Asmita Patraa || Nilanjana De || Ananya Bandopadhyay || Bhumika Trivedi || Priyanki Chakrovorty || Soma Maitra',
      },
      {
        type: 'text',
        content: '5th November: The contestants –',
      },
      {
        type: 'text',
        content:
          'Atri Kotal || Sanjukta Das || Soumi Majumdar || Siboli Das || Sampurna Deb || Pallabi Ghatak || Bansari Dutta (Mukherjee) || Srijoni Bhattacharya Mukherjee || Titas Chatterjee || Sohini Singha Majumdar',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Smt. Atri Kotal won the First Prize. The Second Prize was won by Smt. Nilanjana De. Smt. Sohini Singha Majumdar won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The prizes were conferred bySri B. K. Chandra, President of The Dover Lane Music Conference and the Chairman of P. C. Chandra Group, at the inauguration of the 65th Dover Lane Music Conference at Nazrul Mancha, Rabindra Sarobar, Kolkata on January 22, 2017.',
      },
      {
        type: 'text',
        content: 'পণ্ডিতফাল্গুনীমিত্র',
      },
      {
        type: 'text',
        content: 'Pandit Falguni Mitra',
      },
      {
        type: 'text',
        content:
          'A foremost exponent of Dhrupad, the authentic and respected form of Hindusthani Classical music, Pandit Falguni Mitra was initiated into music by his father, Sangeetacharya Pandit Shib Mitra at the tender age of four and a half. Pandit Falguni Mitra combines the Dagar style of “Alaapchari” with the Betia style of Dhrupad and Dhamaar with a distinctive stamp of his own personality.',
      },
      {
        type: 'text',
        content:
          'Possessing a deep, melodious voice, Falguni Mitra has brought about a reformation in this art-form through successful innovations in its melodic structure and rhythmic variations. Unwavering purity of the Raga, imaginative phrases loaded with emotions and nuances, majestic compositions and intricate “laykari” create an aesthetic charm that permeate his vocal renderings.',
      },
      {
        type: 'text',
        content:
          'An erudite and thoughtful musician, Falguni Mitra receives unqualified appreciation for his lecture-demonstations and articles in various journals in the country and abroad.',
      },
      {
        type: 'text',
        content: 'পণ্ডিতমোহনলালমিশ্র',
      },
      {
        type: 'text',
        content: 'Pandit Mohanlal Mishra',
      },
      {
        type: 'text',
        content: 'One of the famous Raag Marwa vocalist.',
      },
      {
        type: 'text',
        content:
          'Pandit Mohanlal Mishra is one of the greatest vocalists of Hindustani Classical Music. Son of Late Gayancharaya Pandit Damodar Mishra, he is now among the living legends of Indian Classical Gayakii and a legendary figure of ‘Benaras Gharana’. Pandit Mishra is well known for his exposition of Ragas, Bandishes, accompanied by complex Tan, Laykari and Gayakii.',
      },
      {
        type: 'text',
        content: 'বিদুষীশুভদাপারাদকার',
      },
      {
        type: 'text',
        content: 'Vidushi Subhada Paradkar',
      },
      {
        type: 'text',
        content:
          'Pandita Shubhada Paradkar is now quite well known to the music lovers throughout the country and abroad also. Both the critics and the “Rasiks” remember her for “Aggressive Gayaki” and proficiency in the “Layakari” which is rarely seen in the female vocalists today.',
      },
      {
        type: 'text',
        content:
          'While her formal music instructions include a M.A. (Music), degree from S.N.D.T. University Mumbai, she has also had the benefit of individual tuitions from different Gurus at different points of her career. Pandita Shubhada Paradkar possesses the unique distinction of learning under all the four major Gharanas of Hindustani Classical Music, which has made her distinctive in the present generation of the artistes.',
      },
      {
        type: 'text',
        content:
          'She is regularly guiding senior students in S. N. D. T. University, Mumbai and Lalit Kala Kendra at Pune University through her workshops and Lecture Demonstrations. She has guided students in Bangkok and given performances at different places in Thailand including Bangkok.',
      },
      {
        type: 'text',
        content:
          'Apart from being a regular performer over Radio (Mumbai) and different channels on Television she has performed throughout the country as well as abroad.',
      },
      {
        type: 'text',
        content:
          'Her concerts are full of lively interaction with the rhythm and also she makes excellent use of semi-classical varieties like Thumri, Bhajan. ‘Tappa’ is another Ace in her concert.',
      },
      {
        type: 'text',
        content: '1stPrize: Atri Kotal, Kolkata.',
      },
      {
        type: 'text',
        content: '2ndPrize: Nilanjana De, Kolkata',
      },
      {
        type: 'text',
        content: '3rdPrize: Sohini Singha Majumdar, Kolkata',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/collage-2.png'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-3');
    },
  },
  'event-4': {
    id: 'event-4',
    title: 'রবীন্দ্র গানে প্রতিমা চন্দ্র পুরষ্কার  ২০১৬  অরূপরতনের সন্ধানে',
    blocks: [
      {
        type: 'text',
        content:
          'The Grand finale ofRabindra Gaane Pratima Chandra Puroshkartitled“Aruprataner Sandhane”was held on Wednesday, 11th January, 2017 at Rabindranath Tagore Center, ICCR Auditorium, Ho Chi Minh Sarani, Kolkata. The competition was organised jointly byPratima Chandra FoundationandDaakGhar. Rabindra Sangeet enthusiasts, about three thousand, from different parts of the country showed interest for auditions. Out of which 93 applicants were called for audition on 6th & 7th December, 2016. The judges selected 12 participants for the grand finale. These participants performed live in front of the judges and the audience, through 3 rounds of competition.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/DSC_4530-300x157.jpg'),
      },
      {
        type: 'text',
        content:
          'Sri Manoj Murali, eminent Rabindrasangeet Singer and founder of DaakGharmentored and arranged the entire competition.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/DSC_4566-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/DSC_4548-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/DSC_4556-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Eminent singersSmt. Pramita Mallick,Smt. Indrani Sen,Smt. Sraboni Sen,Smt. Sreeradha Bandopadhyay,Smt. Kamalini MukherjiandSri Shamik Paljudged the Grand Finale. Some of them also performed a song each on the day.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/DSC_4334-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/DSC_4501-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/DSC_4439-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'The Auditions were judged byPandit Biplab Mondal,Sri Debashis Ray Chaudhuri,Smt. Kamalini Mukherji,Smt. Debika DuttaandSri Ankan Roy.',
      },
      {
        type: 'text',
        content: '11th January: The contestants –',
      },
      {
        type: 'text',
        content:
          'Ms. Suparna Chattopadhyay || Ms. Sanchita Bhowmick || Ms. Jhinuk Basu || Ms. Paramita Mahanta || Ms. Pritha Chatterjee || Ms. Trisha Banerjee || Ms. Arunima Mitra || Ms. Sanhita Sen || Mr. Sukanta Chatterjee || Mr. Supriyo Kole || Ms. Patralekha Ganguly || Mr. Rahul Mitra Mustafi',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Ms. Suparna Chattopadhyay of Ramrajatala, Howrah won the First Prize. The Second Prize was won by Ms. Sanchita Bhowmick of Islampur of North Dinajpur. Ms. Jhinuk Basu of Baranagar, Kolkata won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The winners were awarded Musical Instruments worth Rs. 60,000/- (Rupees Sixty Thousand) and Trophies.The President of Dover Lane Music Conference and the Chairman of P. C. Chandra Group, Sri B. K. Chandragraced the occasion and gave away the winners’ trophies.',
      },
      {
        type: 'text',
        content:
          'RABINDRA GAANE PRATIMA CHANDRA PUROSHKAR 2016 “ARUPRATANER SANDHANE” Judges Details',
      },
      {
        type: 'text',
        content: 'Smt. Pramita Mallick',
      },
      {
        type: 'text',
        content:
          'Currently the foremost exponent in the field of Rabindrasangeet as live performer, recording artist and guru, she was born and raised in Santiniketan, West Bengal where Tagore’s legacy became a way of life.  She has trained in Rabindrasangeet under Tagore’s direct disciple Sri Shantidev Ghosh and other eminent gurus like Kanika Bandopadhyay, Nilima Sen, Bishwajit Ray, thereafter pursuing further training from Subinoy Roy, Suchitra Mitra and Sri Subhash Chowdhury after moving to Kolkata.  She has been singing on All India Radio and Doordarshan since 1972 and 1975, respectively and is an ‘A’ grade artist. She has a large number of CDs to her credit.  Among various positions held by her, she is an empanelled artiste of the ICCR, an advisory board member of the West Bengal Rajya Sangeet Academi and Examiner/Adjudicator (Ph.D) for Rabindra Bharati University & a member of the advisory committee of the Rabindrasangeet GABESHANA Kendra (RSGK) and Kalanukromik Rabindrasangeet Prakalpa (KRSP) of the Visva Bharati University. She has performed with foreign artistes across Europe on joint projects on Tagore. She has performed in academic sessions/conferences organized by the University of Harvard.',
      },
      {
        type: 'text',
        content: 'শ্রীমতীইন্দ্রাণীসেন',
      },
      {
        type: 'text',
        content: 'Smt. Indrani Sen',
      },
      {
        type: 'text',
        content:
          'Indrani Sen is a famous Bengali singer. Indrani Sen is the most recognized singer for Rabindra Sangeet. She is a daughter of Sumitra Sen, one of the eminent exponents of Rabindra Sangeet, is possibly the most talented female vocalist, for her distinctive style combined with well- modulated delivery, and her grip over various forms of Indian music. She has excelled not only in songs of Tagore and Nazrul, but in Bhajans, Geets, Ghazals, Modern Bengali Songs, devotional and many other forms of light classical and modern music. She is reigning the music industry since last 40 years as the most respected and honoured vocalist.',
      },
      {
        type: 'text',
        content: 'শ্রীমতীশ্রাবণীসেন',
      },
      {
        type: 'text',
        content: 'Smt. Sraboni Sen',
      },
      {
        type: 'text',
        content:
          'Srabani Sen, also spelt as Sraboni Sen, is a Bengali Indian exponent of Rabindra Sangeet and Bengali songs. She is a daughter of Sumitra Sen and sibling of the prolific artiste, Indrani Sen. She is an able successor to the gharana, which has contributed immensely to the spread of Tagore’s music across the world. Srabani’s tutelage commenced under her mother’s able guidance followed by her rigorous training at Geetabitan Music Institute from where she came out with flying colours.',
      },
      {
        type: 'text',
        content: 'Smt. Kamalini Mukherji',
      },
      {
        type: 'text',
        content:
          'Kamalini Mukherji is one of the most popular faces among today’s Rabindrasangeet singers. Her smart, distinctive style of singing, marked by a deep understanding of the lyrics and a clear diction, has helped her carve out a niche for herself in the field. Over the last few years Kamalini has spent a large part of her time in the USA, successfully carrying the music and message of Tagore not just to the vast Bengali diaspora, but also to an international audience.',
      },
      {
        type: 'text',
        content:
          'Trained in Rabindrasangeet from the age of ten at Dakshinee, a renowned institution practising and propagating Tagore’s music, Kamalini graduated with distinction from the institution in 1998. In 2001 she was awarded the “Dakshinee Purashkar” in recognition of young talent for Rabindrasangeet.',
      },
      {
        type: 'text',
        content:
          'A regular on television and stage in Kolkata, she has cut several discs with HMV Saregama. Her unique appeal lies in instilling a fresh enthusiasm for Tagore’s songs in the young generation, while endearing herself equally to the traditional and learned listener.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2016/Header2016.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-4');
    },
  },
  'event-5': {
    id: 'event-5',
    title: 'প্রতিমা চন্দ্র মেমোরিয়াল অ্যাওয়ার্ড – ২০১৭',
    blocks: [
      {
        type: 'text',
        content:
          'It was a unique opportunity for 20 promising female Hindustani Classical Vocalists to prove their mettle at the secondPratima Chandra Memorial Award 2017held from the3rd to 5th of November, 2017at theSeminar Hall of Science City, Kolkata.This music-filled event was organised byPratima Chandra Foundation, in association withThe Dover Lane Music ConferenceandThe Dover Lane Music Academy.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/PCMA-2017-Event-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/PCMA-2017-Judges-1-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/PCMA-2017-Judges-2-1-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'The eminent judges who graced the event werePandit Falguni Mitra, Sri. Koushik Bhattacharjee and Vidushi Manjiri Kelkar– each of them authorities in their respective musical domain.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/PCMA-2017-3rd-Soumi-Majumdar-4-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/PCMA-2017-1st-Tanvi-Goswami-5-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/PCMA-2017-2nd-Sanjukta-Das-5-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Sri Bappa Sen, General Secretary of The Dover Lane Music Conferencementored and arranged this competition for Hindustani Classical vocalists. With the supportive management of The Dover Lane Music Conference, the Foundation publicized the event through display advertisements in leading dailies, inviting talented vocalists specializing in Kheyal and Thumri (Jat & Aadhaa Taal). By the end of the first week of October a sizeable pool of talented vocalists responded and ultimately twenty got selected for the final round.',
      },
      {
        type: 'text',
        content:
          'Each of the participants was given an opportunity to demonstrate their talent and perform in front of the eminent judges along with their choice of supporting instruments. Each Audition had a brief interactive session either at the beginning or at the end.',
      },
      {
        type: 'text',
        content: '3rd November: The contestants –',
      },
      {
        type: 'text',
        content:
          'Ashmita Patra || Laxmi Priya Nayak || Sreerupa Bhattacharya || Annesa Halder',
      },
      {
        type: 'text',
        content: '4th November: The contestants –',
      },
      {
        type: 'text',
        content:
          'Soumi Majumdar || Ratna Das || Sanchali Chatterjee || Amruta Shrirang Tambe || Tanvi Goswami || Ananya Bhattacharjee || Nibedita Bhattacharjee Bagchi',
      },
      {
        type: 'text',
        content: '5th November: The contestants –',
      },
      {
        type: 'text',
        content:
          'Sanjukta Das || Jaitashree Das || Susmita Guha Thakurta || Ananya Bandyopadhyay || Shreya Sen || Madhumanti Das || Richa Chatterjee || Amrita Ray (Roy) || Suparna Chattopadhyay',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Smt. Tanvi Goswami won the First Prize. The Second Prize was won by Smt.Sanjukta Das. Smt. Soumi Majumdar won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The prizes were conferred by Sri B. K. Chandra,President of The Dover Lane Music Conference and the Chairman of P. C. Chandra Group,on 22ndJanuary, 2018 at Nazrul Mancha, Rabindra Sarobar, Kolkata at the inaugural ceremony of 66thAnnual Music Conference of The Dover Lane Music Conference.',
      },
      {
        type: 'text',
        content: 'PRATIMA CHANDRA MEMORIAL AWARD 2017Judges Details',
      },
      {
        type: 'text',
        content: 'পণ্ডিতফাল্গুনীমিত্র',
      },
      {
        type: 'text',
        content: 'Pandit Falguni Mitra',
      },
      {
        type: 'text',
        content:
          'A foremost exponent of Dhrupad, the authentic and respected form of Hindusthani Classical music, Pandit Falguni Mitra was initiated into music by his father, Sangeetacharya Pandit Shib Mitra at the tender age of four and a half. Pandit Falguni Mitra combines the Dagar style of “Alaapchari” with the Betia style of Dhrupad and Dhamaar with a distinctive stamp of his own personality.',
      },
      {
        type: 'text',
        content:
          'Possessing a deep, melodious voice, Falguni Mitra has brought about a reformation in this art-form through successful innovations in its melodic structure and rhythmic variations. Unwavering purity of the Raga, imaginative phrases loaded with emotions and nuances, majestic compositions and intricate “laykari” create an aesthetic charm that permeate his vocal renderings.',
      },
      {
        type: 'text',
        content:
          'An erudite and thoughtful musician, Falguni Mitra receives unqualified appreciation for his lecture-demonstations and articles in various journals in the country and abroad.',
      },
      {
        type: 'text',
        content: 'শ্রী কৌশিক ভট্টাচার্য্য',
      },
      {
        type: 'text',
        content: 'Sri Koushik Bhattacharjee',
      },
      {
        type: 'text',
        content:
          'Koushik Bhattacharjee is a prominent Indian Classical vocalist and teacher at Dover Lane Music Academy, Manindra Sangeet Tirtha, Bhowanipur Sangeet Sammilan.',
      },
      {
        type: 'text',
        content:
          'He is the son of renowned Classical Vocalist Late Pt. Pataki Bhattacharjee. Koushik Bhattacharjee started learning Indian Classical Music at the age of seven under the guidance of his father Late Pandit Pataki Bhattacharjee, a renowned Classical Vocalist. Later, after getting selected as a Scholar at ITC Sangeet Research Academy, he continued his training under Pandit Arun Bhaduri and Late Pandit K.G. Ginde. He eventually became the “Ganda Bandh Shagird” of Late Pandit K.G. Ginde and also trained later under the guidance of Pandit Sunil Bose.',
      },
      {
        type: 'text',
        content:
          'Koushik has participated in many major and prestigious concerts, including the Dover Lane Music Conference, the ITC Sangeet Sammelan, the West Bengal State Music Conference, Uttarpara Sangeet Chakra, etc. in India and Radio France, Association Ganapati (Bordeaux, France), Theatre of La Rochelle (La Rochelle, France), ITC Tour in USA & Canada, different Countries of Europe, etc.',
      },
      {
        type: 'text',
        content: 'বিদূষী মঞ্জিরি কেলকার',
      },
      {
        type: 'text',
        content: 'Vidushi Manjiri Kelkar',
      },
      {
        type: 'text',
        content:
          'A performance so captivating as to evoke nostalgic memories of a bygone era of the inimitable redoubtable musician Soorashri Kesarbai Kerkar and to prompt spontaneous appreciative title “Future Kesarbai Kerkar” from a personage no less than Late Shri. P. L. Deshpande, a revered name in Music and Marathi literature, is the distinctive feature of Manjiri Kelkar – a scion of the Jaipur Atrauli Gharana.',
      },
      {
        type: 'text',
        content:
          'Manjiri has inherited the rich tradition of Jaipur Atrauli Gharana from Pandit Kanetkar, doyen of the gharana. The effect of Pandit Kanetkar’s long association with Ustad Bhurji Khansaheb is aptly reflected in the melodious singing of Manjiri. She exhibits astonishing depth of understanding in Music. Her pliant, polished and seasoned voice with open Akaar, her easy and graceful glides, intertwining of Laya and Swara so fine as to make the two appear inseparable- a noteworthy feature so characteristic of Jaipur Gharana.',
      },
      {
        type: 'text',
        content:
          'Manjiri has received wide acclaim for her performances at the 41st Sawai Gandharva Music Festival-Pune, Megh-Malhar Samaroha 1994 – Mumbai, Jaipur Samaroha 1995 – Bhopal, Tansen Samaroha 1998 – Gwalior, Kesarbai Kerkar Smriti Samaroha-Goa and at numerous other concerts. The enraptured audience at Kolkata literally gave her a standing ovation at the conclusion of her program organized by ITC Sangeet Sammelan in 1996 / 2004, a rare honour indeed. She has mesmerized audiences in Sangeet Natak Academy, 2003 Hydrabad, Harwallab Music Festival 2003, Jalandhar, Shankarlal Festival – 2000 / 2004 Delhi, Dover Lane Conference 2004 – Kolkata.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/PCMA-Collage.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-5');
    },
  },
  'event-6': {
    id: 'event-6',
    title: 'রবীন্দ্র গানে প্রতিমা চন্দ্র পুরস্কার – ২০১৭  অরূপরতনের সন্ধানে',
    blocks: [
      {
        type: 'text',
        content:
          'The Grand finale of the second edition of Rabindra Gaane Pratima Chandra Puroshkar titled “Aruprataner Sandhane” was held on Sunday, 3rd December, 2017 at G. D. Birla Sabhagar, Kolkata. The competition was organised jointly by Pratima Chandra Foundation and DaakGhar. Rabindra Sangeet enthusiasts from different parts of West Bengal showed interest for the auditions. Out of which 88 applicants were called for audition on 16th September, 2017 at The Tulip hall of P. C. Chandra Garden. The judges selected 12 participants for the grand finale. These participants performed live in front of the judges and the audience, through 3 rounds of competition.',
      },
      {
        type: 'text',
        content:
          'Famous singer Smt. Usha Uthup inaugurated the event and also released the Audio CD of the winners of the first edition of “Aruprataner Sandhane”.',
      },
      {
        type: 'text',
        content:
          'Sri Mano Murali, eminent Rabindrasangeet Singer and founder of DaakGhar mentored and arranged the entire competition.',
      },
      {
        type: 'text',
        content: 'The eminent judges who graced the event were:',
      },
      {
        type: 'text',
        content:
          'Eminent singers Smt. Sraboni Sen, Smt. Jayati Chakraborty, Smt. Sohini Mukherjee and Smt. Kamalini Mukherji and eminent Music Director Sri Joy Sarkar and eminent Tabla player Pandit Biplab Mondal judged the Grand Finale. Some of them also performed a song each on the day.',
      },
      {
        type: 'text',
        content:
          'The Auditions were judged by Pandit Biplab Mondal, Smt. Manisha Murali, Smt. Debika Dutta and Smt. Somali Mukherjee.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/ARS-2017-Judges-4-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/ARS-2017-Judges-3-300x200.jpg'),
      },
      {
        type: 'text',
        content: '3rd December: The contestants –',
      },
      {
        type: 'text',
        content:
          'Mr. Arjun Roy || Mr. Anurag Datta || Ms. Iman Haldar || Ms. Angana Chatterjee || Ms. Reema Dasgupta || Ms. Patralekha Ganguli || Mr. Krishnendu Dey || Ms. Ashmani Kundu || Mr. Sagnik Basak || Mr. Anjishnu Lahiri || Mr. Soumyadeep Saha || Ms. Sayantani Mukherjee',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/ARS-2017-Judges-5-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/ARS-2017-Judges-1-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/ARS-2017-Judges-2-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Mr. Arjun Roy of NSC Bose Road, Kolkata won the First Prize. The Second Prize was won by Mr. Anurag Datta of Baruipur, Kolkata. Ms. Iman Haldar of Diamond Harbour, South 24 Parganas won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The winners were awarded Musical Instruments worth Rs. 60,000/- (Rupees Sixty Thousand) and Trophies.The President of Dover Lane Music Conference and the Chairman of P. C. Chandra Group, Sri B. K. Chandra and eminent Singer and Minister of State for Heavy Industries and Public Enterprises, Government of India, Sri Babul Supriyograced the occasion and gave away the winners’ trophies.',
      },
      {
        type: 'text',
        content:
          'RABINDRA GAANE PRATIMA CHANDRA PUROSHKAR 2017 “ARUPRATANER SANDHANE” Judges Details.',
      },
      {
        type: 'text',
        content: 'শ্রীমতীশ্রাবণীসেন',
      },
      {
        type: 'text',
        content: 'Smt. Sraboni Sen',
      },
      {
        type: 'text',
        content:
          'Srabani Sen, also spelt as Sraboni Sen, is a Bengali Indian exponent of Rabindra Sangeet and Bengali songs. She is a daughter of Sumitra Sen and sibling of the prolific artiste, Indrani Sen. She is an able successor to the gharana, which has contributed immensely to the spread of Tagore’s music across the world. Srabani’s tutelage commenced under her mother’s able guidance followed by her rigorous training at Geetabitan Music Institute from where she came out with flying colours.',
      },
      {
        type: 'text',
        content: 'Smt. Jayati Chakraborty',
      },
      {
        type: 'text',
        content:
          'Jayati has a God gifted unique voice. Her renditions has won her accolades and mesmerised audiences transcending geographical boundaries. She has more than ten solo albums and numerous assorted albums to her credit within a short time of launching her career as a singer. This indeed is a testament of her dedication and passion for music. She has won countless accolades as reward from avid listeners which led to a veritable fan following.',
      },
      {
        type: 'text',
        content:
          'Jayati began singing at the age of five. She has received several awards in State Music Academy. She has sung in numerous tele-serials and telefilms in all leading channels. She has done playback singing for numerous Bengali movies and has worked with reputed Music Directors.',
      },
      {
        type: 'text',
        content: 'Smt. Kamalini Mukherji',
      },
      {
        type: 'text',
        content:
          'Kamalini Mukherji is one of the most popular faces among today’s Rabindrasangeet singers. Her smart, distinctive style of singing, marked by a deep understanding of the lyrics and a clear diction, has helped her carve out a niche for herself in the field. Over the last few years Kamalini has spent a large part of her time in the USA, successfully carrying the music and message of Tagore not just to the vast Bengali diaspora, but also to an international audience.',
      },
      {
        type: 'text',
        content:
          'Trained in Rabindrasangeet from the age of ten at Dakshinee, a renowned institution practising and propagating Tagore’s music, Kamalini graduated with distinction from the institution in 1998. In 2001 she was awarded the “Dakshinee Purashkar” in recognition of young talent for Rabindrasangeet.',
      },
      {
        type: 'text',
        content:
          'A regular on television and stage in Kolkata, she has cut several discs with HMV Saregama. Her unique appeal lies in instilling a fresh enthusiasm for Tagore’s songs in the young generation, while endearing herself equally to the traditional and learned listener.',
      },
      {
        type: 'text',
        content: 'Sri Joy Sarkar',
      },
      {
        type: 'text',
        content:
          'Joy Sarkar is an eminent Bengali Music Director and Songwriter.',
      },
      {
        type: 'text',
        content:
          'Joy Sarkar was born in Kolkata, to Sudhin Sarkar, who is a Bengali singer, and Kalyani Sarkar. He is married to an eminent Bengali Singer Lopamudra Mitra since 2001. They have worked together and composed many Bengali songs. He started his musical journey with the Guitar, learning from Subrata Karmakar, Nepal Shaw and Amyt Dutta. Travelling extensively around the country and the globe he slowly started doing sessions, arrangements and composing. He started his career in 1998 when he composed the first song of his life that was “Chhelebelar Brishti”.',
      },
      {
        type: 'text',
        content:
          'He was the judge ofSa Re Ga Ma Pa 2013in Zee Bangla. He had been the judge of the same show in previous seasons also.',
      },
      {
        type: 'text',
        content:
          'He got Radio Mirchi Best Upcoming Singer Award in 2013 for the song “Dhoro Kono Katha Holo Na” from the film Accident.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2017/ARS-collage.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-6');
    },
  },
  'event-7': {
    id: 'event-7',
    title: 'প্রতিমা চন্দ্র মেমোরিয়াল অ্যাওয়ার্ড  – ২০১৮',
    blocks: [
      {
        type: 'text',
        content:
          'It was a unique opportunity for 15 promising female Hindustani Classical Vocalists to prove their mettle at the thirdPratima Chandra Memorial Award 2018held from the10th to 12th of November, 2018at theICCR Centre for Arts, Ho Chi Minh Sarani, Kolkata.This music-filled event was organised byPratima Chandra Foundation, in association withThe Dover Lane Music ConferenceandThe Dover Lane Music Academy.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/PCMA-2018-2nd-Rakhi-Chatterjee-1-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/PCMA-2018-Event-2-1-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Sri Bappa Sen, General Secretary of The Dover Lane Music Conference mentored and arranged this competition for Hindustani Classical vocalists. With the supportive management of The Dover Lane Music Conference, the Foundation publicized the event through display advertisements in leading dailies, inviting talented vocalists specializing in Kheyal and Thumri (Jat & Aadhaa Taal). By the end of the first week of October a sizeable pool of talented vocalists responded and ultimately twenty got selected for the final round.',
      },
      {
        type: 'text',
        content:
          'Pandita Shubhada Paradkar, Smt. Sanjukta Ghosh and Sri Omkar Dadarkar – each of them authorities in their respective musical domain.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/PCMA-2018-3rd-Laxmipriya-Nayak-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/PCMA-2018-1st-Angira-Kotal-1-1-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Each of the participants was given an opportunity to demonstrate their talent and perform in front of the eminent judges along with their choice of supporting instruments. Each Audition had a brief interactive session either at the beginning or at the end.',
      },
      {
        type: 'text',
        content: '10th November: The contestants –',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/PCMA-2018-Event-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/PCMA-2018-Judges-1-1-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/PCMA-2018-Judges-2-1-300x200.jpg'),
      },
      {
        type: 'text',
        content:
          'Angira Kotal || Rakhi Chatterjee || Nilanjana Bagchi || Jayitri Mazumdar || Shibaranjani Patra',
      },
      {
        type: 'text',
        content: '11th November: The contestants –',
      },
      {
        type: 'text',
        content:
          'Shaswati Chattopadhyay || Meghodeepa Gangopadhyay || Jhankrita Sarkar || Poorba Sarkar Putatunda || Laxmipriya Nayak || Sonali Banerjee',
      },
      {
        type: 'text',
        content: '12th November: The contestants –',
      },
      {
        type: 'text',
        content:
          'Ananya Mukherjee || Ankita Bhattacharya || Afza Rahman || Adrija Basu || Suvra Mukherjee',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Smt. Angira Kotal won the First Prize. The Second Prize was won by Smt. Rakhi Chatterjee and the Third Prize was won by Smt. Laxmipriya Nayak.',
      },
      {
        type: 'text',
        content:
          'The prizes were conferred by Sri B. K. Chandra, President of The Dover Lane Music Conference and the Chairman of P. C. Chandra Group, on 22ndJanuary, 2019 at Nazrul Mancha, Rabindra Sarobar, Kolkata at the inaugural ceremony of 67thAnnual Music Conference of The Dover Lane Music Conference.',
      },
      {
        type: 'text',
        content: 'PRATIMA CHANDRA MEMORIAL AWARD 2018Judges Details',
      },
      {
        type: 'text',
        content: 'Pandita Shubhada Paradkar',
      },
      {
        type: 'text',
        content:
          'Pandita Shubhada Paradkar is now quite well known to the music lovers throughout the country and abroad also. Both the critics and the “Rasiks” remember her for “Aggressive Gayaki” and proficiency in the “Layakari” which is rarely seen in the female vocalists today.',
      },
      {
        type: 'text',
        content:
          'While her formal music instructions include a M.A. (Music) degree from S.N.D.T. University, Mumbai, she has also had the benefit of individual tuitions from different Gurus at different points of her career. Born on 21st September, 1957 in Baroda, she began her music training in Baroda by Pt. R.D. Potdar (Kirana Gharana) and Pt. Madhusudan Joshi (Agra Gharana). Subsequently, the famous violinist and vocalist Late Pt. Gajananrao Joshi trained and imparted her Gwalior and Jaipur Gharana styles. Pt. Babanrao Haldankar (Agra Gharana) and Smt. Padmavati Shaligram Gokhale (Jaipur Gharana) have also trained her for long time. She therefore possesses the unique distinction of learning under all the four major Gharanas of Hindustani Classical Music, which has made her distinctive in the present generation of the artistes.',
      },
      {
        type: 'text',
        content:
          'She is regularly guiding senior students in S.N.D.T. University, Mumbai and Lalit Kala Kendra at Pune University through her workshops and Lecture Demonstrations. She has guided students in Bangkok and given performances at different places in Thailand including Bangkok.',
      },
      {
        type: 'text',
        content:
          'Apart from being a regular performer over Radio (Mumbai) and different channels on Television she has performed throughout the country as well as abroad. Her performances at places like Bangkok, Phitsanoluk, Manchester, London, Sujan Sangeet Samaroh and Gharana Sammelan Vileparle (Mumbai), Dover Lane Music Conference (Kolkata), Sawai Gandharva Sammelan (Pune and Kundgol), Taansen Samaroh (Gwalior) and many more places were highly appreciated. Her concerts are full of lively interaction with the rhythm and also she makes excellent use of semi-classical varieties like Thumri, Bhajan. ‘Tappa’ is another ace in her concert.',
      },
      {
        type: 'text',
        content: 'Smt. Sanjukta Ghosh',
      },
      {
        type: 'text',
        content:
          'Smt. Sanjukta Ghosh is an Indian vocalist in Hindustani classical music from the Patiala Gharana. Initially, she was under the guidance of Prasun Banerjee and later, for almost two decades, from Munawar Ali Khan.',
      },
      {
        type: 'text',
        content:
          'She performed for most of the top Indian conferences, some of them being Tansen Sangeet Sammelan, Sadarang Music Conference, and the Haridas Sangeet Sammelan. She joined the Ali Akbar College of Music at San Francisco, California in 1968. She worked with many artists including Pandit Ravi Shankar, who invited her to sing on hisBangladeshbenefit EP,Joi Bangla.She is married to tabla player Shankar Ghosh. Her son is Bickram Ghosh, percussionist.',
      },
      {
        type: 'text',
        content: 'Sri Omkar Dadarkar',
      },
      {
        type: 'text',
        content:
          'Sri Omkar Shrikant Dadarkar was born on 30 July 1977 at Mumbai. He inherited the art of Music as a family tradition and was initiated into the art by his parents, Sri Shrikant Dadarkar and Smt. Shubhada Dadarkar. Further, he received training under Sri Ram Deshpande, Smt. Manik Verma and from Sri Yashwanthbua Joshi of Gwalior Gharana under the Guru Shishya Parampara scheme of Dadar Matunga Cultural Centre. Selected as a scholar at I.T.C. Sangeet Research Academy in 1999, he also received advanced training under the tutelage of Sri Ulhas Kashalkar. He was trained in light classical music by legendary musician Smt. Girija Devi and Sri Shrinivas Khale. He completed Sangeet Alankar from Gandharva Mahavidyalaya.',
      },
      {
        type: 'text',
        content:
          'He has performed in several prestigious music festivals in Delhi, Kolkata, Mumbai, Kanpur, Lucknow and also got opportunity to present his art abroad. He has been duly awarded for his talent with the Vidyasagar Award from music forum. He is awarded the Ustad Bismillah Khan Yuva Puraskar of Sangeet Natak Academy for the year 2009 for his notable talent in the field of Hindustani Vocal Music. He was enthused by his parents, both being Marathi Natya-Sangeet performers. He trained under his aunt legendary Manik Verma, Pt. Yashwantbua Joshi of Gwalior Gharana and Pt. Ulhas Kashalkar. His performances across India and abroad were highly applauded. He received the prestigious Vidyasagar Award, “Shanmukhananda Hall-Mumbai-Sangeet Shiromani” award, “Chaturanga Sangeet Shishyavrutti Award”, Sangeet Natak Academy Award and Ustad Bismillah Khan Yuva Puraskar. Presently he is a Musician Tutor (Junior Guru) at I.T.C. Sangeet Research Academy, Kolkata. His handsome voice with embellished tans has established him as a brilliant performer.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/post-2.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-7');
    },
  },
  'event-8': {
    id: 'event-8',
    title: 'রবীন্দ্র গানে প্রতিমা চন্দ্র পুরস্কার – ২০১৮ অরূপরতনের সন্ধানে',
    blocks: [
      {
        type: 'text',
        content:
          'The Grand finale of the third edition ofRabindra Gaane Pratima Chandra Puroshkartitled“Aruprataner Sandhane”was held on Monday, 3rd December, 2018 at ICCR Auditorium, Kolkata. The competition was organised jointly byPratima Chandra FoundationandDaakGhar. Rabindra Sangeet enthusiasts from different parts of West Bengal showed interest for the auditions. Out of which 76 applicants were called for audition. Auditions were held at Gitanjali Complex, Santiniketan on 26th September, 2018 and at P. C. Chandra Garden, Kolkata on 30thSeptember, 2018. The judges selected 10 participants for the grand finale. These participants performed live in front of the judges and the audience, through 3 rounds of competition.',
      },
      {
        type: 'text',
        content:
          'Famous singerSmt. Haimanti Suklainaugurated the event and also released the Audio CD of the winners of the second edition of “Aruprataner Sandhane”',
      },
      {
        type: 'text',
        content:
          'Sri Manoj Murali Nair, eminent Rabindrasangeet Singer and founder of DaakGharmentored and arranged the entire competition',
      },
      {
        type: 'text',
        content:
          'Eminent singersSmt. Haimanti Sukla, Smt. Manisha Murali Nair, Smt. Kamalini Mukhopadhyay, Smt. Sohini Mukhopadhyay and Smt. Tithi Deb Burmanand eminent Music DirectorSri Sunil Debjudged the Grand Finale',
      },
      {
        type: 'text',
        content: 'The eminent judges who graced the event were:',
      },
      {
        type: 'text',
        content:
          'The Auditions were judged at Santiniketan bySmt. Bulbul Basu, Smt. Sohini Mukhopadhyay and Sri Ankan Royand at Kolkata bySmt. Debika Dutta, Smt. Sohini Mukhopadhyay and Smt. Indrani Mukhopadhyay.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/ARS-2018-3rd-Supriyo-Koley-4-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/ARS-2018-2nd-Koyali-Sarkar-4-300x200.jpg'),
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/ARS-2018-1st-Bhumika-Ganguly-4-300x200.jpg'),
      },
      {
        type: 'text',
        content: '3rd December: The contestants –',
      },
      {
        type: 'text',
        content:
          'Ms. Bhumika Ganguly || Ms. Koyali Sarkar || Mr. Supriyo Koley || Ms. Reema Dasgupta || Ms. Ankhi Ray || Ms. Shreetama Roy || Ms. Anuradha Patra || Mr. Koustav Barat || Ms. Sabina Yeasmin Shathi || Mr. Sudipta Chakraborty',
      },
      {
        type: 'text',
        content:
          'Congratulations!! In the competition Ms. Bhumika Ganguly of Rabindranagar, Coochbehar won the First Prize. The Second Prize was won by Ms. Koyali Sarkar of Haltu, Dhakuria, Kolkata. Mr. Supriyo Koley of Jagannathpur, Khanakul, Hoogly won the Third Prize.',
      },
      {
        type: 'text',
        content:
          'The winners were awarded Musical Instruments worth Rs. 70,000/- (Rupees Seventy Thousand) and Trophies.The President of Dover Lane Music Conference and the Chairman of P. C. Chandra Group, Sri B. K. Chandragraced the occasion and gave away the winners’ trophies.',
      },
      {
        type: 'text',
        content:
          'It was only natural for Haimanti Sukla to take to singing, for her father, Late Pt. Harihar Sukla himself was a devoted classical vocalist in the fine tradition of Late Pt. Girija Sankar Chakraborty. She grew under the watchful eyes of her father who taught her everything about Indian classical music. She did her first recording in 1970. She took training from Pt. Chinmay Lahiri. Even before she earned a Union Government scholarship on Indian classical music in 1971, she was a regular name in the artistes’ list at AIR. She rendered Kheyal, Thumri, Bhajans, Rabindra Sangeet, Nazrul Geeti, Kirtan, Adhunik and many more. She did her first playback in film songs in 1974 under guidance of Shyamal Mitra. She achieved the prestigeous Sangeet Praveen (M. Muse) before reaching twenty. As a latest note she has recieved ‘Degree of Doctor of Literature’ from University of Burdwan in 2017 and ‘Banga Bibhusan Award’ of Govt. of West Bengal in 2014.',
      },
      {
        type: 'text',
        content:
          'She developed a unique blend of classical seriousness and lively charm. She always tends to improvise and experiment, to explore the unexplored. Singing to the tunes of the likes of Ustad Alla Rakha and Naushad, she has been exposed to a wide variety of styles that have helped her mature as a singer. Great composers like Hemanta Mukherjee, Salil Chowdhury and Manna Dey have scored memorable music for her. She has sung a number of film and basic songs composed by Dr. Bhupen Hazarika. Recipient of several BFJA (Bengal Film Journalists’ Association) awards, she also received a Sur Sringer Academy award for her song in Chasme Baddoor in 1981. She was awarded the Mian Tansen Award in 1975 and the Pramatesh Barua Puraskar before that. In a career that spans several decades, Haimanti Sukla has rendered countless songs in Bengali and has also sung a number of songs in different regional languages like Oriya, Gujrati, Punjabi and Assamese and the Bhojpuri dialect.',
      },
      {
        type: 'text',
        content:
          'Haimanti Shukla has a history of so many decades of a successful musical profession. Yet she is considered to be one of the modern singers of today. Her profound classical training and penchant for variety has earned her sustained appreciation at home and abroad. From Classical Music to Modern songs – she performs it with a seemingly effortless manner that has made her so popular among all classes of music lovers.  Whether a bhajan or a ghazal, she can bring out the soul value of the temperamentally different genres of vocal music. An MA in Bengali literature from Rabindra Bharati University, she lives and works in Kolkata. Some of her recent live performances are, Classical Music conference at Barasat and Golf Green, Kolkata, 16th Sangitacharya Radhika Mohan Maitreya Memorial Music Conference, Kolkata, Pandit Vijay Kichlu Sangeet Ashram, Kolkata, Dover Lane Music Conference, Kolkata, Kheyal & Thumri at Kalamandir, Kolkata, organised by Indo Occidental Symbiosis.',
      },
      {
        type: 'text',
        content: 'শ্রীমতীকমলিনী মুখার্জী',
      },
      {
        type: 'text',
        content: 'Smt. Kamalini Mukherji',
      },
      {
        type: 'text',
        content:
          'Smt. Kamalini Mukherji is one of the leading exponents of Rabindranath Tagore’s songs, known in India and Bangladesh as “Rabindra Sangeet”. She has been trained from an early age at Dakshinee, a leading Rabindrasangeet academy in Kolkata, India.',
      },
      {
        type: 'text',
        content:
          'Over the last 11 years she has performed extensively in India, US, Canada, and Bangladesh, and has been a regular face on Bengali television in India, Bangladesh, and the Bengali diaspora across the globe, including the US. In 2013 she went to Mauritius on a mission to teach and spread Tagore’s music in that country on a joint initiative between the Govt. of Mauritius and UNESCO, in commemoration of Tagore’s 150th birth anniversary. She has given a solo concert for the President of India, Sri Pranab Mukherjee, at Rashtrapati Bhavan in 2015. She has had solo and group performances at the North American Bengali Conferences (NABC) in 2013 in Toronto, and in 2016 in New York City. She sang for the 2005 movie Nishijapon, directed by Sandip Ray. Kamalini has 12 albums with one of the leading music labels in India, Saregama, 7 of them solo. This includes a prestigious “Best of Kamalini” collection.',
      },
      {
        type: 'text',
        content:
          'A student of South Point school, Kolkata, Kamalini completed her Bachelor’s in English Literature from Jadavpur University, India with a gold medal in 2001. She then won the (Bill) Gates Cambridge Scholarship and went to St John’s College, Cambridge, UK for a master’s degree. On completing her degree, she spent a year in Collegio Ghislieri, University of Pavia, Italy on an exchange program with St. John’s College.',
      },
      {
        type: 'text',
        content:
          'She aspires to take Tagore’s music to a wider international audience, cutting across generations and geographical boundaries. She currently divides her time between Kolkata and San Francisco.',
      },
      {
        type: 'text',
        content: 'Smt. Manisha Murali Nair',
      },
      {
        type: 'text',
        content: 'শ্রীমতী মনীষা মুরালি নায়ার',
      },
      {
        type: 'text',
        content:
          'Smt. Manisha Murali Nair, along with her elder brother Sri Manoj Murali Nair, are one of the most versatile and popular young exponents of Rabindra Sangeet today. Hailing originally from Kerala, their lives and love for music are intrinsically entwined with Bengal. The family moved to Santiniketan when their father joined the Vishwa Bharati University as Kathakali Guru. Santiniketan provided Manoj and Manisha with the perfect setting for imbibing the nuances of Rabindra Sangeet which both have chosen as their career calling.',
      },
      {
        type: 'text',
        content:
          'Manisha, apart from being a graduate of Hindi Literature, has also completed her post graduation in Rabindra Sangeet. Dakshina Pavana, released by Bhavna Records was their first album which marked the beginning of a truly wonderful musical journey. Singing professionally for many years now, they have released a large number of albums and cassettes of Rabindra Sangeet.',
      },
      {
        type: 'image',
        src: assetUrl('/assets/events/2018/p-2w.jpg'),
      },
    ],
    get baseData() {
      return EVENTS_DATA.find(ev => ev.id === 'event-8');
    },
  },
};
