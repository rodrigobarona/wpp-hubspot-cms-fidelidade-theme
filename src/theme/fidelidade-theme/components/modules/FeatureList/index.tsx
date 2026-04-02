import { ModuleMeta } from '../../types/modules.js';
import { Icon } from '@hubspot/cms-components';
import { BooleanFieldType, IconFieldType, NumberFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import featureListIconSvg from './assets/list.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import '../../styles/tailwind.css';

// Types

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type GroupFeatureContent = HeadingAndTextFieldLibraryType & {
  featureDescription?: TextFieldType['default'];
};

type GroupFeatures = {
  groupIcon?: {
    showIcon: BooleanFieldType['default'];
    icon?: IconFieldType['default'];
  };
  groupFeatureContent: GroupFeatureContent;
};

type Columns = NumberFieldType['default'];

type FeatureListProps = {
  moduleName?: string;
  columns: Columns;
  groupFeatures: GroupFeatures[];
  groupStyle: GroupStyle;
};

// Functions to pull in corresponding CSS variables on component based on field values

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsFidelidade--featureList__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsFidelidade--featureList__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

// Components

const FeatureList = createComponent('div');
const Feature = createComponent('div');
const ContentContainer = createComponent('div');
const FeatureParagraph = createComponent('p');

export const Component = (props: FeatureListProps) => {
  const {
    moduleName,
    columns,
    groupFeatures,
    groupStyle: { sectionStyleVariant, headingStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  const multiColumn = columns >= 2;
  const threeColumns = columns === 3;

  const featureListClasses = cn(
    'flex flex-col flex-wrap gap-y-hs-56',
    multiColumn && 'min-[479px]:flex-row min-[479px]:gap-x-hs-64',
  );

  const featureClasses = cn(
    'flex w-full items-start',
    multiColumn &&
      'min-[479px]:w-[calc((100%-var(--hsFidelidade--spacing--64,64px))/2)]',
    threeColumns && 'min-[768px]:w-[calc((100%-(var(--hsFidelidade--spacing--64,64px)*2))/3)]',
  );

  return (
    <FeatureList className={featureListClasses} style={cssVarsMap}>
      {groupFeatures.map((feature, index) => (
        <Feature className={featureClasses} key={index}>
          {feature?.groupIcon?.showIcon && feature?.groupIcon?.icon?.name && (
            <Icon
              className={cn(
                'h-[var(--hsFidelidade--icon--medium__size,24px)] w-[var(--hsFidelidade--icon--medium__size,24px)]',
                'shrink-0 fill-[var(--hsFidelidade--featureList__accentColor)] me-hs-12',
              )}
              fieldPath={`groupFeatures[${index}].groupIcon.icon`}
              purpose="DECORATIVE"
            />
          )}
          <ContentContainer
            className={cn(
              '[&_h1]:text-[color:var(--hsFidelidade--featureList__textColor)] [&_h2]:text-[color:var(--hsFidelidade--featureList__textColor)]',
              '[&_h3]:text-[color:var(--hsFidelidade--featureList__textColor)] [&_h4]:text-[color:var(--hsFidelidade--featureList__textColor)]',
              '[&_h5]:text-[color:var(--hsFidelidade--featureList__textColor)] [&_h6]:text-[color:var(--hsFidelidade--featureList__textColor)]',
              '[&_h1]:my-[var(--hsFidelidade--text--extraSmall__margin,0_12px)] [&_h2]:my-[var(--hsFidelidade--text--extraSmall__margin,0_12px)]',
              '[&_h3]:my-[var(--hsFidelidade--text--extraSmall__margin,0_12px)] [&_h4]:my-[var(--hsFidelidade--text--extraSmall__margin,0_12px)]',
              '[&_h5]:my-[var(--hsFidelidade--text--extraSmall__margin,0_12px)] [&_h6]:my-[var(--hsFidelidade--text--extraSmall__margin,0_12px)]',
              '[&_p]:text-[color:var(--hsFidelidade--featureList__textColor)]',
            )}
          >
            {feature.groupFeatureContent.headingAndTextHeading && (
              <HeadingComponent
                additionalClassArray={['hs-fidelidade-feature-list__title']}
                headingLevel={feature.groupFeatureContent.headingAndTextHeadingLevel}
                headingStyleVariant={headingStyleVariant}
                heading={feature.groupFeatureContent.headingAndTextHeading}
                moduleName={moduleName}
                fieldPath={`groupFeatures[${index}].groupFeatureContent.headingAndTextHeading`}
              />
            )}
            {feature.groupFeatureContent.featureDescription && (
              <FeatureParagraph
                className="text-hs-body-sm mb-0"
                data-hs-token={getDataHSToken(moduleName, `groupFeatures[${index}].groupFeatureContent.featureDescription`)}
              >
                {feature.groupFeatureContent.featureDescription}
              </FeatureParagraph>
            )}
          </ContentContainer>
        </Feature>
      ))}
    </FeatureList>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Feature list',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: featureListIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/feature_list',
  version: 0,
  themeModule: true,
};
