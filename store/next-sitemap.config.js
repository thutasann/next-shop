/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://alluneed.vercel.app/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/404'],
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [`http://alluneed.vercel.app/sitemap.xml`, `http://alluneed.vercel.app/server-sitemap.xml`],
  },
}
