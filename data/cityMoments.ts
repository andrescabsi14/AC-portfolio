export type GlobeItemType = 'recognition' | 'event' | 'project' | 'speaker';

export type CityMomentItem = {
  id: string;
  year?: number;
  title: string;
  subtitle: string;
  description: string;
  venue?: string;
  image?: string;
  imagePosition?: string;
  type: GlobeItemType;
};

export type CityMoments = {
  id: string;
  city: string;
  lat: number;
  lng: number;
  color: string;
  items: CityMomentItem[];
};

export const CITY_MOMENTS: CityMoments[] = [
  {
    id: 'bogota-colombia',
    city: 'Bogotá',
    lat: 4.711,
    lng: -74.0721,
    color: '#ef4444',
    items: [
      {
        id: 'feria-jovenes-2014',
        year: 2014,
        title: '7th Young Entrepreneurs Fair',
        subtitle: 'Bogotá Chamber of Commerce - Corferias',
        description: `Selected to participate in the 7th Young Entrepreneurs Fair, Colombia's most important entrepreneurship showcase at Corferias. Presented INNOV, a platform to help businesses create digital marketing strategies and expand their online presence. Closed business agreements with companies in Bogotá and Cartagena and was interviewed by La República.`,
        venue: 'Corferias Convention Center, Bogotá',
        image: '/events/FeriaJovenes.png',
        imagePosition: 'center',
        type: 'recognition'
      },
      {
        id: 'mit-innovators-2017',
        year: 2017,
        title: 'MIT Innovators Under 35 LATAM - Nominee',
        subtitle: 'MIT Technology Review',
        description:
          'Nominated by MIT Technology Review for the Innovators Under 35 LATAM list in recognition of early work in artificial intelligence and technological innovation.',
        venue: 'Bogotá, Colombia',
        image: '/events/innovators.png',
        imagePosition: 'center',
        type: 'recognition'
      },
      {
        id: 'ylai-winners-announcement-bogota',
        title: 'Winners Announcement - Young Leaders of the Americas Initiative',
        subtitle: 'Subsecretary of State, Mari Carmen Aponte',
        description:
          'Ceremony at Centro Colombo Americano in Bogotá where the winners of the Young Leaders of the Americas Initiative (YLAI) were announced, led by U.S. Assistant Subsecretary of State Mari Carmen Aponte.',
        venue: 'Centro Colombo Americano, Bogotá',
        image: '/events/',
        type: 'event'
      },
      {
        id: 'amcham-mentorship-ylai',
        title: 'AmCham Mentorship Program for YLAI Entrepreneurs',
        subtitle: 'Ambassador Kevin Whitaker',
        description: `Mentorship program hosted by AmCham Colombia for YLAI young entrepreneurs, held at the U.S. Ambassador's Residence.`,
        venue: 'U.S. Ambassador Residence, Bogotá',
        image: '/events/amcham.jpeg',
        imagePosition: 'top',
        type: 'event'
      },
      {
        id: 'space-between-us-premiere',
        title: 'Premiere: "The Space Between Us" & Talk with Producer',
        subtitle: 'Richard B. Lewis - U.S. Embassy Bogotá',
        description:
          'Special premiere of the film "The Space Between Us" followed by a conversation with producer Richard B. Lewis, organized by the U.S. Embassy.',
        venue: 'Centro Comercial Gran Estación, Bogotá',
        image: '/events/space.png',
        imagePosition: 'center',
        type: 'event'
      },
      {
        id: 'memphis-in-may-colombia',
        title: 'Colombia as Guest Country - "Memphis in May" Festival',
        subtitle: 'Ambassador Kevin Whitaker',
        description: `Event celebrating Colombia as the invited country at the international "Memphis in May" festival, hosted at the U.S. Ambassador's Residence.`,
        venue: 'U.S. Ambassador Residence, Bogotá',
        image: '/events/memphis.jpg',
        imagePosition: 'center',
        type: 'event'
      },
      {
        id: 'mlbpa-foundation-event',
        year: 2019,
        title: 'Reception in Honor of the Major League Baseball Players Association (MLBPA) Foundation',
        subtitle: 'Invitación Embajada de los Estados Unidos - Embajador Philip S. Goldberg',
        description: `Private reception hosted by Philip S. Goldberg, U.S. Ambassador to Colombia, honoring the visit of the Major League Baseball Players Association (MLBPA) Foundation. Andrés Cabrera Silva was officially invited on Friday, December 13, 2019, from 6:00 p.m. to 8:00 p.m., as part of the Embassy's diplomacy and cooperation initiatives with local leaders.`,
        venue: "U.S. Ambassador's Residence, Bogotá",
        image: '/events/mlb.png',
        imagePosition: 'center 20%',
        type: 'event'
      },
      {
        id: 'financial-inclusion-women-panel',
        title: 'Panel: "Financial Inclusion and Credit Access for Women"',
        subtitle: 'IDB, OPIC, Colombian Presidency & U.S. Delegation',
        description: `High-level panel with the President & Vice President of Colombia, Ivanka Trump, David Bohigian, and U.S. Deputy Secretary John Sullivan on women's financial inclusion.`,
        venue: 'San Carlos Palace, Bolívar Hall - Ministry of Foreign Affairs',
        image: '/events/bid.png',
        imagePosition: 'center',
        type: 'event'
      },
      {
        id: 'mlk-fellows-talk',
        title: 'MLK English Fellows - Entrepreneurship Talk',
        subtitle: 'U.S. Embassy Bogotá',
        description:
          'Entrepreneurship talk for Afro-Colombian and indigenous youth in the MLK English Language Fellows Program, organized by the U.S. Embassy.',
        venue: 'Centro Colombo Americano, Bogotá',
        image: '/events/mlk.jpg',
        imagePosition: 'center',
        type: 'speaker'
      },
      {
        id: 'sergio-arboleda-employee-to-entrepreneur',
        year: 2020,
        title: 'From Employee to Entrepreneur: 7 Lessons I Wish I Had Received',
        subtitle: 'Universidad Sergio Arboleda - Charlas Virtuales de Emprendimiento',
        description: `Invited speaker for Sergio Arboleda University's "Virtual Entrepreneurship Talks" series, sharing seven key lessons learned in the journey from employee to entrepreneur.`,
        venue: 'Sergio Arboleda University (virtual via Zoom), Bogotá',
        image: '/events/ylaibanner.png',
        imagePosition: 'center',
        type: 'speaker'
      },
      {
        id: 'sergio-arboleda-future-of-work',
        year: 2022,
        title: 'The Future of Work: 10 Technologies That Will Transform How We Work and Hire',
        subtitle: 'Universidad Sergio Arboleda - Charlas Virtuales de Emprendimiento',
        description:
          'Talk on the future of work, outlining ten emerging technologies that will transform how companies hire, collaborate, and build teams.',
        venue: 'Sergio Arboleda University (virtual via Zoom), Bogotá',
        image: '/events/empleado.jpg',
        imagePosition: 'center 68%',
        type: 'speaker'
      },
      {
        id: 'ylai-colombia-panel',
        year: 2018,
        title: '2016-2017 Case Studies - YLAI Colombia Entrepreneurship',
        subtitle: 'Panelista - U.S. Embassy Colombia, ASOUSA & YLAI',
        description:
          'Panel speaker at "2016-2017 Case Studies: YLAI Colombia Entrepreneurship", sharing entrepreneurial experiences with other YLAI fellows and local entrepreneurs. Organized by the U.S. Embassy Colombia, ASOUSA and YLAI at the Colombo Americano Center.',
        venue: 'Colombo Americano Center, Bogotá',
        image: '/events/asousa.jpg',
        imagePosition: 'center',
        type: 'speaker'
      },
      {
        id: 'ylai-at5-innovacion-liderazgo',
        year: 2020,
        title: 'YLAI at 5 - Innovation and Leadership',
        subtitle: 'U.S. Embassy Bogotá - AWE 2019',
        description:
          'Co-led a YLAI at 5 session on "Innovation and Leadership" for entrepreneurs from the Academy for Women Entrepreneurs (AWE) 2019, sharing frameworks and experiences to strengthen innovation and leadership skills.',
        venue: 'Virtual (Google Meet) - Coordinated by U.S. Embassy Bogotá',
        image: '/events/',
        type: 'speaker'
      },
      {
        id: 'ylai-at5-que-es-ser-ylai',
        year: 2020,
        title: 'YLAI at 5 - What Does It Mean to Be a YLAI?',
        subtitle: 'U.S. Embassy Bogotá - Finalistas YLAI 2020',
        description:
          'Speaker in the YLAI at 5 session "What Does It Mean to Be a YLAI?" for the YLAI 2020 finalists, sharing personal experience in the program and advice to maximize the fellowship opportunity.',
        venue: 'Virtual (Google Meet) - Coordinated by U.S. Embassy Bogotá',
        image: '/events/',
        type: 'speaker'
      },
      {
        id: 'ylai-at5-fortalecimiento-expansion',
        year: 2020,
        title: 'YLAI at 5 - Strengthening Entrepreneurship and Market Expansion',
        subtitle: 'U.S. Embassy Bogotá - AWE 2019',
        description:
          'Co-facilitated a session on strengthening ventures and expanding into new markets for entrepreneurs from the Academy for Women Entrepreneurs (AWE) 2019.',
        venue: 'Virtual (Google Meet) - Coordinated by U.S. Embassy Bogotá',
        image: '/events/',
        type: 'speaker'
      },
      {
        id: 'pdo-ylai-venezuela-2020',
        year: 2020,
        title: 'PDO YLAI 2020 - Venezuela Orientation Session',
        subtitle: 'U.S. Embassy Bogotá - Experiencia YLAI',
        description:
          'Guest speaker during the YLAI 2020 pre-departure orientation for the Venezuela cohort, sharing the impact of the program and recommendations to get the most value from the fellowship.',
        venue: 'U.S. Embassy, Bogotá',
        image: '/events/memphis.jpg',
        imagePosition: 'top',
        type: 'speaker'
      },
      {
        id: 'mds-digital-projects',
        year: 2014,
        title: 'Fortune 500 Digital Experiences',
        subtitle: 'MDS Digital - Frontend Engineer',
        description:
          'Developed digital experiences for Coca-Cola, Disney, ESPN, Nissan, Dr Pepper, Discovery Channel and others. Delivered 20+ production applications including campaigns, portals, and interactive experiences.',
        venue: 'MDS Digital, Bogotá',
        image: '/events/',
        type: 'project'
      },
      {
        id: 'djes-web-platforms',
        year: 2013,
        title: 'Web Platforms for SMBs',
        subtitle: 'DJES - Web Engineer',
        description:
          'Built WordPress and Django REST API-based platforms for small businesses, helping them establish their online presence.',
        venue: 'DJES, Bogotá',
        image: '/events/',
        type: 'project'
      },
      {
        id: 'belatrix-gan-blockchain',
        year: 2017,
        title: 'Belatrix - AI & Blockchain R&D',
        subtitle: 'Lead Engineer - Blockchain',
        description:
          'Worked remotely from Bogotá as Lead Engineer for Belatrix, building Deep Convolutional GAN models and contributing to the UI and blockchain architecture of an early-stage crypto startup that later raised a $5M seed round.',
        venue: 'Remote from Bogotá for Belatrix',
        image: '/events/',
        type: 'project'
      }
    ]
  },
  {
    id: 'washington-dc-usa',
    city: 'Washington',
    lat: 38.9072,
    lng: -77.0369,
    color: '#D4AF37',
    items: [
      {
        id: 'ylai-2016',
        year: 2016,
        title: 'Young Leaders of the Americas Initiative',
        subtitle: 'President Obama - YLAI Fellowship',
        description: `Selected from more than 4,000 applicants for President Obama's YLAI Initiative. Participated in mentorship, training, and high-level meetings. Received official recognition and certification.`,
        venue: 'Various YLAI venues, Washington, D.C.',
        image: '/events/wash.png',
        imagePosition: 'top',
        type: 'recognition'
      },
      {
        id: 'ylai-reception-dc',
        title: 'Reception Honoring YLAI Participants',
        subtitle: 'Assistant Secretary Evan Ryan',
        description:
          'Reception at the U.S. Department of State, Harry S. Truman Building, honoring participants of the Young Leaders of the Americas Initiative.',
        venue: 'U.S. Department of State, Truman Building',
        image: '/events/ylaiwash.png',
        imagePosition: 'top',
        type: 'event'
      }
    ]
  },
  {
    id: 'lima-peru',
    city: 'Lima',
    lat: -12.0464,
    lng: -77.0428,
    color: '#ef4444',
    items: [
      {
        id: 'apec-ylai-2016',
        year: 2016,
        title: 'APEC Summit & YLAI Delegation',
        subtitle: 'YLAI Summit & Obama Town Hall',
        description: `Invited as part of the YLAI delegation to the APEC Summit in Lima. Participated in meetings with Peruvian leaders including chef Gastón Acurio and attended President Obama's final town hall.`,
        venue: 'APEC venues & PUCP, Lima',
        image: '/events/lima.png',
        imagePosition: 'top',
        type: 'recognition'
      }
    ]
  },
  {
    id: 'santa-cruz-bolivia',
    city: 'Santa Cruz',
    lat: -17.7833,
    lng: -63.1821,
    color: '#ef4444',
    items: [
      {
        id: 'techcamp-bolivia-2017',
        year: 2017,
        title: 'TechCamp Bolivia',
        subtitle: 'AMCHAM & U.S. Embassy Hackathon',
        description:
          'Invited to the first TechCamp Hackathon in Santa Cruz, Bolivia, organized by AMCHAM and the U.S. Embassy. Collaborated with entrepreneurs to design technological solutions for regional challenges.',
        venue: 'Santa Cruz, Bolivia',
        image: '/events/',
        type: 'recognition'
      }
    ]
  },
  {
    id: 'copenhagen-denmark',
    city: 'Copenhagen & Aarhus',
    lat: 55.6761,
    lng: 12.5683,
    color: '#ef4444',
    items: [
      {
        id: 'c40-dtu-2019',
        year: 2019,
        title: 'C40 World Mayors Summit',
        subtitle: 'DTU Young Influencer - Next Generation City Action',
        description:
          'Invited as one of 25 young influencers worldwide to participate in the 2019 C40 World Mayors Summit. Represented the Americas in sustainability discussions with global leaders including Al Gore and mayors of major world cities.',
        venue: 'Copenhagen & Aarhus, Denmark',
        image: '/events/arhus.jpeg',
        imagePosition: 'center',
        type: 'recognition'
      }
    ]
  },
  {
    id: 'detroit-usa',
    city: 'Detroit',
    lat: 42.3314,
    lng: -83.0458,
    color: '#D4AF37',
    items: [
      {
        id: 'meeting-congressman-kildee',
        title: 'Meeting with U.S. Congressman Dan Kildee',
        subtitle: 'Global Ties Detroit',
        description:
          'Visit to the Port of Detroit including a meeting with U.S. Congressman Dan Kildee.',
        venue: 'Port of Detroit',
        image: '/events/congressman.jpg',
        imagePosition: 'top',
        type: 'event'
      },
      {
        id: 'ylai-pitch-competition-detroit',
        title: 'YLAI Pitch Competition - Detroit',
        subtitle: 'Young Leaders of the Americas Initiative',
        description:
          'Participation in the YLAI pitch competition in Detroit, presenting entrepreneurial projects to mentors and local leaders.',
        venue: 'Grand Circus, Detroit',
        image: '/events/detroitylai.jpg',
        imagePosition: 'center',
        type: 'event'
      },
      {
        id: 'on-the-verge-impact-makers',
        title: '"On The Verge - Impact Makers" Talk',
        subtitle: 'Innovation Warriors',
        description:
          'Talk and networking session at Wayne State University as part of the "On The Verge - Impact Makers" series.',
        venue: 'Wayne State University, Detroit',
        image: '/events/ontheverge.png',
        imagePosition: 'center',
        type: 'event'
      }
    ]
  },
  {
    id: 'ann-arbor-usa',
    city: 'Ann Arbor',
    lat: 42.2808,
    lng: -83.743,
    color: '#D4AF37',
    items: [
      {
        id: 'michigan-stadium-invitation',
        title: 'Michigan Stadium Invitation',
        subtitle: 'University of Michigan',
        description:
          'Special invitation to visit Michigan Stadium ("The Big House") as part of broader exchange and entrepreneurship activities in Michigan.',
        venue: 'Michigan Stadium, University of Michigan',
        image: '/events/michigan.jpg',
        imagePosition: 'center',
        type: 'event'
      }
    ]
  },
  {
    id: 'new-york-usa',
    city: 'New York',
    lat: 40.7128,
    lng: -74.006,
    color: '#06b6d4',
    items: [
      {
        id: 'vessel-genai',
        year: 2025,
        title: 'VX - GenAI Memory & Infrastructure',
        subtitle: 'Founder / Independent Research Project',
        description:
          'Founded VX, a GenAI infrastructure and memory layer enabling contextual reasoning across 100K+ tokens. Recognized at NY Tech Week by Stanford PhDs and NYU neuroscientists.',
        venue: 'New York (remote / distributed)',
        image: '/events/vessel.png',
        imagePosition: 'top',
        type: 'project'
      },
      {
        id: 'realio-rwa-platform',
        year: 2023,
        title: 'Realio - Multi-Chain RWA Trading Platform',
        subtitle: 'Full-Stack Blockchain Engineer',
        description:
          'Built multi-chain smart contracts across EVM, Cosmos SDK, Stellar, and Algorand, and a decentralized OTC trading platform managing over $50M in tokenized assets.',
        venue: 'New York (remote / distributed)',
        image: '/events/realio.png',
        imagePosition: 'top',
        type: 'project'
      }
    ]
  },
  {
    id: 'rome-italy',
    city: 'Rome',
    lat: 41.9028,
    lng: 12.4964,
    color: '#06b6d4',
    items: [
      {
        id: 'astrakode-no-code-platform',
        year: 2021,
        title: 'AstraKode - No-Code Smart Contract Platform',
        subtitle: 'Software Architect',
        description:
          'Built a no-code Solidity platform enabling 1,000+ monthly deployments, with AWS serverless architecture and CloudFormation-based infrastructure-as-code.',
        venue: 'Rome (remote / distributed)',
        image: '/events/',
        type: 'project'
      }
    ]
  },
  {
    id: 'austin-usa',
    city: 'Austin',
    lat: 30.2672,
    lng: -97.7431,
    color: '#06b6d4',
    items: [
      {
        id: 'everlyhealth-telehealth',
        year: 2022,
        title: 'EverlyHealth - Telehealth Infrastructure',
        subtitle: 'Senior Software Engineer',
        description:
          'Developed HIPAA-compliant telehealth features handling 1M+ daily transactions, reducing infrastructure costs by over $2M annually and increasing revenue 15%.',
        venue: 'EverlyHealth (remote / distributed)',
        image: '/events/everlywell.png',
        imagePosition: 'center',
        type: 'project'
      }
    ]
  },
  {
    id: 'san-francisco-usa',
    city: 'San Francisco',
    lat: 37.7749,
    lng: -122.4194,
    color: '#06b6d4',
    items: [
      {
        id: 'scout-block-explorer',
        year: 2019,
        title: 'Scout.cool - Block Explorer',
        subtitle: 'Principal Engineer',
        description:
          'Principal engineering for a high-performance blockchain explorer headquartered in San Francisco, serving dYdX, Uniswap, and Livepeer, and tracking over $1B in TVL with multithreaded real-time mainnet indexing.',
        venue: 'San Francisco (distributed team)',
        image: '/events/scout.png',
        imagePosition: 'top',
        type: 'project'
      }
    ]
  },
  {
    id: 'atlanta-usa',
    city: 'Atlanta',
    lat: 33.749,
    lng: -84.388,
    color: '#06b6d4',
    items: [
      {
        id: 'ifthen-coca-cola-fanta',
        year: 2023,
        title: '"What The Fanta" - Global Coca-Cola Campaign',
        subtitle: 'IfThen - Full-Stack Software Architect',
        description: `Developed a multilingual animated React + AEM campaign for Coca-Cola's "What The Fanta" Halloween experience, orchestrated out of Atlanta and deployed in 44 countries with localized content and SEO optimization.`,
        venue: 'Coca-Cola / IfThen, Atlanta',
        image: '/events/fanta-app.png',
        imagePosition: 'center',
        type: 'project'
      },
      {
        id: 'ifthen-mercer-digital',
        year: 2023,
        title: 'Mercer - Digital Experience & Web Platform',
        subtitle: 'IfThen - Full-Stack Software Architect',
        description: `Contributed to Mercer's digital experience as a contractor via IfThen, building and maintaining React-based components and web experiences aligned with Mercer's global consulting brand.`,
        venue: 'Mercer / IfThen, Atlanta',
        image: '/events/mercer.png',
        imagePosition: 'center',
        type: 'project'
      }
    ]
  },
  {
    id: 'santa-clara-usa',
    city: 'Santa Clara',
    lat: 37.3541,
    lng: -121.9552,
    color: '#D4AF37',
    items: [
      {
        id: 'ai-big-data-expo-north-america',
        title: 'AI & Big Data Expo North America - VIP Gold Pass',
        subtitle: 'Data Science Foundation - Enterprise AI Conference',
        description:
          'Invited as a VIP guest to the AI & Big Data Expo North America in Silicon Valley (13-14 November, Santa Clara) through a limited gold pass from the Data Science Foundation. The pass granted free access to all paid speaking events and networking parties over the two days, including full VIP access to conference tracks and exhibitor areas. The event gathered 12,000+ attendees, 350+ exhibitors, and 500+ speakers across enterprise AI, big data, and emerging technologies.',
        venue: 'Santa Clara Convention Center, Silicon Valley',
        image: '/events/santaclara.jpg',
        imagePosition: 'center',
        type: 'event'
      }
    ]
  }
];
