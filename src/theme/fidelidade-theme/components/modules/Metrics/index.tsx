import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import chartIconSvg from './assets/chart.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType, HeadingStyleVariant } from '../../fieldLibrary/HeadingStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import '../../styles/tailwind.css';

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type MetricProps = {
  moduleName?: string;
  groupMetrics: {
    metric: TextFieldType['default'];
    description: TextFieldType['default'];
  }[];
  groupStyle: GroupStyle;
  hublData: {
    renderedWithGrids: boolean;
  };
};

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsFidelidade--metrics__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsFidelidade--metrics__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

function generateMetricCssVars(headingStyleAs: HeadingStyleVariant): CSSPropertiesMap {
  const metricCssVarsMap = {
    display_1: 'var(--hsFidelidade--display1__fontSize)',
    display_2: 'var(--hsFidelidade--display2__fontSize)',
    h1: 'var(--hsFidelidade--h1__fontSize)',
    h2: 'var(--hsFidelidade--h2__fontSize)',
    h3: 'var(--hsFidelidade--h3__fontSize)',
    h4: 'var(--hsFidelidade--h4__fontSize)',
    h5: 'var(--hsFidelidade--h5__fontSize)',
    h6: 'var(--hsFidelidade--h6__fontSize)',
  };

  return {
    '--hsFidelidade--metrics__maxFontSize': metricCssVarsMap[headingStyleAs],
    '--hsFidelidade--metrics__minFontSize': 'calc(var(--hsFidelidade--metrics__maxFontSize) * var(--hsFidelidade--heading__tablet-modifier))',
  };
}

function getMetricsContainerClassName(metricCount: number, renderedWithGrids: boolean): string {
  const base = 'hs-fidelidade-metrics-container grid min-w-0 grid-cols-1 gap-hs-32';

  if (![2, 3, 4].includes(metricCount)) {
    return base;
  }

  if (renderedWithGrids) {
    if (metricCount === 2) {
      return cn(base, 'min-[700px]:grid-cols-2 min-[700px]:gap-hs-24');
    }
    if (metricCount === 3) {
      return cn(base, 'min-[900px]:grid-cols-3 min-[900px]:gap-hs-24');
    }
    return cn(base, 'min-[700px]:grid-cols-2 min-[700px]:gap-hs-24 min-[950px]:grid-cols-4 min-[950px]:gap-hs-16');
  }

  if (metricCount === 2) {
    return cn(base, '@[700px]:grid-cols-2 @[700px]:gap-hs-24');
  }
  if (metricCount === 3) {
    return cn(base, '@[900px]:grid-cols-3 @[900px]:gap-hs-24');
  }
  return cn(base, '@[700px]:grid-cols-2 @[700px]:gap-hs-24 @[950px]:grid-cols-4 @[950px]:gap-hs-16');
}

const MetricsWrapper = createComponent('div');
const MetricsContainer = createComponent('div');
const Metric = createComponent('div');
const MetricNumber = createComponent('div');
const MetricDescription = createComponent('div');

export const Component = (props: MetricProps) => {
  const {
    moduleName,
    groupMetrics,
    groupStyle: { headingStyleVariant, sectionStyleVariant },
    hublData: { renderedWithGrids = false },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
    ...generateMetricCssVars(headingStyleVariant),
  };

  const metricsContainerClass = getMetricsContainerClassName(groupMetrics.length, renderedWithGrids);

  return (
    <MetricsWrapper className={cn('hs-fidelidade-metrics', !renderedWithGrids && '@container')}>
      <MetricsContainer className={metricsContainerClass} style={cssVarsMap}>
        {groupMetrics.map((metric, index) => {
          return (
            <Metric className="hs-fidelidade-metrics-container__metric flex min-w-0 flex-col items-center" key={index}>
              <MetricNumber
                className={cn(
                  'hs-fidelidade-metrics-container__metric-number max-w-full text-center leading-hs-heading',
                  'text-[length:clamp(var(--hsFidelidade--metrics__minFontSize),calc(1vw+var(--hsFidelidade--metrics__minFontSize)),var(--hsFidelidade--metrics__maxFontSize))]',
                  'text-[var(--hsFidelidade--metrics__accentColor)]',
                )}
                data-hs-token={getDataHSToken(moduleName, `groupMetrics[${index}].metric`)}
              >
                {metric.metric}
              </MetricNumber>
              <MetricDescription
                className="hs-fidelidade-metrics-container__metric-description max-w-full text-center text-[var(--hsFidelidade--metrics__textColor)]"
                data-hs-token={getDataHSToken(moduleName, `groupMetrics[${index}].description`)}
              >
                {metric.description}
              </MetricDescription>
            </Metric>
          );
        })}
      </MetricsContainer>
    </MetricsWrapper>
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
  label: 'Metrics',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: chartIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/metrics',
  version: 0,
  themeModule: true,
};
