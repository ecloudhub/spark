import { Button } from "../../dist/esm/";
import { MagneticButton } from "../../dist/esm/";

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
    </main>
  );
}
