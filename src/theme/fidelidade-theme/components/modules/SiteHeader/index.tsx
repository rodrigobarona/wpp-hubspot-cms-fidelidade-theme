// import { dummyTranslations } from '../../LanguageSwitcherComponent/dummyData.js';
import './site-header-main-nav.css';
import '../../styles/tailwind.css';
import { ModuleMeta } from '../../types/modules.js';
// @ts-expect-error -- ?island not typed
import MenuComponent from '../../MenuComponent/index.js?island';
import SiteHeaderSVG from './assets/Header.svg';
import { Button } from '../../ButtonComponent/index.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
// @ts-expect-error -- ?island not typed
import MobileMenuIsland from './islands/MobileMenuIsland.js?island';
// @ts-expect-error -- ?island not typed
import MobileLogoBackButton from './islands/MobileLogoBackButton.js?island';
import { Island } from '@hubspot/cms-components';
import { SharedIslandState, useLanguageVariants } from '@hubspot/cms-components';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { MenuModulePropTypes } from './types.js';
import { PlaceholderEmptyContent } from '../../PlaceholderComponent/PlaceholderEmptyContent.js';
// @ts-expect-error -- ?island not typed
import LanguageSwitcherIsland from '../../LanguageSwitcherComponent/index.js?island';
import { CSSPropertiesMap } from '../../types/components.js';

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
    '--hsFidelidade--siteHeader__menuTextColor': menuTextColor,
    '--hsFidelidade--siteHeader__hover--menuTextColor': menuTextHoverColor,
    '--hsFidelidade--siteHeader__menuBackgroundColor': menuBackgroundColor,
    '--hsFidelidade--siteHeader__menuAccentColor': menuAccentColor,
  };
}

// Components

const SiteHeader = createComponent('div');
const SiteHeaderContainer = createComponent('div');
const LogoButtonContainer = createComponent('div');
const MainNav = createComponent('div');
const LanguageSwitcherContainer = createComponent('div');
const ButtonContainer = createComponent('div');
const MobileMenuContainer = createComponent('div');

export const Component = (props: MenuModulePropTypes) => {
  const {
    moduleName,
    hublData: {
      navigation: { children: navDataArray = [] },
      companyName,
      defaultLogo,
      logoLink: brandLogoLinkHref,
      isInEditor,
    },
    groupLogo: { logo: logoField, overrideLogoLink, logoLinkOverride },
    defaultContent: {
      logoLinkAriaText,
      languageSwitcherSelectText,
      placeholderTitle,
      placeholderDescription,
      logoPlaceholderTitle,
      logoPlaceholderDescription,
    },
    groupButton,
    styles: groupStyles,
  } = props;

  const isEditorMode = isInEditor ?? false;

  const {
    showButton,
    buttonContentText: buttonText,
    buttonContentLink: buttonLink,
    buttonContentShowIcon: showIcon,
    buttonContentIconPosition: iconPosition,
  } = groupButton;

  // Temporary until logoField is fixed
  defaultLogo.suppress_company_name = logoField.suppress_company_name;
  const logoToUse = logoField.override_inherited_src ? logoField : defaultLogo;

  const logoLinkToUse = overrideLogoLink && logoLinkOverride?.url?.href ? logoLinkOverride.url.href : brandLogoLinkHref;

  const {
    groupMenu: {
      menuAlignment,
      menuBackgroundColor: { color: menuBackgroundColor } = { color: '#ffffff' },
      menuAccentColor: { color: menuAccentColor } = { color: '#D3DAE4' },
      menuTextColor: { color: menuTextColor } = { color: '#09152B' },
      menuTextHoverColor: { color: menuTextHoverColor } = { color: '#F7F9FC' },
    },
    groupButton: { buttonStyleVariant, buttonStyleSize },
  } = groupStyles;

  const translations = useLanguageVariants();
  const showLanguageSwitcher = translations?.length > 1;
  const langSwitcherIconFieldPath = 'globe_icon';

  const cssVarsMap = { ...generateColorCssVars({ menuTextColor, menuTextHoverColor, menuBackgroundColor, menuAccentColor }) };

  const siteHeaderClassNames = cn(
    'hs-fidelidade-site-header',
    'relative z-10 h-auto w-full py-hs-24 px-hs-48 [background-color:var(--hsFidelidade--siteHeader__menuBackgroundColor)] max-[1100px]:px-hs-32',
    showLanguageSwitcher && 'hs-fidelidade-site-header--has-language-switcher max-[1215px]:px-hs-32',
  );

  return (
    <SiteHeader className={siteHeaderClassNames} style={cssVarsMap}>
      <SharedIslandState value={[]}>
        {/* Controls back button when mobile nav is open */}
        <SiteHeaderContainer className="hs-fidelidade-site-header__header-container flex w-full max-w-content-wide flex-row flex-nowrap items-center justify-start gap-hs-24 mx-auto">
          <LogoButtonContainer className="hs-fidelidade-site-header__logo-container mr-auto flex-[0_1_auto] min-[769px]:flex-[0_0_auto]">
            <Island
              module={MobileLogoBackButton}
              logoField={logoToUse}
              companyName={companyName}
              logoLinkAriaText={logoLinkAriaText}
              logoLink={logoLinkToUse}
              isInEditor={isEditorMode}
              logoPlaceholderTitle={logoPlaceholderTitle}
              logoPlaceholderDescription={logoPlaceholderDescription}
            />
          </LogoButtonContainer>
          {navDataArray.length === 0 && isEditorMode ? (
            <PlaceholderEmptyContent title={placeholderTitle} description={placeholderDescription} />
          ) : (
            <MainNav className="hs-fidelidade-site-header__main-nav">
              <Island
                module={MenuComponent}
                menuDataArray={navDataArray}
                flow="horizontal"
                menuAlignment={menuAlignment}
                maxDepth={3}
                navigationAriaLabel="Main navigation"
                flyouts={true}
                wrapperStyle={{ flex: '1 0 100%' }}
                additionalClassArray={['hs-fidelidade-site-header__main-nav-menu']}
              />
            </MainNav>
          )}
          {showLanguageSwitcher && (
            <LanguageSwitcherContainer className="hs-fidelidade-site-header__language-switcher-container max-[1215px]:hidden">
              <Island
                module={LanguageSwitcherIsland}
                menuBackgroundColor={menuBackgroundColor}
                menuBackgroundColorHover={menuAccentColor}
                textColor={menuTextColor}
                textColorHover={menuTextHoverColor}
                languageSwitcherSelectText={languageSwitcherSelectText}
                langSwitcherIconFieldPath={langSwitcherIconFieldPath}
              />
            </LanguageSwitcherContainer>
          )}

          {showButton && (
            <ButtonContainer className="hs-fidelidade-site-header__button-container hidden min-[460px]:ml-auto min-[460px]:block min-[460px]:flex-[0_1_auto] min-[769px]:flex-none">
              <Button
                href={getLinkFieldHref(buttonLink)}
                buttonStyle={buttonStyleVariant}
                buttonSize={buttonStyleSize}
                target={getLinkFieldTarget(buttonLink)}
                rel={getLinkFieldRel(buttonLink)}
                showIcon={showIcon}
                iconFieldPath="groupButton.buttonContentIcon"
                iconPosition={iconPosition}
                additionalClassArray={['hs-fidelidade-site-header__button']}
                moduleName={moduleName}
                textFieldPath="groupButton.buttonContentText"
              >
                {buttonText}
              </Button>
            </ButtonContainer>
          )}

          <MobileMenuContainer
            className={cn(
              'hs-fidelidade-site-header__mobile-menu-container',
              'hidden',
              showLanguageSwitcher ? 'max-[1215px]:block' : 'max-[1100px]:block',
            )}
          >
            <Island
              module={MobileMenuIsland}
              moduleName={moduleName}
              menuDataArray={navDataArray}
              flow="horizontal"
              maxDepth={3}
              menuAlignment={menuAlignment}
              navigationAriaLabel="Main mobile navigation"
              flyouts={true}
              menuBackgroundColor={menuBackgroundColor}
              menuAccentColor={menuAccentColor}
              menuTextColor={menuTextColor}
              menuTextHoverColor={menuTextHoverColor}
              buttonStyleVariant={buttonStyleVariant}
              buttonStyleSize={buttonStyleSize}
              groupButton={groupButton}
              hublData={props.hublData}
              myAvailableTranslations={translations}
              languageSwitcherSelectText={languageSwitcherSelectText}
              langSwitcherIconFieldPath={langSwitcherIconFieldPath}
            />
          </MobileMenuContainer>
        </SiteHeaderContainer>
      </SharedIslandState>
    </SiteHeader>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "navigation": menu(module.groupNavigation.menu, "site_root"),
      "companyName": branding_company_name,
      "logoLink": brand_settings.logo.link,
      "defaultLogo": {
        "src": brand_settings.logo.src,
        "alt": brand_settings.logo.alt,
        "width": brand_settings.logo.width,
        "height": brand_settings.logo.height
      },
      "isInEditor": is_in_editor
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Site header',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: SiteHeaderSVG,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/site_header',
  version: 0,
  themeModule: true,
};
