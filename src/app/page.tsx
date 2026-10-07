import Image from "next/image";
import { Gallery } from "@/components/gallery/gallery";
import { Icon } from "@/components/ui/icon";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#collections">
        Skip to the gallery
      </a>
      <header className="site-header page-width">
        <a href="#top" aria-label="Renaissance Innovation Labs home">
          <Image
            className="brand-logo"
            src="/assets/brand-logo.png"
            alt="Renaissance Innovation Labs"
            width={150}
            height={66}
            priority
          />
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-gallery" href="#collections">
            Our gallery
          </a>
          <a href="#about">About RIL</a>
          <a
            className="visit-link"
            href="https://www.renaissancelabs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit RIL
          </a>
        </nav>
      </header>
      <main>
        <Gallery />
        <section className="about" id="about">
          <div className="page-width about-content">
            <h2>
              Ideas bring us together.
              <br />
              People move us forward.
            </h2>
            <div>
              <p>
                We're a tech hub in Port Harcourt, Nigeria, supporting
                technology enthusiasts, aspiring entrepreneurs, and our local
                community.
              </p>
              <p>
                From learning something new to building something together, this
                is our community in action.
              </p>
              <a
                className="text-link"
                href="https://www.renaissancelabs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meet Renaissance Innovation Labs
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <span>Renaissance Innovation Labs</span>
        <nav aria-label="Footer navigation">
          <a
            href="https://www.instagram.com/RxlabsHQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.twitter.com/RxlabsHQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            X / Twitter
          </a>
          <a href="#top">
            Back to top <Icon name="up" />
          </a>
        </nav>
        <span className="footer-note">Collaboration. Community. Growth.</span>
      </footer>
    </>
  );
}
