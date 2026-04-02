import { LanguageVariant } from '@hubspot/cms-components';
import '../styles/tailwind.css';
import { cn } from '../utils/cn.js';
import { createComponent } from '../utils/create-component.js';
import { CSSPropertiesMap } from '../types/components.js';

// Types

export interface LanguageOptionsProps {
  translations: LanguageVariant[];
  menuBackgroundColorHover?: string;
  textColor?: string;
  textColorHover?: string;
  fontSize?: string;
}

// Functions to generate CSS variables

type ColorProps = {
  textColor: string;
  menuBackgroundColorHover: string;
  textColorHover: string;
};

function generateColorCssVars(props: ColorProps): CSSPropertiesMap {
  const { textColor, menuBackgroundColorHover, textColorHover } = props;

  return {
    '--hsFidelidade--languageSwitcher__textColor': textColor,
    '--hsFidelidade--languageSwitcher__hover--backgroundColor': menuBackgroundColorHover,
    '--hsFidelidade--languageSwitcher__hover--textColor': textColorHover,
  };
}

type TypographyProps = {
  fontSize: string;
};

function generateTypographyCssVars(props: TypographyProps): CSSPropertiesMap {
  const { fontSize } = props;

  return { '--hsFidelidade--languageSwitcher__fontSize': fontSize };
}

// Components

const LanguageList = createComponent('ul');
const LanguageItem = createComponent('li');
const LanguageLink = createComponent('a');

export const LanguageOptions = ({
  translations,
  menuBackgroundColorHover = 'var(--hsFidelidade--section--lightSection--1__backgroundColor)',
  textColor = 'var(--hsFidelidade--section--lightSection--1__textColor)',
  textColorHover = 'var(--hsFidelidade--section--lightSection--1__textColor)',
  fontSize = 'var(--hsFidelidade--heading--h5__fontSize, 18px)',
}: LanguageOptionsProps) => {
  if (!translations || Object.keys(translations).length <= 1) {
    return null;
  }

  const cssVarsMap = {
    ...generateColorCssVars({ textColor, menuBackgroundColorHover, textColorHover }),
    ...generateTypographyCssVars({ fontSize }),
  };

  return (
    <LanguageList style={cssVarsMap} role="menu" className="m-0 h-auto list-none p-0">
      {translations.map(translation => (
        <LanguageItem
          key={translation.languageCode}
          role="menuitem"
          className={cn(
            'm-0 rounded-none p-0 last:mb-0',
            translation.isActive && 'bg-[var(--hsFidelidade--languageSwitcher__hover--backgroundColor,transparent)]',
          )}
        >
          <LanguageLink
            href={translation.localizedUrl}
            lang={translation.languageCode}
            hrefLang={translation.languageCode}
            className="flex items-center gap-hs-12 py-hs-12 px-hs-16 font-semibold [font-size:var(--hsFidelidade--languageSwitcher__fontSize,18px)] text-[var(--hsFidelidade--languageSwitcher__textColor,#1e293b)] no-underline transition-colors duration-200 ease-in-out visited:text-[var(--hsFidelidade--languageSwitcher__textColor,#1e293b)] visited:no-underline hover:bg-[var(--hsFidelidade--languageSwitcher__hover--backgroundColor,#f1f5f9)] hover:text-[var(--hsFidelidade--languageSwitcher__textColor,#1e293b)] hover:no-underline focus:text-[var(--hsFidelidade--languageSwitcher__textColor,#1e293b)] focus:no-underline active:text-[var(--hsFidelidade--languageSwitcher__textColor,#1e293b)] active:no-underline"
          >
            {translation.languageDisplayName.LOCALIZED}
          </LanguageLink>
        </LanguageItem>
      ))}
    </LanguageList>
  );
};

export default LanguageOptions;
