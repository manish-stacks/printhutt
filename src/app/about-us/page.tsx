import { AboutUs } from "@/pages/AboutUs"

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: 'about-us',
  description: 'about-us',
}

const AboutPage= () => {
  return <AboutUs />
}

export default AboutPage
