import { useRef } from "react";
import {
  Button,
  MagneticButton,
  TextReveal,
  TextReader,
  HPin,
  VPin,
  ElasticButton,
  VOverlap
} from "../../dist/esm/";
import { overlapData } from "@/mock";
import FigureCaption from "@/components/figure-caption";

export default function Home() {
  const textTriggerRef = useRef<HTMLDivElement>(null);
  const textWithMaskTriggerRef = useRef<HTMLDivElement>(null);

  const hpinContainer = useRef<HTMLDivElement>(null);

  return (
    <main>
      <section className="section">
        <h1>Buttons</h1>
        <div className="section__stack">
          <Button>Button</Button>
          <MagneticButton>Magnetic</MagneticButton>
          <ElasticButton>Elastic!</ElasticButton>
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
            pinRef={textTriggerRef}
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
            pinRef={textWithMaskTriggerRef}
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

      <section className="section section--voverlap">
        <div className="section--voverlap__container">
          <VOverlap
            images={overlapData.map((o) => o.image)}
            content={overlapData.map((item, index) => (
              <FigureCaption {...item} key={index} />
            ))}
            contentImgClass="figure-caption-img"
          />
        </div>
      </section>

      <section className="section section--vpin">
        <div className="section--vpin__container">
          <VPin
            items={
              <>
                <div className="card card--lg" />
                <div className="card card--lg" />
                <div className="card card--lg" />
                <div className="card card--lg" />
                <div className="card card--lg" />
              </>
            }
          >
            <h1>Vertical Pin</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse quis leo lectus. Integer vestibulum eros vitae
              vulputate pellentesque. Morbi ac libero imperdiet, venenatis dolor
              eget, tempor augue.
            </p>
          </VPin>
        </div>
      </section>      
    </main>
  );
}
