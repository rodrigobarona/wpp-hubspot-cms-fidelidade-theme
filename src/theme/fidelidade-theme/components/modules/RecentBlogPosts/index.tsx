import { ModuleMeta } from '../../types/modules.js';
import { cn } from '../../utils/cn.js';
import { createComponent } from '../../utils/create-component.js';
import '../../styles/tailwind.css';
// TODO: Re-enable when upgrading to Content Hub Pro
// import { withUrlPath } from '@hubspot/cms-components';
import cardIconSvg from './assets/card-icon-temp.svg';
import BlogCardComponent from '../../BlogCardComponent/index.js';
// TODO: Re-enable when upgrading to Content Hub Pro
// import fetchGatedPosts from '../../utils/ServerSideProps/fetchGatedBlogPosts.js';
import { HeadingLevelType } from '../../types/fields.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { PlaceholderEmptyContent } from '../../PlaceholderComponent/PlaceholderEmptyContent.js';

// Types

type RecentBlogPostsProps = {
  hublData: {
    posts: {
      id: number;
      title: string;
      featuredImage: string;
      featuredImageAltText: string;
      featuredImageWidth: number;
      featuredImageHeight: number;
      topicNames: string[];
      absoluteUrl: string;
    }[];
    isInEditor: boolean;
    renderedWithGrids: boolean;
  };
  fieldValues: {
    headingAndTextHeadingLevel: HeadingLevelType;
    groupStyle: CardStyleFieldLibraryType & HeadingStyleFieldLibraryType;
    groupPlaceholderText: {
      placeholderTitle: string;
      placeholderDescription: string;
    };
  };
  serverSideProps: {
    gatedContentIds: number[];
  };
};

// Components

const RecentBlogPosts = createComponent('div');
const BlogCardsContainer = createComponent('div');

export const Component = (props: RecentBlogPostsProps) => {
  const {
    hublData: { posts, isInEditor, renderedWithGrids = false },
    fieldValues: {
      headingAndTextHeadingLevel,
      groupStyle: { cardStyleVariant, headingStyleVariant },
      groupPlaceholderText: { placeholderTitle, placeholderDescription },
    },
    serverSideProps: { gatedContentIds = [] } = { gatedContentIds: [] },
  } = props;

  const postsToUse = posts || [];

  const rootClasses = cn(
    'hs-fidelidade-recent-blog-posts',
    renderedWithGrids ? 'hs-fidelidade-recent-blog-posts--grids' : 'hs-fidelidade-recent-blog-posts--bootstrap',
    !renderedWithGrids && '@container/blog-grid',
    !renderedWithGrids && [
      '@768px/blog-grid:[&_.hs-fidelidade-card--blog__card-wrapper]:h-auto',
      '@768px/blog-grid:[&_.hs-fidelidade-card--blog__card-wrapper]:w-[calc(50%-var(--hsFidelidade--spacing--32,32px))]',
      '@768px/blog-grid:[&_.hs-fidelidade-card--blog__card-wrapper]:max-w-[calc(50%-var(--hsFidelidade--spacing--32,32px))]',
      '@1001px/blog-grid:[&_.hs-fidelidade-card--blog__card-wrapper]:h-auto',
      '@1001px/blog-grid:[&_.hs-fidelidade-card--blog__card-wrapper]:w-[calc(33.333%-var(--hsFidelidade--spacing--32,32px))]',
      '@1001px/blog-grid:[&_.hs-fidelidade-card--blog__card-wrapper]:max-w-[calc(33.333%-var(--hsFidelidade--spacing--32,32px))]',
    ],
    renderedWithGrids && [
      'md:[&_.hs-fidelidade-card--blog__card-wrapper]:h-auto',
      'md:[&_.hs-fidelidade-card--blog__card-wrapper]:w-[calc(50%-var(--hsFidelidade--spacing--32,32px))]',
      'md:[&_.hs-fidelidade-card--blog__card-wrapper]:max-w-[calc(50%-var(--hsFidelidade--spacing--32,32px))]',
      'min-[1001px]:[&_.hs-fidelidade-card--blog__card-wrapper]:h-auto',
      'min-[1001px]:[&_.hs-fidelidade-card--blog__card-wrapper]:w-[calc(33.333%-var(--hsFidelidade--spacing--32,32px))]',
      'min-[1001px]:[&_.hs-fidelidade-card--blog__card-wrapper]:max-w-[calc(33.333%-var(--hsFidelidade--spacing--32,32px))]',
    ],
  );

  const blogCardsContainerClasses = cn(
    'hs-fidelidade-recent-blog-posts__blog-card-container flex flex-row flex-wrap items-stretch justify-center gap-hs-32 mb-hs-48',
    renderedWithGrids && 'mb-0',
  );

  return (
    <RecentBlogPosts className={rootClasses}>
      <BlogCardsContainer className={blogCardsContainerClasses}>
        {postsToUse.length === 0 && isInEditor ? (
          <PlaceholderEmptyContent title={placeholderTitle} description={placeholderDescription} icon={cardIconSvg} />
        ) : (
          postsToUse.map(post => (
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
              additionalClassArray={['hs-fidelidade-recent-blog-posts__blog-card']}
            />
          ))
        )}
      </BlogCardsContainer>
    </RecentBlogPosts>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% if module.blog is number %}
    {% set blog = module.blog %}
  {% else %}
    {% set blog = 'default' %}
  {% endif %}

  {% set blog_post_ids = [] %}
  {% set blog_posts = [] %}

  {# Check if tag filter is enabled and a tag is selected #}
  {% if module.filterByTag and module.tag %}
    {% set posts = blog_recent_tag_posts(blog, module.tag, 3) %}
  {% else %}
    {% set posts = blog_recent_posts(blog, 3) %}
  {% endif %}

  {% for post in posts %}
    {% do blog_post_ids.append(post.id) %}

    {% set temp_post = {
        id: post.id,
        absoluteUrl: post.absoluteUrl|escape_url,
        featuredImage: post.featuredImage,
        featuredImageAltText: post.featuredImageAltText,
        featuredImageWidth: post.featuredImageWidth,
        featuredImageHeight: post.featuredImageHeight,
        title: post.label,
        topicNames: post.topicNames
      }
    %}
    {% do blog_posts.append(temp_post) %}
  {% endfor %}

  {% set hublData = {
    'posts': blog_posts,
    'blogPostIds': blog_post_ids,
    'isInEditor': is_in_editor,
    'renderedWithGrids': rendered_with_grids
    }
  %}
`;

// TODO: Re-enable when upgrading to Content Hub Pro (requires cms.functions scope)
// export const getServerSideProps = withUrlPath(fetchGatedPosts);

export const meta: ModuleMeta = {
  label: 'Recent blog posts',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: cardIconSvg,
  categories: ['blog'],
  is_available_for_new_content: true,
};

export const defaultModuleConfig = {
  moduleName: 'fidelidade/components/modules/recent_blog_posts',
  version: 0,
  themeModule: true,
};
