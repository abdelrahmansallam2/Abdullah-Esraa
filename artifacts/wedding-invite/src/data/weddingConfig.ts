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

const weddingDate = new Date('2026-09-09T19:00:00+03:00');
const weddingEndDate = new Date('2026-09-09T23:00:00+03:00');

const groomName = 'Abdullah';
const brideName = 'Esraa';
const venueName = 'BARBARA HALLS GROUP';
const venueHall = 'LAROSE Hall';
const venueAddress = 'El Mazallat - Esco Club';
const googleMapsUrl = 'https://maps.app.goo.gl/aMskhPBf7sAfH38F6?g_st=aw';

function buildGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${groomName} & ${brideName}'s Wedding`,
    dates: `${toGoogleCalendarDate(weddingDate)}/${toGoogleCalendarDate(weddingEndDate)}`,
    details: `Join us as we celebrate the wedding of ${groomName} & ${brideName} at ${venueName} - ${venueHall}.`,
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
  venueHall,
  venueAddress,
  googleMapsUrl,
  googleCalendarUrl: buildGoogleCalendarUrl(),

  // Hero / main invitation typography — fully editable from here.
  hero: {
    preTitle: 'THE WEDDING OF',
    weekday: 'Wednesday',
    date: '09 September 2026',
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

  // Music: Angham — "Mesh Habibi".
  // Place the MP3 at: artifacts/wedding-invite/public/music/mesh-habibi.mp3
  musicPath: '/music/mesh-habibi.mp3',

  invitationMessages: {
    openingIntro: 'Together with their families',
    inviteLine: 'Cordially Invite You',
    heroTagline: 'We joyfully announce the wedding of our children',
    coupleStory: 'Two hearts, one journey, and a lifetime ahead.',
    finalMessage: 'Your presence would be the greatest gift we could receive.',
    signatureIntro: 'WITH LOVE',
    signatureDate: '09 September 2026',
    dressCodeNote: 'A soft touch of pink for our special evening.',
  },
};

export type WeddingConfig = typeof weddingConfig;
