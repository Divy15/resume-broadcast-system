import HeroSection        from "./components/HeroSection.component";
import HowItWorks         from "./components/HowItWorks.component";
import FeaturesSection    from "./components/FeaturesSection.component";
// import StatsSection       from "./components/StatsSection.component";
// import TestimonialsSection from "./components/TestimonialsSection.component";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      {/* <StatsSection /> */}
      {/* <TestimonialsSection /> */}
    </>
  );
};

export default Home;