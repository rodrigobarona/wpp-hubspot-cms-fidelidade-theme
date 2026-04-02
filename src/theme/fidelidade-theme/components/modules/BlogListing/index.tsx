import { ModuleMeta } from '../../types/modules.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import blogSVG from './assets/blog.svg';
import '../../styles/tailwind.css';
// TODO: Re-enable when upgrading to Content Hub Pro
// import { withUrlPath } from '@hubspot/cms-components';
import BlogCardComponent from '../../BlogCardComponent/index.js';
import Pagination from './pagination.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
// TODO: Re-enable when upgrading to Content Hub Pro
// import fetchGatedPosts from '../../utils/ServerSideProps/fetchGatedBlogPosts.js';

// Types

type BlogListingProps = HeadingAndTextFieldLibraryType & {
  hublData: {
    blogPosts: {
      id: number;
      title: string;
      featuredImage: string;
      featuredImageAltText: string;
      featuredImageWidth: number;
      featuredImageHeight: number;
      topicNames: string[];
      absoluteUrl: string;
    }[];
    currentPageNumber: number;
    nextPageNumber: number;
    totalPageCount: number;
    use_featured_image_in_summary: boolean;
  };
  serverSideProps: {
    gatedContentIds: number[];
  };
  groupStyle: CardStyleFieldLibraryType & HeadingStyleFieldLibraryType;
  defaultContent: {
    nextPage: string;
    previousPage: string;
  };
};

// Components

const BlogListing = createComponent('div');
const BlogCardsContainer = createComponent('div');

export const Component = (props: BlogListingProps) => {
  if (!props?.hublData?.blogPosts) {
    return null; // or return an error message component
  }

  const {
    hublData: { blogPosts, currentPageNumber, nextPageNumber, totalPageCount, use_featured_image_in_summary },
    serverSideProps: { gatedContentIds = [] } = { gatedContentIds: [] },
    groupStyle: { headingStyleVariant, cardStyleVariant } = {}, // Provide default empty object
    headingAndTextHeadingLevel,
    defaultContent,
  } = props;

  const hasFeaturedPost =
    (currentPageNumber === 1 || currentPageNumber === undefined) && use_featured_image_in_summary;

  const blogListingClasses = cn(
    'hs-fidelidade-blog-listing',
    hasFeaturedPost && 'hs-fidelidade-blog-listing--has-featured-post',
    hasFeaturedPost && [
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type]:col-span-2',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type]:row-span-2',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type_.hs-fidelidade-card--blog__image-container]:relative',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type_.hs-fidelidade-card--blog__image-container]:overflow-hidden',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type_.hs-fidelidade-card--blog__image-container]:w-full',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type_.hs-fidelidade-card--blog__image-container]:aspect-[1.13]',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type_.hs-fidelidade-card--blog__image-container]:object-cover',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type_.hs-fidelidade-card--blog__image-container_img]:h-full',
      'sm:[&_.hs-fidelidade-card--blog__card-wrapper:first-of-type_.hs-fidelidade-card--blog__image-container_img]:w-full',
    ],
  );

  const blogCardsContainerClasses = cn(
    'hs-fidelidade-blog-listing__blog-card-container mb-hs-48 grid auto-rows-auto grid-cols-1 gap-hs-32 sm:grid-cols-2 md:grid-cols-3',
    '[&_.hs-fidelidade-card--blog__card-wrapper]:col-span-1 [&_.hs-fidelidade-card--blog__card-wrapper]:row-span-1',
  );

  return (
    <BlogListing className={blogListingClasses}>
      <BlogCardsContainer className={blogCardsContainerClasses}>
        {blogPosts.map(post => {
          return (
            <BlogCardComponent
              key={post.id}
              post={{
                ...post,
                id: post.id.toString(),
              }}
              headingAndTextHeadingLevel={headingAndTextHeadingLevel}
              headingStyleVariant={headingStyleVariant}
              cardStyleVariant={cardStyleVariant}
              gatedContentIds={gatedContentIds.map(id => id.toString())}
              additionalClassArray={['hs-fidelidade-blog-listing__blog-card']}
            />
          );
        })}
      </BlogCardsContainer>
      <Pagination currentPageNumber={currentPageNumber} nextPageNumber={nextPageNumber} totalPageCount={totalPageCount} defaultContent={defaultContent} />
    </BlogListing>
  );
};

export { fields } from './fields.js';

export { default as hublDataTemplate } from './hubl_data.hubl.html?raw';

// TODO: Re-enable when upgrading to Content Hub Pro (requires cms.functions scope)
// export const getServerSideProps = withUrlPath(fetchGatedPosts);

export const meta: ModuleMeta = {
  label: 'Blog listing',
  content_types: ['BLOG_LISTING'],
  icon: blogSVG,
  categories: ['blog'],
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/blog_listing',
  version: 0,
  themeModule: true,
};
