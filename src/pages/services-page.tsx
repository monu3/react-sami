// import { Link } from "react-router-dom";
// import { Button } from "../components/ui/button";
// import { Card } from "../components/ui/card";
// export default function ServicesPage() {
//   const services = [
//     {
//       id: "wedding",
//       title: "Wedding Planning",
//       description:
//         "Comprehensive wedding planning services to make your special day perfect. From venue selection to coordination on the day, we handle every detail.",
//       image: "/assets/heroimage.png?height=600&width=400",
//       features: [
//         "Venue selection and booking",
//         "Vendor coordination",
//         "Budget management",
//         "Timeline creation",
//         "Day-of coordination",
//         "Custom decor and styling",
//       ],
//     },
//     {
//       id: "corporate",
//       title: "Corporate Events",
//       description:
//         "Professional corporate event management for conferences, team building activities, product launches, and more.",
//       image: "/assets/coperativeImg.webp?height=600&width=400",
//       features: [
//         "Conference planning",
//         "Team building activities",
//         "Product launches",
//         "Award ceremonies",
//         "Client appreciation events",
//         "Holiday parties",
//       ],
//     },
//     {
//       id: "cooking",
//       title: "Cooking Services",
//       description:
//         "Professional cooking and catering services for events, providing delicious meals prepared with fresh ingredients and tailored to your taste and occasion.",
//       image: "/assets/cooking.webp?height=600&width=400",
//       features: [
//         "Customized menu planning",
//         "Multi-cuisine options",
//         "Fresh and high-quality ingredients",
//         "On-site cooking and live food counters",
//         "Complete catering service for events",
//       ],
//     },
//     {
//       id: "bratabandha",
//       title: "Bratabandha Ceremony",
//       description:
//         "Traditional Bratabandha ceremony arrangements with cultural rituals, venue setup, and catering to honor this important milestone in a boy’s life.",
//       image: "/assets/bartha.webp?height=600&width=400",
//       features: [
//         "Ritual and priest arrangements",
//         "Decorated mandap and seating setup",
//         "Traditional music and cultural performances",
//         "Customized catering and sweets",
//         "Photography and videography",
//         "Guest hospitality and coordination",
//       ],
//     },
//     {
//       id: "pasni",
//       title: "Pasni Ceremony",
//       description:
//         "Memorable Pasni (rice feeding) celebrations with family-focused decoration, rituals, and catering to cherish your child’s first solid meal.",
//       image: "/assets/pasni.jpg?height=600&width=400",
//       features: [
//         "Priest and ritual setup",
//         "Beautiful stage and baby seating decoration",
//         "Customized baby outfit and accessories",
//         "Catering with traditional and modern dishes",
//         "Photography and videography",
//         "Guest management and hospitality",
//       ],
//     },
//     {
//       id: "haldi and mehendi",
//       title: "Haldi & Mehendi ceremony",
//       description:
//         "Capture your event with professional photography and videography services that document every special moment.",
//       image: "/assets/haldimendi.webp?height=600&width=400",
//       features: [
//         "Event photography",
//         "Videography services",
//         "Photo booths",
//         "Same-day editing",
//         "Drone photography",
//         "Digital galleries",
//       ],
//     },
//     {
//       id: "catering",
//       title: "Catering Services",
//       description:
//         "Delicious catering options for any event, with custom menus tailored to your preferences and dietary needs.",
//       image: "/assets/catring.jpg?height=600&width=400",
//       features: [
//         "Custom menu creation",
//         "Buffet service",
//         "Plated dinners",
//         "Cocktail receptions",
//         "Dessert stations",
//         "Beverage service",
//       ],
//     },
//     {
//       id: "decor",
//       title: "Decor & Styling",
//       description:
//         "Transform your venue with stunning decor and styling that creates the perfect atmosphere for your event.",
//       image: "/assets/image3.jpeg",
//       features: [
//         "Theme development",
//         "Floral arrangements",
//         "Lighting design",
//         "Table settings",
//         "Backdrop creation",
//         "Custom installations",
//       ],
//     },
//   ];

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative h-[40vh] min-h-[400px]">
//         <div className="absolute inset-0">
//           <img
//             src="/assets/heroimage.png"
//             alt="Our Services"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/50" />
//         </div>

//         <div className="absolute inset-0 flex items-center justify-center text-center px-4">
//           <div className="max-w-3xl">
//             <h1
//               className="text-4xl md:text-5xl font-bold text-white mb-4"
//               style={{ fontFamily: "cursive" }}
//             >
//               Our Services
//             </h1>
//             <p
//               className="text-xl text-white/90"
//               style={{ fontFamily: "cursive" }}
//             >
//               Comprehensive event planning solutions for every occasion
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Services Introduction */}
//       <section className="py-5 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
//             <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
//             <p className="max-w-2xl mx-auto text-muted-foreground">
//               At Sami Tent House, we offer a comprehensive range of event
//               planning services tailored to meet your specific needs and
//               preferences. From intimate gatherings to grand celebrations, we
//               handle every detail with precision and care.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {services.map((service) => (
//               <Card
//                 key={service.id}
//                 id={service.id}
//                 className="group relative h-[300px] overflow-hidden border-0 rounded-lg shadow-md"
//               >
//                 {/* Background Image */}
//                 <div
//                   className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                   style={{ backgroundImage: `url(${service.image})` }}
//                 ></div>
//                 {/* Light Overlay - Reduced opacity */}
//                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300"></div>

//                 {/* Content - Bottom positioned with slide-up effect */}
//                 <div className="absolute inset-x-0 bottom-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                   <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
//                   <ul className="space-y-1 mb-4">
//                     {service.features.slice(0, 4).map((feature, index) => (
//                       <li
//                         key={index}
//                         className="text-sm text-white/90 flex items-center"
//                       >
//                         <span className="mr-2 text-white">•</span>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                   <Button
//                     size="sm"
//                     className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
//                     asChild
//                   >
//                     <Link to={`/booking?service=${service.id}`}>
//                       Book This Service
//                     </Link>
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowRight,
  Star,
  Check,
  Calendar,
  Users,
} from "lucide-react";

export default function ServicesPage() {
  // Enhanced services with luxury positioning and mobile-friendly descriptions
  const services = [
    {
      id: "wedding",
      title: "Luxury Wedding Planning",
      shortDesc: "Your dream wedding, perfectly planned",
      description:
        "Comprehensive wedding planning services with attention to every detail, creating your perfect day with elegance.",
      image: "/assets/heroimage.png?height=600&width=400",
      features: [
        "Personalized venue selection and booking",
        "Premium vendor coordination and management",
        "Detailed budget planning and timeline creation",
        "Full day-of coordination and support",
        "Custom decor design and styling",
        "Guest management and hospitality services",
      ],
    },
    {
      id: "corporate",
      title: "Corporate Event Excellence",
      shortDesc: "Professional events that elevate your brand",
      description:
        "Professional corporate event management for conferences, team building activities, product launches, and executive gatherings that leave lasting impressions.",
      image: "/assets/coperativeImg.webp?height=600&width=400",
      features: [
        "Strategic conference planning and execution",
        "Engaging team building activities and workshops",
        "Impactful product launch presentations",
        "Prestigious award ceremonies and galas",
        "Executive client appreciation events",
        "Memorable company holiday celebrations",
      ],
    },
    {
      id: "cooking",
      title: "Catering Services",
      shortDesc: "Culinary excellence for every occasion",
      description:
        "Professional cooking and catering services providing exquisite cuisine prepared with fresh ingredients and tailored to your taste and dietary preferences.",
      image: "/assets/cooking.webp?height=600&width=400",
      features: [
        "Customized menu planning and design",
        "Multi-cuisine options and specialty dishes",
        "Premium fresh and locally-sourced ingredients",
        "Live cooking stations and interactive counters",
        "Complete catering service with professional staff",
        "Dietary accommodation and special requests",
      ],
    },
    {
      id: "bratabandha",
      title: "Bratabandha Ceremony",
      shortDesc: "Honor traditions with modern elegance",
      description:
        "Bratabandha ceremony arrangements combining cultural authenticity with contemporary presentation, honoring this important milestone.",
      image: "/assets/bartha.webp?height=600&width=400",
      features: [
        "Authentic ritual and priest arrangements",
        "Beautifully decorated mandap and seating setup",
        "Traditional music and cultural performances",
        "Customized catering with traditional delicacies",
        "Professional photography and videography",
        "Complete guest hospitality and coordination",
      ],
    },
    {
      id: "pasni",
      title: "Memorable Pasni Ceremony",
      shortDesc: "Celebrate your child's first milestone",
      description:
        "Memorable Pasni celebrations with decoration, traditional rituals, and modern amenities to cherish your child's special day.",
      image: "/assets/pasni.jpg?height=600&width=400",
      features: [
        "Traditional priest and ritual coordination",
        "Adorable stage and baby seating decoration",
        "Custom baby outfit and ceremonial accessories",
        "Family-style catering with traditional and modern dishes",
        "Professional baby-friendly photography and videography",
        "Comprehensive guest management and hospitality",
      ],
    },
    {
      id: "haldi-mehendi",
      title: "Haldi & Mehendi Celebrations",
      shortDesc: "Pre-wedding festivities full of joy and color",
      description:
        "Vibrant Haldi and Mehendi ceremonies with colorful decorations, traditional elements, and modern photography to capture every joyful moment.",
      image: "/assets/haldimendi.webp?height=600&width=400",
      features: [
        "Colorful themed decoration and setup",
        "Professional mehendi artists and musicians",
        "Traditional ceremony coordination",
        "Vibrant photo booth and prop arrangements",
        "Authentic catering with festive specialties",
        "Cultural entertainment and dance performances",
      ],
    },
    {
      id: "catering",
      title: "Premium Catering Services",
      shortDesc: "Culinary experiences that delight every guest",
      description:
        "Exceptional catering services for any event, featuring custom menus, professional presentation, and service that exceeds expectations.",
      image: "/assets/catring.jpg?height=600&width=400",
      features: [
        "Bespoke menu creation and consultation",
        "Elegant buffet service and presentation",
        "Sophisticated plated dinner experiences",
        "Premium cocktail reception catering",
        "Artisanal dessert stations and displays",
        "Professional beverage service and bar setup",
      ],
    },
    {
      id: "decor",
      title: "Luxury Decor & Styling",
      shortDesc: "Transform spaces into magical experiences",
      description:
        "Transform your venue with stunning decor and styling, from intimate gatherings to grand celebrations.",
      image: "/assets/image3.jpeg",
      features: [
        "Custom theme development and design",
        "Exquisite floral arrangements and installations",
        "Professional lighting design and ambiance",
        "Elegant table settings and centerpieces",
        "Stunning backdrop creation and photo areas",
        "Bespoke custom installations and features",
      ],
    },
  ];

  // // Service categories for better organization
  // const serviceCategories = [
  //   { id: "all", name: "All Services", icon: Star },
  //   { id: "wedding", name: "Weddings", icon: Calendar },
  //   { id: "corporate", name: "Corporate", icon: Users },
  //   { id: "cultural", name: "Cultural", icon: Camera },
  //   { id: "catering", name: "Catering", icon: Utensils },
  //   { id: "styling", name: "Styling", icon: Palette },
  // ];

  return (
    <div>
      {/* Enhanced Hero Section with luxury styling */}
      <section className="relative h-[50vh] min-h-[400px] sm:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/heroimage.png"
            alt="Premium Event Services"
            className="w-full h-full object-cover"
          />
          {/* Luxury gradient overlay */}
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Premium Event Services
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
              Comprehensive luxury event planning solutions for every occasion
              and celebration
            </p>
          </div>
        </div>
      </section>

      {/* Services Introduction with enhanced content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-navy">
              What We Offer
            </h2>
            <div className="w-20 h-1 gradient-gold mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
              At Sami Tent House, we offer a comprehensive range of luxury event
              planning services tailored to meet your specific needs and exceed
              your expectations. From intimate gatherings to grand celebrations,
              we handle every detail with precision, care, and elegance.
            </p>
          </div>

          {/* Enhanced services grid with mobile-first responsive design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                className="group relative overflow-hidden border-0 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500 card-hover"
              >
                {/* Service image with mobile-optimized height */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  ></div>
                  {/* Luxury gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"></div>
                </div>

                {/* Enhanced content section with better mobile layout */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2 text-navy">
                      {service.title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">
                      {service.shortDesc}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Key features - visible on mobile */}
                  <div>
                    <h4 className="font-semibold text-navy text-sm mb-2">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <Check className="h-3 w-3 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button with improved mobile styling */}
                  <Button
                    className="w-full gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
                    asChild
                  >
                    <Link
                      to={`/booking?service=${service.id}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Book This Service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Enhanced CTA section */}
          <div className="text-center mt-12 lg:mt-16 p-8 bg-cream-dark rounded-2xl">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-navy">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We can create a personalized service package that combines
              multiple services to perfectly match your event needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
                asChild
              >
                <Link to="/booking" className="flex items-center gap-2">
                  Get Custom Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300 touch-friendly"
                asChild
              >
                <Link to="/contact">Consult Our Experts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced process section for better UX */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-navy">
              Our Process
            </h2>
            <div className="w-20 h-1 gradient-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              We follow a proven process to ensure your event exceeds
              expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We discuss your vision, requirements, and budget to understand your needs.",
                icon: Users,
              },
              {
                step: "02",
                title: "Planning",
                desc: "Our team creates a detailed plan with timeline, vendors, and logistics.",
                icon: Calendar,
              },
              {
                step: "03",
                title: "Coordination",
                desc: "We manage all vendors, logistics, and details leading up to your event.",
                icon: Check,
              },
              {
                step: "04",
                title: "Execution",
                desc: "On event day, we ensure everything runs smoothly so you can enjoy.",
                icon: Star,
              },
            ].map((process, index) => {
              const IconComponent = process.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-navy" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-navy">
                    {process.title}
                  </h3>
                  <p className="text-muted-foreground">{process.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
