// Single source of truth for all editable wedding invitation content.

import abdullahChildhood from '@references/childhood_memory/abdullah.png';
import esraaChildhood from '@references/childhood_memory/esraa.jpeg';

export interface ScheduleItem {
  time: string;
  event: string;
  icon: 'door-open' | 'gift' | 'sparkles' | 'utensils' | 'cake' | 'star' | 'heart';
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface ChildhoodPhoto {
  src: string | null;
  name: string;
  label: string;
}

function toGoogleCalendarDate(date: Date): string {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, '');
}

const weddingDate = new Date('2026-09-08T19:00:00+03:00');
const weddingEndDate = new Date('2026-09-08T23:00:00+03:00');

// Single source of truth for every displayed wedding-date string — all derived
// from `weddingDate` so the date can never drift between sections.
const weddingDateLabel = `${weddingDate.getUTCDate().toString().padStart(2, '0')} ${weddingDate.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })} ${weddingDate.getUTCFullYear()}`;
const weddingDayLabel = weddingDate.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });

const groomName = 'Abdalla';
const brideName = 'E';
const venueName = 'TULIP';
const venueHall = 'Panorama Harb October';
const venueAddress = '';
const googleMapsUrl = 'https://maps.app.goo.gl/9mZCCEjaV1nFqw9a9';

function buildGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${groomName} & ${brideName}'s Wedding`,
    dates: `${toGoogleCalendarDate(weddingDate)}/${toGoogleCalendarDate(weddingEndDate)}`,
    details: `Join us as we celebrate the wedding of ${groomName} & ${brideName} at ${venueName} - ${venueHall}.`,
    location: venueHall,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export const weddingConfig = {
  groomName,
  brideName,
  weddingDate,
  weddingEndDate,
  venueName,
  venueHall,
  venueAddress,
  googleMapsUrl,
  googleCalendarUrl: buildGoogleCalendarUrl(),

  // Hero / main invitation typography — fully editable from here.
  hero: {
    preTitle: 'THE WEDDING OF',
    weekday: weddingDayLabel,
    date: weddingDateLabel,
    time: '7:00 PM - 11:00 PM',
  },

  schedule: [
    { time: '7:00 PM', event: 'Guests Arrival', icon: 'door-open' },
    { time: '7:30 PM', event: 'Reception Begins', icon: 'gift' },
    { time: '8:30 PM', event: 'Dinner', icon: 'utensils' },
    { time: '9:30 PM', event: 'Cake Cutting', icon: 'cake' },
    { time: '10:00 PM', event: 'Celebration', icon: 'sparkles' },
    { time: '11:00 PM', event: 'Farewell', icon: 'heart' },
  ] as ScheduleItem[],

  dressCodeColors: [
    { name: 'Blush', hex: '#F8D7E3' },
    { name: 'Baby Pink', hex: '#F4C6D7' },
    { name: 'Pink', hex: '#F2B8CE' },
    { name: 'Rose', hex: '#EFAFC8' },
    { name: 'Powder Pink', hex: '#FBE7EE' },
  ] as DressCodeColor[],

  // Photo Gallery — two photos (groom & bride).
  childhood: {
    title: 'PHOTO GALLERY',
    photos: [
      { src: abdullahChildhood, name: groomName, label: 'THE GROOM' },
      { src: esraaChildhood, name: brideName, label: 'THE BRIDE' },
    ] as ChildhoodPhoto[],
  },

  // Music: "El Leil W Samah" / "الليل وسماه".
  // Place the MP3 at: artifacts/wedding-invite/public/music/el-leil-w-samah.mp3
  musicPath: '/music/el-leil-w-samah.mp3',

  invitationMessages: {
    openingIntro: 'Together with their families',
    inviteLine: 'Cordially Invite You',
    heroTagline: 'We joyfully announce the wedding of our children',
    coupleStory: 'Two hearts, one journey, and a lifetime ahead.',
    finalMessage: 'Your presence would be the greatest gift we could receive.',
    signatureIntro: 'WITH LOVE',
    signatureDate: weddingDateLabel,
    dressCodeNote: 'A soft touch of pink for our special evening.',
  },
};

export type WeddingConfig = typeof weddingConfig;
