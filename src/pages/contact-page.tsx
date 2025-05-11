"use client";

import { Button } from "../components/ui/button";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src="src/assets/heroimage.png"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "cursive" }}
            >
              Contact Us
            </h1>
            <p
              className="text-xl text-white/90"
              style={{ fontFamily: "cursive" }}
            >
              Get in touch with our team to discuss your event needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-5 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {/* <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Have questions about our services or ready to start planning your
              event? Reach out to us using the contact information below.
            </p> */}
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.3597251230681!2d81.61443165587998!3d28.595089483664758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a285f759b619c7%3A0xf5cedfd437ce9b57!2sSami%20Tent%20House!5e0!3m2!1sen!2snp!4v1746251081561!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Horizontal Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg min-w-[250px]">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold mb-2">Address</h3>
              <p className="text-center">Birendranagar-6,surkhet</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-muted rounded-lg min-w-[250px]">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold mb-2">Phone</h3>
              <p>9876543210</p>
              <p>9876543210</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-muted rounded-lg min-w-[250px]">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p>samitenthouse@gmail.com</p>
            </div>
          </div>

          {/* Business Hours
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div> */}

          {/* Social Media */}
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
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
      </section>
    </div>
  );
}
