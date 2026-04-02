import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import '../../styles/tailwind.css';
import anchorIconSvg from './assets/anchor.svg';
import { createComponent } from '../../utils/create-component.js';

// Types

type AnchorProps = {
  anchor: TextFieldType['default'];
  hublData: {
    isInEditor: boolean;
  };
};

// Components

const Anchor = createComponent('span');
const AnchorVisual = createComponent('span');

export const Component = (props: AnchorProps) => {
  const { anchor, hublData } = props;

  const showAnchorVisual = hublData.isInEditor ? true : false;

  return (
    <Anchor className="relative" id={anchor}>
      {showAnchorVisual && (
        <AnchorVisual className="relative my-1 ms-auto block w-[47px] pt-[10px] pb-[11px] !bg-[url('./assets/editor-anchor.svg')] !bg-right-bottom !bg-no-repeat before:absolute before:left-0 before:h-2 before:w-[calc(100%-45px)] before:border-t before:border-[#00a4bd] before:content-['']" />
      )}
    </Anchor>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "isInEditor": is_in_editor,
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Anchor',
  content_types: ['SITE_PAGE', 'LANDING_PAGE'],
  icon: anchorIconSvg,
  categories: ['functionality'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/anchor',
  version: 0,
  themeModule: true,
};
