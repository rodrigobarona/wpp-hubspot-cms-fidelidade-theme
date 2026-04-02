// For testing purposes / local development swap out translations with dummyTranslations
import { cn } from '../utils/cn.js';
import { createComponent } from '../utils/create-component.js';
import { useState, useRef, useMemo } from 'react';
import { getLanguageDisplayName, shouldDisplayLanguageSwitcher, createTranslationsArrayAsObject } from './utils.js';
import LanguageOptions from './LanguageOptions.jsx';
import { LanguageSwitcherProps } from '../types/language.js';
import { useLanguageVariants, Icon } from '@hubspot/cms-components';
import GlobeIcon from './assets/Globe.js';
import { useDocumentLang } from '../hooks/useDocumentLang.js';
import { CSSPropertiesMap } from '../types/components.js';
import '../styles/tailwind.css';

// Functions to generate CSS variables

type ColorProps = {
  menuBackgroundColor: string;
  textColor: string;
  menuBackgroundColorHover: string;
  textColorHover: string;
};

function generateColorCssVars(props: ColorProps): CSSPropertiesMap {
  const { menuBackgroundColor, menuBackgroundColorHover, textColor, textColorHover } = props;

  return {
    '--hsFidelidade--languageSwitcher__backgroundColor': menuBackgroundColor,
    '--hsFidelidade--languageSwitcher__textColor': textColor,
    '--hsFidelidade--languageSwitcher__hover--backgroundColor': menuBackgroundColorHover,
    '--hsFidelidade--languageSwitcher__hover--textColor': textColorHover,
  };
}

// Components

const MobileLanguageSwitcherContainer = createComponent('div');
const LanguageSwitcherButton = createComponent('button');
const LanguageButtonContent = createComponent('div');
const LanguageOptionsContainer = createComponent('div');
const LanguageLabel = createComponent('div');
const OptionsScrollWrapper = createComponent('div');
const Overlay = createComponent('div');

const MobileSiteHeaderLanguageSwitcher = (props: LanguageSwitcherProps) => {
  const translations = props.translations ? props.translations : useLanguageVariants();
  const activeTranslation = translations.find(item => item.isActive);
  const documentLang = useDocumentLang();
  const currentPageLanguage = useMemo(() => activeTranslation?.languageCode || documentLang, [activeTranslation, documentLang]);

  // Early return if no translations or no current page language
  if (!shouldDisplayLanguageSwitcher(translations, currentPageLanguage)) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const {
    menuBackgroundColor = 'var(--hsFidelidade--section--lightSection--1__backgroundColor)',
    menuBackgroundColorHover = 'var(--hsFidelidade--section--lightSection--1__backgroundColor)',
    textColor = 'var(--hsFidelidade--section--lightSection--1__textColor)',
    textColorHover = 'var(--hsFidelidade--section--lightSection--1__textColor)',
    languageSwitcherSelectText = 'Select a language',
    langSwitcherIconFieldPath,
  } = props;

  const translationsArrayAsObject = createTranslationsArrayAsObject(translations);
  const currentPageLanguageDisplayName = getLanguageDisplayName({ currentPageLanguage, translationsArrayAsObject });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const langSwitcherIcon = langSwitcherIconFieldPath ? <Icon fieldPath={langSwitcherIconFieldPath} /> : <GlobeIcon />;
  const toggleLanguageOptions = () => {
    setIsOpen(!isOpen);
  };

  const cssVarsMap = { ...generateColorCssVars({ menuBackgroundColor, menuBackgroundColorHover, textColor, textColorHover }) };

  return (
    <>
      {isOpen && (
        <Overlay
          onClick={() => setIsOpen(false)}
          className="fixed left-0 top-0 z-[1025] h-full w-full bg-black/50 opacity-100 transition-[opacity,visibility] duration-300 ease-in-out visible"
        />
      )}
      <MobileLanguageSwitcherContainer
        className={cn(
          'absolute bottom-0 left-0 right-0 z-[1030] flex h-full max-h-[75vh] w-full translate-y-[calc(100%-56px)] flex-col border-t border-[var(--hsFidelidade--languageSwitcher__hover--backgroundColor)] bg-[var(--hsFidelidade--languageSwitcher__backgroundColor)] transition-transform duration-300 ease-in-out',
          isOpen && 'translate-y-0',
        )}
        style={cssVarsMap}
      >
        <LanguageSwitcherButton
          ref={buttonRef}
          onClick={toggleLanguageOptions}
          aria-expanded={isOpen}
          aria-controls="language-options"
          className={cn(
            'flex h-auto w-full flex-shrink-0 cursor-pointer items-center justify-between border-0 bg-transparent py-hs-16 px-hs-40 text-left text-hs-h5 font-semibold text-[var(--hsFidelidade--languageSwitcher__textColor)]',
          )}
        >
          <LanguageButtonContent className="flex items-center gap-hs-12 [&_svg]:h-5 [&_svg_path]:fill-current">
            {langSwitcherIcon}
            <span className="hs-fidelidade-site-header__language-switcher-current-language">{currentPageLanguageDisplayName}</span>
          </LanguageButtonContent>
        </LanguageSwitcherButton>
        <LanguageOptionsContainer
          className={cn(
            'flex flex-1 flex-col overflow-hidden bg-[var(--hsFidelidade--languageSwitcher__backgroundColor)] py-hs-16 px-hs-40 transition-[opacity,visibility] duration-300 ease-in-out',
            isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          )}
        >
          <LanguageLabel className="mb-hs-12 flex-shrink-0 font-semibold text-hs-h6 text-[var(--hsFidelidade--languageSwitcher__textColor)]">
            {languageSwitcherSelectText}
          </LanguageLabel>
          <OptionsScrollWrapper className="min-h-0 flex-1 overflow-y-auto">
            <LanguageOptions
              translations={translations}
              menuBackgroundColorHover={menuBackgroundColorHover}
              textColor={textColor}
              textColorHover={textColorHover}
              fontSize="var(--hsFidelidade--heading--h6__fontSize, 14px)"
            />
          </OptionsScrollWrapper>
        </LanguageOptionsContainer>
      </MobileLanguageSwitcherContainer>
    </>
  );
};

export default MobileSiteHeaderLanguageSwitcher;
