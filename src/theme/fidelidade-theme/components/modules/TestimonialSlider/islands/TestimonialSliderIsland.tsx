import { Splide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '../../../styles/tailwind.css';
import { cn } from '../../../utils/cn.js';
import { createComponent } from '../../../utils/create-component.js';
import { TestimonialLinkProps, TestimonialMetaProps, TestimonialProps, TestimonialSliderProps } from '../types.js';
import { CardVariantType } from '../../../types/fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../../utils/content-fields.js';
import { useEffect, useId, useState } from 'react';
import { getCardVariantClassName } from '../../../utils/card-variants.js';
import { CSSPropertiesMap } from '../../../types/components.js';

// Checks if an image path corresponds to one of the default images used on the testimonial slider module in one of our sections/templates

function isDefaultTestimonialImage(imagePath: string): boolean {
  if (!imagePath) {
    return false;
  }
  return /testimonial-user-image-[1-5]/.test(imagePath);
}

// Navigation

type NavigationArrowProps = {
  altText?: string;
};

const NavigationArrowImage = createComponent('svg');

const NavigationArrow = (props: NavigationArrowProps) => {
  const { altText } = props;

  const uniqueInstanceId = useId();
  const ariaLabelledBy = altText ? uniqueInstanceId : undefined;

  return (
    <NavigationArrowImage
      aria-labelledby={ariaLabelledBy}
      aria-label={altText}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="39"
      viewBox="0 0 24 39"
      fill="none"
      className="hs-fidelidade-testimonial-slider__navigation-icon !h-[38px] !w-6 !fill-[var(--hsFidelidade--cardIcon__fillColor,#000)]"
    >
      {altText && (
        <title className="hs-fidelidade-testimonial-slider__navigation-icon-title" id={uniqueInstanceId}>
          {altText}
        </title>
      )}
      <path d="M23.2946 17.505C24.2321 18.4425 24.2321 19.965 23.2946 20.9025L8.89457 35.3025C7.95707 36.24 6.43457 36.24 5.49707 35.3025C4.55957 34.365 4.55957 32.8425 5.49707 31.905L18.2021 19.2L5.50457 6.49503C4.56707 5.55753 4.56707 4.03503 5.50457 3.09753C6.44207 2.16003 7.96457 2.16003 8.90207 3.09753L23.3021 17.4975L23.2946 17.505Z" />
    </NavigationArrowImage>
  );
};

type NavigationProps = {
  previousAltText: string;
  nextAltText: string;
};

const NavigationButton = createComponent('button');

const Navigation = ({ previousAltText, nextAltText }: NavigationProps) => {
  return (
    <div className="splide__arrows hs-fidelidade-testimonial-slider__navigation">
      <NavigationButton
        className={cn(
          'splide__arrow splide__arrow--prev hs-fidelidade-testimonial-slider__prev',
          '!bg-transparent [fill:var(--hsFidelidade--cardIcon__fillColor)]',
        )}
      >
        <NavigationArrow altText={previousAltText} />
      </NavigationButton>
      <NavigationButton
        className={cn(
          'splide__arrow splide__arrow--next hs-fidelidade-testimonial-slider__next',
          '!bg-transparent [fill:var(--hsFidelidade--cardIcon__fillColor)]',
        )}
      >
        <NavigationArrow altText={nextAltText} />
      </NavigationButton>
    </div>
  );
};

// Testimonial link

const LinkArrowImage = createComponent('svg');

const LinkArrow = () => {
  return (
    <LinkArrowImage
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hs-fidelidade-testimonial-slider__link-icon [fill:var(--hsFidelidade--links__fontColor)]"
    >
      <path d="M7.70625 6.79414C8.09688 7.18477 8.09688 7.81914 7.70625 8.20977L1.70625 14.2098C1.31563 14.6004 0.681251 14.6004 0.290626 14.2098C-0.0999985 13.8191 -0.0999985 13.1848 0.290626 12.7941L5.58438 7.50039L0.293751 2.20664C-0.0968735 1.81602 -0.0968735 1.18164 0.293751 0.791016C0.684376 0.400391 1.31875 0.400391 1.70938 0.791016L7.70938 6.79102L7.70625 6.79414Z" />
    </LinkArrowImage>
  );
};

const Link = createComponent('a');

const TestimonialLink = (props: TestimonialLinkProps) => {
  const { linkText, link } = props;

  const linkHref = getLinkFieldHref(link);
  const linkRel = getLinkFieldRel(link);
  const linkTarget = getLinkFieldTarget(link);
  return (
    <>
      {linkText && (
        <Link
          className="hs-fidelidade-testimonial-slider__link flex items-center gap-2 font-hs-body-sm [justify-content:var(--hsFidelidade--testimonial__alignment)]"
          href={linkHref}
          rel={linkRel}
          target={linkTarget}
        >
          {linkText} <LinkArrow />
        </Link>
      )}
    </>
  );
};

// Testimonial meta (author and link)

const Footer = createComponent('footer');
const AuthorContainer = createComponent('div');
const AuthorImageContainer = createComponent('div');
const AuthorImage = createComponent('img');
const AuthorName = createComponent('span');
const AuthorTitle = createComponent('span');

const TestimonialMeta = (props: TestimonialMetaProps) => {
  const { moduleName, testimonialIndex, authorName, authorTitle, authorImage, linkText, link } = props;

  const hasAuthorElement = authorName || authorTitle || authorImage.src;

  const isDefaultAuthorImage = authorImage.src && isDefaultTestimonialImage(authorImage.src);

  const authorImageClasses = cn(
    'hs-fidelidade-testimonial-slider__author-image h-full w-full object-cover object-center',
    isDefaultAuthorImage && 'hs-fidelidade-testimonial-slider__author-image--use-background bg-[var(--hsFidelidade--color--accent--3)]',
  );

  return (
    <>
      {(hasAuthorElement || linkText) && (
        <Footer className="hs-fidelidade-testimonial-slider__footer my-[var(--hsFidelidade--text--large__margin,0_32px)]">
          {hasAuthorElement && (
            <AuthorContainer className="hs-fidelidade-testimonial-slider__author-container mb-hs-24 flex flex-row items-center gap-[var(--hsFidelidade--gap--large,20px)] [justify-content:var(--hsFidelidade--testimonial__alignment)]">
              {authorImage.src && (
                <AuthorImageContainer className="hs-fidelidade-testimonial-slider__author-image-container flex aspect-square h-20 flex-[0_0_80px] overflow-hidden rounded-full">
                  <AuthorImage
                    data-splide-lazy={authorImage.src}
                    alt={authorImage.alt}
                    width={authorImage.width}
                    height={authorImage.height}
                    className={authorImageClasses}
                  />
                </AuthorImageContainer>
              )}
              {(authorName || authorTitle) && (
                <div>
                  {authorName && (
                    <AuthorName className="hs-fidelidade-testimonial-slider__author-name my-[var(--hsFidelidade--text--extraSmall__margin,0_12px)] block font-hs-body-lg leading-none">
                      {authorName}
                    </AuthorName>
                  )}
                  {authorTitle && <AuthorTitle className="hs-fidelidade-testimonial-slider__author-title block font-hs-body-sm">{authorTitle}</AuthorTitle>}
                </div>
              )}
            </AuthorContainer>
          )}
          <TestimonialLink moduleName={moduleName} testimonialIndex={testimonialIndex} linkText={linkText} link={link} />
        </Footer>
      )}
    </>
  );
};

// Testimonial slide content

const SlideContainer = createComponent('blockquote');
const ImageContainer = createComponent('div');
const TestimonialImage = createComponent('img');
const ContentContainer = createComponent('div');
const QuoteText = createComponent('span');

function generateAlignmentCSSVars(contentCentered: boolean): CSSPropertiesMap {
  return {
    '--hsFidelidade--testimonial__alignment': contentCentered ? 'center' : 'flex-start',
    '--hsFidelidade--testimonial__textAlign': contentCentered ? 'center' : 'left',
  };
}

const Testimonial = (props: TestimonialProps) => {
  const { moduleName, testimonialIndex, quote, authorName, authorTitle, authorImage, showImage, image, linkText, link } = props;

  // If there is an image the content in the slider is left aligned, otherwise it is center aligned
  const contentCentered = !(showImage && image.src);

  const cssVarsMap = { ...generateAlignmentCSSVars(contentCentered) };

  const isDefaultImage = image.src && isDefaultTestimonialImage(image.src);

  const testimonialImageClasses = cn(
    'hs-fidelidade-testimonial-slider__image h-full w-full object-cover object-center',
    isDefaultImage && 'hs-fidelidade-testimonial-slider__image--use-background bg-[var(--hsFidelidade--color--accent--3)]',
  );

  return (
    <SlideContainer
      style={cssVarsMap}
      className="hs-fidelidade-testimonial-slider__slide mb-hs-32 flex flex-col items-start gap-[var(--hsFidelidade--text--large__margin,0_40px)] border-l-0 py-hs-24 pl-hs-12 pr-hs-12 [overflow-wrap:anywhere] min-[1000px]:mx-hs-40 min-[1000px]:mb-hs-32 min-[1000px]:flex-row min-[1000px]:gap-hs-72 min-[1000px]:px-hs-24 min-[1000px]:py-hs-24"
    >
      {showImage && image.src && (
        <ImageContainer className="hs-fidelidade-testimonial-slider__image-container mb-[var(--hsFidelidade--text--large__margin,0_32px)] flex h-[300px] max-w-full flex-[1_0_100%] self-center overflow-hidden rounded-[32px] min-[1000px]:mb-0 min-[1000px]:flex-[1_0_30%] min-[1000px]:self-auto [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-center">
          <TestimonialImage className={testimonialImageClasses} data-splide-lazy={image.src} alt={image.alt} width={image.width} height={image.height} />
        </ImageContainer>
      )}
      <ContentContainer className="hs-fidelidade-testimonial-slider__content-container flex flex-col">
        <QuoteText className="hs-fidelidade-testimonial-slider__quote-text my-[var(--hsFidelidade--text--large__margin,0_40px)] font-hs-body-lg font-medium [text-align:var(--hsFidelidade--testimonial__textAlign)] min-[767px]:font-hs-body-xl">
          {quote}
        </QuoteText>
        <TestimonialMeta
          moduleName={moduleName}
          testimonialIndex={testimonialIndex}
          authorName={authorName}
          authorTitle={authorTitle}
          authorImage={authorImage}
          linkText={linkText}
          link={link}
        />
      </ContentContainer>
    </SlideContainer>
  );
};

// Testimonial slider component

// Function to generate CSS variables for colors

function generateIconColorCssVar(cardVariantField: CardVariantType): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: 'var(--hsFidelidade--card--variant1__iconColor)',
    card_variant_2: 'var(--hsFidelidade--card--variant2__iconColor)',
    card_variant_3: 'var(--hsFidelidade--card--variant3__iconColor)',
    card_variant_4: 'var(--hsFidelidade--card--variant4__iconColor)',
  };

  return { '--hsFidelidade--cardIcon__fillColor': iconColorsMap[cardVariantField] };
}

function generateLinkCssVar(cardVariantField: CardVariantType): CSSPropertiesMap {
  const linkColorsMap = {
    card_variant_1: 'var(--hsFidelidade--card--variant1--link__fontColor)',
    card_variant_2: 'var(--hsFidelidade--card--variant2--link__fontColor)',
    card_variant_3: 'var(--hsFidelidade--card--variant3--link__fontColor)',
    card_variant_4: 'var(--hsFidelidade--card--variant4--link__fontColor)',
  };

  return { '--hsFidelidade--links__fontColor': linkColorsMap[cardVariantField] };
}

function generateBlockquoteCssVar(cardVariantField: CardVariantType): CSSPropertiesMap {
  const cardColorsMap = {
    card_variant_1: 'var(--hsFidelidade--card--variant1__textColor)',
    card_variant_2: 'var(--hsFidelidade--card--variant2__textColor)',
    card_variant_3: 'var(--hsFidelidade--card--variant3__textColor)',
    card_variant_4: 'var(--hsFidelidade--card--variant4__textColor)',
  };

  return {
    '--hsFidelidade--blockquote__fontColor': cardColorsMap[cardVariantField],
    '--hsFidelidade--blockquote__backgroundColor': 'transparent',
    '--hsFidelidade--blockquote__accentColor': 'transparent',
  };
}

const TestimonialSliderContainer = createComponent('div');

const TestimonialSlider = (props: TestimonialSliderProps) => {
  const {
    moduleName,
    groupTestimonial,
    groupStyle: { cardStyleVariant },
    groupDefaultText,
  } = props;

  const cssVarsMap = {
    ...generateIconColorCssVar(cardStyleVariant),
    ...generateLinkCssVar(cardStyleVariant),
    ...generateBlockquoteCssVar(cardStyleVariant),
  };

  const [htmlDirection, setHtmlDirection] = useState('ltr');

  useEffect(() => {
    const htmlElement = document.documentElement;
    setHtmlDirection(htmlElement.dir || 'ltr');
  }, []);

  const hasMultipleTestimonials = groupTestimonial.length > 1;
  const cardVariantClassName = getCardVariantClassName({ cardVariant: cardStyleVariant, fallbackCardVariant: 'card_variant_1' });

  const splideClassName = cn(
    'px-hs-48',
    '[&_.splide__pagination__page]:m-[0_6px] [&_.splide__pagination__page]:h-1 [&_.splide__pagination__page]:w-12 [&_.splide__pagination__page]:rounded-[20px] [&_.splide__pagination__page]:border-none [&_.splide__pagination__page]:[background-color:var(--hsFidelidade--cardIcon__fillColor,#000)] [&_.splide__pagination__page]:opacity-30',
    '[&_.splide__pagination__page.is-active]:opacity-100 [&_.splide__pagination__page.is-active]:[transform:none] [&_.splide__pagination__page.is-active]:[background-color:var(--hsFidelidade--cardIcon__fillColor,#000)]',
  );

  return (
    <TestimonialSliderContainer style={cssVarsMap} className={cn('hs-fidelidade-testimonial-slider', 'border-none py-hs-48', cardVariantClassName)}>
      <Splide
        className={splideClassName}
        hasTrack={false}
        options={{
          lazyLoad: true,
          rewind: true,
          direction: htmlDirection,
          arrows: hasMultipleTestimonials,
          pagination: hasMultipleTestimonials,
          i18n: {
            // https://splidejs.com/guides/i18n/
            prev: groupDefaultText.navigateToPreviousSlideAriaLabel,
            next: groupDefaultText.navigateToNextSlideAriaLabel,
            first: groupDefaultText.navigateToFirstSlideAriaLabel,
            last: groupDefaultText.navigateToLastSlideAriaLabel,
            slideX: groupDefaultText.navigateToSlideNumberAriaLabel,
            carousel: groupDefaultText.carouselAriaLabel,
            select: groupDefaultText.selectSlideNavigationAriaLabel,
            slide: groupDefaultText.slideAriaLabel,
            slideLabel: groupDefaultText.slideNumberOfSlidesTotalAriaLabel,
          },
        }}
      >
        <div className="splide__track hs-fidelidade-testimonial-slider__track">
          <div className="splide__list hs-fidelidade-testimonial-slider__list">
            {groupTestimonial.map((testimonial, index) => (
              <div className="splide__slide hs-fidelidade-testimonial-slider__slide" key={testimonial.groupQuote.quote}>
                <Testimonial
                  moduleName={moduleName}
                  testimonialIndex={index}
                  quote={testimonial.groupQuote.quote}
                  authorName={testimonial.groupAuthor.authorName}
                  authorTitle={testimonial.groupAuthor.authorTitle}
                  authorImage={testimonial.groupAuthor.authorImage}
                  showImage={testimonial.groupImage.showImage}
                  image={testimonial.groupImage.image}
                  linkText={testimonial.groupLink.linkText}
                  link={testimonial.groupLink.link}
                />
              </div>
            ))}
          </div>
        </div>
        {hasMultipleTestimonials && <Navigation previousAltText={groupDefaultText.previousArrowAltText} nextAltText={groupDefaultText.nextArrowAltText} />}
      </Splide>
    </TestimonialSliderContainer>
  );
};

export default TestimonialSlider;
