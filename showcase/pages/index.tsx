import { useRef } from "react";
import {
  Button,
  MagneticButton,
  TextReveal,
  TextReader,
  HPin,
} from "../../dist/esm/";

export default function Home() {
  const textTriggerRef = useRef<HTMLDivElement>(null);
  const textWithMaskTriggerRef = useRef<HTMLDivElement>(null);

  const hpinContainer = useRef<HTMLDivElement>(null);
  const hpinSlider = useRef<HTMLDivElement>(null);

  return (
    <main>
      <section className="section">
        <h1>Buttons</h1>
        <div className="section__stack">
          <Button>Button</Button>
          {/* <MagneticButton button={<button style={{fontSize: '1rem', padding: '1rem' }}>un boton</button>} /> */}
          <MagneticButton>Button</MagneticButton>
        </div>
      </section>

      <section className="section section--reveal">
        <h1>Text reveal</h1>
        <TextReveal>
          <h2>This text will reveal itself in a fancy way</h2>
        </TextReveal>
        <TextReveal>
          <p>This text will reveal itself in a fancy way</p>
        </TextReveal>
        <div style={{ maxWidth: "300px" }}>
          <TextReveal>
            This text will reveal itself in a fancy way lorem ipsum dolor sit
            amet
          </TextReveal>
        </div>
      </section>

      <section className="section section--reader" ref={textTriggerRef}>
        <div className="section--reader__content">
          <h1>Text Reader pinned</h1>
          <TextReader
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          condimentum felis in lectus interdum imperdiet. Proin placerat sodales
          dui, sed auctor quam aliquet eget. Praesent fringilla hendrerit velit,
          ac vehicula eros semper quis. Proin placerat sodales
          dui, sed auctor quam aliquet eget. Praesent fringilla hendrerit velit,
          ac vehicula eros semper quis."
            triggerRef={textTriggerRef}
            start="top 126px"
          />
        </div>
      </section>

      <section
        className="section section--reader py"
        ref={textWithMaskTriggerRef}
      >
        <div className="section--reader__content">
          <h1>Text Reader with mask</h1>
          <TextReader
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          condimentum felis in lectus interdum imperdiet. Proin placerat sodales
          dui, sed auctor quam aliquet eget. Praesent fringilla hendrerit velit,
          ac vehicula eros semper quis. Proin placerat sodales
          dui, sed auctor quam aliquet eget. Praesent fringilla hendrerit velit,
          ac vehicula eros semper quis."
            triggerRef={textWithMaskTriggerRef}
            start="top center"
            withMask
          />
        </div>
      </section>

      <section className="section section--pin" ref={hpinContainer}>
        <h1>Horizontal pin</h1>
        <HPin triggerRef={hpinContainer} start="top top" sideSpacing="1rem">
          <div className="card" />
          <div className="card" />
          <div className="card" />
          <div className="card" />
          <div className="card" />
          <div className="card" />
          <div className="card" />
          <div className="card" />
        </HPin>
      </section>

      <div style={{ height: "300px" }} />
    </main>
  );
}
