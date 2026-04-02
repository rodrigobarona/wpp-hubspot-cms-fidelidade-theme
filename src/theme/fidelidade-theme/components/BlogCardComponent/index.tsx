import type { CSSProperties } from 'react';
import { Card } from '../CardComponent/index.js';
import { cn } from '../utils/cn.js';
import { createComponent } from '../utils/create-component.js';
import { TagComponent } from '../TagComponent/index.js';
import HeadingComponent from '../HeadingComponent/index.js';
import SanitizedContent from '../SanitizeHTML/index.js';
import { CardVariantType, HeadingLevelType } from '../types/fields.js';
import { HeadingStyleVariant } from '../fieldLibrary/HeadingStyle/types.js';
import { CSSPropertiesMap } from '../types/components.js';
import gatedLockIconUrl from '../modules/BlogListing/assets/gated-lock-icon.svg';
import '../styles/tailwind.css';

interface BlogCardComponentProps {
  post: {
    id: string;
    absoluteUrl: string;
    featuredImage?: string;
    featuredImageAltText?: string;
    featuredImageWidth?: number;
    featuredImageHeight?: number;
    title: string;
    topicNames?: string[];
  };
  headingAndTextHeadingLevel: HeadingLevelType;
  headingStyleVariant: HeadingStyleVariant;
  cardStyleVariant: CardVariantType;
  gatedContentIds?: string[];
  additionalClassArray?: string[];
}

interface TagListProps {
  tags: string[];
}

const CardTagContainer = createComponent('div');

const TagList = ({ tags }: TagListProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <CardTagContainer className="mb-hs-24 flex flex-row flex-wrap items-center justify-start gap-hs-8">
      {tags.map((tag: string, index: number) => (
        <TagComponent key={index}>
          <SanitizedContent content={tag} />
        </TagComponent>
      ))}
    </CardTagContainer>
  );
};

function generateColorCssVars(cardStyleVariant: string): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: {
      textColor: 'var(--hsFidelidade--card--variant1__textColor)',
      iconBackgroundColor: 'var(--hsFidelidade--card--variant1__iconBackgroundColor)',
    },
    card_variant_2: {
      textColor: 'var(--hsFidelidade--card--variant2__textColor)',
      iconBackgroundColor: 'var(--hsFidelidade--card--variant2__iconBackgroundColor)',
    },
    card_variant_3: {
      textColor: 'var(--hsFidelidade--card--variant3__textColor)',
      iconBackgroundColor: 'var(--hsFidelidade--card--variant3__iconBackgroundColor)',
    },
    card_variant_4: {
      textColor: 'var(--hsFidelidade--card--variant4__textColor)',
      iconBackgroundColor: 'var(--hsFidelidade--card--variant4__iconBackgroundColor)',
    },
  };

  return {
    '--hsFidelidade--blogCard__textColor': iconColorsMap[cardStyleVariant].textColor,
    '--hsFidelidade--blogCardIcon__backgroundColor': iconColorsMap[cardStyleVariant].iconBackgroundColor,
  };
}

const gateIconMaskStyle: CSSProperties = {
  WebkitMaskImage: `url(${gatedLockIconUrl})`,
  maskImage: `url(${gatedLockIconUrl})`,
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
};

const CardWrapper = createComponent('div');
const ImageContainer = createComponent('div');
const Image = createComponent('img');
const CardContentContainer = createComponent('div');
const CardHeadingContainer = createComponent('div');
const CardLink = createComponent('a');
const GateIconImage = createComponent('div');

function BlogCardComponent(props: BlogCardComponentProps) {
  const { post, headingAndTextHeadingLevel, headingStyleVariant, cardStyleVariant = 'card_variant_2', gatedContentIds = [], additionalClassArray } = props;

  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  const cssVarsMap = { ...generateColorCssVars(cardStyleVariant) };

  return (
    <CardWrapper
      style={cssVarsMap}
      className={cn(
        'flex h-full w-full flex-col [&_.hs-fidelidade-card--blog]:overflow-hidden [&_.hs-fidelidade-card--blog]:p-0',
        additionalClasses,
      )}
    >
      <Card key={post.id} cardOrientation="column" cardStyleVariant={cardStyleVariant} additionalClassArray={['hs-fidelidade-card--blog']}>
        <CardLink className="block h-full w-full no-underline hover:no-underline" href={post.absoluteUrl}>
          <ImageContainer className="relative aspect-[1.41] w-full max-w-full overflow-hidden bg-[var(--hsFidelidade--blogCardIcon__backgroundColor)]">
            {post.featuredImage && (
              <Image
                className="relative h-full w-full object-cover"
                src={post.featuredImage}
                alt={post.featuredImageAltText || ''}
                width={post.featuredImageWidth}
                height={post.featuredImageHeight}
              />
            )}
          </ImageContainer>
          <CardContentContainer className="p-hs-32">
            <TagList tags={post?.topicNames || []} />
            <CardHeadingContainer>
              <HeadingComponent
                heading={post.title}
                headingLevel={headingAndTextHeadingLevel}
                headingStyleVariant={headingStyleVariant}
                additionalClassArray={['hs-fidelidade-card--blog__heading inline mb-0 text-[var(--hsFidelidade--blogCard__textColor)] no-underline']}
              />
              {gatedContentIds.includes(post.id) && (
                <GateIconImage
                  className="ms-hs-8 inline-block h-5 w-5 bg-[var(--hsFidelidade--blogCard__textColor)]"
                  style={gateIconMaskStyle}
                  aria-label="Gated content"
                  role="presentation"
                />
              )}
            </CardHeadingContainer>
          </CardContentContainer>
        </CardLink>
      </Card>
    </CardWrapper>
  );
}

export default BlogCardComponent;
