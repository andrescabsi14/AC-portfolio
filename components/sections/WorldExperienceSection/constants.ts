// Texture URLs
export const DAY_TEXTURE_URL = '/8081_earthmap4k.jpg';
export const NIGHT_TEXTURE_URL = '/8081_earthlights4k.jpg';
export const CLOUDS_TEXTURE_URL = '/earthclouds.jpg';
export const HIGH_DAY_TEXTURE_URL = '/earthhighday.jpg';
export const HIGH_NIGHT_TEXTURE_URL = '/earthhighnight.jpg';

// Admin mode toggle
export const ADMIN = true;

// Current location
export const CURRENT_LOCATION = {
  lat: 40.7128,
  lng: -74.0060,
  label: 'Current Location: New York',
};

// Globe moments with coordinates
export const GLOBE_MOMENT_LOCATIONS = [
  {
    title: 'Bogotá',
    subtitle: 'The origin.',
    description:
      'Where the journey began — growing up in Bogotá, learning to build without permission and think beyond the neighborhood.',
    image: '/images/globe/bogota-origin.jpg',
    lat: 4.7110,
    lng: -74.0055,
  },
  {
    title: 'Dallas',
    subtitle: 'The mayor\'s office.',
    description:
      'A first taste of U.S. civic leadership — conversations inside the mayor\'s office about cities, innovation, and opportunity.',
    image: '/images/globe/dallas-mayor.jpg',
    lat: 32.7767,
    lng: -96.7970,
  },
  {
    title: 'Detroit',
    subtitle: 'Congressmen, city leaders, and the awakening of a global perspective.',
    description:
      'In Detroit, meetings with congressmen and city leaders expanded a local story into a global mission for impact.',
    image: '/images/globe/detroit-leaders.jpg',
    lat: 42.3314,
    lng: -83.0458,
  },
  {
    title: 'Washington D.C.',
    subtitle: 'The U.S. Department of State, seventh floor.',
    description:
      'On the seventh floor of the State Department, policy, diplomacy, and entrepreneurship collided in a single hallway.',
    image: '/images/globe/washington-state-dept.jpg',
    lat: 38.8951,
    lng: -77.0369,
  },
  {
    title: 'Copenhagen & Aarhus',
    subtitle:
      'Representing the Americas as a DTU Young Influencer at the C40 World Mayors Summit.',
    description:
      'Representing the Americas among mayors, climate leaders, and innovators, shaping conversations about cities and the future.',
    image: '/images/globe/copenhagen-aarhus-c40.jpg',
    lat: 55.6761,
    lng: 12.5683,
  },
  {
    title: 'Lima',
    subtitle: 'The APEC Summit.',
    description:
      'At APEC in Lima, the focus shifted from local startups to the geopolitics of trade, technology, and shared prosperity.',
    image: '/images/globe/lima-apec.jpg',
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    title: 'Spain, Bolivia, Memphis',
    subtitle: 'Entrepreneurship, culture, and the belief that ideas move faster than borders.',
    description:
      'Workshops, talks, and collaborations across three continents proving that good ideas can outrun passports and borders.',
    image: '/images/globe/spain-bolivia-memphis.jpg',
    lat: 40.4637,
    lng: -3.7492,
  },
  {
    title: 'Santa Clara & Silicon Valley',
    subtitle: 'Invited to share approaches to frontier technology.',
    description:
      'In the heart of Silicon Valley, sharing experiments at the edge of AI, Web3, and the next wave of tools for builders.',
    image: '/images/globe/silicon-valley-frontier-tech.jpg',
    lat: 37.3541,
    lng: -121.9552,
  },
  {
    title: 'New York',
    subtitle: 'The city first seen in 2014 from the still-unfinished Hudson Yards.',
    description:
      'Looking over an unfinished Hudson Yards in 2014 and deciding that one day, the work would belong in this skyline.',
    image: '/images/globe/new-york-hudson-yards.jpg',
    lat: 40.7128,
    lng: -74.0060,
  },
];

// Globe configuration
export const GLOBE_CONFIG = {
  notExpanded: {
    cameraZ: 1.5,
    filter: 'brightness(0.7) contrast(3)',
    dottedOpacity: 1,
    darkOpacity: 0.3,
    overlayDuration: 0.5,
  },
  expanded: {
    cameraZ: 3.7,
    filter: 'none',
    dottedOpacity: 0,
    darkOpacity: 0.2,
    overlayDuration: 3,
  },
};
