import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-muted-foreground">
      <div className="container mx-auto px-4 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4 items-center">
              <img
                src="src/assets/eventlogo.png"
                alt="SH Events"
                className="h-24 w-auto"
              />
            </div>
            <p className="mb-4">
              Creating unforgettable moments and exceptional events for over a
              decade.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span>Sanihall line, Surkhet</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span>98005674411</span>
            
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span>samitenthouse@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Follow Us
            </h3>
            <div className="space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.facebook.com/salim.siddhikai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Sami Tent House   | All rights reserved |  Created by Monu Siddiki</p>
        </div>
      </div>
    </footer>
  );
}
