import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [
        '@hugeicons/react',
        '@hugeicons-pro/core-stroke-rounded',
        '@hugeicons-pro/core-duotone-rounded'
      ],
    }
  },
  integrations: [react()]
})