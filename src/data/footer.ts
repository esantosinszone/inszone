import type { IconSvgElement } from '@hugeicons/react'
import { Facebook02Icon, NewTwitterIcon, InstagramIcon, Linkedin02Icon } from '@hugeicons/core-free-icons'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
  /** Legal runs narrower than the rest so the long CCPA labels wrap sensibly. */
  width?: 'auto' | 'legal'
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Insurance Options',
    links: [
      { label: 'Personal Insurance', href: '/products/personal-insurance' },
      { label: 'Business Insurance', href: '/products/commercial-insurance' },
      { label: 'Benefits Insurance', href: '/products/employee-benefits' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Culture', href: '/about/culture' },
      { label: 'Team', href: '/about/team' },
      { label: 'Locations', href: '/find-location' },
      { label: 'Partners', href: '/about/partners' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides & Tutorials', href: '/resources/guides' },
      { label: 'Insights', href: '/resources/insights' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
  {
    title: 'Legal',
    width: 'legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Do Not Sell or Share My Personal Information', href: '/privacy#ccpa' },
      { label: 'California Consumer Privacy Act', href: '/privacy#ccpa-act' },
    ],
  },
]

export interface SocialLink {
  label: string
  href: string
  icon: IconSvgElement
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com/inszone', icon: Facebook02Icon },
  { label: 'X / Twitter', href: 'https://twitter.com/inszone', icon: NewTwitterIcon },
  { label: 'Instagram', href: 'https://instagram.com/inszone', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/inszone', icon: Linkedin02Icon },
]

export const legal = {
  copyright: '© Copyright Inszone Insurance Services.',
  license: 'CA Lic# 0F82764',
}
