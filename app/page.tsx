import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HorizontalScroller from "@/components/HorizontalScroller";

const panelStyle: React.CSSProperties = {
  minWidth: '100vw',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollSnapAlign: 'start',
  flexShrink: 0,
}

export default function Home() {
  return (
    <>
      <Nav />
      <HorizontalScroller>
        <div data-panel style={panelStyle}>
          <Hero />
        </div>
        <div data-panel style={panelStyle}>
          <Projects />
        </div>
        <div data-panel style={panelStyle}>
          <Skills />
        </div>
        <div data-panel style={panelStyle}>
          <About />
          <Footer />
        </div>
      </HorizontalScroller>
    </>
  );
}
