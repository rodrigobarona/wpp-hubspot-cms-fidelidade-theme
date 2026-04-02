import { fileURLToPath } from 'url';
import containerQueries from '@tailwindcss/container-queries';

const componentsDir = fileURLToPath(new URL('./components', import.meta.url));

export default {
  content: [`${componentsDir}/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      spacing: {
        'hs-4': 'var(--hsFidelidade--spacing--4, 4px)',
        'hs-8': 'var(--hsFidelidade--spacing--8, 8px)',
        'hs-10': 'var(--hsFidelidade--spacing--10, 10px)',
        'hs-12': 'var(--hsFidelidade--spacing--12, 12px)',
        'hs-16': 'var(--hsFidelidade--spacing--16, 16px)',
        'hs-20': 'var(--hsFidelidade--spacing--20, 20px)',
        'hs-24': 'var(--hsFidelidade--spacing--24, 24px)',
        'hs-32': 'var(--hsFidelidade--spacing--32, 32px)',
        'hs-40': 'var(--hsFidelidade--spacing--40, 40px)',
        'hs-48': 'var(--hsFidelidade--spacing--48, 48px)',
        'hs-56': 'var(--hsFidelidade--spacing--56, 56px)',
        'hs-64': 'var(--hsFidelidade--spacing--64, 64px)',
        'hs-72': 'var(--hsFidelidade--spacing--72, 72px)',
        'hs-80': 'var(--hsFidelidade--spacing--80, 80px)',
      },
      maxWidth: {
        'content-wide': 'var(--hsFidelidade--contentWrapper--wide__maxWidth)',
      },
      borderRadius: {
        hs: 'var(--hsFidelidade-rounded)',
        'hs-lg': 'var(--hsFidelidade-rounded--large)',
      },
      fontSize: {
        'hs-body-sm': 'var(--hsFidelidade--body--small__fontSize)',
        'hs-body-lg': 'var(--hsFidelidade--body--large__fontSize)',
        'hs-body-xl': 'var(--hsFidelidade--body--extraLarge__fontSize)',
        'hs-h4': 'var(--hsFidelidade--h4__fontSize)',
        'hs-h5': 'var(--hsFidelidade--heading--h5__fontSize)',
        'hs-h6': 'var(--hsFidelidade--heading--h6__fontSize)',
        'hs-display1': 'var(--hsFidelidade--display1__fontSize)',
      },
      gap: {
        'hs-lg': 'var(--hsFidelidade--gap--large)',
      },
      lineHeight: {
        'hs-heading': 'var(--hsFidelidade--heading__lineHeight)',
      },
    },
  },
  plugins: [containerQueries],
};
