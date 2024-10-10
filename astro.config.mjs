// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

import tailwind from '@astrojs/tailwind'

import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },

  output: 'server',
  integrations: [react(), tailwind()],
  adapter: netlify(),
})
