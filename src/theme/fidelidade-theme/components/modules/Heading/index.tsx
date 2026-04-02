import { ModuleMeta } from '../../types/modules.js';
import { TextAlignmentFieldType } from '@hubspot/cms-components/fields';
import headingIconSvg from './assets/heading.svg';
import HeadingComponent from '../../HeadingComponent/index.js';
import { SectionVariantType } from '../../types/fields.js';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import '../../styles/tailwind.css';

// Types

type GroupStyle = SectionStyleFieldLibraryType &
  HeadingStyleFieldLibraryType & {
    alignment?: TextAlignmentFieldType['default'];
  };
type HeadingProps = HeadingAndTextFieldLibraryType & {
  moduleName?: string;
  groupStyle: GroupStyle;
  hublData: {
    renderedWithGrids: boolean;
  };
};

// Heading

// Functions to pull in corresponding CSS variables on component based on field values

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  const textColor = sectionColorsMap[sectionVariantField]?.textColor || sectionColorsMap['section_variant_1'].textColor;

  return { '--hsFidelidade--heading__textColor': textColor };
}

// Components

const headingTextColor =
  '[&_h1]:text-[var(--hsFidelidade--heading__textColor)] [&_h2]:text-[var(--hsFidelidade--heading__textColor)] [&_h3]:text-[var(--hsFidelidade--heading__textColor)] [&_h4]:text-[var(--hsFidelidade--heading__textColor)] [&_h5]:text-[var(--hsFidelidade--heading__textColor)] [&_h6]:text-[var(--hsFidelidade--heading__textColor)]';

const HeadingContainer = createComponent('div');

export const Component = (props: HeadingProps) => {
  const {
    moduleName,
    headingAndTextHeadingLevel,
    headingAndTextHeading,
    groupStyle: { alignment, headingStyleVariant, sectionStyleVariant },
    hublData: { renderedWithGrids = false },
  } = props;

  const cssVarsMap = { ...generateColorCssVars(sectionStyleVariant) };

  return (
    <HeadingContainer
      className={cn(
        headingTextColor,
        renderedWithGrids &&
          '[&_h1]:mb-0 [&_h2]:mb-0 [&_h3]:mb-0 [&_h4]:mb-0 [&_h5]:mb-0 [&_h6]:mb-0',
      )}
      style={cssVarsMap}
    >
      <HeadingComponent
        additionalClassArray={['hs-fidelidade-heading-container__heading']}
        headingLevel={headingAndTextHeadingLevel}
        heading={headingAndTextHeading}
        alignment={alignment}
        headingStyleVariant={headingStyleVariant}
        moduleName={moduleName}
        fieldPath="headingAndTextHeading"
      />
    </HeadingContainer>
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
  label: 'Heading',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: headingIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/heading',
  version: 0,
  themeModule: true,
};
