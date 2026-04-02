import { IconFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import '../../styles/tailwind.css';
import listIconSvg from '../FeatureList/assets/list.svg';
import { Icon } from '@hubspot/cms-components';
import { SectionVariantType } from '../../types/fields.js';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { getDataHSToken } from '../../utils/inline-editing.js';

// Types

export type GroupListItems = {
  groupListContent: {
    listItemContent: TextFieldType['default'];
  };
};

export type GroupStyle = SectionStyleFieldLibraryType;

type ListProps = {
  moduleName?: string;
  listIcon: IconFieldType['default'];
  groupListItems: GroupListItems[];
  groupStyle: GroupStyle;
  hublData: {
    renderedWithGrids: boolean;
  };
};

// Function to generate color CSS variables

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsFidelidade--list__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsFidelidade--list__accentColor': sectionColorsMap[sectionVariantField].accentColor,
    '--hsFidelidade--list__sectionBackgroundColor': sectionColorsMap[sectionVariantField].backgroundColor,
  };
}

// Components

const ListContainer = createComponent('ul');
const ListItem = createComponent('li');
const IconContainer = createComponent('span');
const ListItemText = createComponent('span');

export const Component = (props: ListProps) => {
  const {
    moduleName,
    listIcon,
    groupListItems,
    groupStyle: { sectionStyleVariant },
    hublData: { renderedWithGrids = false },
  } = props;

  const cssColorVars = { ...generateColorCssVars(sectionStyleVariant) };

  return (
    <ListContainer
      className={cn('pl-0', renderedWithGrids && 'mb-0')}
      style={cssColorVars}
    >
      {groupListItems.map((item, index) => {
        return (
          <ListItem
            className={cn(
              'mb-hs-16 flex items-start gap-hs-8 text-[var(--hsFidelidade--list__textColor)]',
              renderedWithGrids && 'last:mb-0',
            )}
            key={`${index} ${item.groupListContent.listItemContent}`}
          >
            {listIcon.name && (
              <IconContainer className="rounded-full bg-[var(--hsFidelidade--list__accentColor)]">
                <Icon
                  className="block h-7 w-7 shrink-0 basis-7 p-hs-8 fill-[var(--hsFidelidade--list__sectionBackgroundColor)]"
                  fieldPath="listIcon"
                  purpose="DECORATIVE"
                />
              </IconContainer>
            )}
            <ListItemText data-hs-token={getDataHSToken(moduleName, `groupListItems[${index}].groupListContent.listItemContent`)}>
              {item.groupListContent.listItemContent}
            </ListItemText>
          </ListItem>
        );
      })}
    </ListContainer>
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
  label: 'List',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY', 'BLOG_LISTING', 'BLOG_POST'],
  icon: listIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/list',
  version: 0,
  themeModule: true,
};
