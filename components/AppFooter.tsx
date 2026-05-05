import Link from "next/link";
import Image from "next/image";

const LINKS = {
  Product: [
    { label: "Developers", href: "/developers" },
    { label: "Pricing",    href: "/pricing"    },
    { label: "Docs",       href: "/docs"       },
  ],
  Company: [
    { label: "About",    href: "/company"  },
    { label: "Contact",  href: "/contact"  },
    { label: "API Status", href: "/system-health" },
  ],
  Resources: [
    { label: "Notifications", href: "/notifications" },
    { label: "System Health", href: "/system-health" },
  ],
};

export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mk-footer">
      <div className="mk-shell mk-footer__inner">

        {/* Top row */}
        <div className="mk-footer__top">
          {/* Brand */}
          <div className="mk-footer__brand">
            <div className="mk-footer__brand-head">
              <span className="mk-footer__brand-icon" aria-hidden="true">
                <Image
                  src="/asp_logo.png"
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </span>
              <span className="mk-footer__brand-name">
                Ayaweisoft <span className="mk-footer__brand-pay">Pay</span>
              </span>
            </div>
            <p className="mk-footer__brand-copy">
              Financial infrastructure for modern African fintech products.
            </p>
          </div>

          {/* Link columns */}
          <div className="mk-footer__links-wrap">
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section}>
                <p className="mk-footer__links-title">{section}</p>
                <ul className="mk-footer__links-list">
                  {links.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="mk-footer__link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mk-footer__divider" />

        {/* Bottom row */}
        <div className="mk-footer__bottom">
          <p className="mk-footer__meta">
            © {year} Ayaweisoft Pay. All rights reserved.
          </p>
          <p className="mk-footer__meta">
            Banking services provided by Mbawula Microfinance Bank.
          </p>
        </div>

      </div>
    </footer>
  );
}