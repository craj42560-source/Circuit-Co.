// ===== Shared data module =====
// Services, Testimonials, FAQs, Team — consumed by all page scripts.

const SERVICES = [
  {
    id: 'laptop-repair',
    name: 'Laptop & PC Repair',
    shortName: 'Laptop Repair',
    description: 'Hardware diagnostics, motherboard repair, screen replacement, keyboard fixes, and full system tune-ups for any laptop or desktop.',
    price: 'From £39',
    turnaround: '24–48 hours',
    icon: 'laptop',
    image: 'https://images.pexels.com/photos/7639370/pexels-photo-7639370.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: [
      'Motherboard diagnostics & repair',
      'Screen & hinge replacement',
      'Keyboard & trackpad fixes',
      'RAM & SSD upgrades',
      'Overheating & fan repair'
    ]
  },
  {
    id: 'phone-repair',
    name: 'Phone & Tablet Repair',
    shortName: 'Phone Repair',
    description: 'Cracked screen? Battery dying fast? We fix iPhones, Androids, and tablets with genuine-grade parts and a 12-month warranty.',
    price: 'From £29',
    turnaround: '1–3 hours',
    icon: 'smartphone',
    image: 'https://images.pexels.com/photos/11921157/pexels-photo-11921157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: [
      'Screen & digitizer replacement',
      'Battery replacement',
      'Charging port repair',
      'Water damage treatment',
      'Camera module repair'
    ]
  },
  {
    id: 'data-recovery',
    name: 'Data Recovery',
    shortName: 'Data Recovery',
    description: 'Lost photos, documents, or business files? Our clean-room-grade recovery handles failed drives, SSDs, and memory cards.',
    price: 'From £59',
    turnaround: '2–5 days',
    icon: 'hard-drive',
    image: 'https://images.pexels.com/photos/6310044/pexels-photo-6310044.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: [
      'HDD & SSD recovery',
      'Accidentally deleted files',
      'Formatted drive recovery',
      'Corrupted partition repair',
      'RAID reconstruction'
    ]
  },
  {
    id: 'board-level-repair',
    name: 'Board-Level & Soldering',
    shortName: 'Micro-Soldering',
    description: 'Component-level repair for liquid-damaged devices, blown fuses, and dead boards. We handle what other shops call "unrepairable".',
    price: 'From £79',
    turnaround: '3–7 days',
    icon: 'circuit-board',
    image: 'https://images.pexels.com/photos/38145576/pexels-photo-38145576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: [
      'Liquid damage cleanup',
      'Chip & IC replacement',
      'BGA reballing',
      'Fuse & port soldering',
      'Short-circuit diagnostics'
    ]
  },
  {
    id: 'virus-removal',
    name: 'Virus & Malware Removal',
    shortName: 'Virus Removal',
    description: 'Is your computer running slow or acting strange? We remove viruses, ransomware, and bloatware — then harden your system.',
    price: 'From £35',
    turnaround: 'Same day',
    icon: 'shield',
    image: 'https://images.pexels.com/photos/2136243/pexels-photo-2136243.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: [
      'Deep malware scan & removal',
      'Ransomware containment',
      'OS reinstall & optimisation',
      'Security hardening',
      'Backup setup'
    ]
  },
  {
    id: 'business-it',
    name: 'Business IT Support',
    shortName: 'Business IT',
    description: 'Managed IT for small businesses: network setup, hardware maintenance contracts, priority repairs, and on-site visits.',
    price: 'Custom quote',
    turnaround: 'Priority SLA',
    icon: 'building',
    image: 'https://images.pexels.com/photos/4488644/pexels-photo-4488644.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: [
      'Priority repair queue',
      'On-site visits',
      'Network & WiFi setup',
      'Maintenance contracts',
      'Dedicated account manager'
    ]
  }
];

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Small Business Owner',
    text: 'My laptop died the morning of a client pitch. Circuit & Co. recovered all my files and had me back up in 3 hours. Lifesavers.',
    rating: 5
  },
  {
    name: 'James Okafor',
    role: 'Photographer',
    text: 'A corrupted SD card wiped an entire wedding shoot. Their data recovery team got back every single photo. I almost cried.',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    role: 'University Student',
    text: 'Cracked my phone screen the week of exams. Fixed in under an hour for half what the high-street chains quoted. Brilliant.',
    rating: 5
  }
];

const FAQS = [
  {
    question: 'Do I need to book an appointment?',
    answer: 'You can walk in during opening hours, but booking ahead guarantees a slot and faster turnaround. Use our contact form to book a repair or diagnostic.'
  },
  {
    question: 'Is there a diagnostic fee?',
    answer: 'Diagnostics are free if you proceed with the repair. If you choose not to repair, a £15 diagnostic fee applies — and it is fully refundable if you return within 7 days.'
  },
  {
    question: 'Do you offer a warranty on repairs?',
    answer: 'Yes. All repairs come with a minimum 6-month warranty on parts and labour. Screen and battery replacements carry a 12-month warranty.'
  },
  {
    question: 'Can you recover data from a completely dead drive?',
    answer: 'In most cases, yes. We use clean-room-grade techniques for physical failures. If we cannot recover any data, there is no charge for the recovery attempt.'
  },
  {
    question: 'What if my device is beyond repair?',
    answer: 'If a device is not economically repairable, we will tell you honestly and offer responsible recycling or trade-in credit toward a replacement.'
  }
];

const TEAM = [
  {
    name: 'Marcus Chen',
    role: 'Founder & Lead Technician',
    bio: '15 years in hardware diagnostics. Former Apple Genius Bar technician with certifications in board-level repair.',
    image: 'https://images.pexels.com/photos/33694014/pexels-photo-33694014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    name: 'Elena Volkov',
    role: 'Data Recovery Specialist',
    bio: 'Clean-room certified recovery engineer. Specialises in SSD controller failures and RAID reconstruction.',
    image: 'https://images.pexels.com/photos/6804586/pexels-photo-6804586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  },
  {
    name: 'Tom Bradley',
    role: 'Mobile Repair Technician',
    bio: 'Certified in micro-soldering and liquid damage recovery. Has fixed over 8,000 phones and tablets.',
    image: 'https://images.pexels.com/photos/6804590/pexels-photo-6804590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  }
];

// ===== Service base prices for dynamic pricing =====
var SERVICE_PRICES = {
  'laptop-repair': 39,
  'phone-repair': 29,
  'data-recovery': 59,
  'board-level-repair': 79,
  'virus-removal': 35,
  'business-it': 0
};

// Urgency multipliers (dynamic pricing formula)
var URGENCY_OPTIONS = [
  { id: 'standard', label: 'Standard (normal turnaround)', multiplier: 1.0 },
  { id: 'priority', label: 'Priority (within 24 hours, +50%)', multiplier: 1.5 },
  { id: 'express', label: 'Express (same-day, +100%)', multiplier: 2.0 }
];

// Promo codes (promo code engine)
var PROMO_CODES = {
  'REPAIR10': { type: 'percent', value: 10, label: '10% off' },
  'STUDENT15': { type: 'percent', value: 15, label: '15% student discount' },
  'WELCOME': { type: 'fixed', value: 10, label: '£10 off your first repair' },
  'SUMMER25': { type: 'percent', value: 25, label: '25% summer special' }
};

// ===== Interactive timeline data  =====
var TIMELINE = [
  { year: '2009', title: 'The beginning', text: 'Marcus Chen opens a one-man repair workshop above a chip shop on Deansgate, Manchester.' },
  { year: '2012', title: 'First expansion', text: 'Hired a second technician and moved to a larger unit on the same street. Started offering data recovery.' },
  { year: '2015', title: 'Board-level expertise', text: 'Invested in micro-soldering equipment and clean-room-grade recovery tools. Began taking on "unrepairable" devices.' },
  { year: '2018', title: 'Business IT division', text: 'Launched managed IT contracts for small businesses across Manchester city centre.' },
  { year: '2021', title: '5,000 repairs milestone', text: 'Surpassed 5,000 devices repaired. Expanded the team to five certified technicians.' },
  { year: '2024', title: 'Today', text: 'Now a team of six with a reputation as Manchester\'s go-to for complex board-level and liquid-damage repair.' }
];

// Expose globally
window.SERVICES = SERVICES;
window.TESTIMONIALS = TESTIMONIALS;
window.FAQS = FAQS;
window.TEAM = TEAM;
window.SERVICE_PRICES = SERVICE_PRICES;
window.URGENCY_OPTIONS = URGENCY_OPTIONS;
window.PROMO_CODES = PROMO_CODES;
window.TIMELINE = TIMELINE;
