/*
 * For testing purposes / local development swap out translations with dummyTranslations
 * import { dummyTranslations, dummyTranslationsAsObject } from './dummyData.js';
 */

import { cn } from '../utils/cn.js';
import { createComponent } from '../utils/create-component.js';
import { shouldDisplayLanguageSwitcher, getLanguageDisplayName, createTranslationsArrayAsObject } from './utils.jsx';
import LanguageOptions from './LanguageOptions.jsx';
import { LanguageSwitcherProps } from '../types/language.js';
import { useState, MouseEvent as ReactMouseEvent, useMemo } from 'react';
import { useLanguageVariants, Icon } from '@hubspot/cms-components';
import { useIsInEditor } from '../hooks/useIsInEditor.js';
import GlobeIcon from './assets/Globe.js';
import useDocumentLang from '../hooks/useDocumentLang.js';
import { CSSPropertiesMap } from '../types/components.js';
import '../styles/tailwind.css';

// Functions to generate CSS variables

type ColorProps = {
  textColor: string;
  menuBackgroundColor: string;
};

function generateColorCssVars(props: ColorProps): CSSPropertiesMap {
  const { textColor, menuBackgroundColor } = props;

  return {
    '--hsFidelidade--languageSwitcher__textColor': textColor,
    '--hsFidelidade--languageSwitcher__backgroundColor': menuBackgroundColor,
  };
}

// Components

const LanguageSwitcherNav = createComponent('nav');
const LanguageSwitcherButton = createComponent('div');
const SidePanel = createComponent('div');
const PanelHeader = createComponent('div');
const PanelTitle = createComponent('span');
const CloseButton = createComponent('button');
const PanelContent = createComponent('div');
const Overlay = createComponent('div');

const LanguageSwitcherIsland = (props: LanguageSwitcherProps) => {
  const translations = props.translations ? props.translations : useLanguageVariants();
  const activeTranslation = translations.find(item => item.isActive);
  const documentLang = useDocumentLang();
  const currentPageLanguage = useMemo(() => activeTranslation?.languageCode || documentLang, [activeTranslation, documentLang]);

  // Early return if no translations or no current page language
  if (!shouldDisplayLanguageSwitcher(translations, currentPageLanguage)) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const translationsArrayAsObject = createTranslationsArrayAsObject(translations);
  const currentPageLanguageDisplayName = getLanguageDisplayName({ currentPageLanguage, translationsArrayAsObject });
  const {
    menuBackgroundColor = 'var(--hsFidelidade--section--lightSection--1__backgroundColor)',
    menuBackgroundColorHover = 'var(--hsFidelidade--section--lightSection--1__backgroundColor)',
    textColor = 'var(--hsFidelidade--section--lightSection--1__textColor)',
    textColorHover = 'var(--hsFidelidade--section--lightSection--1__textColor)',
    languageSwitcherSelectText = 'Select a language',
    langSwitcherIconFieldPath,
  } = props;
  const isInEditor = useIsInEditor();

  const langSwitcherIcon = langSwitcherIconFieldPath ? <Icon fieldPath={langSwitcherIconFieldPath} /> : <GlobeIcon />;

  const handleContainerClick = (e: ReactMouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const closeSidePanel = () => {
    setIsOpen(false);
  };

  function handleLanguageSwitcherClick() {
    setIsOpen(!isOpen);
  }

  const cssVarsMap = { ...generateColorCssVars({ textColor, menuBackgroundColor }) };

  return (
    <LanguageSwitcherNav style={cssVarsMap} onClick={handleContainerClick} className="relative inline-block">
      <LanguageSwitcherButton
        role="button"
        aria-expanded={isOpen}
        aria-label={currentPageLanguageDisplayName}
        onClick={handleLanguageSwitcherClick}
        className={cn(
          'flex cursor-pointer items-center gap-hs-8 bg-transparent py-hs-8 px-hs-12 text-hs-h5 text-[var(--hsFidelidade--languageSwitcher__textColor)]',
          '[&_svg]:h-5 [&_svg_path]:fill-current',
        )}
      >
        {langSwitcherIcon}
        <span className="hs-fidelidade-language-switcher__current-language">{currentPageLanguageDisplayName}</span>
      </LanguageSwitcherButton>
      {isOpen && (
        <Overlay
          onClick={closeSidePanel}
          className="fixed inset-0 z-[999] h-full w-full bg-black/30 opacity-100 transition-[opacity,visibility] duration-300 ease-in-out visible"
        />
      )}
      {!isInEditor && (
        <SidePanel
          className={cn(
            'fixed right-0 top-0 z-[1000] h-screen w-[min(100%,400px)] translate-x-full overflow-y-auto bg-[var(--hsFidelidade--languageSwitcher__backgroundColor)] shadow-[-4px_0_12px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out',
            isOpen && 'translate-x-0',
          )}
        >
          <PanelHeader
            className={cn(
              'sticky top-0 z-[1] flex items-center justify-between border-b border-[var(--hsFidelidade--languageSwitcher__textColor)] bg-[var(--hsFidelidade--languageSwitcher__backgroundColor)] py-hs-24 px-hs-24',
            )}
          >
            <PanelTitle className="m-0 font-semibold text-[length:var(--hsFidelidade--heading--h4__fontSize,24px)] text-[var(--hsFidelidade--languageSwitcher__textColor)]">
              {languageSwitcherSelectText}
            </PanelTitle>
            <CloseButton
              onClick={closeSidePanel}
              aria-label="Close language selector"
              className="cursor-pointer border-0 bg-transparent p-hs-8 text-[var(--hsFidelidade--languageSwitcher__textColor)]"
            >
              ✕
            </CloseButton>
          </PanelHeader>

          <PanelContent className="p-hs-24">
            <LanguageOptions
              translations={translations}
              menuBackgroundColorHover={menuBackgroundColorHover}
              textColor={textColor}
              textColorHover={textColorHover}
            />
          </PanelContent>
        </SidePanel>
      )}
    </LanguageSwitcherNav>
  );
};

export default LanguageSwitcherIsland;
