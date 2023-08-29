import Link from "next/link";
import { Button, MagneticButton, TextReveal } from "../../dist/esm/";

export default function Home() {
  return (
    <main>
      <section className="section">
        <h1>Buttons</h1>
        <div className="section__stack">
          <Button>Button</Button>
          <MagneticButton>Magnetic Button</MagneticButton>
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
    </main>
  );
}
