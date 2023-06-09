import { useEffect } from "react";
import Header from "./header/Header";
import Reviews from "./reviews/Reviews";
import Raisons from "./sections/Sections";
import Features from "./features/Features";
import AOS from "aos";
import "aos/dist/aos.css";
import Overview from "./overview/Overview";

export default function Landing() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 300,
    });
    AOS.refresh();
  }, []);
  return (
    <div className="flex flex-col gap-6 tablet:gap-10 laptop:gap-14 z-10">
      <Header />
      <Raisons />
      <Reviews />
      <Features />
      <Overview />
    </div>
  );
}
