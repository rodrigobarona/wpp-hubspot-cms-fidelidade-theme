import { ModuleMeta } from '../../types/modules.js';
import { Icon, RichText } from '@hubspot/cms-components';
import { AlignmentFieldType, BooleanFieldType, IconFieldType, ImageFieldType } from '@hubspot/cms-components/fields';
import { ButtonStyleType, StandardSizeType } from '../../types/fields.js';
import cardIconSvg from './assets/card-icon-temp.svg';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { Card } from '../../CardComponent/index.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import { Button } from '../../ButtonComponent/index.js';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import '../../styles/tailwind.css';

// Types

type IconGroup = {
  groupIcon: {
    icon: IconFieldType['default'];
  };
};

type ImageGroup = {
  groupImage: {
    image: ImageFieldType['default'];
  };
};

type ContentGroup = {
  groupContent: RichTextContentFieldLibraryType & HeadingAndTextFieldLibraryType;
};

type ButtonGroup = {
  groupButton: ButtonContentType & {
    showButton: BooleanFieldType['default'];
  };
};

type GroupCards = IconGroup & ImageGroup & ContentGroup & ButtonGroup;

type GroupCardStyles = {
  groupCard: CardStyleFieldLibraryType & {
    cardOrientation: 'row' | 'column';
  };
};

type GroupContentStyles = {
  groupContent: HeadingStyleFieldLibraryType & {
    alignment: AlignmentFieldType['default'];
  };
};

type GroupButtonStyles = {
  groupButton: {
    buttonStyleSize: StandardSizeType;
    buttonStyleVariant: ButtonStyleType;
  };
};

type GroupStyle = GroupCardStyles & GroupContentStyles & GroupButtonStyles;

type CardProps = {
  moduleName?: string;
  imageOrIcon: 'icon' | 'image';
  groupCards: GroupCards[];
  groupStyle: GroupStyle;
  hublData: {
    renderedWithGrids: boolean;
  };
};

// Functions to generate CSS variables

function generateAlignmentCssVars(alignment: AlignmentFieldType['default']): CSSPropertiesMap {
  const textAlignment = alignment.horizontal_align?.toLowerCase() as 'left' | 'right' | 'center';
  return {
    '--hsFidelidade--card__alignment': getAlignmentFieldCss(alignment).justifyContent,
    '--hsFidelidade--card__textAlignment': textAlignment,
  };
}

function generateColorCssVars(cardVariantField: string): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: {
      borderRadius: 'var(--hsFidelidade--card--variant1__iconBorderRadius)',
      fillColor: 'var(--hsFidelidade--card--variant1__iconColor)',
      backgroundColor: 'var(--hsFidelidade--card--variant1__iconBackgroundColor)',
    },
    card_variant_2: {
      borderRadius: 'var(--hsFidelidade--card--variant2__iconBorderRadius)',
      fillColor: 'var(--hsFidelidade--card--variant2__iconColor)',
      backgroundColor: 'var(--hsFidelidade--card--variant2__iconBackgroundColor)',
    },
    card_variant_3: {
      borderRadius: 'var(--hsFidelidade--card--variant3__iconBorderRadius)',
      fillColor: 'var(--hsFidelidade--card--variant3__iconColor)',
      backgroundColor: 'var(--hsFidelidade--card--variant3__iconBackgroundColor)',
    },
    card_variant_4: {
      borderRadius: 'var(--hsFidelidade--card--variant4__iconBorderRadius)',
      fillColor: 'var(--hsFidelidade--card--variant4__iconColor)',
      backgroundColor: 'var(--hsFidelidade--card--variant4__iconBackgroundColor)',
    },
  };

  return {
    '--hsFidelidade--cardIcon__borderRadius': iconColorsMap[cardVariantField].borderRadius,
    '--hsFidelidade--cardIcon__fillColor': iconColorsMap[cardVariantField].fillColor,
    '--hsFidelidade--cardIcon__backgroundColor': iconColorsMap[cardVariantField].backgroundColor,
  };
}

// Checks if image path has '-use-background-' in its name to get the card icon's background color applied

function imageShouldUseBackground(imagePath: string): boolean {
  if (!imagePath) {
    return false;
  }
  return /-use-background-/.test(imagePath);
}

// Components

const CardContainer = createComponent('div');
const IconWrapper = createComponent('div');
const ImageWrapper = createComponent('div');
const Image = createComponent('img');
const CardContent = createComponent('div');
const ButtonWrapper = createComponent('div');

export const Component = (props: CardProps) => {
  const {
    moduleName,
    imageOrIcon,
    groupCards,
    groupStyle: {
      groupCard: { cardStyleVariant, cardOrientation },
      groupContent: { alignment, headingStyleVariant },
      groupButton: { buttonStyleVariant, buttonStyleSize },
    },
    hublData: { renderedWithGrids = false },
  } = props;

  const isIcon = imageOrIcon === 'icon';
  const isImage = imageOrIcon === 'image';
  const textAlignment = alignment.horizontal_align?.toLowerCase() as 'left' | 'right' | 'center';

  const headingInlineStyles = { textAlign: textAlignment };

  const cssVarsMap = {
    ...generateColorCssVars(cardStyleVariant),
    ...generateAlignmentCssVars(alignment),
  };

  const isRowLayout = cardOrientation === 'row';

  return (
    <CardContainer
      className={cn(
        'grid justify-center gap-hs-24 [grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))]',
        !renderedWithGrids && '@container @[600px]:[grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]',
        renderedWithGrids && 'min-[600px]:[grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]',
      )}
      style={cssVarsMap}
    >
      {groupCards.map((card, index) => {
        const {
          groupButton: {
            showButton,
            buttonContentText: text,
            buttonContentLink: link = {},
            buttonContentShowIcon: showIcon,
            buttonContentIconPosition: iconPosition,
          },
        } = card;
        const hasValidImageSrc = card?.groupImage?.image?.src;
        const isCardImageWithBackground = hasValidImageSrc && imageShouldUseBackground(card.groupImage.image.src);
        const cardImageUsesBackground = isImage && isCardImageWithBackground;
        const isImageVisible = isImage && hasValidImageSrc;
        const hasValidIconName = card?.groupIcon?.icon?.name;
        const isIconVisible = isIcon && hasValidIconName;

        const cardClasses = cn(
          'hs-fidelidade-card-container__card',
          isRowLayout && 'hs-fidelidade-card-container__card--row',
          !showButton && 'hs-fidelidade-card-container__card--no-button',
        );

        const imageWrapperClasses = cn(
          'mb-hs-24 flex h-auto max-w-full overflow-hidden self-[var(--hsFidelidade--card__alignment)] justify-[var(--hsFidelidade--card__alignment)]',
          '[&_img]:h-auto [&_img]:max-w-[min(250px,100%)] [&_img]:min-w-20 [&_img]:object-contain [&_img]:object-center',
          isRowLayout &&
            'min-[1000px]:mb-0 min-[1000px]:max-w-[40%] min-[1000px]:flex-[0_0_auto] min-[1000px]:justify-center min-[1000px]:self-center min-[1000px]:me-hs-24',
          cardImageUsesBackground && 'rounded-hs-lg bg-[var(--hsFidelidade--cardIcon__backgroundColor)]',
        );

        const iconWrapperClasses = cn(
          'mb-hs-24 flex h-[72px] w-[72px] items-center self-[var(--hsFidelidade--card__alignment)] justify-[var(--hsFidelidade--card__alignment)]',
          isRowLayout &&
            'min-[1000px]:mb-0 min-[1000px]:justify-center min-[1000px]:self-center min-[1000px]:me-hs-24',
        );

        const iconClasses = cn(
          'h-[72px] w-[72px] p-hs-16',
          'rounded-[var(--hsFidelidade--cardIcon__borderRadius)] bg-[var(--hsFidelidade--cardIcon__backgroundColor)] fill-[var(--hsFidelidade--cardIcon__fillColor)]',
        );

        const contentClasses = cn(
          'flex flex-col self-[var(--hsFidelidade--card__alignment)] last:mb-0',
          isRowLayout && 'min-[1000px]:flex-1 min-[1000px]:self-center',
        );

        const bodyClasses = cn('text-[var(--hsFidelidade--card__textAlignment)]', !showButton && '[&_*:last-child]:mb-0');

        return (
          <Card additionalClassArray={[cardClasses]} key={index} cardStyleVariant={cardStyleVariant} cardOrientation={cardOrientation}>
            {isIconVisible && (
              <IconWrapper className={iconWrapperClasses}>
                <Icon className={iconClasses} purpose="DECORATIVE" fieldPath={`groupCards[${index}].groupIcon.icon`} />
              </IconWrapper>
            )}
            {isImageVisible && (
              <ImageWrapper className={imageWrapperClasses}>
                <Image
                  src={card.groupImage.image.src}
                  alt={card.groupImage.image.alt}
                  width={card.groupImage.image.width}
                  height={card.groupImage.image.height}
                  loading={card.groupImage.image.loading !== 'disabled' ? card.groupImage.image.loading : 'eager'}
                  data-hs-token={getDataHSToken(moduleName, `groupCards[${index}].groupImage.image`)}
                />
              </ImageWrapper>
            )}
            <CardContent className={contentClasses}>
              {card.groupContent.headingAndTextHeading && (
                <HeadingComponent
                  headingLevel={card.groupContent.headingAndTextHeadingLevel}
                  heading={card.groupContent.headingAndTextHeading}
                  headingStyleVariant={headingStyleVariant}
                  inlineStyles={headingInlineStyles}
                  additionalClassArray={['hs-fidelidade-card-container__title']}
                  moduleName={moduleName}
                  fieldPath={`groupCards[${index}].groupContent.headingAndTextHeading`}
                />
              )}
              <RichText
                fieldPath={`groupCards[${index}].groupContent.richTextContentHTML`}
                className={bodyClasses}
                data-hs-token={getDataHSToken(moduleName, `groupCards[${index}].groupContent.richTextContentHTML`)}
              />
              {showButton && (
                <ButtonWrapper className="self-[var(--hsFidelidade--card__alignment)]">
                  <Button
                    buttonSize={buttonStyleSize}
                    buttonStyle={buttonStyleVariant}
                    href={getLinkFieldHref(link)}
                    rel={getLinkFieldRel(link)}
                    target={getLinkFieldTarget(link)}
                    iconFieldPath={`groupCards[${index}].groupButton.buttonContentIcon`}
                    showIcon={showIcon}
                    iconPosition={iconPosition}
                    additionalClassArray={['hs-fidelidade-card-container__button']}
                    moduleName={moduleName}
                    textFieldPath={`groupCards[${index}].groupButton.buttonContentText`}
                  >
                    {text}
                  </Button>
                </ButtonWrapper>
              )}
            </CardContent>
          </Card>
        );
      })}
    </CardContainer>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "renderedWithGrids": rendered_with_grids,
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Card',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: cardIconSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/card',
  version: 0,
  themeModule: true,
};
