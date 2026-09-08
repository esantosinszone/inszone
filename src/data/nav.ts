/**
 * Navigation tree for the mobile menu.
 *
 * Mirrors the staging build's mobile nav: four top-level entries, three of them
 * drilling into a section. Kept out of the component so the markup stays about
 * behaviour and the copy can move to a CMS later.
 *
 * The link sets are exactly what the staging page ships today — see the note in
 * MobileNav.astro about the extra items that appear in the newer designs.
 */
import type { IconSvgElement } from '@hugeicons/react'

import {
  Analytics01Icon,
  Award01Icon,
  Book02Icon,
  Briefcase01Icon,
  Building01Icon,
  Car01Icon,
  Compass01Icon,
  CustomerSupportIcon,
  DeliveryTruck01Icon,
  HealtcareIcon,
  HelpCircleIcon,
  Home01Icon,
  Idea01Icon,
  JobLinkIcon,
  News01Icon,
  Rocket01Icon,
  SparklesIcon,
  UserGroup03Icon,
} from '@hugeicons/core-free-icons'

export interface NavLink {
  label: string
  href: string
}

/** A titled column of plain links, used inside the insurance tabs. */
export interface NavGroup {
  title: string
  icon: IconSvgElement
  links: NavLink[]
}

export interface NavTab {
  key: string
  label: string
  icon: IconSvgElement
  groups: NavGroup[]
}

/** An item in the two-column grid of the resources / about sections. */
export interface NavCard {
  label: string
  description: string
  href: string
  icon: IconSvgElement
}

export interface NavSection {
  key: string
  label: string
  /** The headline entry above the grid: a link to the section's own landing page. */
  feature?: NavCard
  tabs?: NavTab[]
  cards?: NavCard[]
  cta: NavLink
}

/** Top level: either a plain link or a drill-down into a section. */
export interface NavEntry {
  label: string
  href?: string
  section?: string
}

export const mainNav: NavEntry[] = [
  { label: 'Insurance', section: 'insurance' },
  { label: 'Find Location', href: '/find-location' },
  { label: 'Resources', section: 'resources' },
  { label: 'About Us', section: 'about' },
]

export const navSections: NavSection[] = [
  {
    key: 'insurance',
    label: 'Insurance',
    cta: { label: 'Request a quote', href: '/quote' },
    tabs: [
      {
        key: 'business',
        label: 'Business',
        icon: Briefcase01Icon,
        groups: [
          {
            title: 'Industry',
            icon: Building01Icon,
            links: [
              { label: 'Contractors', href: '/business-insurance/contractors' },
              { label: 'Healthcare Services', href: '/business-insurance/industry/healthcare-services' },
              { label: 'Commercial Property', href: '/business-insurance/commercial-property' },
              { label: 'Professional Services', href: '/business-insurance/industry/professional-services' },
              { label: 'Entertainment', href: '/business-insurance/industry/entertainment' },
              { label: 'Garage and Dealers', href: '/business-insurance/garage-dealers' },
              { label: 'Restaurant & Bar', href: '/business-insurance/restaurant-bar' },
            ],
          },
          {
            title: 'Products & Solutions',
            icon: DeliveryTruck01Icon,
            links: [
              { label: 'General Liability', href: '/business-insurance/general-liability-insurance' },
              { label: 'Cyber Liability', href: '/business-insurance/cyber-liability' },
              { label: "Workman's Compensation", href: '/business-insurance/workers-compensation-insurance' },
              { label: 'Commercial Auto & Trucking', href: '/business-insurance/commercial-auto' },
              { label: 'Property', href: '/business-insurance/property-insurance' },
              { label: "BOP (Business Owner's)", href: '/business-insurance/business-owner' },
            ],
          },
        ],
      },
      {
        key: 'personal',
        label: 'Personal',
        icon: Car01Icon,
        groups: [
          {
            title: 'Vehicle Insurance',
            icon: Car01Icon,
            links: [
              { label: 'Auto Insurance', href: '/personal-insurance/auto-insurance' },
              { label: 'Motorcycle Insurance', href: '/personal-insurance/motorcycle-insurance' },
              { label: 'Boat & Watercraft', href: '/personal-insurance/boat-insurance' },
              { label: 'RV & Travel Trailer', href: '/personal-insurance/rv-insurance' },
              { label: 'Classic & Collector Car', href: '/personal-insurance/classic-car-insurance' },
              { label: 'Rideshare', href: '/personal-insurance/ride-share-insurance' },
            ],
          },
          {
            title: 'Home Insurance',
            icon: Home01Icon,
            links: [
              { label: 'Homeowners Insurance', href: '/personal-insurance/home-insurance' },
              { label: 'Renters Insurance', href: '/personal-insurance/renters-insurance' },
              { label: 'Landlord Insurance', href: '/personal-insurance/landlord-insurance' },
              { label: 'Flood & Earthquake', href: '/personal-insurance/earthquake-insurance' },
              { label: 'Vacant/Renovation Property', href: '/personal-insurance/vacant-home-insurance' },
              { label: 'Mobile/Manufactured Home', href: '/personal-insurance/mobile-manufactured-home-insurance' },
            ],
          },
          {
            title: 'Specialty Products',
            icon: SparklesIcon,
            links: [
              { label: 'Umbrella Insurance', href: '/personal-insurance/umbrella-insurance' },
              { label: 'Life Insurance', href: '/personal-insurance/life-insurance' },
              { label: 'Pet Insurance', href: '/personal-insurance/pet-insurance' },
              { label: 'Mexico Travel Insurance', href: '/personal-insurance/mexico-insurance' },
              { label: 'Special Event Insurance', href: '/personal-insurance/event-insurance' },
              { label: 'Identity Theft Insurance', href: '/personal-insurance/specialty-insurance/identity-theft-insurance' },
            ],
          },
        ],
      },
      {
        key: 'benefits',
        label: 'Benefits',
        icon: HealtcareIcon,
        groups: [
          {
            title: 'Employee Benefits',
            icon: UserGroup03Icon,
            links: [
              { label: 'Group Health Insurance', href: '/group-health-insurance' },
              { label: 'Group Vision Insurance', href: '/group-vision-insurance' },
            ],
          },
          {
            title: 'Individual Benefits',
            icon: HealtcareIcon,
            links: [ { label: 'Life Insurance', href: '/benefits/life-insurance' } ],
          },
          {
            title: 'Benefits Resources',
            icon: Book02Icon,
            links: [ { label: 'Employee Navigator', href: '/resource_links/employee-navigator' } ],
          },
        ],
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    cta: { label: 'Chat with Support', href: '/quote' },
    feature: {
      label: 'Inszone Resources',
      description:
        'Find answers to your insurance questions, insights into current trends, and tools for navigating life',
      href: '/resources',
      icon: Book02Icon,
    },
    cards: [
      {
        label: 'Blog',
        description: 'Latest articles, company news, and updates',
        href: '/blog',
        icon: News01Icon,
      },
      {
        label: 'FAQs',
        description: 'Easy explanations for all your insurance questions',
        href: '/faqs',
        icon: HelpCircleIcon,
      },
      {
        label: 'Insights',
        description: 'Data-based deep dives into trends on and off the road',
        href: '/insights',
        icon: Analytics01Icon,
      },
      {
        label: 'Personal Navigator',
        description: 'Guides and support for managing your auto, home, and more',
        href: '/personal-navigator',
        icon: Compass01Icon,
      },
      {
        label: 'Commercial Navigator',
        description: 'Guides and support for managing your business coverage',
        href: '/commercial-navigator',
        icon: Building01Icon,
      },
      {
        label: 'Employee Navigator',
        description: 'Guides, videos, and office hours for benefits admins',
        href: '/employee-navigator',
        icon: UserGroup03Icon,
      },
    ],
  },
  {
    key: 'about',
    label: 'About Us',
    cta: { label: 'Contact Us', href: '/contact-us' },
    feature: {
      label: 'About Inszone',
      description:
        "Whether you're looking for a new career or simply want to learn more about Inszone, you can find all the information you need to get started here.",
      href: '/about-us',
      icon: Building01Icon,
    },
    cards: [
      {
        label: 'Our Culture',
        description: "What it's like to work here",
        href: '/inszone-culture',
        icon: Idea01Icon,
      },
      {
        label: 'Our Team',
        description: 'Meet the people behind Inszone',
        href: '/inszone-team',
        icon: UserGroup03Icon,
      },
      {
        label: 'Partners',
        description: 'Companies we work with',
        href: '/inszone-partners',
        icon: CustomerSupportIcon,
      },
      {
        label: 'Community & Employee Spotlights',
        description: 'Celebrating our people and local impact',
        href: '/community',
        icon: Award01Icon,
      },
      {
        label: 'Press & News',
        description: 'Announcements and media coverage',
        href: '/press',
        icon: News01Icon,
      },
      {
        label: 'M&A',
        description: 'Our growth through acquisitions',
        href: '/mergers-and-acquisitions',
        icon: Rocket01Icon,
      },
      {
        label: 'Careers',
        description: 'See open roles and grow with us',
        href: '/careers',
        icon: JobLinkIcon,
      },
    ],
  },
]
