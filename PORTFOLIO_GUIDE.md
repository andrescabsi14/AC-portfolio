# Portfolio Guide

## Overview

This is an interactive portfolio featuring:
1. **Interactive Globe Menu** - Click on points to explore projects by location
2. **NYC Parallax Scene** - A cinematic multi-layer scrolling experience
3. **Floating Header** - Smooth intro animation on first visit

## How to Update Your Projects

### Adding/Editing Projects

All projects are defined in `/data/projects.ts`. Each project has this structure:

```typescript
{
  id: 'unique-id',
  title: 'Project Title',
  year: 2024,
  location: {
    lat: 40.7128,
    lng: -74.0060,
    city: 'New York',
    country: 'USA',
  },
  tags: ['Tag1', 'Tag2', 'Tag3'],
  description: 'Short description shown on globe',
  details: 'Longer description shown in lightbox',
  achievements: ['Achievement 1', 'Achievement 2'], // Optional
  technologies: ['Tech1', 'Tech2'], // Optional
  image: '/path/to/image.jpg', // Optional - for future use
}
```

### Finding Coordinates

To get latitude/longitude for a location:
1. Go to Google Maps
2. Right-click on the location
3. Click the coordinates to copy them
4. Format as: `lat: XX.XXXX, lng: YY.YYYY`

### Customizing Your Name

Update your name in two places:
1. `/components/ui/Header.tsx` - Line 35 and 47
2. Change `"Your Name"` to your actual name

### Customizing the NYC Scene

Edit `/components/sections/NYCParallaxScene.tsx`:

The `stages` array (lines 18-42) contains the three story stages:

```typescript
const stages: Stage[] = [
  {
    id: 'stage1',
    title: 'Your Title',
    description: 'Your story here...',
    backgroundPosition: 'left', // or 'center' or 'right'
    buildingColor: 'from-blue-900 to-blue-600',
    accentColor: 'from-cyan-400 to-blue-500',
  },
  // ... more stages
];
```

## Project Structure

```
/data
  └── projects.ts          # Project data (UPDATE THIS!)

/components
  /ui
    ├── Header.tsx         # Floating header with intro
    └── ProjectLightbox.tsx # Project detail modal

  /sections
    ├── InteractiveGlobe.tsx  # Globe menu with filters
    └── NYCParallaxScene.tsx  # Multi-layer NYC scene

/app
  ├── page.tsx             # Main page
  ├── layout.tsx           # Root layout
  └── globals.css          # Global styles
```

## Features

### Interactive Globe
- **Click points** to view project details
- **Year filter** (left side) - Filter by year
- **Tag filter** (bottom) - Filter by technology/category
- Fully responsive and touch-friendly

### NYC Parallax Scene
- **3 stages** with smooth transitions
- **Multi-layer parallax** - Buildings move at different speeds
- **Automatic pausing** - Each stage holds to allow reading
- **Progress indicator** - Right side shows scroll progress

### Header
- **Intro animation** - Plays once on first visit
- **Floating design** - Follows scroll with blur effect
- **Responsive navigation** - Adapts to mobile screens

## Running the Project

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Deployment

This project is ready to deploy on Vercel, Netlify, or any platform supporting Next.js:

1. Push to GitHub
2. Connect to Vercel
3. Deploy!

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **react-globe.gl** - 3D globe
- **Three.js** - 3D graphics
- **Lenis** - Smooth scroll
- **Tailwind CSS** - Styling

## Tips

1. **Keep project descriptions concise** - They appear on the globe
2. **Use detailed info in 'details'** - Shown in the lightbox
3. **Organize with tags** - Makes filtering intuitive
4. **Test on mobile** - Ensure touch interactions work
5. **Update years** - Keep the year filter current

## Future Enhancements

- Add project images to lightbox
- Implement search functionality
- Add contact form
- Include testimonials
- Add blog section
