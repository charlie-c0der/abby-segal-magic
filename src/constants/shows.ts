/**
 * Canonical performance formats — the single source of truth for the Shows page,
 * the Home performances teaser, and show-related structured data.
 * Rename/edit a format here and it updates everywhere it's referenced.
 */
export interface ShowFormat {
  number: string
  title: string
  subtitle: string
  /** Full duration label used on the Shows detail page. */
  duration: string
  /** Condensed duration label used in the Home teaser. */
  durationShort: string
  audience: string
  description: string
  ideal: string[]
  videoMp4: string
  poster: string
}

export const SHOW_FORMATS: ShowFormat[] = [
  {
    number: '01',
    title: 'Close-Up Magic',
    subtitle: 'Table-Side & Intimate',
    duration: 'Customizable (20–60 min)',
    durationShort: '20–60 min',
    audience: '5–60 guests',
    description: 'A unique and intimate magic show performed at a table surrounded by guests — personal and interactive, where the magic happens right there in front of you. Imagine a fun magic show in the comfort of your own living room, or a surprise addition to your corporate event.',
    ideal: ['Private dinners', 'VIP corporate tables', 'Intimate receptions', 'Gallery openings'],
    videoMp4: '/assets/shows/close-up-30s.mp4',
    poster: '/assets/general/images/close-up-magician-chicago-performing.webp',
  },
  {
    number: '02',
    title: 'Stage Show',
    subtitle: 'Theatrical & Interactive',
    duration: 'Customizable (30–60 min)',
    durationShort: '30–60 min',
    audience: 'Up to 80 guests',
    description: "A full interactive show where the audience is part of the performance. Volunteers come up. Impossible things happen. Predictions are revealed. It's theatrical, funny, and deeply personal — because Abby tailors every show to the room she's in. Debuted at the legendary Chicago Magic Lounge.",
    ideal: ['Theatre & comedy venues', 'Corporate keynotes', 'Fundraiser galas', 'School assemblies', 'Birthday celebrations'],
    videoMp4: '/assets/shows/parlour-30s.mp4',
    poster: '/assets/press/images/parlour-magician-chicago-magic-lounge.webp',
  },
  {
    number: '03',
    title: 'Mingle Magic',
    subtitle: 'Strolling & Roaming',
    duration: '30 min – 3+ hours',
    durationShort: '30 min – 3+ hours',
    audience: '4–400 guests total',
    description: 'Abby moves throughout your event, creating unforgettable moments wherever guests gather. Perfect for cocktail parties, bar and bat mitzvahs, fundraisers, weddings, and corporate events. Designed to keep the energy high and the room engaged — every group gets personal, interactive magic that gives them something to talk about long after the event ends.',
    ideal: ['Corporate cocktail hours', 'Wedding receptions', 'Trade shows & activations', 'Holiday parties', 'Product launches'],
    videoMp4: '/assets/shows/mingle-30s.mp4',
    poster: '/assets/press/images/press-2.webp',
  },
]
