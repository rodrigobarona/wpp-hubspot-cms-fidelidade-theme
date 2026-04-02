import { ModuleMeta } from '../../types/modules.js';
import '../../styles/tailwind.css';
import { RichText } from '@hubspot/cms-components';
import { SectionVariantType } from '../../types/fields.js';
import richTextIconSvg from './assets/rich-text.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { cn } from '../../utils/cn.js';
import { getDataHSToken } from '../../utils/inline-editing.js';

const richTextBaseClass =
  '[&_h1]:text-[var(--hsFidelidade--richText__textColor)] [&_h2]:text-[var(--hsFidelidade--richText__textColor)] [&_h3]:text-[var(--hsFidelidade--richText__textColor)] [&_h4]:text-[var(--hsFidelidade--richText__textColor)] [&_h5]:text-[var(--hsFidelidade--richText__textColor)] [&_h6]:text-[var(--hsFidelidade--richText__textColor)] [&_p]:text-[var(--hsFidelidade--richText__textColor)] [&_li]:text-[var(--hsFidelidade--richText__textColor)] [&_span]:text-[var(--hsFidelidade--richText__textColor)] [&_div]:text-[var(--hsFidelidade--richText__textColor)] [&_a:not(.hs-fidelidade-button)]:text-[var(--hsFidelidade--richText__linkColor)] [&_a:not(.hs-fidelidade-button)]:[-webkit-text-decoration:var(--hsFidelidade--richText__textDecoration)] [&_a:not(.hs-fidelidade-button)]:[text-decoration:var(--hsFidelidade--richText__textDecoration)] [&_a:not(.hs-fidelidade-button)]:[-webkit-text-decoration-color:var(--hsFidelidade--richText__textDecorationColor)] [&_a:not(.hs-fidelidade-button)]:[text-decoration-color:var(--hsFidelidade--richText__textDecorationColor)] [&_a:not(.hs-fidelidade-button):hover]:text-[var(--hsFidelidade--richText__linkHoverColor)] [&_a:not(.hs-fidelidade-button):hover]:[-webkit-text-decoration:var(--hsFidelidade--richText__linkHoverTextDecoration)] [&_a:not(.hs-fidelidade-button):hover]:[text-decoration:var(--hsFidelidade--richText__linkHoverTextDecoration)] [&_a:not(.hs-fidelidade-button):hover]:[-webkit-text-decoration-color:var(--hsFidelidade--richText__linkHoverTextDecorationColor)] [&_a:not(.hs-fidelidade-button):hover]:[text-decoration-color:var(--hsFidelidade--richText__linkHoverTextDecorationColor)] [&_a:not(.hs-fidelidade-button):focus]:text-[var(--hsFidelidade--richText__linkHoverColor)] [&_a:not(.hs-fidelidade-button):focus]:[-webkit-text-decoration:var(--hsFidelidade--richText__linkHoverTextDecoration)] [&_a:not(.hs-fidelidade-button):focus]:[text-decoration:var(--hsFidelidade--richText__linkHoverTextDecoration)] [&_a:not(.hs-fidelidade-button):focus]:[-webkit-text-decoration-color:var(--hsFidelidade--richText__linkHoverTextDecorationColor)] [&_a:not(.hs-fidelidade-button):focus]:[text-decoration-color:var(--hsFidelidade--richText__linkHoverTextDecorationColor)]';

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

  return (
    <RichText
      fieldPath="richTextContentHTML"
      className={cn(richTextBaseClass, renderedWithGrids && '[&>*:last-child]:mb-0')}
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
