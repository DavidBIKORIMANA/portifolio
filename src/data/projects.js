import { SITE } from './siteData';

const mshot = (url) =>
  `https://s.wp.com/mshots/v1/${encodeURIComponent(url)}?w=600&h=400`;

const placeholder = (text) =>
  `https://placehold.co/600x400/0A192F/FFD333?text=${encodeURIComponent(text)}`;

export const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'health', label: 'Healthcare' },
  { id: 'finance', label: 'Finance' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'realestate', label: 'Real Estate' },
  { id: 'archive', label: 'Archives' },
  { id: 'system', label: 'Web Systems' },
];

export const PROJECTS = [
  {
    category: 'health',
    title: 'CARE System — EMR',
    description: 'Electronic Medical Records platform for 40+ health centers with API integrations and 99%+ uptime.',
    image: mshot('https://care.geniussoftware.rw'),
    fallback: placeholder('CARE System'),
    demo: 'https://care.geniussoftware.rw',
    tags: ['Laravel', 'MySQL', 'REST API'],
  },
  {
    category: 'health',
    title: 'BORN Health App',
    description: 'Web-based fertility & menstrual tracking app with RESTful API backend and user-centered design.',
    image: placeholder('BORN Health App'),
    fallback: placeholder('BORN Health App'),
    demo: null,
    tags: ['Laravel', 'Flutter', 'REST API'],
  },
  {
    category: 'finance',
    title: 'FAIDA Mutual Fund MIS',
    description: 'Secure financial platform with role-based access, transaction tracking and member management.',
    image: mshot('https://faidamutualfund.com'),
    fallback: placeholder('FAIDA MIS'),
    demo: 'https://faidamutualfund.com',
    tags: ['Laravel', 'MySQL', 'Mobile Money'],
  },
  {
    category: 'finance',
    title: 'COOPEC IMPAMBA',
    description: 'Cooperative community platform with CMS and member engagement features.',
    image: mshot('https://www.coopecimpamba.rw'),
    fallback: placeholder('COOPEC IMPAMBA'),
    demo: 'https://www.coopecimpamba.rw',
    tags: ['Laravel', 'MySQL', 'CMS'],
  },
  {
    category: 'finance',
    title: 'WCMS — Water Consumer MIS',
    description: 'Tracks water consumption, generates usage-based bills and enables MTN & Airtel Money payments.',
    image: placeholder('Water MIS'),
    fallback: placeholder('Water MIS'),
    demo: null,
    tags: ['Laravel', 'Mobile Money', 'Billing'],
  },
  {
    category: 'hospitality',
    title: 'BMIS',
    description: 'Multi-branch Bar, Kitchen & Guest House MIS with POS, invoicing, inventory and real-time reporting.',
    image: placeholder('BMIS'),
    fallback: placeholder('BMIS'),
    demo: null,
    tags: ['Laravel', 'MySQL', 'POS'],
  },
  {
    category: 'hospitality',
    title: 'Lucerna Kabgayi Hotel',
    description: 'Hotel website & booking MIS with real-time availability and payment integration.',
    image: mshot('https://www.lucernakabgayihotel.rw'),
    fallback: placeholder('Lucerna Hotel'),
    demo: 'https://www.lucernakabgayihotel.rw',
    tags: ['Laravel', 'MySQL', 'Booking'],
  },
  {
    category: 'realestate',
    title: 'FEKHABA Real Estate',
    description: 'Property listing & client management with secure database backend and responsive UI.',
    image: mshot('https://fekhaba.com'),
    fallback: placeholder('FEKHABA'),
    demo: 'https://fekhaba.com',
    tags: ['Laravel', 'MySQL', 'Responsive'],
  },
  {
    category: 'archive',
    title: 'MISARWA',
    description: 'Catholic song archive — cross-platform web & mobile app with server deployment.',
    image: mshot('http://94.72.112.148/'),
    fallback: placeholder('MISARWA'),
    demo: 'http://94.72.112.148/',
    tags: ['Laravel', 'Flutter', 'Search'],
  },
  {
    category: 'archive',
    title: 'HOZIANA Choir Archive',
    description: 'Digital choir song archive with search, browsing and a mobile-accessible interface.',
    image: mshot('https://hoziana.com'),
    fallback: placeholder('HOZIANA'),
    demo: 'https://hoziana.com',
    tags: ['Laravel', 'MySQL', 'Search'],
  },
  {
    category: 'system',
    title: 'Library MIS',
    description: 'Full library management: cataloguing, borrowing, user management and reporting.',
    image: mshot('https://www.nerimis.rw'),
    fallback: placeholder('Library MIS'),
    demo: 'https://www.nerimis.rw',
    tags: ['Laravel', 'MySQL', 'Catalog'],
  },
  {
    category: 'system',
    title: 'IBABACS',
    description: 'Web-based management and information system with a secure database backend.',
    image: mshot('https://ibabacs.rw'),
    fallback: placeholder('IBABACS'),
    demo: 'https://ibabacs.rw',
    tags: ['Laravel', 'MySQL', 'MIS'],
  },
];

export const GITHUB_URL = SITE.github;
