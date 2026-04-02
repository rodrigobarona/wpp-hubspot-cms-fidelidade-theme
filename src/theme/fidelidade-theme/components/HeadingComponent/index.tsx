import { CSSProperties } from 'react';
import { TextFieldType, TextAlignmentFieldType } from '@hubspot/cms-components/fields';
import { HeadingLevelType } from '../types/fields.js';
import { HeadingStyleFieldLibraryType } from '../fieldLibrary/HeadingStyle/types.js';
import SanitizedContent from '../SanitizeHTML/index.js';
import { getDataHSToken } from '../utils/inline-editing.js';

// Types

type HeadingInlineStyleProps = {
  inlineStyles?: CSSProperties;
  alignment?: TextAlignmentFieldType['default'];
};

type HeadingProps = HeadingInlineStyleProps &
  HeadingStyleFieldLibraryType & {
    additionalClassArray?: string[];
    heading: TextFieldType['default'];
    headingLevel: HeadingLevelType;
    moduleName?: string;
    fieldPath?: string;
  };

// Maps the heading class based on the headingStyle option

const headingClasses = {
  display_1: 'hs-fidelidade-display-1',
  display_2: 'hs-fidelidade-display-2',
  h1: 'hs-fidelidade-h1',
  h2: 'hs-fidelidade-h2',
  h3: 'hs-fidelidade-h3',
  h4: 'hs-fidelidade-h4',
  h5: 'hs-fidelidade-h5',
  h6: 'hs-fidelidade-h6',
};

// Sets inline styles used for the heading

function makeHeadingStyles(styleParams: HeadingInlineStyleProps) {
  const { inlineStyles, alignment } = styleParams;

  const stylesToReturn = { ...inlineStyles };

  if (alignment) {
    stylesToReturn.textAlign = alignment.text_align.toLowerCase() as 'left' | 'right' | 'center' | 'justify';
  }

  return stylesToReturn;
}

// Component

function HeadingComponent(props: HeadingProps) {
  const { additionalClassArray, inlineStyles, headingLevel: HeadingLevel, heading, alignment, headingStyleVariant, moduleName, fieldPath } = props;

  const headingClass = headingStyleVariant ? headingClasses[headingStyleVariant] : '';
  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  return (
    <HeadingLevel
      className={`${headingClass} ${additionalClasses}`}
      style={makeHeadingStyles({ inlineStyles, alignment })}
      data-hs-token={getDataHSToken(moduleName, fieldPath)}
    >
      <SanitizedContent content={heading} />
    </HeadingLevel>
  );
}

export default HeadingComponent;
