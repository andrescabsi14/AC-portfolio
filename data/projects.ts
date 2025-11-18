export interface Project {
  id: string;
  title: string;
  year: number;
  location: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  tags: string[];
  description: string;
  details: string;
  achievements?: string[];
  technologies?: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'ylai-2016',
    title: 'YLAI Fellowship',
    year: 2016,
    location: {
      lat: 38.9072,
      lng: -77.0369,
      city: 'Washington D.C.',
      country: 'USA',
    },
    tags: ['Leadership', 'Government', 'International'],
    description: 'Selected for the Young Leaders of the Americas Initiative',
    details: 'Presidential program connecting emerging entrepreneurs and civil society leaders from Latin America and the Caribbean with U.S. counterparts.',
    achievements: [
      'Selected among thousands of applicants',
      'Networked with international leaders',
      'Participated in White House events',
    ],
  },
  {
    id: 'ai-healthcare-2016',
    title: 'AI for Healthcare',
    year: 2016,
    location: {
      lat: 40.7357,
      lng: -74.1724,
      city: 'Newark',
      country: 'USA',
    },
    tags: ['AI', 'Healthcare', 'Innovation'],
    description: 'Pioneered AI solutions for disease diagnosis',
    details: 'Developed machine learning models to help diagnose diseases and improve patient outcomes when AI was still emerging.',
    technologies: ['Machine Learning', 'Python', 'TensorFlow'],
  },
  {
    id: 'crypto-principal',
    title: 'Principal Engineer - Crypto',
    year: 2020,
    location: {
      lat: 40.7128,
      lng: -74.0060,
      city: 'New York',
      country: 'USA',
    },
    tags: ['Blockchain', 'Crypto', 'Engineering'],
    description: 'Led engineering teams at major crypto companies',
    details: 'Architected scalable blockchain solutions and led engineering teams building the future of decentralized finance.',
    technologies: ['Solidity', 'Web3', 'Node.js', 'React'],
    achievements: [
      'Built systems handling billions in transactions',
      'Led teams of 15+ engineers',
      'Contributed to major DeFi protocols',
    ],
  },
  {
    id: 'dtu-denmark',
    title: 'DTU University Recognition',
    year: 2018,
    location: {
      lat: 55.7867,
      lng: 12.5244,
      city: 'Copenhagen',
      country: 'Denmark',
    },
    tags: ['Education', 'Innovation', 'Recognition'],
    description: 'Recognized by Technical University of Denmark',
    details: 'Received recognition for contributions to innovation and entrepreneurship from one of Europe\'s leading technical universities.',
  },
  {
    id: 'c40-summit',
    title: 'C40 World Mayors Summit',
    year: 2019,
    location: {
      lat: 55.6761,
      lng: 12.5683,
      city: 'Copenhagen',
      country: 'Denmark',
    },
    tags: ['Climate', 'Leadership', 'Government'],
    description: 'Attended C40 World Mayors Summit',
    details: 'Participated in global climate leadership initiative bringing together mayors and innovators to address climate change.',
  },
  {
    id: 'first-startup',
    title: 'First Tech Startup',
    year: 2014,
    location: {
      lat: 4.7110,
      lng: -74.0721,
      city: 'Bogotá',
      country: 'Colombia',
    },
    tags: ['Startup', 'Entrepreneurship', 'Technology'],
    description: 'Founded my first technology company',
    details: 'Started journey as a self-taught developer by founding a tech startup in Bogotá, solving local problems with innovative solutions.',
    achievements: [
      'Bootstrapped to profitability',
      'Served 10,000+ users',
      'Expanded to international markets',
    ],
  },
  {
    id: 'learning-to-code',
    title: 'The Beginning',
    year: 2013,
    location: {
      lat: 4.7110,
      lng: -74.0721,
      city: 'Bogotá',
      country: 'Colombia',
    },
    tags: ['Learning', 'Self-Taught', 'Beginning'],
    description: 'Started learning to code in Bogotá',
    details: 'The journey began 12 years ago on Calle 85 in Bogotá, where I taught myself programming and discovered my passion for building technology.',
  },
];

export const allYears = Array.from(new Set(projects.map((p) => p.year))).sort();
export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
