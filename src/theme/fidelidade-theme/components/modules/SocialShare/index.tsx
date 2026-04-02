import { ModuleMeta } from '../../types/modules.js';
import { Icon, usePageUrl } from '@hubspot/cms-components';
import socialIconSvg from './assets/social-follow.svg';
import { TextFieldType, AlignmentFieldType } from '@hubspot/cms-components/fields';
import { StandardSizeType, ButtonStyleType } from '../../types/fields.js';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import '../../styles/tailwind.css';

// Types

type ShapeOption = 'square' | 'rounded' | 'circle';
type SizeOption = StandardSizeType;

type DefaultTextProps = {
  twitterLinkAriaLabel: TextFieldType['default'];
  facebookLinkAriaLabel: TextFieldType['default'];
  linkedinLinkAriaLabel: TextFieldType['default'];
  pinterestLinkAriaLabel: TextFieldType['default'];
  emailLinkAriaLabel: TextFieldType['default'];
};

type SocialShareProps = {
  platforms: ('twitter' | 'facebook' | 'linkedin' | 'pinterest' | 'email')[];
  groupDefaultText: DefaultTextProps;
  groupStyle: ButtonStyleFieldLibraryType & {
    shape: ShapeOption;
    spaceBetweenIcons: StandardSizeType;
    alignment: AlignmentFieldType['default'];
  };
};

// Functions to pull in corresponding CSS variables on component based on field values

function generateIconSizeAndPaddingCssVars(iconSizeField: StandardSizeType): CSSPropertiesMap {
  const iconSizing = {
    small: {
      padding: 'var(--hsFidelidade--spacing--10, 10px)',
      iconSize: 'var(--hsFidelidade--icon--small__size)',
    },
    medium: {
      padding: 'var(--hsFidelidade--spacing--14, 14px)',
      iconSize: 'var(--hsFidelidade--icon--medium__size)',
    },
    large: {
      padding: 'var(--hsFidelidade--spacing--18, 18px)',
      iconSize: 'var(--hsFidelidade--icon--large__size)',
    },
  };

  return {
    '--hsFidelidade--socialShareIcon__padding': iconSizing[iconSizeField].padding,
    '--hsFidelidade--socialShareIcon__size': iconSizing[iconSizeField].iconSize,
  };
}

function generateIconShapeCssVars(iconShapeField: ShapeOption): CSSPropertiesMap {
  const iconShapeMap = {
    square: 'var(--hsFidelidade-sharp)',
    rounded: 'var(--hsFidelidade-rounded)',
    circle: 'var(--hsFidelidade-circle)',
  };

  return {
    '--hsFidelidade--socialShareIcon__shape': iconShapeMap[iconShapeField],
  };
}

function generateIconGapCssVars(iconGapField: SizeOption): CSSPropertiesMap {
  const iconGapMap = {
    small: 'var(--hsFidelidade--spacing--12, 12px)',
    medium: 'var(--hsFidelidade--spacing--24, 24px)',
    large: 'var(--hsFidelidade--spacing--48, 48px)',
  };

  return {
    '--hsFidelidade--socialShareIcon__gap': iconGapMap[iconGapField],
  };
}

function generateButtonStyles(buttonStyleVariant: ButtonStyleType): CSSPropertiesMap {
  const iconStyles = {
    primary: {
      backgroundColor: 'var(--hsFidelidade--button--primary__backgroundColor)',
      textColor: 'var(--hsFidelidade--button--primary__textColor)',
      borderColor: 'var(--hsFidelidade--button--primary__borderColor)',
      borderWidth: 'var(--hsFidelidade--button--primary__borderThickness)',
      hoverBackgroundColor: 'var(--hsFidelidade--button--primary__hover--backgroundColor)',
      hoverTextColor: 'var(--hsFidelidade--button--primary__hover--textColor)',
      hoverBorderColor: 'var(--hsFidelidade--button--primary__hover--borderColor)',
      hoverBorderWidth: 'var(--hsFidelidade--button--primary__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsFidelidade--button--primary__active--backgroundColor)',
      activeTextColor: 'var(--hsFidelidade--button--primary__active--textColor)',
      activeBorderColor: 'var(--hsFidelidade--button--primary__active--borderColor)',
      activeBorderWidth: 'var(--hsFidelidade--button--primary__active--borderThickness)',
    },
    secondary: {
      backgroundColor: 'var(--hsFidelidade--button--secondary__backgroundColor)',
      textColor: 'var(--hsFidelidade--button--secondary__textColor)',
      borderColor: 'var(--hsFidelidade--button--secondary__borderColor)',
      borderWidth: 'var(--hsFidelidade--button--secondary__borderThickness)',
      hoverBackgroundColor: 'var(--hsFidelidade--button--secondary__hover--backgroundColor)',
      hoverTextColor: 'var(--hsFidelidade--button--secondary__hover--textColor)',
      hoverBorderColor: 'var(--hsFidelidade--button--secondary__hover--borderColor)',
      hoverBorderWidth: 'var(--hsFidelidade--button--secondary__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsFidelidade--button--secondary__active--backgroundColor)',
      activeTextColor: 'var(--hsFidelidade--button--secondary__active--textColor)',
      activeBorderColor: 'var(--hsFidelidade--button--secondary__active--borderColor)',
      activeBorderWidth: 'var(--hsFidelidade--button--secondary__active--borderThickness)',
    },
    tertiary: {
      backgroundColor: 'var(--hsFidelidade--button--tertiary__backgroundColor)',
      textColor: 'var(--hsFidelidade--button--tertiary__textColor)',
      borderColor: 'var(--hsFidelidade--button--tertiary__borderColor)',
      borderWidth: 'var(--hsFidelidade--button--tertiary__borderThickness)',
      hoverBackgroundColor: 'var(--hsFidelidade--button--tertiary__hover--backgroundColor)',
      hoverTextColor: 'var(--hsFidelidade--button--tertiary__hover--textColor)',
      hoverBorderColor: 'var(--hsFidelidade--button--tertiary__hover--borderColor)',
      hoverBorderWidth: 'var(--hsFidelidade--button--tertiary__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsFidelidade--button--tertiary__active--backgroundColor)',
      activeTextColor: 'var(--hsFidelidade--button--tertiary__active--textColor)',
      activeBorderColor: 'var(--hsFidelidade--button--tertiary__active--borderColor)',
      activeBorderWidth: 'var(--hsFidelidade--button--tertiary__active--borderThickness)',
    },
    accent: {
      backgroundColor: 'var(--hsFidelidade--button--accent__backgroundColor)',
      textColor: 'var(--hsFidelidade--button--accent__textColor)',
      borderColor: 'var(--hsFidelidade--button--accent__borderColor)',
      borderWidth: 'var(--hsFidelidade--button--accent__borderThickness)',
      hoverBackgroundColor: 'var(--hsFidelidade--button--accent__hover--backgroundColor)',
      hoverTextColor: 'var(--hsFidelidade--button--accent__hover--textColor)',
      hoverBorderColor: 'var(--hsFidelidade--button--accent__hover--borderColor)',
      hoverBorderWidth: 'var(--hsFidelidade--button--accent__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsFidelidade--button--accent__active--backgroundColor)',
      activeTextColor: 'var(--hsFidelidade--button--accent__active--textColor)',
      activeBorderColor: 'var(--hsFidelidade--button--accent__active--borderColor)',
      activeBorderWidth: 'var(--hsFidelidade--button--accent__active--borderThickness)',
    },
  };

  return {
    '--hsFidelidade--socialShareIcon__backgroundColor': iconStyles[buttonStyleVariant].backgroundColor,
    '--hsFidelidade--socialShareIcon__color': iconStyles[buttonStyleVariant].textColor,
    '--hsFidelidade--socialShareIcon__borderColor': iconStyles[buttonStyleVariant].borderColor,
    '--hsFidelidade--socialShareIcon__borderWidth': iconStyles[buttonStyleVariant].borderWidth,
    '--hsFidelidade--socialShareIcon__hover--backgroundColor': iconStyles[buttonStyleVariant].hoverBackgroundColor,
    '--hsFidelidade--socialShareIcon__hover--color': iconStyles[buttonStyleVariant].hoverTextColor,
    '--hsFidelidade--socialShareIcon__hover--borderColor': iconStyles[buttonStyleVariant].hoverBorderColor,
    '--hsFidelidade--socialShareIcon__hover--borderWidth': iconStyles[buttonStyleVariant].hoverBorderWidth,
    '--hsFidelidade--socialShareIcon__active--backgroundColor': iconStyles[buttonStyleVariant].activeBackgroundColor,
    '--hsFidelidade--socialShareIcon__active--color': iconStyles[buttonStyleVariant].activeTextColor,
    '--hsFidelidade--socialShareIcon__active--borderColor': iconStyles[buttonStyleVariant].activeBorderColor,
    '--hsFidelidade--socialShareIcon__active--borderWidth': iconStyles[buttonStyleVariant].activeBorderWidth,
  };
}

function generateAlignmentCssVars(alignmentField: AlignmentFieldType['default']): CSSPropertiesMap {
  const alignmentCss = getAlignmentFieldCss(alignmentField);

  return {
    '--hsFidelidade--socialShare__justifyContent': alignmentCss.justifyContent || 'flex-start',
  };
}

// Components

const SocialShareContainer = createComponent('div');
const SocialLink = createComponent('a');

const socialShareLinkClassName = cn(
  'flex items-center justify-center p-[var(--hsFidelidade--socialShareIcon__padding)]',
  'border border-[length:var(--hsFidelidade--socialShareIcon__borderWidth)] border-[color:var(--hsFidelidade--socialShareIcon__borderColor)]',
  'rounded-[var(--hsFidelidade--socialShareIcon__shape)] bg-[var(--hsFidelidade--socialShareIcon__backgroundColor)]',
  '[&_svg]:fill-[var(--hsFidelidade--socialShareIcon__color)]',
  'hover:border-[color:var(--hsFidelidade--socialShareIcon__hover--borderColor)] hover:border-[length:var(--hsFidelidade--socialShareIcon__hover--borderWidth)]',
  'hover:bg-[var(--hsFidelidade--socialShareIcon__hover--backgroundColor)] hover:[&_svg]:fill-[var(--hsFidelidade--socialShareIcon__hover--color)]',
  'active:border-[color:var(--hsFidelidade--socialShareIcon__active--borderColor)] active:border-[length:var(--hsFidelidade--socialShareIcon__active--borderWidth)]',
  'active:bg-[var(--hsFidelidade--socialShareIcon__active--backgroundColor)] active:[&_svg]:fill-[var(--hsFidelidade--socialShareIcon__active--color)]',
  'focus:outline focus:outline-2 focus:outline-[#53acff] focus:outline-offset-2',
);

function getPlatformMetaData(socialLink: string, defaultText: DefaultTextProps) {
  const platformMetaData = {
    twitter: {
      name: 'twitter',
      aria_label: defaultText.twitterLinkAriaLabel,
      base_url: 'https://twitter.com/intent/tweet?url=',
    },
    facebook: {
      name: 'facebook',
      aria_label: defaultText.facebookLinkAriaLabel,
      base_url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    linkedin: {
      name: 'linkedin',
      aria_label: defaultText.linkedinLinkAriaLabel,
      base_url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
    pinterest: {
      name: 'pinterest',
      aria_label: defaultText.pinterestLinkAriaLabel,
      base_url: 'https://pinterest.com/pin/create/button/?url=',
    },
    email: {
      name: 'envelope',
      aria_label: defaultText.emailLinkAriaLabel,
      base_url: 'mailto:',
    },
  };

  return platformMetaData[socialLink] || {};
}

export const Component = (props: SocialShareProps) => {
  const {
    platforms,
    groupDefaultText,
    groupStyle: { shape, buttonStyleVariant, buttonStyleSize, spaceBetweenIcons, alignment },
  } = props;

  const cssVarsMap = {
    ...generateIconSizeAndPaddingCssVars(buttonStyleSize),
    ...generateIconShapeCssVars(shape),
    ...generateIconGapCssVars(spaceBetweenIcons),
    ...generateButtonStyles(buttonStyleVariant),
    ...generateAlignmentCssVars(alignment),
  };

  const currentUrl = usePageUrl().href;
  if (!currentUrl) {
    return null;
  }

  return (
    <SocialShareContainer
      className={cn(
        'flex flex-wrap items-center justify-[var(--hsFidelidade--socialShare__justifyContent)]',
        'gap-[var(--hsFidelidade--socialShareIcon__gap)]',
      )}
      style={cssVarsMap}
    >
      {platforms.map(platform => {
        const platformMetaData = getPlatformMetaData(platform, groupDefaultText);
        let iconFieldPath = `groupDefaultIcons.${platformMetaData.name}`;

        return (
          <SocialLink
            className={socialShareLinkClassName}
            key={platform}
            href={`${platformMetaData.base_url}${encodeURIComponent(currentUrl)}`}
            aria-label={platformMetaData.aria_label}
          >
            <Icon
              className="h-[var(--hsFidelidade--socialShareIcon__size)] w-[var(--hsFidelidade--socialShareIcon__size)]"
              purpose="DECORATIVE"
              fieldPath={iconFieldPath}
            />
          </SocialLink>
        );
      })}
    </SocialShareContainer>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Social share',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: socialIconSvg,
  categories: ['media'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/social_share',
  version: 0,
  themeModule: true,
};
