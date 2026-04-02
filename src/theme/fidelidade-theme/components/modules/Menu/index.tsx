import { ModuleMeta } from '../../types/modules.js';
// @ts-expect-error -- ?island not typed
import MenuComponent from '../../MenuComponent/index.js?island';
import { Island } from '@hubspot/cms-components';
import { SizeOption, maxMenuDepth } from '../../MenuComponent/types.js';
import { AlignmentFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import MenuSvg from './assets/menu.svg';
import { LinkStyleFieldLibraryType } from '../../fieldLibrary/LinkStyle/types.js';
import { PlaceholderEmptyContent } from '../../PlaceholderComponent/PlaceholderEmptyContent.js';
import { CSSPropertiesMap } from '../../types/components.js';

type MenuDataType = {
  label: string;
  url: string;
  linkTarget?: string;
  children?: MenuDataType[];
};

type MenuModulePropTypes = {
  hublData: {
    navigation: {
      children: MenuDataType[];
    };
    isInEditor: Boolean;
  };
  maxDepth: maxMenuDepth;
  menuName: TextFieldType['default'];
  styles: {
    groupMenu: {
      menuColumnGap: SizeOption;
      menuAlignment: AlignmentFieldType['default'];
    };
    groupMenuItems: {
      menuItemVerticalGap: SizeOption;
      menuItemPadding: SizeOption;
    };
    groupLink: LinkStyleFieldLibraryType;
  };
  groupPlaceholderText: {
    placeholderTitle: string;
    placeholderDescription: string;
  };
};

function generateSpacingCssVars(spacingField: SizeOption): CSSPropertiesMap {
  const spacingMap = {
    none: '0',
    small: 'var(--hsFidelidade--spacing--16, 16px)',
    medium: 'var(--hsFidelidade--spacing--32, 32px)',
    large: 'var(--hsFidelidade--spacing--56, 56px)',
  };

  return { '--hsFidelidade--menu--topLevel__gap': spacingMap[spacingField] };
}
function generatePaddingCssVars(spacingField: SizeOption): CSSPropertiesMap {
  const verticalSpacingMap = {
    none: '0',
    small: 'var(--hsFidelidade--spacing--4, 4px)',
    medium: 'var(--hsFidelidade--spacing--12, 12px)',
    large: 'var(--hsFidelidade--spacing--16, 16px)',
  };
  const horizontalSpacingMap = {
    none: '0',
    small: 'var(--hsFidelidade--spacing--4, 4px)',
    medium: 'var(--hsFidelidade--spacing--8, 8px)',
    large: 'var(--hsFidelidade--spacing--16, 16px)',
  };

  return {
    '--hsFidelidade--menuItem__paddingVertical': verticalSpacingMap[spacingField],
    '--hsFidelidade--menuItem__paddingHorizontal': horizontalSpacingMap[spacingField],
  };
}
function generateMenuItemVerticalGapCssVars(menuItemVerticalGap: SizeOption): CSSPropertiesMap {
  const verticalSpacingMap = {
    none: '0',
    small: 'var(--hsFidelidade--spacing--8, 8px)',
    medium: 'var(--hsFidelidade--spacing--16, 16px)',
    large: 'var(--hsFidelidade--spacing--24, 24px)',
  };

  return {
    '--hsFidelidade--menuItem__gap': verticalSpacingMap[menuItemVerticalGap],
  };
}

export const Component = (props: MenuModulePropTypes) => {
  const { hublData, menuName = '', maxDepth, styles, groupPlaceholderText } = props;

  const navDataArray = hublData?.navigation?.children ?? [];
  const isEditorMode = hublData?.isInEditor ?? false;

  const {
    groupMenu: { menuColumnGap, menuAlignment },
    groupMenuItems: { menuItemPadding, menuItemVerticalGap },
    groupLink: { linkStyleVariant },
  } = styles;

  const cssVarsMap = {
    ...generatePaddingCssVars(menuItemPadding),
    ...generateSpacingCssVars(menuColumnGap),
    ...generateMenuItemVerticalGapCssVars(menuItemVerticalGap),
  };

  return (
    <div style={cssVarsMap} className="hs-fidelidade-horizontal-menu">
      {navDataArray.length === 0 && isEditorMode ? (
        <PlaceholderEmptyContent title={groupPlaceholderText.placeholderTitle} description={groupPlaceholderText.placeholderDescription} />
      ) : (
        <Island
          module={MenuComponent}
          menuDataArray={navDataArray}
          flow="horizontal"
          maxDepth={maxDepth}
          menuAlignment={menuAlignment}
          navigationAriaLabel={menuName}
          linkStyleVariant={linkStyleVariant}
          additionalClassArray={['hs-fidelidade-horizontal-menu__menu']}
        />
      )}
    </div>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "navigation": menu(module.menu, "site_root"),
      "isInEditor": is_in_editor
    }
  %}
`;

// NOTE: Source an Icon for this module
export const meta: ModuleMeta = {
  label: 'Horizontal menu',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: MenuSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/menu',
  version: 0,
  themeModule: true,
};
