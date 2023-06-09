
import AboutHeader from "./AboutHeader";
import AllInOne from "./all-in-one/AllInOne";
import Multiservices from "./multiservices/Multiservices";

export default function About() {
  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 pt-12 px-3 tablet:px-2">
      <AboutHeader />
      <Multiservices/>
      <AllInOne/>
    </div>
  );
}
