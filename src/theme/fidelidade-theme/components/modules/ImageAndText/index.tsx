import { ModuleMeta } from '../../types/modules.js';
import '../../styles/tailwind.css';
import { RichText } from '@hubspot/cms-components';
import HeadingComponent from '../../HeadingComponent/index.js';
import { Button } from '../../ButtonComponent/index.js';
import { AlignmentFieldType } from '@hubspot/cms-components/fields';
import { ElementPositionType, SectionVariantType } from '../../types/fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import imageAndTextIconSvg from './assets/image.svg';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { ImageAndTextProps } from './types.js';
import { getDataHSToken } from '../../utils/inline-editing.js';

// Image and text component

// Functions to pull in corresponding CSS variables on component based on field values

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsFidelidade--imageAndText__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsFidelidade--imageAndText__accentColor': sectionColorsMap[sectionVariantField].accentColor,
    '--hsFidelidade--blockquote__textColor': sectionColorsMap[sectionVariantField].blockquoteTextColor,
    '--hsFidelidade--blockquote__backgroundColor': sectionColorsMap[sectionVariantField].blockquoteBackgroundColor,
    '--hsFidelidade--blockquote__accentColor': sectionColorsMap[sectionVariantField].blockquoteAccentColor,
  };
}

function generateImagePositionCssVars(imagePositionField: ElementPositionType): CSSPropertiesMap {
  const imagePositionMap = {
    left: '0',
    right: '1',
  };

  return { '--hsFidelidade--imageAndText__order': imagePositionMap[imagePositionField] };
}

function generateAlignmentCssVars(alignmentField: AlignmentFieldType['default']): CSSPropertiesMap {
  const alignmentCss = getAlignmentFieldCss(alignmentField);

  return { '--hsFidelidade--imageAndText__alignItems': alignmentCss.alignItems || 'center' };
}

const imageAndTextContentTypographyClass =
  '[&_h1]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_h2]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_h3]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_h4]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_h5]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_h6]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_p]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_li]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_span]:text-[var(--hsFidelidade--imageAndText__textColor)] [&_div]:text-[var(--hsFidelidade--imageAndText__textColor)]';

// Components

const ImageAndText = createComponent('div');
const ImageContainer = createComponent('div');
const Image = createComponent('img');
const ContentContainer = createComponent('div');

export const Component = (props: ImageAndTextProps) => {
  const {
    moduleName,
    groupImage: { imagePosition, image },
    groupContent: { headingAndTextHeadingLevel, headingAndTextHeading, richTextContentHTML },
    groupButton: { showButton, buttonContentText: text, buttonContentLink: link, buttonContentShowIcon: showIcon, buttonContentIconPosition: iconPosition },
    groupStyle: {
      groupContent: { sectionStyleVariant, headingStyleVariant, verticalAlignment },
      groupButton: { buttonStyleSize, buttonStyleVariant },
    },
  } = props;

  const buttonHref = getLinkFieldHref(link);
  const buttonRel = getLinkFieldRel(link);
  const buttonTarget = getLinkFieldTarget(link);
  const hasContent = headingAndTextHeading || richTextContentHTML || showButton;

  const cssVarsMap = {
    ...generateImagePositionCssVars(imagePosition),
    ...generateColorCssVars(sectionStyleVariant),
    ...generateAlignmentCssVars(verticalAlignment),
  };

  return (
    <ImageAndText
      className="flex flex-col items-stretch justify-between gap-x-hs-80 md:flex-row md:items-[var(--hsFidelidade--imageAndText__alignItems,center)]"
      style={cssVarsMap}
    >
      {image.src && (
        <ImageContainer className="mb-hs-32 md:order-[var(--hsFidelidade--imageAndText__order,0)] md:mb-0 md:w-[55%]">
          <Image
            className="h-auto w-full"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={image.loading !== 'disabled' ? image.loading : 'eager'}
            data-hs-token={getDataHSToken(moduleName, 'groupImage.image')}
          />
        </ImageContainer>
      )}
      {hasContent && (
        <ContentContainer className={cn(imageAndTextContentTypographyClass, 'md:w-[45%]')}>
          {headingAndTextHeading && (
            <HeadingComponent
              additionalClassArray={['hs-fidelidade-image-and-text__title']}
              headingLevel={headingAndTextHeadingLevel}
              headingStyleVariant={headingStyleVariant}
              heading={headingAndTextHeading}
              moduleName={moduleName}
              fieldPath="groupContent.headingAndTextHeading"
            />
          )}
          {richTextContentHTML && (
            <RichText
              fieldPath="groupContent.richTextContentHTML"
              className="hs-fidelidade-image-and-text__body"
              data-hs-token={getDataHSToken(moduleName, 'groupContent.richTextContentHTML')}
            />
          )}
          {showButton && (
            <Button
              additionalClassArray={['hs-fidelidade-image-and-text__button']}
              buttonSize={buttonStyleSize}
              buttonStyle={buttonStyleVariant}
              href={buttonHref}
              rel={buttonRel}
              target={buttonTarget}
              showIcon={showIcon}
              iconFieldPath="groupButton.buttonContentIcon"
              iconPosition={iconPosition}
              moduleName={moduleName}
              textFieldPath="groupButton.buttonContentText"
            >
              {text}
            </Button>
          )}
        </ContentContainer>
      )}
    </ImageAndText>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Image and text',
  content_types: ['SITE_PAGE', 'LANDING_PAGE'],
  icon: imageAndTextIconSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/image_and_text',
  version: 0,
  themeModule: true,
};
