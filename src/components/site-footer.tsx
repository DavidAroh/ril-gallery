import Image from "next/image";
import { albums } from "@/data/albums";
import { Icon } from "@/components/ui/icon";
import { BackToTop } from "@/components/ui/back-to-top";

const connections = [
  { name: "Visit RIL", url: "https://www.renaissancelabs.org/" },
  { name: "Instagram", url: "https://www.instagram.com/RxlabsHQ" },
  { name: "X / Twitter", url: "https://www.twitter.com/RxlabsHQ" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-main">
          <div className="footer-brand">
            <a
              className="footer-home"
              href="#top"
              aria-label="Renaissance Innovation Labs home"
            >
              <Image
                src="/assets/brand-logo.png"
                alt="Renaissance Innovation Labs"
                width={180}
                height={79}
              />
            </a>
            <p>Collaboration. Community. Growth.</p>
            <span>Port Harcourt, Nigeria.</span>
          </div>
          <nav className="footer-albums" aria-labelledby="footer-albums-title">
            <h2 id="footer-albums-title">Explore the gallery</h2>
            {albums.map((album) => (
              <a href={`#${album.id}`} key={album.id}>
                {album.name}
              </a>
            ))}
          </nav>
          <nav
            className="footer-connections"
            aria-labelledby="footer-connect-title"
          >
            <h2 id="footer-connect-title">Keep in touch</h2>
            {connections.map((connection) => (
              <a
                href={connection.url}
                key={connection.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{connection.name}</span>
                <Icon name="external" />
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>Renaissance Innovation Labs</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
