import type { NavigationLink, Site } from "./types.ts";

export const SITE: Site = {
    author: "Anggun Caksono",
    url: "https://winnicode.com",
    title: "Winnicode Garuda Teknologi",
    description:
        "Sistem Jurnalistik Terpadu merupakan sebuah inovasi yang bertujuan untuk menyatukan berbagai aspek dalam dunia jurnalisme, mulai dari pengumpulan informasi, proses penyuntingan, hingga publikasi konten. Platform ini dirancang untuk menjadi wadah yang komprehensif bagi para jurnalis dan penerbit dalam menjalankan tugas mereka dengan lebih efektif dan efisien",
    shortDescription:
        "Portal Jurnalistik dan berita Untuk sistem layanan terpadu.",
};

export const NavigationLinks: NavigationLink[] = [
    { name: "Beranda", url: "/posts" },
    { name: "Kategori", url: "/categories" },
    { name: "Semua Berita", url: "/timeline" },
];

export const FooterLinks = [
    {
        section: "Winnicode Garuda Teknologi",
        links: [
            { name: "Beranda", url: "/posts" },
            { name: "Semua Berita", url: "/timeline" },
            { name: "Kategori", url: "/categories" },
        ],
    },
    {
        section: "Other",
        links: [
            { name: "RSS", url: "/rss.xml" },
            // { name: "Site Map", url: "/sitemap-index.xml" },
        ],
    },
];

export const Settings = {
    GoogleAnalytics: {
        enable: false,
        id: "G-TKQ4L3ZDSF",
    },

    // See https://github.com/umami-software/umami
    UmamiAnalytics: {
        enable: true,
        dataWebsiteID: "bf63658a-9418-4f39-a6a1-5a0cedb6e429",
    },
};

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "inLanguage": "id-ID",
        "@id": SITE.url,
        "url": SITE.url,
        "name": SITE.title,
        "description": SITE.description,
        "isPartOf": {
            "@type": "WebSite",
            "url": SITE.url,
            "name": SITE.title,
            "description": SITE.description,
        },
    },
};
