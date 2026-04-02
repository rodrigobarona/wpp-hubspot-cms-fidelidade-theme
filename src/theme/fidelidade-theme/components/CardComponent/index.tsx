import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../utils/cn.js';
import { CardStyleFieldLibraryType } from '../fieldLibrary/CardStyle/types.js';
import { getCardVariantClassName } from '../utils/card-variants.js';
import '../styles/tailwind.css';

// Types

type CardProps = CardStyleFieldLibraryType & {
  additionalClassArray?: string[];
  inlineStyles?: CSSProperties;
  cardOrientation: 'row' | 'column';
  children?: ReactNode;
};

// Default content if no children is passed

const DefaultContent = () => (
  <>
    <h3>Card heading</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum id nisl commodo blandit. Nam at sagittis erat, a lobortis nibh.</p>
  </>
);

// Component

export const Card = (props: CardProps) => {
  const { cardStyleVariant, additionalClassArray, inlineStyles, cardOrientation, children } = props;
  const cardClassName = getCardVariantClassName({ cardVariant: cardStyleVariant, fallbackCardVariant: 'card_variant_1' });
  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';
  const cardClasses = cn(
    '[display:var(--hsFidelidade--card--display,flex)] flex-1 flex-col items-center p-[var(--hsFidelidade--card--padding,var(--hsFidelidade--spacing--32,32px))]',
    cardOrientation === 'row' && 'min-[1000px]:flex-row',
    cardClassName,
    additionalClasses,
  );

  return (
    <article className={cardClasses} style={inlineStyles}>
      {children || <DefaultContent />}
    </article>
  );
};
