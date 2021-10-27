const title = "NoiaDucks";
const description =
  "NoiaDucks is a collection of 1000 uniquely generated 24-bit ducks.";

const SEO = {
  title,
  description,
  canonical: "https://askaiajnsam.vercel.app",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://askaiajnsam.vercel.app",
    title,
    description,
    images: [
      {
        url: "https://askaiajnsam.vercel.app/images/logo.png",
        alt: title,
        width: 720,
        height: 720,
      },
    ],
  },
};

export default SEO;
