/**
 * BCC Static Data
 * ────────────────
 * Centralised data for all About page sections.
 * Replace any array with a live API call inside the consuming component.
 *
 * Usage:
 *   import { STATS, TIMELINE, VALUES, TEAM, TESTIMONIALS } from '../data/aboutData';
 */

import {
  FaBuilding, FaMapMarkerAlt, FaUsers, FaStar, FaCalendarAlt, FaAward,
  FaRocket, FaHardHat, FaShieldAlt, FaChartLine,
  FaBolt, FaLeaf, FaHandshake,
} from "react-icons/fa";

import { C } from "../utils/tokens";

export const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed",  icon: FaBuilding,     color: C.azure   },
  { value: 15,  suffix: "+", label: "Cities Covered",      icon: FaMapMarkerAlt, color: C.teal    },
  { value: 40,  suffix: "+", label: "Expert Engineers",    icon: FaUsers,        color: C.emerald },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: FaStar,         color: C.amber   },
  { value: 9,  suffix: "+", label: "Years Experience",    icon: FaCalendarAlt,  color: C.rose    },
  { value: 6,   suffix: "+", label: "Awards Won",          icon: FaAward,        color: C.violet  },
];

export const TIMELINE = [
  { year: "2017", title: "Foundation",        desc: "BCC incorporated with a vision to bring transparency to Indian construction.",              icon: FaRocket      },
  { year: "2018", title: "First 25 Projects", desc: "Delivered 25 residential projects across Uttar Pradesh — quality enshrined.",              icon: FaBuilding    },
  { year: "2020", title: "Soil Division",     desc: "Launched specialised geotechnical & soil investigation division.",                          icon: FaHardHat     },
  { year: "2022", title: "10+ City Footprint",desc: "Expanded to 10+ cities; crossed the 100-project milestone.",                               icon: FaMapMarkerAlt},
  { year: "2022", title: "ISO Certified",     desc: "Achieved ISO 9001:2015 — quality management formally enshrined.",                          icon: FaShieldAlt   },
  { year: "2023", title: "CIDC Award",        desc: "Honoured with Construction Industry Development Council Award.",                            icon: FaAward       },
  { year: "2025", title: "Today",             desc: "500+ projects, 30+ team members, 15+ cities — and still growing.",                         icon: FaChartLine   },
];

export const VALUES = [
  { icon: FaShieldAlt, title: "Integrity",      desc: "Transparent dealings, honest timelines, fair pricing — always.", color: C.azure   },
  { icon: FaBolt,      title: "Excellence",     desc: "World-class quality benchmarks on every project we touch.",      color: C.amber   },
  { icon: FaLeaf,      title: "Sustainability", desc: "Green-certified practices building a better tomorrow.",          color: C.emerald },
  { icon: FaHandshake, title: "Partnership",    desc: "Every client is a long-term relationship, not a transaction.",   color: C.teal    },
  { icon: FaUsers,     title: "Teamwork",       desc: "30+ specialists collaborating with one shared purpose.",         color: C.violet  },
  { icon: FaRocket,    title: "Innovation",     desc: "BIM, drone surveys, IoT monitoring — always at the frontier.",   color: C.rose    },
];


export  const testimonials = [
  {
    name: 'Ramesh Gupta',
    position: 'CEO',
    company: 'Gupta Constructions',
    rating: 5,
    text: 'BCC delivered our commercial complex ahead of schedule. The quality and professionalism exceeded our expectations.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    project: 'Commercial Complex, Pune'
  },
  {
    name: 'Sunita Reddy',
    position: 'Director',
    company: 'Reddy Group',
    rating: 5,
    text: 'Their consulting services helped us optimize project costs by 25%. Highly recommended for any construction project.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    project: 'Residential Township, Hyderabad'
  },
  {
    name: 'Amit Patel',
    position: 'Managing Partner',
    company: 'Patel Ventures',
    rating: 5,
    text: 'The soil investigation report was detailed and accurate. BCC team is very professional and responsive.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    project: 'Corporate Office, Ahmedabad'
  }
];

export const milestones = [
  { year: 2017, title: 'Foundation', desc: 'Company established in Rudrapur UttraKhand', icon: '🏗️' },
  { year: 2019, title: 'First Milestone', desc: '50+ projects completed', icon: '🏢' },
  { year: 2022, title: 'Consulting Launch', desc: 'Added consulting services', icon: '📊' },
  { year: 2023, title: 'ISO Certified', desc: 'International quality standards', icon: '✅' },
  { year: 2025, title: '950+ Projects', desc: 'Major expansion phase', icon: '🏆' },
  { year: 2026, title: 'Industry Leader', desc: 'Top construction company', icon: '👑' }
];