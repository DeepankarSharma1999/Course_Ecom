// Default footer link columns. Used by the footer (when SiteSettings.footerColumns
// is empty) and by the admin editor (so it starts from the real content, not blank).
export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/info/careers" },
      { label: "Accreditation", href: "/info/accreditation" },
      { label: "Customer Speak", href: "/info/customer-speak" },
      { label: "Contact Us", href: "/info/contact-us" },
      { label: "Grievance Redressal", href: "/info/grievance-redressal" },
    ],
  },
  {
    title: "Offerings",
    links: [
      { label: "Live Virtual (Online)", href: "/info/live-virtual-online" },
      { label: "Classroom", href: "/info/classroom" },
      { label: "Agile Services", href: "/info/agile-services" },
      { label: "Refer and Earn", href: "/refer-earn" },
      { label: "Corporate Training", href: "/corporate-training" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Course Info", href: "/info/course-info" },
      { label: "Tutorials", href: "/info/tutorials" },
      { label: "Blogs", href: "/info/blogs" },
      { label: "Interview Questions", href: "/info/interview-questions" },
      { label: "Practice Tests", href: "/practice-tests" },
      { label: "Free Courses", href: "/free-course" },
      { label: "Masterclasses", href: "/info/masterclasses" },
    ],
  },
  {
    title: "Partner with Us",
    links: [
      { label: "Become an Instructor", href: "/info/become-an-instructor" },
      { label: "Become a Training Partner", href: "/info/become-a-training-partner" },
      { label: "Affiliate", href: "/info/affiliate" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/info/faqs" },
      { label: "Terms and Conditions", href: "/info/terms-and-conditions" },
      { label: "Privacy Policy and Disclaimer", href: "/info/privacy-policy-and-disclaimer" },
      { label: "Cancellation and Refund Policy", href: "/info/cancellation-and-refund-policy" },
      { label: "Report a Vulnerability", href: "/info/report-a-vulnerability" },
    ],
  },
];
