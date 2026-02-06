import type { ImagePlaceholder } from './placeholder-images';
import { getPlaceholderImage } from './placeholder-images';

export interface ScheduleItem {
  time: string;
  course: string;
  location: string;
}

export const schedule: ScheduleItem[] = [
  { time: '10:00 AM', course: 'CSL333: Operating Systems', location: 'JC Bose-201' },
  { time: '1:00 PM', course: 'EEL201: Digital Electronics', location: 'JC Bose-102' },
  { time: '3:30 PM', course: 'MAL101: Linear Algebra & Diff Equations', location: 'JC Bose-303' },
];

export interface MarketplaceItem {
  id: string;
  name: string;
  price: string;
  image: ImagePlaceholder | undefined;
}

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    name: 'Used Calculus Textbook',
    price: '₹500',
    image: getPlaceholderImage('marketplaceItem1'),
  },
  {
    id: '2',
    name: 'Noise-cancelling headphones',
    price: '₹1200',
    image: getPlaceholderImage('marketplaceItem2'),
  },
  {
    id: '3',
    name: 'Student-Made Bicycle',
    price: '₹2500',
    image: getPlaceholderImage('marketplaceItem3'),
  },
  {
    id: '4',
    name: 'Dorm Mini-Fridge',
    price: '₹4000',
    image: getPlaceholderImage('marketplaceItem4'),
  },
];

export interface DiningOption {
  name: string;
  status: 'Open' | 'Closed';
  waitTime: string;
  image: ImagePlaceholder | undefined;
}

export const diningOptions: DiningOption[] = [
  { name: 'Jupiter Hostel Mess', status: 'Open', waitTime: '5 min', image: getPlaceholderImage('diningJupiter') },
  { name: 'Mercury Hostel Mess', status: 'Open', waitTime: '10 min', image: getPlaceholderImage('diningMercury') },
  { name: 'Venus Hostel Mess (Girls)', status: 'Open', waitTime: '5 min', image: getPlaceholderImage('diningVenus') },
  { name: 'Main Campus Cafeteria', status: 'Closed', waitTime: 'N/A', image: getPlaceholderImage('diningCafeteria') },
];

export interface CampusEvent {
  name: string;
  time: string;
  location: string;
  image: ImagePlaceholder | undefined;
}

export const campusEvents: CampusEvent[] = [
  { name: 'Zeitgeist - Annual Cultural Fest', time: 'Today @ 6 PM', location: 'Main Ground', image: getPlaceholderImage('eventZeitgeist') },
  { name: 'Guest Lecture: Quantum Computing', time: 'Tomorrow @ 5 PM', location: 'M. Visvesvaraya-101', image: getPlaceholderImage('eventLecture') },
  { name: 'Advitiya - Annual Tech Fest', time: 'Fri @ 10 AM', location: 'Entire Campus', image: getPlaceholderImage('eventAdvitiya') },
];

export interface CampusAlert {
  title: string;
  description: string;
}

export const campusAlerts: CampusAlert[] = [
  {
    title: 'Power Outage Notice',
    description: 'Scheduled maintenance in Jupiter Hostel from 2-4 PM today.',
  },
];

export interface LostAndFoundItem {
  id: string;
  name: string;
  description: string;
  status: 'Lost' | 'Found';
  image: ImagePlaceholder | undefined;
}

export const lostAndFoundItems: LostAndFoundItem[] = [
  {
    id: '1',
    name: 'Red Water Bottle',
    description: 'Found near the library.',
    status: 'Found',
    image: getPlaceholderImage('lostItem1'),
  },
  {
    id: '2',
    name: 'Keys on a cat keychain',
    description: 'Lost my keys, please help!',
    status: 'Lost',
    image: getPlaceholderImage('lostItem2'),
  },
  {
    id: '3',
    name: 'Black Leather Wallet',
    description: 'Found in the student union.',
    status: 'Found',
    image: getPlaceholderImage('lostItem3'),
  },
];