import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'images.planningcenterusercontent.com',
        pathname: '/**',
      },
    ],
  },
  // Legacy URLs from two prior CMS eras (a ColdFusion "Church4" theme with
  // /content/*.html + /sermon/<id>/<slug>.html, and a later WordPress-ish
  // site with /about/*, /sermons/*, /series/*) are still indexed by Google
  // and 404 on this site. Map them onto the closest current equivalent so
  // those search results resolve instead of dead-ending.
  async redirects() {
    return [
      // Sermons / watch — no per-sermon pages exist anymore, so everything
      // sermon-related lands on the watch page.
      { source: '/sermon/:id/:slug', destination: '/watch', permanent: true },
      { source: '/sermons', destination: '/watch', permanent: true },
      { source: '/sermons/:slug+', destination: '/watch', permanent: true },
      { source: '/sermon-series/:slug', destination: '/watch', permanent: true },
      { source: '/series/:slug+', destination: '/watch', permanent: true },
      { source: '/grace-sermons', destination: '/watch', permanent: true },
      { source: '/grace-sermons/:slug+', destination: '/watch', permanent: true },
      { source: '/topics/:slug+', destination: '/watch', permanent: true },
      { source: '/all-series', destination: '/watch', permanent: true },
      { source: '/content/Series.html', destination: '/watch', permanent: true },
      { source: '/content/sermons.html', destination: '/watch', permanent: true },
      { source: '/live-stream', destination: '/watch', permanent: true },
      { source: '/content/Live-Stream.html', destination: '/watch', permanent: true },
      { source: '/content/Worship-Service-Livestream.html', destination: '/watch', permanent: true },
      { source: '/youtube-live-test', destination: '/watch', permanent: true },
      { source: '/service-type/:slug+', destination: '/watch', permanent: true },

      // About / leadership / beliefs
      { source: '/about/:slug+', destination: '/about', permanent: true },
      { source: '/Elders.html', destination: '/about', permanent: true },
      { source: '/content/Elders.html', destination: '/about', permanent: true },
      { source: '/content/staff.html', destination: '/about', permanent: true },
      { source: '/Beliefs.html', destination: '/about', permanent: true },
      { source: '/content/Beliefs.html', destination: '/about', permanent: true },
      { source: '/content/fulldoctrinalstatement.html', destination: '/about', permanent: true },
      { source: '/preacher/:slug+', destination: '/about', permanent: true },

      // Ministries
      { source: '/content/Children.html', destination: '/ministries/children', permanent: true },
      { source: '/content/Vacation-Bible-School.html', destination: '/ministries/children', permanent: true },
      { source: '/kids', destination: '/ministries/children', permanent: true },
      { source: '/kids/:slug+', destination: '/ministries/children', permanent: true },
      { source: '/kids-sports-camp-2019', destination: '/ministries/children', permanent: true },
      { source: '/the-gospel-project', destination: '/ministries/children', permanent: true },
      { source: '/content/Students.html', destination: '/ministries/students', permanent: true },
      { source: '/student-pastor-director', destination: '/ministries/students', permanent: true },
      { source: '/content/City-Groups.html', destination: '/ministries/community-groups', permanent: true },
      { source: '/content/Groups.html', destination: '/ministries/community-groups', permanent: true },
      { source: '/City-Group-Sign-Up.html', destination: '/ministries/community-groups', permanent: true },
      { source: '/connect/connect-groups', destination: '/ministries/community-groups', permanent: true },
      { source: '/small-groups', destination: '/ministries/community-groups', permanent: true },
      { source: '/small-groups/:slug+', destination: '/ministries/community-groups', permanent: true },
      { source: '/connect', destination: '/ministries', permanent: true },
      { source: '/womens-bible-study', destination: '/ministries', permanent: true },
      { source: '/fpu', destination: '/ministries', permanent: true },

      // Next steps / membership
      { source: '/content/I-m-New.html', destination: '/next-steps', permanent: true },
      { source: '/what-to-expect', destination: '/next-steps', permanent: true },
      { source: '/worship-service-information', destination: '/next-steps', permanent: true },
      { source: '/worship-service-information/what-to-expect', destination: '/next-steps', permanent: true },
      { source: '/membership', destination: '/next-steps', permanent: true },
      { source: '/content/Membership.html', destination: '/next-steps', permanent: true },
      { source: '/connect/membership', destination: '/next-steps', permanent: true },

      // Giving — old site linked its own giving/paypal pages; send straight
      // to Church Center like the current header "Give" link does.
      { source: '/giving', destination: 'https://gotachurch.churchcenteronline.com/giving?open-in-church-center-modal=true', permanent: true },
      { source: '/paypal', destination: 'https://gotachurch.churchcenteronline.com/giving?open-in-church-center-modal=true', permanent: true },

      // Member login
      { source: '/content/MemberLogin.html', destination: 'https://gotachurch.churchcenteronline.com', permanent: true },
      { source: '/memberlogin', destination: 'https://gotachurch.churchcenteronline.com', permanent: true },
      { source: '/member', destination: 'https://gotachurch.churchcenteronline.com', permanent: true },

      // Contact / events / blog — no direct equivalent on this site, send home
      { source: '/contact', destination: '/', permanent: true },
      { source: '/contact.html', destination: '/', permanent: true },
      { source: '/content/contact.html', destination: '/', permanent: true },
      { source: '/send/email.html', destination: '/', permanent: true },
      { source: '/events', destination: '/', permanent: true },
      { source: '/content/events.html', destination: '/', permanent: true },
      { source: '/content/COVID-19.html', destination: '/', permanent: true },
      { source: '/content/forgotpassword.html', destination: '/', permanent: true },
      { source: '/content', destination: '/', permanent: true },
      { source: '/Blog.html', destination: '/', permanent: true },
      { source: '/content/blog.html', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:slug+', destination: '/', permanent: true },
      { source: '/category/:slug+', destination: '/', permanent: true },
      { source: '/article/:slug+', destination: '/', permanent: true },
      { source: '/featured/:slug+', destination: '/', permanent: true },
      { source: '/author/:slug+', destination: '/', permanent: true },
      { source: '/links', destination: '/', permanent: true },
      { source: '/underdevelopment', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://js.churchcenter.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.googleapis.com https://cdn.sanity.io https://*.sanity.io https://images.planningcenterusercontent.com https://*.churchcenter.com https://*.churchcenteronline.com https://www.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.googletagmanager.com",
              "frame-src 'self' https://www.youtube.com https://www.google.com https://*.churchcenter.com https://*.churchcenteronline.com",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              // Only upgrade to HTTPS in production, not in dev
              ...(process.env.NODE_ENV === 'production' ? ["upgrade-insecure-requests"] : []),
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
