import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#26A69A',
          200: '#408d86',
          300: '#cdfaf6',
        },
        accent: {
          100: '#80CBC4',
          200: '#43A49B',
        },
        text: {
          100: '#263339',
          200: '#728f9e',
        },
        bg: {
          100: '#E0F2F1',
          200: '#D0EBEA',
          300: '#FFFFFF',
        },
        // primary: {
        //   100: '#8B5FBF',
        //   200: '#61398F',
        //   300: '#FFFFFF',
        // },
        // accent: {
        //   100: '#D6C6E1',
        //   200: '#9A73B5',
        // },
        // text: {
        //   100: '#4A4A4A',
        //   200: '#878787',
        // },
        // bg: {
        //   100: '#F5F3F7',
        //   200: '#E9E4ED',
        //   300: '#FFFFFF',
        // },
        // primary: {
        //   100: '#424874',
        //   200: '#A6B1E1',
        //   300: '#fdf6fd',
        // },
        // accent: {
        //   100: '#D9ACF5',
        //   200: '#FFCEFE',
        // },
        // text: {
        //   100: '#292524',
        //   200: '#64748b',
        // },
        // bg: {
        //   100: '#F4EEFF',
        //   200: '#DCD6F7',
        //   300: '#bbb9e9',
        // },
      },
    },
  },
  plugins: [],
}
export default config
