import { ArrowRight } from 'lucide-react';

type OurStoryPageProps = { navigate: (page: string) => void };

export default function OurStoryPage({ navigate }: OurStoryPageProps) {
  return <main className="our-story page-shell editorial-story">
    <section className="story-moment story-opening">
      <div className="story-copy">
        <p className="eyebrow">The heart of KADAM</p>
        <h1>India,<br /><em>Made by Hand.</em></h1>
        <p>Across India, generations of artists, craftspeople, painters and makers have shaped a visual identity by turning everyday materials into expressions of culture.</p>
      </div>
      <figure className="story-photo">
        <img src="/images/our-story/shoemaker.jpg" alt="A traditional shoemaker shaping a shoe by hand" />
        <figcaption><strong>THE HAND BEHIND THE CRAFT</strong><span>Every tradition begins with someone who keeps it alive.</span></figcaption>
      </figure>
    </section>

    <section className="story-moment image-left">
      <div className="story-copy">
        <p className="eyebrow">Art & memory</p>
        <h2>Art is more than a pattern.</h2>
        <p>Indian art is never simply decoration. Its symbols hold memory; colour carries place; a single line can keep a story alive. KADAM looks to these visual languages for feeling and rhythm, then lets them inform a design made for movement today.</p>
      </div>
      <figure className="story-photo">
        <img src="/images/our-story/artist.jpg" alt="An artist painting a traditional Indian artwork by hand" loading="lazy" />
        <figcaption><strong>ART THAT TELLS A STORY</strong><span>Every line, colour and motif carries a piece of where it comes from.</span></figcaption>
      </figure>
    </section>

    <section className="story-moment">
      <div className="story-copy">
        <p className="eyebrow">From hands to heritage</p>
        <h2>Made slowly.<br /><em>Carried forward.</em></h2>
        <p>On a loom, knowledge passes through practiced hands: in the tension of each thread, the patience to begin again, the eye that knows when a detail is right. KADAM draws from this bond between craft, culture and contemporary design, carrying its spirit into a new generation.</p>
      </div>
      <figure className="story-photo">
        <img src="/images/our-story/weaver.jpg" alt="A traditional weaver working carefully at a handloom" loading="lazy" />
        <figcaption><strong>CRAFTED WITH PATIENCE</strong><span>Generations of knowledge live in the details.</span></figcaption>
      </figure>
    </section>

    <section className="story-closing">
      <p className="eyebrow">A living visual language</p>
      <h2 className="story-formula">ART <span>→</span> CULTURE <span>→</span> DESIGN <span>→</span> KADAM</h2>
      <p>KADAM does not attempt to recreate traditional Indian art exactly. We take inspiration from its visual language and reimagine it for a contemporary generation.</p>
      <button className="button primary" onClick={() => navigate('shop')}>Find your pair <ArrowRight size={16} /></button>
      <p className="story-signoff">India, Reimagined.</p>
    </section>
  </main>;
}