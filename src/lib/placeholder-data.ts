import type { ImagePlaceholder } from './placeholder-images';
import { getPlaceholderImage } from './placeholder-images';

export interface ScheduleItem {
  time: string;
  course: string;
  location: string;
}

export const schedule: ScheduleItem[] = [
  { time: '10:00 AM', course: 'CSCI 431: Intro to Computer Vision', location: 'GLENN 115' },
  { time: '1:00 PM', course: 'PHIL 333: AI, Ethics, and Society', location: 'ARTS 210' },
  { time: '3:30 PM', course: 'PHYS 111: Principles of Physics II', location: 'PHYS 101' },
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
    price: '$50',
    image: getPlaceholderImage('marketplaceItem1'),
  },
  {
    id: '2',
    name: 'Noise-cancelling headphones',
    price: '$120',
    image: getPlaceholderImage('marketplaceItem2'),
  },
  {
    id: '3',
    name: 'Student-Made Bicycle',
    price: '$75',
    image: getPlaceholderImage('marketplaceItem3'),
  },
  {
    id: '4',
    name: 'Dorm Mini-Fridge',
    price: '$90',
    image: getPlaceholderImage('marketplaceItem4'),
  },
];

export interface DiningOption {
  name: string;
  status: 'Open' | 'Closed';
  waitTime: string;
}

export const diningOptions: DiningOption[] = [
  { name: 'Sutter Dining Hall', status: 'Open', waitTime: '5 min' },
  { name: 'The Griffin Grill', status: 'Open', waitTime: '15 min' },
  { name: 'Common Grounds Cafe', status: 'Closed', waitTime: 'N/A' },
];

export interface CampusEvent {
  name: string;
  time: string;
  location: string;
}

export const campusEvents: CampusEvent[] = [
  { name: 'Spring Career Fair', time: 'Today @ 2 PM', location: 'BMU Auditorium' },
  { name: 'Guest Lecture: The Future of AI', time: 'Tomorrow @ 6 PM', location: 'PAC 134' },
  { name: 'Outdoor Movie Night: The Matrix', time: 'Fri @ 8 PM', location: 'Trinity Commons' },
];

export interface CampusAlert {
  title: string;
  description: string;
}

export const campusAlerts: CampusAlert[] = [
  {
    title: 'Parking Lot C Closed',
    description: 'Lot C will be closed for maintenance on Friday.',
  },
];
