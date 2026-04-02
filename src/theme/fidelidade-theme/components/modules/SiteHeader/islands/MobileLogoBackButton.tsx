import { useSharedIslandState } from '@hubspot/cms-components';
import ArrowComponent from '../../../MenuComponent/ArrowComponent.js';
import { LogoFieldType } from '@hubspot/cms-components/fields';
import { cn } from '../../../utils/cn.js';
import { createComponent } from '../../../utils/create-component.js';
import { PlaceholderEmptyContent } from '../../../PlaceholderComponent/PlaceholderEmptyContent.js';
import '../../../styles/tailwind.css';

// Types

type MobileLogoBackButtonProps = {
  logoField: LogoFieldType['default'];
  companyName: string;
  logoLink: string;
  logoLinkAriaText: string;
  isInEditor: boolean;
  logoPlaceholderTitle: string;
  logoPlaceholderDescription: string;
};

// Components

const BackButtonContainer = createComponent('div');
const BackButton = createComponent('button');
const LogoImage = createComponent('img');
const CompanyNameFallback = createComponent('span');
const LogoLink = createComponent('a');
const LogoLinkScreenReader = createComponent('span');

export default function MobileLogoBackButton(props: MobileLogoBackButtonProps) {
  const {
    companyName,
    logoField: { src: logoSrc, alt: logoAlt, width: logoWidth, height: logoHeight, suppress_company_name },
    logoLink,
    logoLinkAriaText,
    isInEditor,
    logoPlaceholderTitle,
    logoPlaceholderDescription,
  } = props;
  const [triggeredMenuItems, setTriggeredMenuItems] = useSharedIslandState();
  const showBackButton = triggeredMenuItems.length > 0;
  const goBackOneLevel = () => {
    setTriggeredMenuItems(triggeredMenuItems.slice(0, -1));
  };
  const isFileTypeSvg = logoSrc ? logoSrc.endsWith('.svg') : false;

  const showCompanyName = !suppress_company_name;

  // when logo is not set and user is in editor:
  const renderLogoAreaPlaceholder = () => {
    if (!showCompanyName || (showCompanyName && !companyName)) {
      return <PlaceholderEmptyContent title={logoPlaceholderTitle} description={logoPlaceholderDescription} />;
    }
    return null;
  };

  return (
    <BackButtonContainer>
      {showBackButton && (
        <BackButton
          className={cn(
            'group absolute left-hs-48 top-1/2 z-50 -translate-y-1/2 cursor-pointer appearance-none border-0 bg-transparent text-[var(--hsFidelidade--link--primary__fontColor)]',
            'hover:text-[var(--hsFidelidade--link--primary__hover--fontColor)]',
            '[&_svg]:me-hs-8 [&_svg]:rotate-180',
            '[&_svg_path]:fill-[var(--hsFidelidade--link--primary__fontColor)]',
            'group-hover:[&_svg_path]:fill-[var(--hsFidelidade--link--primary__hover--fontColor)]',
          )}
          onClick={goBackOneLevel}
        >
          <ArrowComponent additionalClassArray={['hs-fidelidade-site-header__back-button-icon']} />
          Back
        </BackButton>
      )}
      {logoSrc && (
        <LogoLink
          className={cn(showBackButton ? 'pointer-events-none' : 'pointer-events-auto')}
          href={logoLink || '#'}
        >
          <LogoImage
            className={cn(
              'visible block max-h-[75px] w-auto max-w-[min(250px,100%)] object-contain pointer-events-auto md:max-w-[250px]',
              showBackButton && 'pointer-events-none invisible',
              !isFileTypeSvg && 'h-auto',
            )}
            src={logoSrc}
            alt={logoAlt}
            loading="eager"
            width={logoWidth}
            height={logoHeight}
          />
          <LogoLinkScreenReader
            className={cn(
              'absolute m-[-1px] block h-px w-px overflow-hidden border-0 p-0 [clip:rect(0,0,0,0)]',
              showBackButton && 'hidden',
            )}
          >
            {logoLinkAriaText}
          </LogoLinkScreenReader>
        </LogoLink>
      )}
      {!logoSrc && showCompanyName && companyName && (
        <CompanyNameFallback className="block max-w-[min(250px,45vw)] whitespace-break-spaces text-[1.3rem] [overflow-wrap:anywhere] sm:text-[1.6rem] md:text-[1.8rem]">
          {companyName}
        </CompanyNameFallback>
      )}
      {!logoSrc && isInEditor && renderLogoAreaPlaceholder()}
    </BackButtonContainer>
  );
}
