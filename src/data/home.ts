/**
 * Home page content. Kept out of the templates so copy edits never touch
 * markup, and so the same shapes can later be fed from a CMS.
 */
import type { AstroComponent } from '@/types'

import FileSecurityIcon from '@/components/icons/FileSecurityIcon.astro'
import BalanceScaleIcon from '@/components/icons/BalanceScaleIcon.astro'
import ShieldUserIcon from '@/components/icons/ShieldUserIcon.astro'
import Agreement02Icon from '@/components/icons/Agreement02Icon.astro'
import UmbrellaIcon from '@/components/icons/UmbrellaIcon.astro'
import PiggyBankIcon from '@/components/icons/PiggyBankIcon.astro'
import TaskDone01Icon from '@/components/icons/TaskDone01Icon.astro'
import Navigation03Icon from '@/components/icons/Navigation03Icon.astro'
import Location05Icon from '@/components/icons/Location05Icon.astro'
import UserGroup03Icon from '@/components/icons/UserGroup03Icon.astro'
import HandshakeIcon from '@/components/icons/HandshakeIcon.astro'

export interface Carrier {
  name: string
  logo: string
}

export const carriers: Carrier[] = [
  { name: 'Progressive Insurance', logo: '/images/carriers/progressive.svg' },
  { name: 'Travelers Insurance', logo: '/images/carriers/travelers.svg' },
  { name: 'Nationwide Insurance', logo: '/images/carriers/nation-wide.svg' },
  { name: 'Liberty Mutual Insurance', logo: '/images/carriers/liberty-mutual.svg' },
  { name: 'Allstate Insurance', logo: '/images/carriers/allstate.svg' },
  { name: 'MetLife Insurance', logo: '/images/carriers/metlife.svg' },
  { name: 'Kemper Insurance', logo: '/images/carriers/kemper.svg' },
]

export interface ProcessStep {
  title: string
  description: string
  icon: AstroComponent
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Share your needs, get personalized options.',
    description:
      "Tell us a little about your situation, and we'll find the coverage that best fits your lifestyle, business, and goals.",
    icon: FileSecurityIcon,
  },
  {
    title: 'We compare, you choose with confidence.',
    description:
      'Our experts shop top insurance carriers to bring you the most competitive policies and bundles.',
    icon: BalanceScaleIcon,
  },
  {
    title: 'More savings, stronger protection',
    description:
      'For personal or business insurance, we match you with the right coverage at the best price.',
    icon: ShieldUserIcon,
  },
  {
    title: "You focus on life, we've got your back.",
    description:
      'With Inszone, move forward confidently—our team is always here when you need us.',
    icon: Agreement02Icon,
  },
]

export interface PlatformRating {
  platform: string
  score: number
  /** Brand colour of the review platform, applied to the score and name. */
  toneClass: string
}

export const ratings: PlatformRating[] = [
  { platform: 'Google', score: 4.8, toneClass: 'text-[#DB4436]' },
  { platform: 'Facebook', score: 4.9, toneClass: 'text-[#1877F2]' },
  { platform: 'Yelp', score: 4.2, toneClass: 'text-neutral-900' },
]

export interface Review {
  title: string
  body: string
  author: string
  location: string
  date: string
  rating: number
}

export const reviews: Review[] = [
  {
    title: '“Awesome”',
    body: 'Maria has been incredibly helpful throughout the entire insurance process, providing all the guidance I needed to find the perfect coverage for my family. The rates were better than I expected!',
    author: 'Preston S.,',
    location: 'Greer, SC',
    date: '03/15/2025',
    rating: 5,
  },
  {
    title: '“Highly Recommend”',
    body: 'Working with Inszone was smooth and stress-free. My agent took the time to understand my business needs and found a policy that not only saved me money but also gave me better protection than my previous provider.',
    author: 'Daniel R.,',
    location: 'Sacramento, CA',
    date: '03/15/2025',
    rating: 5,
  },
  {
    title: '“Peace of Mind”',
    body: "I didn't know where to start with life insurance, but Inszone made the process simple. They explained every option clearly and helped me choose the coverage that made the most sense for my family.",
    author: 'Jessica M.,',
    location: 'Phoenix, AZ',
    date: '03/15/2025',
    rating: 5,
  },
  {
    title: '“Great Service”',
    body: 'Anytime I have a question, the Inszone team is quick to respond and always helpful. It feels good knowing I have people I can rely on for both my home and auto insurance.',
    author: 'Carlos G.,',
    location: 'Denver, CO',
    date: '03/15/2025',
    rating: 5,
  },
]

export interface Feature {
  label: string
  caption: string
  icon: AstroComponent
}

export const features: Feature[] = [
  {
    label: 'Find the\nBest Coverage',
    caption: 'Find the best policies tailored to your needs with expert advice',
    icon: UmbrellaIcon,
  },
  {
    label: 'Save on\nPremiums',
    caption: 'Get special offers to maximize value and minimize costs',
    icon: PiggyBankIcon,
  },
  {
    label: 'Manage\nYour Policy',
    caption: 'Manage your policy, file claims, and stay protected effortlessly',
    icon: TaskDone01Icon,
  },
]

export interface Policy {
  title: string
  body: string
  linkLabel: string
  href: string
  image: string
  imageAlt: string
  /** Which side the photo sits on inside the card. */
  align: 'left' | 'right'
}

export const policies: Policy[] = [
  {
    title: 'Contractors Insurance',
    body: 'Tailored protection for contractors and trades. Covers jobsite accidents, equipment damage, and liability risks.',
    linkLabel: 'Explore Contractor Coverage Plans',
    href: '/industries/contractors',
    image: '/images/policies/contractors.png',
    imageAlt: 'Contractor with hard hat',
    align: 'left',
  },
  {
    title: 'Healthcare Liability',
    body: 'Insurance that protects healthcare professionals from malpractice claims, liability risks, and unexpected issues.',
    linkLabel: 'Explore Healthcare Coverage Options',
    href: '/industries/healthcare-services',
    image: '/images/policies/healthcare.png',
    imageAlt: 'Healthcare professional',
    align: 'right',
  },
  {
    title: 'Commercial Property',
    body: 'Protect your buildings, equipment, and business assets from unexpected events, costly damages, or interruptions.',
    linkLabel: 'Protect Your Property Today',
    href: '/industries/commercial-property',
    image: '/images/policies/commercial-property.png',
    imageAlt: 'Business owner in an apron',
    align: 'left',
  },
  {
    title: 'Architects and Engineers',
    body: 'Specialized coverage for architects and engineers against design errors, project risks, and professional liability.',
    linkLabel: 'Discover A&E Protection Plans',
    href: '/industries/professional-services',
    image: '/images/policies/architects-engineers.png',
    imageAlt: 'Architect with blueprints',
    align: 'right',
  },
]

export interface Stat {
  value: string
  label: string
  icon: AstroComponent
}

export const stats: Stat[] = [
  { value: '22', label: 'States', icon: Navigation03Icon },
  { value: '113', label: 'Locations', icon: Location05Icon },
  { value: '1,139', label: 'Team Members', icon: UserGroup03Icon },
  { value: '174', label: 'Agencies', icon: HandshakeIcon },
]

export interface FaqItem {
  question: string
  /** Answer HTML — a few entries link out, so this is rendered with `set:html`. */
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'Where are Inszone Insurance offices located?',
    answer:
      '<p>Inszone Insurance has 125 offices across 22 states, including California, Texas, Arizona, Colorado, Oregon, Washington, and Nevada. Use our location finder to find the nearest office to you.</p>',
  },
  {
    question: 'What insurance services does this office offer?',
    answer:
      "<p>Our office offers a full range of insurance products including commercial insurance, personal insurance, employee benefits, workers' compensation, general liability, and more. We work with 50+ top-rated carriers to find you the best coverage at competitive rates.</p>",
  },
  {
    question: 'How do I get a free insurance quote?',
    answer:
      '<p>You can request a free quote online, call our office directly, or stop by in person. Our agents will review your needs and provide you with competitive options from multiple carriers — typically within one business day.</p>',
  },
  {
    question: 'Do you serve businesses in the local area?',
    answer:
      '<p>Yes! Our local team specializes in commercial lines and serves businesses of all sizes throughout the region. From small businesses to large enterprises, we tailor coverage packages to fit your specific industry and risk profile.</p>',
  },
  {
    question: 'What carriers do you work with?',
    answer:
      '<p>We work with over 50 top-rated insurance carriers including Liberty Mutual, Allstate, MetLife, Kemper, Travelers, and many more. This allows us to shop your coverage and find the best combination of price and protection for your needs.</p>',
  },
  {
    question: 'Where are you located?',
    answer:
      '<p>We have offices across multiple states in the U.S., including Washington, Oregon, California, Nevada, Idaho, Montana, Utah, Arizona, New Mexico, Colorado, South Dakota, Kansas, Texas, Oklahoma, Iowa, Missouri, Illinois, Indiana, Michigan. We serve customers through our local offices and online services. You can find the nearest office by visiting our <a href="/find-location">Find Location page</a>.</p>',
  },
  {
    question: 'What are your hours?',
    answer:
      '<p>Our local offices are open Monday–Friday, 8:00 AM – 5:00 PM in your local time zone. Some locations have extended hours. Our online portal is available 24/7 for policy management and claims.</p>',
  },
  {
    question: 'How do I make changes to my policy?',
    answer:
      '<p>You can make changes to your policy by logging into our online portal, calling your local agent, or visiting your nearest office. Our team is available to assist you with endorsements, coverage adjustments, and renewals.</p>',
  },
  {
    question: 'Do you offer online policy management?',
    answer:
      '<p>Yes! Our online portal lets you view your policy documents, make payments, request certificates of insurance, report claims, and communicate with your agent — all from your desktop or mobile device.</p>',
  },
]

export interface BlogPost {
  title: string
  href: string
  image: string
  imageAlt: string
  date: { weekday: string, day: string, month: string }
  author: string
  readingTime: string
}

const POST_DATE = { weekday: 'Thu', day: '16', month: 'Jul' }

export const posts: BlogPost[] = [
  {
    title: 'California Pool Association Attends the Pool & Spa Show in Atlantic City',
    href: '/blog/event-cpa-attends-pool-spa-show',
    image: '/images/blog/cpa-attends-pool-spa-show.jpg',
    imageAlt: 'CPA team at the Pool and Spa Show',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title: '7 Insurance Coverages That Your Business Must Have',
    href: '/blog/7-insurance-coverages-that-your-business-must-have',
    image: '/images/blog/7-insurance-coverages-business-must-have.jpg',
    imageAlt: 'Are You Covered banner',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title: 'Do You Have Enough Insurance Protection for your Restaurant?',
    href: '/blog/do-you-have-enough-insurance-protection-for-your-restaurant',
    image: '/images/blog/restaurant-insurance-protection.jpg',
    imageAlt: 'Restaurant stove burner',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title:
      'Community Spotlight: Inszone Insurance Partners with Orange County Businesses to Support Spark of Love Toy Drive',
    href: '/blog/community-spotlight-inszone-team-supports-spark-of-love-toy-drive',
    image: '/images/blog/spark-of-love-toy-drive.jpg',
    imageAlt: 'Spark of Love Toy Drive',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title: 'Distinguishing Employees from Independent Contractors',
    href: '/blog/distinguishing-employees-from-independent-contractors',
    image: '/images/blog/independent-contractors-vs-employees.jpg',
    imageAlt: 'Identification card graphic',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title: 'Employers Should Recognize COVID-19 as a Work-Related Injury',
    href: '/blog/infographic-employers-should-recognize-covid-19-as-a-work-related-injury',
    image: '/images/blog/covid-19-work-related-injury.jpg',
    imageAlt: 'Inszone blog graphic',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title: 'Group Health Insurance: A Key To Your Business’ Success',
    href: '/blog/group-health-insurance-a-key-to-your-business-success',
    image: '/images/blog/group-health-insurance-business-success.jpg',
    imageAlt: 'Employee benefits books',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title:
      'Community Spotlight: Inszone to Support Two Charitable Organizations in California This Year',
    href: '/blog/community-spotlight-inszone-team-supports-two-charities',
    image: '/images/blog/two-charitable-organizations-california.jpg',
    imageAlt: 'Charitable organization logos',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
  {
    title: 'An Outlook on Employee Benefits in 2021',
    href: '/blog/an-outlook-on-employee-benefits-in-2021',
    image: '/images/blog/outlook-employee-benefits-2021.jpg',
    imageAlt: 'Forward arrow',
    date: POST_DATE,
    author: 'Inszone Insurance',
    readingTime: '3 min',
  },
]
