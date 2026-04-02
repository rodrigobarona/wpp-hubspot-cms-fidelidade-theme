import '../mobile-menu-inner.css';
import '../../../styles/tailwind.css';
import { cn } from '../../../utils/cn.js';
import { createComponent } from '../../../utils/create-component.js';
import MenuComponent from '../../../MenuComponent/index.js';
import { useEffect, useState } from 'react';
import { useSharedIslandState } from '@hubspot/cms-components';
import { Button } from '../../../ButtonComponent/index.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../../utils/content-fields.js';
import { MobileMenuIslandProps } from '../types.js';
import MobileSiteHeaderLanguageSwitcher from '../../../LanguageSwitcherComponent/MobileSiteHeaderLanguageSwitcherComponent.js';
import { CSSPropertiesMap } from '../../../types/components.js';

// Functions to generate CSS variables

type ColorProps = {
  menuTextColor: string;
  menuTextHoverColor: string;
  menuBackgroundColor: string;
  menuAccentColor: string;
};

function generateColorCssVars(props: ColorProps): CSSPropertiesMap {
  const { menuTextColor, menuTextHoverColor, menuBackgroundColor, menuAccentColor } = props;

  return {
    '--hsFidelidade--mobileMenu__textColor': menuTextColor,
    '--hsFidelidade--mobileMenu__hover--textColor': menuTextHoverColor,
    '--hsFidelidade--mobileMenu__backgroundColor': menuBackgroundColor,
    '--hsFidelidade--mobileMenu__accentColor': menuAccentColor,
  };
}

type SizeProps = {
  headerHeight: number;
  mobileButtonContainerHeight: number;
  headerMobileLanguageSwitcherHeight: number;
};

function generateSizeCssVars(props: SizeProps): CSSPropertiesMap {
  const { headerHeight, mobileButtonContainerHeight, headerMobileLanguageSwitcherHeight } = props;

  return {
    '--hsFidelidade--mobileMenu__height': `${headerHeight}px`,
    '--hsFidelidade--mobileMenuButtonContainer__height': `${mobileButtonContainerHeight}px`,
    '--hsFidelidade--mobileMenuLanguageSwitcher__height': `${headerMobileLanguageSwitcherHeight}px`,
  };
}

// Components

const MobileMenu = createComponent('div');
const MenuContainer = createComponent('div');
const HamburgerMenu = createComponent('div');
const MobileSlideoutButtonContainer = createComponent('div');

export default function MobileMenuIsland(props: MobileMenuIslandProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuSliding, setIsMenuSliding] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [triggeredMenuItems, setTriggeredMenuItems] = useSharedIslandState();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerMobileLanguageSwitcherHeight, setHeaderMobileLanguageSwitcherHeight] = useState(0);
  const [mobileButtonContainerHeight, setMobileButtonContainerHeight] = useState(0);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  const {
    moduleName,
    flow,
    flyouts,
    menuBackgroundColor,
    menuAccentColor,
    menuTextColor,
    menuTextHoverColor,
    buttonStyleVariant,
    buttonStyleSize,
    groupButton,
    languageSwitcherSelectText,
    langSwitcherIconFieldPath,
    ...rest
  } = props;

  const {
    showButton,
    buttonContentText: buttonText,
    buttonContentLink: buttonLink,
    buttonContentShowIcon: showIcon,
    buttonContentIconPosition: iconPosition,
  } = groupButton;

  useEffect(() => {
    if (isAnimating) {
      setShowMenu(true);
      // This is to prevent scrolling when the menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else if (!isAnimating && showMenu) {
      setIsClosing(true);
      setIsMenuSliding(false);
      // Restore scrolling and position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (showMenu && !isClosing) {
      setTimeout(() => {
        setIsMenuSliding(true);
      }, 100); // This delay just gives display change time to take effect so animation works
    } else if (isClosing) {
      setTimeout(() => {
        setShowMenu(false);
        setIsClosing(false);
      }, 300); // Adjust this delay to match the transition duration
    }
  }, [showMenu, isClosing]);

  useEffect(() => {
    const header = document.querySelector('.hs-fidelidade-site-header') as HTMLElement;

    if (!header) {
      return;
    }

    const updateHeight = () => {
      setHeaderHeight(header.offsetHeight);
    };

    const observer = new MutationObserver(updateHeight);
    observer.observe(header, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Initial height set
    updateHeight();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const headerMobileLanguageSwitcherButton = document.querySelector('.hs-fidelidade-site-header__language-switcher-button') as HTMLElement;

    if (!headerMobileLanguageSwitcherButton) {
      return;
    }

    const updateHeight = () => {
      const height = headerMobileLanguageSwitcherButton.offsetHeight;
      setHeaderMobileLanguageSwitcherHeight(height);
    };

    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerMobileLanguageSwitcherButton);

    updateHeight();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const buttonContainer = document.querySelector('.hs-fidelidade-site-header__mobile-button-container') as HTMLElement;

    // If the button container doesn't exist, set the height to 0
    if (!buttonContainer) {
      setMobileButtonContainerHeight(0);
      return;
    }

    const updateHeight = (height: number) => {
      setMobileButtonContainerHeight(height);
    };

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const targetElement = entry.target as HTMLElement;
        updateHeight(targetElement.offsetHeight);
      }
    });

    resizeObserver.observe(buttonContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isAnimating && pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  }, [isAnimating, pendingCallback]);

  const handleOpenCloseMenu = () => {
    setTriggeredMenuItems([]);
    setIsAnimating(!isAnimating);
  };

  const topLevelMenuItemStyles = { '--hsFidelidade--menu--topLevel__gap': '0' } as CSSPropertiesMap;

  // Handles smooth scrolling to an anchor link when mobile menu is closed
  const handleMobileAnchorClick = (cb: () => void) => {
    handleOpenCloseMenu();
    setPendingCallback(() => cb);
  };

  const cssVarsMap = {
    '--hsFidelidade--mobileMenu__zIndex': '1000',
    ...generateColorCssVars({ menuTextColor, menuTextHoverColor, menuBackgroundColor, menuAccentColor }),
    ...generateSizeCssVars({ headerHeight, mobileButtonContainerHeight, headerMobileLanguageSwitcherHeight }),
  };

  const menuContainerClassNames = cn(
    'hs-fidelidade-site-header__menu-container',
    'absolute z-[var(--hsFidelidade--mobileMenu__zIndex)] top-full mt-0 flex h-[calc(100dvh-var(--hsFidelidade--mobileMenu__height))] w-full flex-col items-stretch justify-start bg-white transition-all duration-300 ease-in-out',
    showMenu && !isMenuSliding && 'left-full',
    isMenuSliding && 'left-0',
    !showMenu && 'hidden',
  );

  const hamburgerMenuClassNames = cn(
    'hs-fidelidade-site-header__hamburger-menu',
    'flex h-[25px] w-[30px] cursor-pointer flex-col justify-around',
    '[&>div]:h-1 [&>div]:w-full [&>div]:transition-all [&>div]:duration-300 [&>div]:ease-in-out [&>div]:[background-color:var(--hsFidelidade--mobileMenu__textColor)]',
    showMenu && [
      '[&>div:nth-child(1)]:[transform:rotate(45deg)_translate(7px,5px)]',
      '[&>div:nth-child(2)]:opacity-0',
      '[&>div:nth-child(3)]:[transform:rotate(-45deg)_translate(6px,-5px)]',
    ],
  );

  const mobileButtonContainerClassNames = cn(
    'hs-fidelidade-site-header__mobile-button-container',
    'z-[calc(var(--hsFidelidade--mobileMenu__zIndex)+20)] block w-full p-hs-24 mt-0 mb-[var(--hsFidelidade--mobileMenuLanguageSwitcher__height)] [background-color:var(--hsFidelidade--mobileMenu__backgroundColor)] min-[460px]:hidden',
    '[&_.hs-fidelidade-site-header__mobile-button]:h-full [&_.hs-fidelidade-site-header__mobile-button]:w-full [&_.hs-fidelidade-site-header__mobile-button]:justify-center',
  );

  return (
    <MobileMenu style={cssVarsMap} className="hs-fidelidade-site-header__mobile-menu">
      <HamburgerMenu className={hamburgerMenuClassNames} tab-index="1" onClick={handleOpenCloseMenu}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerMenu>
      <MenuContainer className={menuContainerClassNames}>
        <MenuComponent
          {...rest}
          flow="vertical"
          flyouts={false}
          isMobileMenu={true}
          triggeredMenuItems={triggeredMenuItems}
          setTriggeredMenuItems={setTriggeredMenuItems}
          topLevelMenuItemStyles={topLevelMenuItemStyles}
          mobileAnchorClickCallback={handleMobileAnchorClick}
          additionalClassArray={['hs-fidelidade-site-header__menu']}
        />
        {showButton && (
          <MobileSlideoutButtonContainer className={mobileButtonContainerClassNames}>
            <Button
              href={getLinkFieldHref(buttonLink)}
              buttonStyle={buttonStyleVariant}
              buttonSize={buttonStyleSize}
              target={getLinkFieldTarget(buttonLink)}
              rel={getLinkFieldRel(buttonLink)}
              showIcon={showIcon}
              iconFieldPath="groupButton.buttonContentIcon"
              iconPosition={iconPosition}
              additionalClassArray={['hs-fidelidade-site-header__mobile-button']}
              moduleName={moduleName}
              textFieldPath="groupButton.buttonContentText"
            >
              {buttonText}
            </Button>
          </MobileSlideoutButtonContainer>
        )}
        {
          <MobileSiteHeaderLanguageSwitcher
            menuBackgroundColor={menuBackgroundColor}
            menuBackgroundColorHover={menuAccentColor}
            textColor={menuTextColor}
            textColorHover={menuTextHoverColor}
            languageSwitcherSelectText={languageSwitcherSelectText}
            langSwitcherIconFieldPath={langSwitcherIconFieldPath}
          />
        }
      </MenuContainer>
    </MobileMenu>
  );
}
