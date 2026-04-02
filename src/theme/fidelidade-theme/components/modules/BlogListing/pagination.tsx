import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import Chevron from './chevron.js';
import { usePageUrl } from '@hubspot/cms-components';
import '../../styles/tailwind.css';

type PaginationProps = {
  currentPageNumber: number;
  totalPageCount: number;
  nextPageNumber: number;
  defaultContent: {
    nextPage: string;
    previousPage: string;
  };
};

export function standardizePathName(currentPathName: string) {
  return currentPathName === '/' ? '' : currentPathName;
}

export function buildPaginationNumbers(currentPageNumber: number, totalPageCount: number) {
  const standardizedPageNumbers = [-1, 0, 1];
  let displayFirstNumber = false;
  let displayLastNumber = false;
  let displayPreviousEllipsis = false;
  let displayNextEllipsis = false;

  const threshold = Math.abs(standardizedPageNumbers[0]);

  if (totalPageCount <= standardizedPageNumbers.length) {
    return {
      pagesToDisplay: Array.from({ length: totalPageCount }, (_, i) => i + 1),
      displayFirstNumber,
      displayLastNumber,
      displayPreviousEllipsis,
      displayNextEllipsis,
    };
  }

  if (currentPageNumber <= threshold) {
    displayLastNumber = true;
    displayNextEllipsis = true;
    return {
      pagesToDisplay: Array.from({ length: standardizedPageNumbers.length }, (_, i) => i + 1),
      displayFirstNumber,
      displayLastNumber,
      displayPreviousEllipsis,
      displayNextEllipsis,
    };
  }

  if (currentPageNumber >= totalPageCount - threshold) {
    displayFirstNumber = true;
    displayPreviousEllipsis = true;
    return {
      pagesToDisplay: Array.from({ length: standardizedPageNumbers.length }, (_, i) => totalPageCount - standardizedPageNumbers.length + i + 1),
      displayFirstNumber,
      displayLastNumber,
      displayPreviousEllipsis,
      displayNextEllipsis,
    };
  }

  displayFirstNumber = currentPageNumber !== threshold + 1;
  displayPreviousEllipsis = currentPageNumber !== threshold + 1;
  displayNextEllipsis = currentPageNumber !== totalPageCount - threshold - 1;
  displayLastNumber = true;
  return {
    pagesToDisplay: standardizedPageNumbers.map(pageNumber => currentPageNumber + pageNumber),
    displayFirstNumber,
    displayLastNumber,
    displayPreviousEllipsis,
    displayNextEllipsis,
  };
}

const PaginationContainer = createComponent('nav');
const PaginationLink = createComponent('a');
const NavLink = createComponent('a');

const paginationLinkBase = cn(
  'hs-fidelidade-blog-listing__pagination-link relative block leading-none no-underline',
  'text-[var(--hsFidelidade--section--lightSection--1--link__fontColor)]',
  'hover:text-[var(--hsFidelidade--section--lightSection--1--link__hover--fontColor)]',
  'hover:no-underline',
);

const chevronIconClass = cn(
  'hs-fidelidade-blog-listing__pagination-icon',
  '[&_path]:fill-[var(--hsFidelidade--section--lightSection--1--link__fontColor)]',
  'group-hover:[&_path]:fill-[var(--hsFidelidade--section--lightSection--1--link__hover--fontColor)]',
);

type ScreenReadyOnlyProps = {
  content: string;
};

const ScreenReadyOnly = (props: ScreenReadyOnlyProps) => {
  const { content } = props;

  return <span className="sr-only">{content}</span>;
};

const Ellipsis = () => {
  return <a className={cn(paginationLinkBase, 'hs-fidelidade-blog-listing__ellipsis pointer-events-none')}>...</a>;
};

function paginationLinkClass(isActive: boolean) {
  return cn(
    paginationLinkBase,
    isActive &&
      cn(
        'hs-fidelidade-blog-listing__pagination-link--active w-11 text-center',
        'before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-11 before:-translate-x-1/2 before:-translate-y-1/2',
        "before:rounded-full before:border-2 before:border-solid before:content-['']",
        'before:border-[var(--hsFidelidade--section--lightSection--1--link__fontColor)]',
        'hover:before:border-[var(--hsFidelidade--section--lightSection--1--link__hover--fontColor)]',
      ),
  );
}

function navLinkClass(disabled: boolean) {
  return cn('hs-fidelidade-blog-listing__nav-link group', disabled && 'pointer-events-none opacity-50');
}

export default function Pagination(props: PaginationProps) {
  const { currentPageNumber, totalPageCount, nextPageNumber, defaultContent } = props;

  const currentPathName = standardizePathName(usePageUrl().pathname);
  const pathNameWithoutPageInfo = currentPathName.replace(/\/page\/\d+/, '');
  const basePagePath = `${pathNameWithoutPageInfo}/page`;
  const nextPageUrl = `${basePagePath}/${nextPageNumber}`;
  const previousPageUrl = `${basePagePath}/${currentPageNumber > 1 ? currentPageNumber - 1 : 1}`;
  const enableNextButton = currentPageNumber < totalPageCount;
  const enablePreviousButton = currentPageNumber > 1;

  const { pagesToDisplay, displayFirstNumber, displayLastNumber, displayPreviousEllipsis, displayNextEllipsis } = buildPaginationNumbers(
    currentPageNumber,
    totalPageCount,
  );

  return (
    <PaginationContainer className="hs-fidelidade-blog-listing__pagination-container flex flex-row items-center justify-center gap-hs-24">
      <NavLink className={navLinkClass(!enablePreviousButton)} href={previousPageUrl}>
        <Chevron additionalClassArray={[chevronIconClass, 'rotate-180']} />
        <ScreenReadyOnly content={defaultContent.previousPage} />
      </NavLink>

      {displayFirstNumber && (
        <PaginationLink className={paginationLinkBase} href={`${basePagePath}/1`}>
          1
        </PaginationLink>
      )}
      {displayPreviousEllipsis && <Ellipsis />}
      {pagesToDisplay.map(index => (
        <PaginationLink className={paginationLinkClass(currentPageNumber === index)} key={index} href={`${basePagePath}/${index}`}>
          {index}
        </PaginationLink>
      ))}
      {displayNextEllipsis && <Ellipsis />}
      {displayLastNumber && (
        <PaginationLink className={paginationLinkBase} href={`${basePagePath}/${totalPageCount}`}>
          {totalPageCount}
        </PaginationLink>
      )}
      <NavLink className={navLinkClass(!enableNextButton)} href={nextPageUrl}>
        <Chevron additionalClassArray={[chevronIconClass]} />
        <ScreenReadyOnly content={defaultContent.nextPage} />
      </NavLink>
    </PaginationContainer>
  );
}
