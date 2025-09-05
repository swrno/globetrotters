import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Globetrotters - Travel Agency",
  description: "Strategic Itineraries. Adventurous Memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Damion&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/swiper.css" />
        <link rel="stylesheet" href="/css/fancybox.css" />
        <link rel="stylesheet" href="/css/easy-responsive-tabs.css" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body className="antialiased">
        {children}
        <script src="/js/jquery.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/swiper-bundle.min.js"></script>
        <script src="/js/fancybox.umd.js"></script>
        <script src="/js/easyResponsiveTabs.js"></script>
        <script src="/js/custom.js"></script>
      </body>
    </html>
  );
}
