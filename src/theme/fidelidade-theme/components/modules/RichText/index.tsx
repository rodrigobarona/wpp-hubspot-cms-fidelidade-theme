import { ModuleMeta } from '../../types/modules.js';
import styles from './rich-text.module.css';
import { RichText } from '@hubspot/cms-components';
import { SectionVariantType } from '../../types/fields.js';
import richTextIconSvg from './assets/rich-text.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { CSSPropertiesMap } from '../../types/components.js';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { getDataHSToken } from '../../utils/inline-editing.js';

const swm = staticWithModule(styles);

type RichTextProps = {
  moduleName?: string;
  groupStyle: SectionStyleFieldLibraryType;
  hublData: {
    renderedWithGrids: boolean;
  };
};

// Function to generate CSS variables for colors

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsFidelidade--richText__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsFidelidade--richText__accentColor': sectionColorsMap[sectionVariantField].accentColor,
    '--hsFidelidade--richText__linkColor': sectionColorsMap[sectionVariantField].linkColor,
    '--hsFidelidade--richText__textDecoration': sectionColorsMap[sectionVariantField].textDecoration,
    '--hsFidelidade--richText__textDecorationColor': sectionColorsMap[sectionVariantField].textDecorationColor,
    '--hsFidelidade--richText__linkHoverColor': sectionColorsMap[sectionVariantField].linkHoverColor,
    '--hsFidelidade--richText__linkHoverTextDecoration': sectionColorsMap[sectionVariantField].linkHoverTextDecoration,
    '--hsFidelidade--richText__linkHoverTextDecorationColor': sectionColorsMap[sectionVariantField].linkHoverTextDecorationColor,
    '--hsFidelidade--blockquote__textColor': sectionColorsMap[sectionVariantField].blockquoteTextColor,
    '--hsFidelidade--blockquote__backgroundColor': sectionColorsMap[sectionVariantField].blockquoteBackgroundColor,
    '--hsFidelidade--blockquote__accentColor': sectionColorsMap[sectionVariantField].blockquoteAccentColor,
  };
}

export const Component = (props: RichTextProps) => {
  const {
    moduleName,
    groupStyle: { sectionStyleVariant },
    hublData: { renderedWithGrids = false },
  } = props;

  const cssVarsMap = { ...generateColorCssVars(sectionStyleVariant) };

  const layoutClass = renderedWithGrids ? 'hs-fidelidade-rich-text--grids' : 'hs-fidelidade-rich-text--bootstrap';

  return (
    <RichText
      fieldPath="richTextContentHTML"
      className={cx(swm('hs-fidelidade-rich-text'), styles[layoutClass])}
      style={cssVarsMap}
      data-hs-token={getDataHSToken(moduleName, 'richTextContentHTML')}
    />
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
  label: 'Rich text',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: richTextIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/rich_text',
  version: 0,
  themeModule: true,
};
