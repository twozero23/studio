
import type { PortfolioData } from './portfolio-data-types';
import { DEFAULT_ACCENT_COLOR, DEFAULT_FONT } from './portfolio-data-types';

export const defaultPortfolioData: PortfolioData = {
  name: 'Nauman Mehdi',
  title: 'Product Manager | Blockchain & Web3 Expert | Digital Transformation Leader',
  tagline: 'Driving innovation in the digital economy with strategic product leadership.',
  profilePictureInitials: 'NM',
  contact: {
    email: 'naumanmehdi388@gmail.com',
    linkedin: 'linkedin.com/in/naumanmehdi',
    linktree: 'https://linktr.ee/naumanmehdi',
    github: 'github.com/naumanmhd', // Added example github
    phone: '+923217627021', // Added example phone
    x: '', // Initialize new field
    farcaster: '', // Initialize new field
    poap: '', // Initialize new field
  },
  summary:
    'Highly accomplished Product Manager with over 8 years of distinguished experience in blockchain, Web3, and digital innovation, adept at driving significant user engagement and revenue growth through strategic product development. Proven leader in delivering high-impact DeFi platforms, NFT marketplaces, and comprehensive blockchain solutions.',
  aboutMe:
    "With over 8 years at the forefront of digital innovation, I specialize in transforming complex challenges into user-centric solutions, particularly within the blockchain and Web3 space. My journey has been marked by a relentless pursuit of excellence, leading teams to develop and scale products that not only meet market needs but also drive substantial growth and engagement. I'm passionate about leveraging technology to foster a transparent and efficient digital economy, and I thrive in agile environments where collaboration and data-driven insights pave the way for success. Beyond my professional roles, I'm an active contributor to Web3 communities, committed to shaping Pakistan's digital future through scalable and transformative initiatives.",
  experience: [
    {
      id: 'exp1',
      role: 'Digital Innovation Consultant',
      company: 'Freelance',
      period: 'MAR 2022 – PRESENT',
      location: 'Remote',
      responsibilities: [
        'Spearheaded implementation of cutting-edge digital tools for startups.',
        'Developed and executed digital strategies for client retention.',
      ],
      achievements: [
        'Achieved a 25% improvement in operational efficiency.',
        'Enhanced client retention by 15%, fostering sustained business growth.',
      ],
    },
    {
      id: 'exp2',
      role: 'Head of Sales & Digital Innovation',
      company: 'CH Fertilizers',
      period: 'JAN 2022 – PRESENT',
      location: 'Jhang',
      responsibilities: [
        'Led comprehensive digital transformation across core business functions.',
        'Integrated technology to optimize traditional business models.',
      ],
      achievements: [
        'Resulted in a 40% productivity boost.',
        'Achieved a 20% profit growth (30.9M PKR) by enabling real-time data access.',
      ],
    },
    {
      id: 'exp3',
      role: 'Product Manager',
      company: 'Dan Holdings',
      period: 'DEC 2020 – JAN 2022',
      location: 'Remote',
      responsibilities: [
        'Managed full product lifecycle for blockchain and cryptocurrency offerings.',
        'Conducted extensive user research and led agile sprints.',
      ],
      achievements: [
        'Increased user engagement by 30% through data-driven feature prioritization.',
        'Improved customer satisfaction by 25%.',
      ],
    },
    {
      id: 'exp4',
      role: 'Product Owner',
      company: 'Block Gemini',
      period: 'NOV 2018 – APR 2020',
      location: 'Dubai',
      responsibilities: [
        'Launched multiple blockchain-based products (crypto wallets, trading platforms).',
        'Collaborated with cross-functional teams to define product requirements.',
      ],
      achievements: [
        'Contributed to a 20% market share increase.',
        'Drove a 15% revenue boost.',
      ],
    },
    {
      id: 'exp5',
      role: 'Lead QA Engineer',
      company: 'Block Gemini',
      period: 'OCT 2018 – APR 2020',
      location: 'Dubai',
      responsibilities: [
        'Implemented meticulous testing strategies and automation frameworks.',
        'Mentored and developed junior QA engineers.',
      ],
      achievements: [
        'Reduced critical defects by 30%.',
        'Improved efficiency by 40% through automation.',
      ],
    },
    {
      id: 'exp6',
      role: 'Business Analyst',
      company: 'BroadPeak Technologies',
      period: 'JAN 2017 – AUG 2018',
      location: 'Islamabad',
      responsibilities: [
        'Streamlined business requirements gathering and documentation.',
        'Facilitated workshops to align stakeholder expectations.',
      ],
      achievements: [
        'Reduced project delays by 20% through effective stakeholder collaboration.',
      ],
    },
  ],
  skills: {
    technical: [
      { id: 's_tech1', name: 'DeFi', category: 'Blockchain & Web3' },
      { id: 's_tech2', name: 'NFTs', category: 'Blockchain & Web3' },
      { id: 's_tech3', name: 'Dapps', category: 'Blockchain & Web3' },
      { id: 's_tech4', name: 'Cryptocurrencies', category: 'Blockchain & Web3' },
      { id: 's_tech5', name: 'Smart Contracts', category: 'Blockchain & Web3' },
      { id: 's_tech6', name: 'Tokenomics', category: 'Blockchain & Web3' },
      { id: 's_tech7', name: 'Ethereum', category: 'Blockchain & Web3' },
      { id: 's_tech8', name: 'Solana', category: 'Blockchain & Web3' },
      { id: 's_tech9', name: 'Product Roadmap', category: 'Product Management' },
      { id: 's_tech10', name: 'Stakeholder Management', category: 'Product Management' },
      { id: 's_tech11', name: 'Agile Methodologies', category: 'Product Management' },
      { id: 's_tech12', name: 'User Research', category: 'Product Management' },
      { id: 's_tech13', name: 'KPI Definition & Tracking', category: 'Product Management' },
      { id: 's_tech14', name: 'Data-Driven Decision Making', category: 'Product Management' },
      { id: 's_tech15', name: 'Digital Strategy', category: 'Digital Transformation' },
      { id: 's_tech16', name: 'Operational Efficiency', category: 'Digital Transformation' },
      { id: 's_tech17', name: 'CRM Implementation', category: 'Digital Transformation' },
      { id: 's_tech18', name: 'Inventory Management', category: 'Digital Transformation' },
      { id: 's_tech19', name: 'Accounts Digitalization', category: 'Digital Transformation' },
    ],
    tools: [
      { id: 's_tool1', name: 'JIRA' },
      { id: 's_tool2', name: 'SQL' },
      { id: 's_tool3', name: 'Test Automation' },
      { id: 's_tool4', name: 'Pendo' },
    ],
    soft: [
      { id: 's_soft1', name: 'Cross-Functional Collaboration' },
      { id: 's_soft2', name: 'Strategic Problem Solving' },
      { id: 's_soft3', name: 'Exceptional Communication' },
      { id: 's_soft4', name: 'Leadership' },
      { id: 's_soft5', name: 'Mentorship' },
    ],
  },
  projects: [
    {
      id: 'proj1',
      name: 'Crypto Investment Platform',
      description: 'Led the development of a secure and user-friendly platform for cryptocurrency investments, focusing on seamless user experience and robust security features.',
      role: 'Product Lead',
      highlights: ['Ensured regulatory compliance.', 'Achieved high user adoption rates post-launch.'],
      technologies: ['Blockchain', 'React', 'Node.js'],
      imageUrl: 'https://placehold.co/600x400.png',
      projectUrl: 'https://example.com/crypto-platform'
    },
    {
      id: 'proj2',
      name: 'NFT Marketplace',
      description: 'Designed and launched a robust marketplace for digital collectibles, enabling artists and collectors to trade NFTs efficiently and securely.',
      role: 'Product Designer & Manager',
      highlights: ['Implemented innovative bidding and auction mechanisms.', 'Fostered a vibrant community around the platform.'],
      technologies: ['Solana', 'Next.js', 'IPFS'],
      imageUrl: 'https://placehold.co/600x400.png',
      projectUrl: 'https://example.com/nft-marketplace'
    },
    {
      id: 'proj3',
      name: 'DeFi Staking Dapp',
      description: 'Developed a decentralized application enabling users to stake various cryptocurrencies and earn rewards, featuring transparent on-chain logic.',
      role: 'Lead Developer & Product Owner',
      highlights: ['Audited smart contracts for security.', 'Integrated multiple wallet providers for ease of access.'],
      technologies: ['Ethereum', 'Solidity', 'Web3.js'],
      imageUrl: 'https://placehold.co/600x400.png',
      projectUrl: 'https://example.com/defi-dapp'
    },
  ],
  achievements: [
    { id: 'ach1', metric: '40%', description: 'Productivity Boost at CH Fertilizers', icon: 'TrendingUp' },
    { id: 'ach2', metric: '30.9M PKR', description: 'Profit Growth Enabled at CH Fertilizers', icon: 'DollarSign' },
    { id: 'ach3', metric: '30%', description: 'User Engagement Growth at Dan Holdings', icon: 'Users' },
    { id: 'ach4', metric: '25%', description: 'Customer Satisfaction Improvement at Dan Holdings', icon: 'Smile' },
    { id: 'ach5', metric: '20%', description: 'Market Share Increase with Block Gemini Products', icon: 'PieChart' },
    { id: 'ach6', metric: '30%', description: 'Reduction in Critical Defects as Lead QA', icon: 'ShieldCheck' },
  ],
  communityInvolvement: [
    { id: 'com1', name: 'OdysseyDAO' },
    { id: 'com2', name: 'WomenBuildWeb3' },
    { id: 'com3', name: 'Insurjo22' },
    { id: 'com4', name: 'Alchemy University' },
    { id: 'com5', name: 'Devcon7 Attendee' },
  ],
  certifications: [
    { id: 'cert1', name: 'Web3 Development' },
    { id: 'cert2', name: 'Blockchain Fundamentals' },
    { id: 'cert3', name: 'AI for Product Management' },
    { id: 'cert4', name: 'Digital Adoption Certification' },
    { id: 'cert5', name: 'McKinsey Forward Program' },
    { id: 'cert6', name: 'IBM Blockchain Essentials' },
    { id: 'cert7', name: 'Certified QA Professional' },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Software Engineering',
      institution: 'Bahria University, Islamabad',
      period: '2011 – 2015',
    },
    {
      id: 'edu2',
      degree: 'GCE A-Level',
      institution: 'Beaconhouse School System',
      period: '2009 – 2011',
    },
    {
      id: 'edu3',
      degree: 'GCE O-Level',
      institution: 'Beaconhouse School System',
      period: '2007 – 2009',
    },
  ],
  theme: {
    accentColor: DEFAULT_ACCENT_COLOR, 
    font: DEFAULT_FONT,
    profilePictureUrl: '', 
  },
  customSections: [],
};
