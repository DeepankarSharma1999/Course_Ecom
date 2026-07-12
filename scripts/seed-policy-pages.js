// Seeds the Refund, Cancellation and Cookies Policy pages (Page model → served
// at /<slug> by the app/(public)/[slug] fallback; editable in Admin > Pages).
// Safe to re-run: skips pages that already exist so admin edits are never lost.
// Run: docker exec mindclick-web node scripts/seed-policy-pages.js
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const PAGES = [
  {
    slug: "refund-policy",
    title: "Refund Policy",
    content: `
<p><em>Last updated: July 2026</em></p>
<p>At Simplilead we want you to be fully satisfied with your training. This policy explains when and how course fees are refunded. It applies to all instructor-led (live online and classroom) and self-paced courses purchased directly from Simplilead.</p>
<h2>Instructor-led courses</h2>
<ul>
  <li><strong>More than 7 days before the batch start date:</strong> full refund, minus any payment-processing charges.</li>
  <li><strong>2–7 days before the batch start date:</strong> 50% refund, or a free transfer to any future batch of the same course.</li>
  <li><strong>Less than 48 hours before the batch start date, or after the batch has started:</strong> no refund. You may request a one-time transfer to a future batch, subject to seat availability.</li>
</ul>
<h2>Self-paced courses</h2>
<p>Self-paced course fees are refundable within <strong>7 days of purchase</strong>, provided less than 25% of the course content has been consumed and no certificate has been issued.</p>
<h2>Batches cancelled or rescheduled by Simplilead</h2>
<p>If we cancel or reschedule a batch and the new dates do not work for you, you are entitled to a <strong>100% refund</strong> — including all processing charges — or a free transfer to any batch of your choice.</p>
<h2>Exam fees and third-party costs</h2>
<p>Where the course fee includes an exam voucher or membership from a certification body (for example Scrum Alliance, Scaled Agile, PMI or PeopleCert), that portion is <strong>non-refundable once the voucher has been issued</strong> in your name.</p>
<h2>How to request a refund</h2>
<p>Email <a href="mailto:info@course-ecom.com">info@course-ecom.com</a> from your registered email address with your order details. Approved refunds are processed to the original payment method within <strong>7–10 business days</strong>.</p>
<p>For anything not covered here, please see our <a href="/cancellation-policy">Cancellation Policy</a> or contact our support team.</p>
`.trim(),
  },
  {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    content: `
<p><em>Last updated: July 2026</em></p>
<p>This policy describes how registrations with Simplilead may be cancelled or rescheduled — by you or by us.</p>
<h2>Cancellation by the participant</h2>
<ul>
  <li>Cancellation requests must be sent to <a href="mailto:info@course-ecom.com">info@course-ecom.com</a> from your registered email address.</li>
  <li>The date we receive your email is treated as the cancellation date for calculating any refund under our <a href="/refund-policy">Refund Policy</a>.</li>
  <li>Instead of cancelling, you may <strong>reschedule once free of charge</strong> to any future batch of the same course, up to 48 hours before the batch starts.</li>
  <li>You may also <strong>transfer your seat to a colleague</strong> at no cost — let us know their name and email at least 24 hours before the batch starts.</li>
</ul>
<h2>Cancellation or rescheduling by Simplilead</h2>
<ul>
  <li>We may cancel or reschedule a batch due to insufficient enrolments, trainer unavailability, or circumstances beyond our control. We will notify you by email as early as possible — normally at least 3 days before the start date.</li>
  <li>In that case you can choose a <strong>full refund (100%, including processing charges)</strong> or a free transfer to any future batch.</li>
  <li>Simplilead's liability is limited to the course fee paid. We are not responsible for travel, accommodation or other incidental costs, so we recommend arranging travel only after a batch is confirmed.</li>
</ul>
<h2>No-shows</h2>
<p>Participants who do not attend a confirmed batch without prior notice are not eligible for a refund or transfer.</p>
<p>Questions? Contact us at <a href="mailto:info@course-ecom.com">info@course-ecom.com</a> — we are happy to help.</p>
`.trim(),
  },
  {
    slug: "cookies-policy",
    title: "Cookies Policy",
    content: `
<p><em>Last updated: July 2026</em></p>
<p>This Cookies Policy explains how Simplilead ("we", "us") uses cookies and similar technologies on this website, and the choices you have.</p>
<h2>What are cookies?</h2>
<p>Cookies are small text files stored on your device when you visit a website. They help the site work correctly, remember your preferences, and understand how the site is used.</p>
<h2>Cookies we use</h2>
<ul>
  <li><strong>Strictly necessary cookies.</strong> Required for core features such as signing in to your learner account, keeping your session secure, and remembering your cookie choice itself. These cannot be switched off.</li>
  <li><strong>Preference cookies.</strong> Remember choices you make, such as your display currency, so we don't ask again on every visit.</li>
  <li><strong>Analytics cookies.</strong> Help us understand which pages and courses are most useful so we can improve the site. These are only set if you accept cookies.</li>
  <li><strong>Marketing cookies.</strong> May be used to measure the effectiveness of our campaigns and show you relevant offers. These are only set if you accept cookies.</li>
</ul>
<h2>Your choices</h2>
<p>When you first visit, a banner asks you to accept or decline non-essential cookies. You can change your mind at any time by clearing this site's cookies in your browser — the banner will appear again on your next visit. Most browsers also let you block or delete cookies entirely, though parts of the site (such as the learner dashboard) may not work without strictly necessary cookies.</p>
<h2>Third-party services</h2>
<p>Some features rely on third parties (for example embedded videos, chat, or payment providers) that may set their own cookies subject to their own policies.</p>
<h2>Contact</h2>
<p>Questions about this policy? Email us at <a href="mailto:info@course-ecom.com">info@course-ecom.com</a>.</p>
`.trim(),
  },
];

(async () => {
  for (const page of PAGES) {
    const existing = await p.page.findUnique({ where: { slug: page.slug } });
    if (existing) { console.log("exists, skipped:", page.slug); continue; }
    await p.page.create({ data: { ...page, requiresAuth: false, isPublished: true } });
    console.log("created:", page.slug);
  }
  await p.$disconnect();
})();
