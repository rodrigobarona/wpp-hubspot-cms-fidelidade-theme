import { createComponent } from '../utils/create-component.js';
import { cn } from '../utils/cn.js';
import '../styles/tailwind.css';

// Types

type PlaceholderContentsProps = {
  title: string;
  description: string;
  icon?: string;
};

// Components

// TODO: Remove once cms-react implements the placeholder via EditorPlaceholder
const PlaceholderWrapper = createComponent('div');
const PlaceholderIcon = createComponent('img');

export const PlaceholderEmptyContent = (props: PlaceholderContentsProps) => {
  const { title, description, icon } = props;

  return (
    <PlaceholderWrapper
      className={cn(
        'flex h-full w-full flex-col items-center justify-center border border-dashed border-[#516f90] bg-[#f5f8fae6] pt-hs-16 pr-hs-24 pb-0 pl-hs-24 text-center text-[#425b76]',
        '[&_h5]:mb-0 [&_p]:mb-hs-20 [&_p]:text-hs-h6',
      )}
    >
      {icon && (
        <PlaceholderIcon
          className="mb-hs-10 w-[var(--hsFidelidade--icon--medium__size,24px)] invert-[50%]"
          src={icon}
        />
      )}
      <h5>{title}</h5>
      <p>{description}</p>
    </PlaceholderWrapper>
  );
};
