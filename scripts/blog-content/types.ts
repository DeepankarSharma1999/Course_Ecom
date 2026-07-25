export type BlogSeed = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string; // HTML body
  readMins: number;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  relatedCourseSlugs: string[];
};

export const AUTHOR = "SimpliLEAD Editorial Team";
