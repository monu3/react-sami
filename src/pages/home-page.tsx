// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "../components/ui/button"
// import { cn } from "../lib/utils"
// import { useGallery } from "../context/gallery-context"

// export default function HomePage() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const { images, loading } = useGallery()
//   const [galleryImages, setGalleryImages] = useState<any[]>([])
//   const [currentGallerySet, setCurrentGallerySet] = useState(0)
//   const imagesPerSet = 4

//   const heroSlides = [
//     {
//       image: "/assets/catring.jpg",
//       title: "Creating Unforgettable Events",
//       subtitle: "From concept to execution, we bring your vision to life",
//     },
//     {
//       image: "/assets/heroimage.png",
//       title: "Weddings & Celebrations",
//       subtitle: "Making your special day truly magical",
//     },
//     {
//       image: "/assets/cooking.webp",
//       title: "School Events",
//       subtitle: "Professional planning for successful business gatherings",
//     },
//   ]

//   const services = [
//     {
//       image: "/assets/download.png?height=600&width=800",
//       title: "Wedding Planning",
//       description: "Comprehensive wedding planning services to make your special day perfect.",
//       link: "/services#wedding",
//     },
//     {
//       image: "/assets/coperativeEvent.jpeg?height=600&width=800",
//       title: "Corporate Events",
//       description: "Professional corporate event management for conferences and team building.",
//       link: "/services#corporate",
//     },
//     {
//       image: "/assets/riceFedding.jpeg?height=600&width=800",
//       title: "Pasni",
//       description: "Creative rice feeding ceremonies with custom themes.",
//       link: "/services#birthday",
//     },
//     {
//       image: "/assets/schoolEvent.jpeg?height=600&width=800",
//       title: "School Events",
//       description: "Elegant School ceremonies that recognize achievements with style.",
//       link: "/services#awards",
//     },
//   ]

//   // Get all gallery images
//   useEffect(() => {
//     if (!loading && images.all) {
//       setGalleryImages(images.all)
//     }
//   }, [loading, images])

//   // Set up gallery rotation
//   useEffect(() => {
//     if (galleryImages.length <= imagesPerSet) return

//     const totalSets = Math.ceil(galleryImages.length / imagesPerSet)

//     const interval = setInterval(() => {
//       setCurrentGallerySet((prev) => (prev + 1) % totalSets)
//     }, 5000) // Change every 5 seconds

//     return () => clearInterval(interval)
//   }, [galleryImages.length])

//   // Get current set of images to display
//   const getCurrentGalleryImages = () => {
//     const startIdx = currentGallerySet * imagesPerSet
//     return galleryImages.slice(startIdx, startIdx + imagesPerSet)
//   }

//   // Hero slider interval
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [heroSlides.length])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
//   }

//   // Gallery navigation
//   const nextGallerySet = () => {
//     const totalSets = Math.ceil(galleryImages.length / imagesPerSet)
//     setCurrentGallerySet((prev) => (prev + 1) % totalSets)
//   }

//   const prevGallerySet = () => {
//     const totalSets = Math.ceil(galleryImages.length / imagesPerSet)
//     setCurrentGallerySet((prev) => (prev === 0 ? totalSets - 1 : prev - 1))
//   }

//   return (
//     <div className="flex flex-col">
//       {/* Hero Section */}
//       <section className="relative h-screen w-full overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden">
//           {heroSlides.map((slide, index) => (
//             <div
//               key={index}
//               className={cn(
//                 "absolute inset-0 transition-opacity duration-1000",
//                 index === currentSlide ? "opacity-100" : "opacity-0",
//               )}
//             >
//               <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-black/40" />
//             </div>
//           ))}
//         </div>

//         <div className="absolute inset-0 flex items-center justify-center text-center px-4">
//           <div className="max-w-4xl">
//             <h1
//               className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-up"
//               style={{ fontFamily: "cursive" }}
//             >
//               {heroSlides[currentSlide].title}
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-up animation-delay-200">
//               {heroSlides[currentSlide].subtitle}
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up animation-delay-300">
//               <Button size="lg" asChild>
//                 <Link to="/booking">Book Now</Link>
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-white/10 text-white border-white/20 hover:bg-white/20"
//                 asChild
//               >
//                 <Link to="/services">Our Services</Link>
//               </Button>
//             </div>
//           </div>
//         </div>

//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50"
//           onClick={prevSlide}
//         >
//           <ChevronLeft className="h-8 w-8" />
//           <span className="sr-only">Previous slide</span>
//         </Button>

//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50"
//           onClick={nextSlide}
//         >
//           <ChevronRight className="h-8 w-8" />
//           <span className="sr-only">Next slide</span>
//         </Button>

//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               className={cn(
//                 "w-3 h-3 rounded-full transition-colors",
//                 index === currentSlide ? "bg-white" : "bg-white/50",
//               )}
//               onClick={() => setCurrentSlide(index)}
//             >
//               <span className="sr-only">Go to slide {index + 1}</span>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">About Us</h2>
//             <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
//             <p className="max-w-2xl mx-auto text-muted-foreground">
//               Sami Tent House is a premier event planning company with over 10+ years of experience creating memorable
//               events. We specialize in weddings, corporate events,school events, and special celebrations.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <img src="/assets/catring.jpg" alt="About Sami Tent House" className="rounded-lg shadow-lg" />
//             </div>
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold">Your Vision, Our Expertise</h3>
//               <p>
//                 At Sami Tent House, we believe that every event should be as unique as the individuals hosting it. Our team
//                 of experienced event planners works closely with you to understand your vision and bring it to life.
//               </p>
//               <p>
//                 From intimate gatherings to grand celebrations, we handle every detail with precision and care, ensuring
//                 that your event exceeds expectations and creates lasting memories.
//               </p>
//               <Button asChild>
//                 <Link to="/about">Learn More About Us</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 bg-muted">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-5">
//             <h2 className="text-3xl font-bold mb-4">Our Services</h2>
//             <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
//             <p className="max-w-2xl mx-auto text-muted-foreground mb-6">
//               We offer a comprehensive range of event planning services tailored to meet your specific needs and
//               preferences.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service, index) => (
//               <div key={index} className="group relative h-[300px] overflow-hidden rounded-lg shadow-md">
//                 {/* Background Image */}
//                 <div
//                   className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                   style={{ backgroundImage: `url(${service.image})` }}
//                 ></div>

//                 {/* Content - Bottom positioned with slide-up effect */}
//                 <div className="absolute inset-x-0 bottom-0 p-6 text-black shadow transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                   <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
//                   <p className="text-white/90 mb-4">{service.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Button size="lg" asChild>
//               <Link to="/services">View All Services</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Preview */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Event Gallery</h2>
//             <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
//             <p className="max-w-2xl mx-auto text-muted-foreground">
//               Browse through our portfolio of successful events and get inspired for your next celebration.
//             </p>
//           </div>

//           {/* Gallery Carousel */}
//           <div className="relative">
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {[1, 2, 3, 4].map((_, index) => (
//                   <div
//                     key={index}
//                     className="rounded-lg bg-muted animate-pulse h-40 md:h-64 w-full"
//                     aria-hidden="true"
//                   ></div>
//                 ))}
//               </div>
//             ) : galleryImages.length > 0 ? (
//               <div className="relative">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-500">
//                   {getCurrentGalleryImages().map((image, index) => (
//                     <Link to="/gallery" key={index}>
//                       <div className="relative group overflow-hidden rounded-lg cursor-pointer">
//                         <img
//                           src={image.src || "/placeholder.svg"}
//                           alt={image.alt}
//                           className="rounded-lg hover:scale-105 transition-transform duration-300 h-40 md:h-64 w-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
//                           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>

//                 {/* Navigation buttons */}
//                 {galleryImages.length > imagesPerSet && (
//                   <>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="absolute -left-4 top-1/2 -translate-y-1/2 text-foreground bg-background/80 hover:bg-background shadow-md rounded-full"
//                       onClick={prevGallerySet}
//                     >
//                       <ChevronLeft className="h-6 w-6" />
//                       <span className="sr-only">Previous images</span>
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="absolute -right-4 top-1/2 -translate-y-1/2 text-foreground bg-background/80 hover:bg-background shadow-md rounded-full"
//                       onClick={nextGallerySet}
//                     >
//                       <ChevronRight className="h-6 w-6" />
//                       <span className="sr-only">Next images</span>
//                     </Button>
//                   </>
//                 )}

//                 {/* Indicator dots */}
//                 {galleryImages.length > imagesPerSet && (
//                   <div className="flex justify-center mt-4 space-x-2">
//                     {Array.from({ length: Math.ceil(galleryImages.length / imagesPerSet) }).map((_, index) => (
//                       <button
//                         key={index}
//                         className={cn(
//                           "w-2 h-2 rounded-full transition-colors",
//                           index === currentGallerySet ? "bg-primary" : "bg-muted-foreground/30",
//                         )}
//                         onClick={() => setCurrentGallerySet(index)}
//                       >
//                         <span className="sr-only">Go to image set {index + 1}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <img
//                   src="/assets/useme.jpeg"
//                   alt="Gallery image 1"
//                   className="rounded-lg hover:opacity-80 transition-opacity cursor-pointer h-40 md:h-64 w-full object-cover"
//                 />
//                 <img
//                   src="/assets/useme.jpeg?height=300&width=300"
//                   alt="Gallery image 2"
//                   className="rounded-lg hover:opacity-80 transition-opacity cursor-pointer h-40 md:h-64 w-full object-cover"
//                 />
//                 <img
//                   src="/assets/useme.jpeg?height=300&width=300"
//                   alt="Gallery image 3"
//                   className="rounded-lg hover:opacity-80 transition-opacity cursor-pointer h-40 md:h-64 w-full object-cover"
//                 />
//                 <img
//                   src="/assets/useme.jpeg?height=300&width=300"
//                   alt="Gallery image 4"
//                   className="rounded-lg hover:opacity-80 transition-opacity cursor-pointer h-40 md:h-64 w-full object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="text-center mt-12">
//             <Button size="lg" asChild>
//               <Link to="/gallery">View Full Gallery</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Achievements Section */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="space-y-6">
//               <h2 className="text-4xl md:text-5xl font-bold">Your event Grand & Memorable</h2>
//               <p className="text-xl">Celebrate your event with us, we will make it memorable</p>
//               <p className="">
//                 Join the most loved event planner application ever, never worry about decorations, it's all our
//                 responsibility
//               </p>
//               <div className="pt-4">
//                 <Button size="lg" asChild>
//                   <Link to="/booking">Book Your Event</Link>
//                 </Button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <div className=" bg-[#4f5f93] p-8 rounded-lg text-center">
//                 <div className="text-4xl font-bold mb-2">90+</div>
//                 <div className="text-xl">Vendors</div>
//               </div>
//               <div className="bg-[#4f5f93] p-8 rounded-lg text-center">
//                 <div className="text-4xl font-bold mb-2">2,000+</div>
//                 <div className="text-xl">Designs</div>
//               </div>
//               <div className="col-span-2 bg-[#4f5f93] p-8 rounded-lg text-center">
//                 <div className="text-4xl font-bold mb-2">6,000+</div>
//                 <div className="text-xl">Events Completed</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Star,
  Calendar,
  Users,
  Award,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { useGallery } from "../context/gallery-context";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { images, loading } = useGallery();
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [currentGallerySet, setCurrentGallerySet] = useState(0);
  const imagesPerSet = 4;

  // Enhanced hero slides with luxury event focus
  const heroSlides = [
    {
      image: "/assets/catring.jpg",
      title: "Creating Unforgettable Events",
      subtitle:
        "From concept to execution, we bring your vision to life with luxury and elegance",
      cta: "Explore Our Services",
      ctaLink: "/services",
    },
    {
      image: "/assets/heroimage.png",
      title: "Weddings & Celebrations",
      subtitle:
        "Making your special day truly magical with premium planning and exquisite details",
      cta: "View Gallery",
      ctaLink: "/gallery",
    },
    {
      image: "/assets/cooking.webp",
      title: "Premium Event Management",
      subtitle:
        "Professional planning for successful gatherings that leave lasting impressions",
      cta: "Book Consultation",
      ctaLink: "/booking",
    },
  ];

  // Enhanced services with better descriptions and luxury positioning
  const services = [
    {
      image: "/assets/download.png?height=600&width=800",
      title: "Luxury Wedding Planning",
      link: "/services#wedding",
    },
    {
      image: "/assets/coperativeEvent.jpeg?height=600&width=800",
      title: "Corporate Excellence",
      description:
        "Professional corporate event management that elevates your brand and engages your audience.",
      features: ["Conference Planning", "Team Building", "Product Launches"],
      link: "/services#corporate",
    },
    {
      image: "/assets/riceFedding.jpeg?height=600&width=800",
      title: "Cultural Celebrations",
      description:
        "Traditional Pasni ceremonies with cultural authenticity and modern presentation.",
      features: [
        "Ritual Coordination",
        "Custom Themes",
        "Cultural Performances",
      ],
      link: "/services#pasni",
    },
    {
      image: "/assets/schoolEvent.jpeg?height=600&width=800",
      title: "Educational Events",
      description:
        "Elegant school events and ceremonies that celebrate achievements with style and sophistication.",
      features: [
        "Award Ceremonies",
        "School Functions",
        "Educational Conferences",
      ],
      link: "/services#school",
    },
  ];

  // Enhanced stats with better presentation
  const stats = [
    { number: "90+", label: "Premium Vendors", icon: Users },
    { number: "2,000+", label: "Custom Designs", icon: Star },
    { number: "6,000+", label: "Successful Events", icon: Award },
    { number: "10+", label: "Years Experience", icon: Calendar },
  ];

  // Get all gallery images
  useEffect(() => {
    if (!loading && images.all) {
      setGalleryImages(images.all);
    }
  }, [loading, images]);

  // Set up gallery rotation
  useEffect(() => {
    if (galleryImages.length <= imagesPerSet) return;

    const totalSets = Math.ceil(galleryImages.length / imagesPerSet);

    const interval = setInterval(() => {
      setCurrentGallerySet((prev) => (prev + 1) % totalSets);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Get current set of images to display
  const getCurrentGalleryImages = () => {
    const startIdx = currentGallerySet * imagesPerSet;
    return galleryImages.slice(startIdx, startIdx + imagesPerSet);
  };

  // Hero slider interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 6000); // Slower transition for better UX
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Gallery navigation
  const nextGallerySet = () => {
    const totalSets = Math.ceil(galleryImages.length / imagesPerSet);
    setCurrentGallerySet((prev) => (prev + 1) % totalSets);
  };

  const prevGallerySet = () => {
    const totalSets = Math.ceil(galleryImages.length / imagesPerSet);
    setCurrentGallerySet((prev) => (prev === 0 ? totalSets - 1 : prev - 1));
  };

  // Scroll to next section function for better UX guidance
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Enhanced Hero Section with luxury theme and clear UX guidance */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background slides with better overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentSlide ? "opacity-100" : "opacity-0"
              )}
            >
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 gradient-hero" />
            </div>
          ))}
        </div>

        {/* Hero content with improved typography and mobile responsiveness */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="font-heading text-hero font-bold text-white mb-4 sm:mb-6 animate-fade-up">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-hero-subtitle text-white/90 mb-8 sm:mb-10 animate-fade-up animation-delay-200 max-w-2xl mx-auto">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* Enhanced CTA buttons with luxury styling */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up animation-delay-300">
              <Button
                size="lg"
                className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
                asChild
              >
                <Link to="/booking" className="flex items-center gap-2">
                  Book Your Event
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 touch-friendly"
                asChild
              >
                <Link to={heroSlides[currentSlide].ctaLink}>
                  {heroSlides[currentSlide].cta}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation arrows - improved for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm touch-friendly"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm touch-friendly"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="sr-only">Next slide</span>
        </Button>

        {/* Slide indicators */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors touch-friendly",
                index === currentSlide ? "bg-primary" : "bg-white/50"
              )}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>

        {/* UX Guidance - Scroll down indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-gentle">
          <p className="text-white/70 text-sm mb-2 hidden sm:block">
            Discover More
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-primary transition-colors touch-friendly"
            onClick={scrollToAbout}
            aria-label="Scroll to learn more about us"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Enhanced About Section with luxury styling */}
      <section id="about-section" className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-navy">
              About Sami Tent House
            </h2>
            <div className="w-20 h-1 gradient-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Sami Tent House is a premier event planning company with over 10+
              years of experience creating memorable events with luxury,
              elegance, and attention to every detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <img
                src="/assets/catring.jpg"
                alt="About Sami Tent House"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              {/* Decorative overlay */}
              <div className="absolute -top-4 -right-4 w-24 h-24 gradient-gold rounded-full opacity-20 hidden sm:block"></div>
            </div>
            <div className="space-y-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
                Your Vision, Our Expertise
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                At Sami Tent House, we believe that every event should be as
                unique as the individuals hosting it. Our team of experienced
                event planners works closely with you to understand your vision
                and bring it to life with unmatched attention to detail.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From intimate gatherings to grand celebrations, we handle every
                detail with precision and care, ensuring that your event exceeds
                expectations and creates lasting memories for you and your
                guests.
              </p>

              {/* Stats grid for credibility */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {stats.slice(0, 4).map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-4 bg-cream-dark rounded-lg"
                    >
                      <IconComponent className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="font-heading text-2xl font-bold text-navy">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
                asChild
              >
                <Link to="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section with mobile-friendly cards */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-navy">
              Our Premium Services
            </h2>
            <div className="w-20 h-1 gradient-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-6">
              We offer a comprehensive range of luxury event planning services
              tailored to meet your specific needs and create unforgettable
              experiences.
            </p>
          </div>

          {/* Responsive service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative h-[350px] sm:h-[400px] overflow-hidden rounded-xl shadow-lg bg-white card-hover"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent"></div>

                {/* Content - improved mobile visibility */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white transform translate-y-0 sm:translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2 text-amber-200">
                    {service.title}
                  </h3>

                  <Button
                    size="sm"
                    className="bg-primary/20 hover:bg-primary/30 text-white border border-primary/30 backdrop-blur-sm touch-friendly"
                    asChild
                  >
                    <Link to={service.link} className="flex items-center gap-2">
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
              asChild
            >
              <Link to="/services" className="flex items-center gap-2">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Preview with better mobile layout */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-navy">
              Event Gallery
            </h2>
            <div className="w-20 h-1 gradient-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Browse through our portfolio of successful events and get inspired
              for your next celebration.
            </p>
          </div>

          {/* Gallery Carousel with mobile improvements */}
          <div className="relative">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl loading-shimmer h-48 sm:h-64 w-full"
                    aria-hidden="true"
                  ></div>
                ))}
              </div>
            ) : galleryImages.length > 0 ? (
              <div className="relative">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-500">
                  {getCurrentGalleryImages().map((image, index) => (
                    <Link to="/gallery" key={index} className="group">
                      <div className="relative overflow-hidden rounded-xl cursor-pointer">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="rounded-xl hover:scale-105 transition-transform duration-300 h-48 sm:h-64 w-full object-cover"
                        />
                        {/* Mobile-friendly overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-active:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                            <p className="text-sm font-medium">View Gallery</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Navigation buttons - touch-friendly */}
                {galleryImages.length > imagesPerSet && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 text-foreground bg-background/80 hover:bg-background shadow-lg rounded-full touch-friendly"
                      onClick={prevGallerySet}
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="sr-only">Previous images</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 text-foreground bg-background/80 hover:bg-background shadow-lg rounded-full touch-friendly"
                      onClick={nextGallerySet}
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="sr-only">Next images</span>
                    </Button>
                  </>
                )}

                {/* Indicator dots - improved for mobile */}
                {galleryImages.length > imagesPerSet && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({
                      length: Math.ceil(galleryImages.length / imagesPerSet),
                    }).map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-3 h-3 rounded-full transition-colors touch-friendly",
                          index === currentGallerySet
                            ? "bg-primary"
                            : "bg-muted-foreground/30"
                        )}
                        onClick={() => setCurrentGallerySet(index)}
                      >
                        <span className="sr-only">
                          Go to image set {index + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Fallback gallery with improved styling
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "/assets/useme.jpeg",
                  "/assets/useme.jpeg",
                  "/assets/useme.jpeg",
                  "/assets/useme.jpeg",
                ].map((src, index) => (
                  <Link to="/gallery" key={index} className="group">
                    <img
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      className="rounded-xl hover:opacity-80 group-active:opacity-80 transition-opacity cursor-pointer h-48 sm:h-64 w-full object-cover"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
              asChild
            >
              <Link to="/gallery" className="flex items-center gap-2">
                View Full Gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with luxury styling */}
      <section className="py-16 sm:py-20 bg-navy text-white relative overflow-hidden bg-muted">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 gradient-gold opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 gradient-gold opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-black/90">
                Make Your Event Grand & Memorable
              </h2>
              <p className="text-xl text-muted-foreground">
                Celebrate with us, and we'll make it unforgettable
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Join thousands of satisfied clients who trust us with their most
                important celebrations. From elegant decorations to flawless
                execution, every detail is our responsibility.
              </p>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
                  asChild
                >
                  <Link to="/booking" className="flex items-center gap-2">
                    Book Your Dream Event
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Enhanced stats grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="font-heading text-3xl sm:text-4xl font-bold mb-2 text-black/90">
                  90+
                </div>
                <div className="text-lg text-muted-foreground">Premium Vendors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="font-heading text-3xl sm:text-4xl font-bold mb-2  text-black/90">
                  2,000+
                </div>
                <div className="text-lg text-muted-foreground">Custom Designs</div>
              </div>
              <div className="col-span-2 bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="font-heading text-3xl sm:text-4xl font-bold mb-2  text-black/90">
                  6,000+
                </div>
                <div className="text-lg text-muted-foreground">
                  Successful Events Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
