import type { CSSProperties } from 'react';
import { ModuleMeta } from '../../types/modules.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import { Button } from '../../ButtonComponent/index.js';
import { Card } from '../../CardComponent/index.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { CardVariantType } from '../../types/fields.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import pricingCardIconSvg from './assets/quotes.svg';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import type { PricingCardProps, PricingCardSummaryProps, PricingCardFeaturesProps } from './types.js';
import '../../styles/tailwind.css';

const cardGridInlineStyles: CSSProperties = {
  '--hsFidelidade--card--display': 'grid',
  '--hsFidelidade--card--padding': '0',
} as CSSProperties;

function generateCardBorderStyles(cardVariantField: CardVariantType): CSSPropertiesMap {
  const cardBorderThicknessMap = {
    card_variant_1: 'var(--hsFidelidade--card--variant1__borderThickness)',
    card_variant_2: 'var(--hsFidelidade--card--variant2__borderThickness)',
    card_variant_3: 'var(--hsFidelidade--card--variant3__borderThickness)',
    card_variant_4: 'var(--hsFidelidade--card--variant4__borderThickness)',
  };

  const cardBorderColorMap = {
    card_variant_1: 'var(--hsFidelidade--card--variant1__borderColor)',
    card_variant_2: 'var(--hsFidelidade--card--variant2__borderColor)',
    card_variant_3: 'var(--hsFidelidade--card--variant3__borderColor)',
    card_variant_4: 'var(--hsFidelidade--card--variant4__borderColor)',
  };

  return {
    '--hsFidelidade--pricingCard__borderThickness': cardBorderThicknessMap[cardVariantField],
    '--hsFidelidade--pricingCard__borderColor': cardBorderColorMap[cardVariantField],
  };
}

function generateIconCssVars(cardVariantField: CardVariantType): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: 'var(--hsFidelidade--card--variant1__iconColor)',
    card_variant_2: 'var(--hsFidelidade--card--variant2__iconColor)',
    card_variant_3: 'var(--hsFidelidade--card--variant3__iconColor)',
    card_variant_4: 'var(--hsFidelidade--card--variant4__iconColor)',
  };

  return { '--hsFidelidade--cardIcon__color': iconColorsMap[cardVariantField] };
}

const PricingCardsWrapper = createComponent('div');
const PricingCardSummaryContainer = createComponent('div');
const PricingCardDescription = createComponent('p');
const PricingCardPriceContainer = createComponent('div');
const PricingCardPrice = createComponent('span');
const PricingCardTimePeriod = createComponent('span');

const PricingCardSummary = (props: PricingCardSummaryProps & HeadingStyleFieldLibraryType & { moduleName?: string; cardIndex: number }) => {
  const {
    groupSummary: { headingAndTextHeadingLevel, headingAndTextHeading, description, price, timePeriod },
    headingStyleVariant,
    moduleName,
    cardIndex,
  } = props;

  return (
    <PricingCardSummaryContainer
      className={cn(
        'hs-fidelidade-pricing-card-container__summary grid-row-1 flex h-full w-full flex-col gap-hs-16',
        'border-b border-solid pb-hs-32 pt-hs-48',
        'border-[length:var(--hsFidelidade--pricingCard__borderThickness)]',
        'border-[var(--hsFidelidade--pricingCard__borderColor)]',
        'px-hs-32',
      )}
    >
      {headingAndTextHeading && (
        <HeadingComponent
          additionalClassArray={['hs-fidelidade-pricing-card-container__title']}
          headingLevel={headingAndTextHeadingLevel}
          heading={headingAndTextHeading}
          headingStyleVariant={headingStyleVariant}
          moduleName={moduleName}
          fieldPath={`groupPricingCards[${cardIndex}].groupSummary.headingAndTextHeading`}
        />
      )}
      {description && (
        <PricingCardDescription
          className="hs-fidelidade-pricing-card-container__description m-0 break-words text-hs-body-sm"
          data-hs-token={getDataHSToken(moduleName, `groupPricingCards[${cardIndex}].groupSummary.description`)}
        >
          {description}
        </PricingCardDescription>
      )}
      <PricingCardPriceContainer className="hs-fidelidade-pricing-card-container__price-container flex flex-row items-center gap-px">
        <PricingCardPrice
          className="hs-fidelidade-pricing-card-container__price text-hs-body-xl"
          data-hs-token={getDataHSToken(moduleName, `groupPricingCards[${cardIndex}].groupSummary.price`)}
        >
          {price}
        </PricingCardPrice>
        <PricingCardTimePeriod
          className="hs-fidelidade-pricing-card-container__time-period text-hs-body-lg"
          data-hs-token={getDataHSToken(moduleName, `groupPricingCards[${cardIndex}].groupSummary.timePeriod`)}
        >
          {timePeriod}
        </PricingCardTimePeriod>
      </PricingCardPriceContainer>
    </PricingCardSummaryContainer>
  );
};

const PricingCardFeaturesContainer = createComponent('div');
const PricingCardFeaturesList = createComponent('ul');
const PricingCardFeaturesListItem = createComponent('li');

const ListArrow = () => {
  return (
    <svg
      className="hs-fidelidade-pricing-card-container__features-list-item-icon mt-hs-4 shrink-0 fill-[var(--hsFidelidade--cardIcon__color)] me-hs-12"
      width="18"
      height="14"
      viewBox="0 0 18 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.6328 1.11719C18.1211 1.60547 18.1211 2.39844 17.6328 2.88672L7.63281 12.8867C7.14453 13.375 6.35156 13.375 5.86328 12.8867L0.863281 7.88672C0.375 7.39844 0.375 6.60547 0.863281 6.11719C1.35156 5.62891 2.14453 5.62891 2.63281 6.11719L6.75 10.2305L15.8672 1.11719C16.3555 0.628906 17.1484 0.628906 17.6367 1.11719H17.6328Z" />
    </svg>
  );
};

const PricingCardFeatures = (props: PricingCardFeaturesProps & HeadingStyleFieldLibraryType & { moduleName?: string; cardIndex: number }) => {
  const {
    groupPlanFeatures: { headingAndTextHeadingLevel, headingAndTextHeading, groupFeatures },
    headingStyleVariant,
    moduleName,
    cardIndex,
  } = props;

  return (
    <PricingCardFeaturesContainer
      className={cn(
        'hs-fidelidade-pricing-card-container__features row-start-2 mb-hs-32 flex h-full w-full flex-col items-start',
        'px-hs-32 pb-hs-72 pt-hs-32',
      )}
    >
      {headingAndTextHeading && (
        <HeadingComponent
          additionalClassArray={['hs-fidelidade-pricing-card-container__features-title']}
          headingLevel={headingAndTextHeadingLevel}
          heading={headingAndTextHeading}
          headingStyleVariant={headingStyleVariant}
          moduleName={moduleName}
          fieldPath={`groupPricingCards[${cardIndex}].groupPlanFeatures.headingAndTextHeading`}
        />
      )}
      <PricingCardFeaturesList className="hs-fidelidade-pricing-card-container__features-list flex list-none flex-col gap-hs-20 ps-0">
        {groupFeatures.map((features, index) => (
          <PricingCardFeaturesListItem
            key={index}
            className="hs-fidelidade-pricing-card-container__features-list-item flex w-full items-start"
            data-hs-token={getDataHSToken(moduleName, `groupPricingCards[${cardIndex}].groupPlanFeatures.groupFeatures[${index}].feature`)}
          >
            <ListArrow />
            {features.feature}
          </PricingCardFeaturesListItem>
        ))}
      </PricingCardFeaturesList>
    </PricingCardFeaturesContainer>
  );
};

const ButtonWrapper = createComponent('div');

export const Component = (props: PricingCardProps) => {
  const {
    moduleName,
    groupPricingCards,
    groupStyle: {
      groupCard: { cardStyleVariant },
      groupSummary: { headingStyleVariant: summaryHeadingStyleVariant },
      groupPlanFeatures: { headingStyleVariant: planFeaturesHeadingStyleVariant },
      groupButton: { buttonStyleVariant, buttonStyleSize },
    },
  } = props;

  const cssVarsMap = {
    ...generateCardBorderStyles(cardStyleVariant),
    ...generateIconCssVars(cardStyleVariant),
  };

  return (
    <PricingCardsWrapper
      style={cssVarsMap}
      className={cn(
        'hs-fidelidade-pricing-card-container grid items-start gap-hs-32',
        'grid-rows-[auto_1fr] min-[1000px]:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
      )}
    >
      {groupPricingCards.map((pricingCard, index) => (
        <Card
          key={index}
          additionalClassArray={['hs-fidelidade-pricing-card-container__card row-span-2 grid grid-rows-subgrid']}
          cardStyleVariant={cardStyleVariant}
          cardOrientation="column"
          inlineStyles={cardGridInlineStyles}
        >
          <PricingCardSummary
            groupSummary={pricingCard.groupSummary}
            headingStyleVariant={summaryHeadingStyleVariant}
            moduleName={moduleName}
            cardIndex={index}
          />
          <PricingCardFeatures
            groupPlanFeatures={pricingCard.groupPlanFeatures}
            headingStyleVariant={planFeaturesHeadingStyleVariant}
            moduleName={moduleName}
            cardIndex={index}
          />
          {pricingCard.groupButton.showButton && (
            <ButtonWrapper className="hs-fidelidade-pricing-card-container__button-container mt-auto w-full px-hs-32 pb-hs-48 pt-0">
              <Button
                additionalClassArray={['hs-fidelidade-pricing-card-container__button w-full']}
                buttonStyle={buttonStyleVariant}
                buttonSize={buttonStyleSize}
                href={getLinkFieldHref(pricingCard.groupButton.buttonContentLink)}
                rel={getLinkFieldRel(pricingCard.groupButton.buttonContentLink)}
                target={getLinkFieldTarget(pricingCard.groupButton.buttonContentLink)}
                iconFieldPath={`groupPricingCards[${index}].groupButton.buttonContentIcon`}
                showIcon={pricingCard.groupButton.buttonContentShowIcon}
                iconPosition={pricingCard.groupButton.buttonContentIconPosition}
                moduleName={moduleName}
                textFieldPath={`groupPricingCards[${index}].groupButton.buttonContentText`}
              >
                {pricingCard.groupButton.buttonContentText}
              </Button>
            </ButtonWrapper>
          )}
        </Card>
      ))}
    </PricingCardsWrapper>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Pricing card',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: pricingCardIconSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/pricing_card',
  version: 0,
  themeModule: true,
};
