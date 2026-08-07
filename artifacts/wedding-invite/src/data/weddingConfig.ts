// Single source of truth for all editable wedding invitation content.

export interface ScheduleItem {
  time: string;
  event: string;
  icon: 'door-open' | 'gift' | 'sparkles' | 'utensils' | 'cake' | 'star' | 'heart';
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface GalleryImage {
  src: string | null;
  alt: string;
}

function toGoogleCalendarDate(date: Date): string {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, '');
}

const weddingDate = new Date('2026-08-08T20:00:00');
const weddingEndDate = new Date('2026-08-09T01:00:00');

const groomName = 'Shady';
const brideName = 'Maryam';
const venueName = 'Romanica Venue, Mokattam';
const venueAddress = 'Romanica Venue, Moqatam, Cairo, Egypt';
const googleMapsUrl = 'https://maps.google.com/?q=Romanica+Venue+Moqatam+Cairo';

function buildGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${groomName} & ${brideName}'s Wedding`,
    dates: `${toGoogleCalendarDate(weddingDate)}/${toGoogleCalendarDate(weddingEndDate)}`,
    details: `Join us as we celebrate the wedding of ${groomName} & ${brideName} at ${venueName}.`,
    location: venueAddress,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export const weddingConfig = {
  groomName,
  brideName,
  weddingDate,
  weddingEndDate,
  venueName,
  venueAddress,
  googleMapsUrl,
  googleCalendarUrl: buildGoogleCalendarUrl(),

  schedule: [
    { time: '6:30 PM', event: 'Welcome', icon: 'door-open' },
    { time: '7:00 PM', event: 'Reception', icon: 'gift' },
    { time: '8:00 PM', event: 'Celebration Begins', icon: 'sparkles' },
    { time: '8:45 PM', event: 'Dinner', icon: 'utensils' },
    { time: '9:30 PM', event: 'Cake Cutting', icon: 'cake' },
    { time: '10:15 PM', event: 'Special Show', icon: 'star' },
    { time: '12:00 AM', event: 'Farewell', icon: 'heart' },
  ] as ScheduleItem[],

  dressCodeColors: [
    { name: 'Dusty Rose', hex: '#C4938A' },
    { name: 'Powder Blue', hex: '#8AAAC4' },
    { name: 'Ivory', hex: '#F5EFE0' },
    { name: 'Muted Pink', hex: '#D4A5A5' },
    { name: 'Soft Magenta', hex: '#C478A0' },
  ] as DressCodeColor[],

  galleryImages: [
    { src: null, alt: 'Our Story 1' },
    { src: null, alt: 'Our Story 2' },
    { src: null, alt: 'Our Story 3' },
    { src: null, alt: 'Our Story 4' },
    { src: null, alt: 'Our Story 5' },
    { src: null, alt: 'Our Story 6' },
  ] as GalleryImage[],

  musicPath: '/wedding-music.mp3',

  invitationMessages: {
    heroTagline: 'We joyfully announce the wedding of our children',
    coupleStory:
      'Two hearts, one beautiful journey. We are overjoyed to celebrate this milestone with the people who matter most to us.',
    finalMessage: 'Your presence would be the greatest gift we could receive.',
    dressCodeNote: 'We would love to see you in elegant party attire.',
  },
};

export type WeddingConfig = typeof weddingConfig;
