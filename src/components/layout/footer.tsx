import { Link } from "react-router-dom";
import {
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
                src="/assets/eventlogo.png"
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
                <span>9819513221</span>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.instagram.com/samitenthouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.tiktok.com/@samitenthouse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                  </svg>
                  <span className="sr-only">TitTok</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p>
            &copy; {currentYear} Sami Tent House | All rights reserved | Created
            by Monu Siddiki
          </p>
        </div>
      </div>
    </footer>
  );
}


// import { Link } from "react-router-dom";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Instagram,
//   Youtube,
//   ArrowRight,
//   Heart
// } from "lucide-react";
// import { Button } from "../ui/button";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   // Enhanced footer sections with better organization
//   const quickLinks = [
//     { name: "Home", path: "/" },
//     { name: "About Us", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "Contact", path: "/contact" },
//     { name: "Outlets", path: "/outlets" }
//   ];

//   const services = [
//     "Wedding Planning",
//     "Corporate Events", 
//     "Cultural Celebrations",
//     "School Events",
//     "Catering Services",
//     "Event Decoration"
//   ];

//   return (
//     <footer className="bg-navy text-white relative overflow-hidden">
//       {/* Decorative background elements for luxury feel */}
//       <div className="absolute top-0 right-0 w-64 h-64 gradient-gold opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
//       <div className="absolute bottom-0 left-0 w-48 h-48 gradient-gold opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Main footer content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:py-16">
          
//           {/* Company Info Section - Enhanced */}
//           <div className="lg:col-span-1">
//             <div className="mb-6">
//               <img
//                 src="/assets/eventlogo.png"
//                 alt="Sami Tent House - Premium Event Management"
//                 className="h-20 w-auto mb-4"
//               />
//               <h3 className="font-heading text-xl font-bold text-primary mb-2">
//                 Sami Tent House
//               </h3>
//             </div>
//             <p className="text-white/80 mb-6 leading-relaxed">
//               Creating unforgettable moments and exceptional events with luxury, 
//               elegance, and attention to every detail for over a decade.
//             </p>
            
//             {/* Enhanced stats */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="text-center bg-white/10 rounded-lg p-3">
//                 <div className="font-heading text-lg font-bold text-primary">6000+</div>
//                 <div className="text-xs text-white/70">Events</div>
//               </div>
//               <div className="text-center bg-white/10 rounded-lg p-3">
//                 <div className="font-heading text-lg font-bold text-primary">10+</div>
//                 <div className="text-xs text-white/70">Years</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <Button 
//               className="gradient-gold text-navy font-semibold w-full touch-friendly"
//               asChild
//             >
//               <Link to="/booking" className="flex items-center justify-center gap-2">
//                 Book Your Event
//                 <ArrowRight className="h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           {/* Quick Links Section */}
//           <div>
//             <h3 className="font-heading text-lg font-bold text-white mb-6">
//               Quick Links
//             </h3>
//             <ul className="space-y-3">
//               {quickLinks.map((link) => (
//                 <li key={link.path}>
//                   <Link 
//                     to={link.path} 
//                     className="text-white/80 hover:text-primary transition-colors duration-300 flex items-center group"
//                   >
//                     <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services Section */}
//           <div>
//             <h3 className="font-heading text-lg font-bold text-white mb-6">
//               Our Services
//             </h3>
//             <ul className="space-y-3">
//               {services.map((service, index) => (
//                 <li key={index} className="text-white/80 flex items-center">
//                   <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
//                   {service}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info Section - Enhanced */}
//           <div>
//             <h3 className="font-heading text-lg font-bold text-white mb-6">
//               Get In Touch
//             </h3>
            
//             {/* Contact details with improved styling */}
//             <div className="space-y-4 mb-6">
//               <div className="flex items-start space-x-3 group">
//                 <div className="bg-primary/20 p-2 rounded-lg mt-0.5">
//                   <MapPin className="h-4 w-4 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-white/90 font-medium">Address</p>
//                   <p className="text-white/70 text-sm">Sanihall line, Surkhet</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start space-x-3 group">
//                 <div className="bg-primary/20 p-2 rounded-lg">
//                   <Phone className="h-4 w-4 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-white/90 font-medium">Phone</p>
//                   <a 
//                     href="tel:9819513221" 
//                     className="text-white/70 text-sm hover:text-primary transition-colors"
//                   >
//                     9819513221
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3 group">
//                 <div className="bg-primary/20 p-2 rounded-lg">
//                   <Mail className="h-4 w-4 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-white/90 font-medium">Email</p>
//                   <a 
//                     href="mailto:samitenthouse@gmail.com" 
//                     className="text-white/70 text-sm hover:text-primary transition-colors"
//                   >
//                     samitenthouse@gmail.com
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Social Media Links */}
//             <div>
//               <h4 className="text-white font-medium mb-4">Follow Our Journey</h4>
//               <div className="flex space-x-3">
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className="bg-white/10 hover:bg-primary/20 text-white hover:text-primary transition-all duration-300 touch-friendly"
//                   asChild
//                 >
//                   <a
//                     href="https://www.facebook.com/salim.siddhikai"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Facebook className="h-4 w-4" />
//                     <span className="sr-only">Facebook</span>
//                   </a>
//                 </Button>
                
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className="bg-white/10 hover:bg-primary/20 text-white hover:text-primary transition-all duration-300 touch-friendly"
//                   asChild
//                 >
//                   <a
//                     href="https://www.instagram.com/samitenthouse/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Instagram className="h-4 w-4" />
//                     <span className="sr-only">Instagram</span>
//                   </a>
//                 </Button>
                
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className="bg-white/10 hover:bg-primary/20 text-white hover:text-primary transition-all duration-300 touch-friendly"
//                   asChild
//                 >
//                   <a
//                     href="https://www.tiktok.com/@samitenthouse"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512">
//                       <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
//                     </svg>
//                     <span className="sr-only">TikTok</span>
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Newsletter Section */}
//         <div className="border-t border-white/20 py-8">
//           <div className="grid md:grid-cols-2 gap-6 items-center">
//             <div>
//               <h3 className="font-heading text-xl font-bold text-white mb-2">
//                 Stay Updated with Latest Events
//               </h3>
//               <p className="text-white/70 text-sm">
//                 Get inspiration and special offers delivered to your inbox
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//               <Button 
//                 className="gradient-gold text-navy font-semibold px-6 touch-friendly"
//               >
//                 Subscribe
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom footer with enhanced styling */}
//         <div className="border-t border-white/20 py-6">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-2 text-white/70 text-sm">
//               <span>&copy; {currentYear} Sami Tent House. All rights reserved.</span>
//               <Heart className="h-4 w-4 text-primary" />
//               <span>Created by Monu Siddiki</span>
//             </div>
            
//             <div className="flex items-center space-x-6 text-sm">
//               <Link 
//                 to="/privacy" 
//                 className="text-white/70 hover:text-primary transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//               <Link 
//                 to="/terms" 
//                 className="text-white/70 hover:text-primary transition-colors"
//               >
//                 Terms of Service
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }