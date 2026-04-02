import { SectionVariantType } from '../types/fields.js';

export type SectionColorConfig = {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  linkColor: string;
  textDecoration: string;
  textDecorationColor: string;
  linkHoverColor: string;
  linkHoverTextDecoration: string;
  linkHoverTextDecorationColor: string;
  blockquoteTextColor: string;
  blockquoteBackgroundColor: string;
  blockquoteAccentColor: string;
};

export type SectionColorsMap = Record<SectionVariantType, SectionColorConfig>;

export const sectionColorsMap: SectionColorsMap = {
  section_variant_1: {
    backgroundColor: 'var(--hsFidelidade--section--lightSection--1__backgroundColor)',
    textColor: 'var(--hsFidelidade--section--lightSection--1__textColor)',
    accentColor: 'var(--hsFidelidade--section--lightSection--1__accentColor)',
    linkColor: 'var(--hsFidelidade--section--lightSection--1--link__fontColor)',
    textDecoration: 'var(--hsFidelidade--section--lightSection--1--link__textDecoration)',
    textDecorationColor: 'var(--hsFidelidade--section--lightSection--1--link__textDecorationColor)',
    linkHoverColor: 'var(--hsFidelidade--section--lightSection--1--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsFidelidade--section--lightSection--1--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsFidelidade--section--lightSection--1--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsFidelidade--section--lightSection--1--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsFidelidade--section--lightSection--1--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsFidelidade--section--lightSection--1--blockquote__accentColor)',
  },
  section_variant_2: {
    backgroundColor: 'var(--hsFidelidade--section--lightSection--2__backgroundColor)',
    textColor: 'var(--hsFidelidade--section--lightSection--2__textColor)',
    accentColor: 'var(--hsFidelidade--section--lightSection--2__accentColor)',
    linkColor: 'var(--hsFidelidade--section--lightSection--2--link__fontColor)',
    textDecoration: 'var(--hsFidelidade--section--lightSection--2--link__textDecoration)',
    textDecorationColor: 'var(--hsFidelidade--section--lightSection--2--link__textDecorationColor)',
    linkHoverColor: 'var(--hsFidelidade--section--lightSection--2--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsFidelidade--section--lightSection--2--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsFidelidade--section--lightSection--2--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsFidelidade--section--lightSection--2--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsFidelidade--section--lightSection--2--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsFidelidade--section--lightSection--2--blockquote__accentColor)',
  },
  section_variant_3: {
    backgroundColor: 'var(--hsFidelidade--section--lightSection--3__backgroundColor)',
    textColor: 'var(--hsFidelidade--section--lightSection--3__textColor)',
    accentColor: 'var(--hsFidelidade--section--lightSection--3__accentColor)',
    linkColor: 'var(--hsFidelidade--section--lightSection--3--link__fontColor)',
    textDecoration: 'var(--hsFidelidade--section--lightSection--3--link__textDecoration)',
    textDecorationColor: 'var(--hsFidelidade--section--lightSection--3--link__textDecorationColor)',
    linkHoverColor: 'var(--hsFidelidade--section--lightSection--3--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsFidelidade--section--lightSection--3--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsFidelidade--section--lightSection--3--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsFidelidade--section--lightSection--3--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsFidelidade--section--lightSection--3--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsFidelidade--section--lightSection--3--blockquote__accentColor)',
  },
  section_variant_4: {
    backgroundColor: 'var(--hsFidelidade--section--darkSection--1__backgroundColor)',
    textColor: 'var(--hsFidelidade--section--darkSection--1__textColor)',
    accentColor: 'var(--hsFidelidade--section--darkSection--1__accentColor)',
    linkColor: 'var(--hsFidelidade--section--darkSection--1--link__fontColor)',
    textDecoration: 'var(--hsFidelidade--section--darkSection--1--link__textDecoration)',
    textDecorationColor: 'var(--hsFidelidade--section--darkSection--1--link__textDecorationColor)',
    linkHoverColor: 'var(--hsFidelidade--section--darkSection--1--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsFidelidade--section--darkSection--1--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsFidelidade--section--darkSection--1--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsFidelidade--section--darkSection--1--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsFidelidade--section--darkSection--1--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsFidelidade--section--darkSection--1--blockquote__accentColor)',
  },
};
