import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HorizontalScroller from "@/components/HorizontalScroller";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  return (
    <>
      <WelcomeModal />
      <Nav />
      <HorizontalScroller>
        <div data-panel className="h-panel"><Hero /></div>
        <div data-panel className="h-panel"><Projects /></div>
        <div data-panel className="h-panel"><Skills /></div>
        <div data-panel className="h-panel"><About /><Footer /></div>
      </HorizontalScroller>
    </>
  );
}
