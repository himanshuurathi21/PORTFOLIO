export const socials = {
  email: 'rathihimanshuu@gmail.com',
  emailCompose:
    'https://mail.google.com/mail/?view=cm&fs=1&to=rathihimanshuu%40gmail.com',
  github: 'https://github.com/himanshuurathi21',
  linkedin: 'https://linkedin.com/in/himanshu-rathi-72795538b',
  instagram: 'https://www.instagram.com/himanshuu_rathi',
  resume: '/assets/resume.html',
  resumeVP: '/assets/resume-VP.html',
  resumePdf: '/assets/Himanshu-Rathi-Resume.pdf',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'impact', label: 'Impact' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const roles = ['Developer', 'Creator', 'Leader', 'Storyteller', 'Builder'];

export const heroBadges = [
  { label: 'Vice President', meta: 'CIPHER Association', accent: 'purple', position: 'top-left' },
  { label: '400K+', meta: 'content impressions', accent: 'lime', position: 'top-right' },
  { label: '8 builds', meta: 'shipped & counting', accent: 'cyan', position: 'bottom-left' },
  { label: '15 certs', meta: 'IBM · Anthropic · Cisco · Reliance', accent: 'coral', position: 'bottom-right' },
];

export { filters, projects } from './projects';

export const stats = [
  {
    value: 400,
    suffix: 'K+',
    label: 'Content dashboard impressions',
    note: 'Content analytics',
    accent: 'cyan',
    featured: true,
  },
  {
    value: 275,
    suffix: 'K',
    label: 'Trending reel views',
    note: 'Organic reach',
    accent: 'coral',
  },
  {
    value: 115,
    suffix: 'K+',
    label: 'Lalit Modi collaboration reel',
    note: 'Fanfeed Digital',
    accent: 'purple',
  },
  {
    value: 15,
    suffix: '',
    label: 'Certifications',
    note: 'IBM · Anthropic · Cisco · Reliance',
    accent: 'lime',
  },
  {
    value: 4,
    suffix: '',
    label: 'Hackathons',
    note: 'Innovature · Velora · Nexathon · Brand Battle',
    accent: 'cyan',
  },
  {
    value: 8,
    suffix: '',
    label: 'Projects shipped',
    note: 'Full-stack · AI · Desktop · Web',
    accent: 'coral',
  },
];

export const milestones = [
  {
    title: 'First internship',
    text: 'Started as Social Media Manager at Fanfeed Digital while still in college.',
    accent: 'cyan',
  },
  {
    title: 'Lalit Modi collab',
    text: 'Created a reel with IPL founder Lalit Modi that crossed 115K+ views.',
    accent: 'purple',
  },
  {
    title: 'First paid freelance',
    text: 'Turned creativity into income with a paid content project for LINQCAMPUS.',
    accent: 'lime',
  },
  {
    title: 'From day one to VP',
    text: 'Joined CIPHER Association’s Executive Council from its formation and grew into Vice President.',
    accent: 'coral',
  },
];

export const testimonials = [
  {
    quote:
      'Himanshu runs our content calendar end-to-end and delivered a 115K+ views collaboration reel. Reliable, fast, and creative.',
    name: 'Team Fanfeed',
    role: 'Fanfeed Digital Pvt Ltd',
  },
  {
    quote:
      'Delivered a paid promo reel exactly on brief and on time. Great communication for a first-time freelance collaboration.',
    name: 'Team LINQCAMPUS',
    role: 'Freelance Client',
  },
  {
    quote:
      'Built a billing and inventory system our pharmacy actually uses daily — expiry alerts alone saved us real money.',
    name: 'Pharmacy Owner',
    role: "RATHI's MEDISOFT User",
  },
];

export const experiences = [
  {
    org: 'CIPHER Association — MIT AOE',
    role: 'Vice President',
    date: 'Feb 2026 — Present',
    current: true,
    accent: 'purple',
    description:
      "Lead the Executive Council of MIT's IT Department. Oversee branding, digital outreach, event promotions, and association initiatives.",
    responsibilities: [
      "Lead the Executive Council of MIT's IT Department",
      'Oversee branding, digital outreach, and event promotions',
      'Core contributor in organizing a 24-hour hackathon with a 32-member team',
    ],
    achievements: [
      'Joined the Executive Council from day one of CIPHER’s formation and grew into the Vice President role',
    ],
    tags: ['Leadership', 'Branding', 'Digital Outreach', 'Event Promotions', 'Team Collaboration'],
  },
  {
    org: 'Fanfeed Digital Pvt Ltd',
    role: 'Social Media Manager',
    date: 'Apr 2026 — Present',
    current: true,
    accent: 'coral',
    description:
      'Manage content strategy and campaigns for a sports engagement platform.',
    responsibilities: [
      'Manage content strategy and campaigns for a sports engagement platform',
      'Create collaboration content and campaigns',
      'Achieved 400K+ impressions on the content dashboard',
    ],
    achievements: [
      'Created a collaboration reel with IPL founder Lalit Modi that crossed 115K+ views',
      'Content dashboard hit 400K+ impressions',
    ],
    tags: ['Content Strategy', 'Campaign Management', 'Sports Marketing', 'Reel Production'],
  },
  {
    org: 'GDG Campus Body — Google Developer Club',
    role: 'Social Media Member',
    date: 'Oct 2026 — Present',
    current: true,
    accent: 'cyan',
    description:
      'Handle social media for the Google Developer Club campus body, creating content and driving outreach for developer events and initiatives.',
    responsibilities: [
      'Handle social media and digital outreach for the Google Developer Club campus body',
      'Create content and promotions for developer events and initiatives',
    ],
    achievements: [],
    tags: ['Social Media', 'Content Creation', 'Community Outreach', 'Google Developer Club'],
  },
  {
    org: "GOONJ — MITAOE's Official Music Club",
    role: 'Social Media Head',
    date: 'Oct 2026 — Present',
    current: true,
    accent: 'lime',
    description:
      "Lead social media for MITAOE's official music club, driving content, branding, and promotions for club events and performances.",
    responsibilities: [
      "Lead social media, branding, and promotions for MITAOE's official music club",
      'Drive content for club events and performances',
    ],
    achievements: [],
    tags: ['Social Media Strategy', 'Branding', 'Content Creation', 'Event Promotions'],
  },
  {
    org: 'Cisco Networking Academy — AICTE',
    role: 'Online Internship',
    date: 'College Semester',
    current: false,
    accent: 'purple',
    description:
      'Selected through AICTE for a Cisco online internship. Completed 7 Networking Academy courses covering Python, JavaScript, Data Analytics, and AI.',
    responsibilities: [
      'Selected through AICTE for a Cisco online internship',
      'Completed 7 Networking Academy courses covering Python, JavaScript, Data Analytics, and AI',
    ],
    achievements: ['Built practical industry skills across 7 Cisco Networking Academy courses'],
    tags: ['Python', 'JavaScript', 'Data Analytics', 'AI', 'AICTE', 'Cisco'],
  },
  {
    org: 'LINQCAMPUS',
    role: 'Freelance Content Creator',
    date: 'One-time Project',
    current: false,
    accent: 'coral',
    description:
      'Created a paid promotional reel for LINQCAMPUS as a freelance content creator. Delivered engaging content that aligned with their brand messaging.',
    responsibilities: [
      'Created a paid promotional reel as a freelance content creator',
      'Delivered brand-aligned engaging content',
    ],
    achievements: ['Turned creativity into a paid freelance collaboration'],
    tags: ['Paid Collaboration', 'Brand Content', 'Freelancing'],
    link: {
      href: 'https://www.instagram.com/reel/DaR8Vh0Mnf7/?igsh=MWN1bm43Y21mOGRnYw==',
      label: 'View the reel',
    },
  },
];
