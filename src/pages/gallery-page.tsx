// "use client";

// import { useState } from "react";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../components/ui/tabs";
// import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
// import { X, Download } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { useGallery } from "../context/gallery-context";

// export default function GalleryPage() {
//   const { images, loading, error, refreshImages } = useGallery();
//   const [category, setCategory] = useState("all");
//   const [, setSelectedImage] = useState<string | null>(null);

//   const categories = [
//     { id: "all", name: "All Events" },
//     { id: "weddings", name: "Weddings" },
//     { id: "decoration", name: "Decoration" },
//     { id: "pasni", name: "Pasni" },
//     { id: "school", name: "School Events" },
//   ];
//   const currentImages = images[category] || [];

//   const handleDownload = async (imageUrl: string, imageName: string) => {
//     try {
//       // Show loading state or indicator here if needed

//       // Fetch the image as a blob
//       const response = await fetch(imageUrl);
//       if (!response.ok) {
//         throw new Error("Failed to download image");
//       }

//       // Convert the response to a blob
//       const blob = await response.blob();

//       // Create a blob URL
//       const blobUrl = URL.createObjectURL(blob);

//       // Create a temporary anchor element
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = imageName || "image.jpg";

//       // Append to body, click, and remove
//       document.body.appendChild(link);
//       link.click();

//       // Clean up
//       setTimeout(() => {
//         document.body.removeChild(link);
//         URL.revokeObjectURL(blobUrl); // Free up memory
//       }, 100);
//     } catch (error) {
//       console.error("Download failed:", error);
//       // Show error message to user if needed
//       alert("Failed to download image. Please try again.");
//     }
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative h-[40vh] min-h-[300px]">
//         <div className="absolute inset-0">
//           <img
//             src="/assets/heroimage.png?height=600&width=1200"
//             alt="Gallery"
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
//               Our Event Gallery
//             </h1>
//             <p
//               className="text-xl text-white/90"
//               style={{ fontFamily: "cursive" }}
//             >
//               Browse through our portfolio of successful events
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Section */}
//       <section className="py-16 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Explore Our Work</h2>
//             <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
//             <p className="max-w-2xl mx-auto text-muted-foreground">
//               Take a look at some of the amazing events we've had the privilege
//               to organize and manage.
//             </p>
//           </div>

//           <Tabs
//             defaultValue="all"
//             value={category}
//             onValueChange={setCategory}
//             className="w-full"
//           >
//             <div className="flex justify-center mb-8">
//               <TabsList>
//                 {categories.map((cat) => (
//                   <TabsTrigger key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//             </div>

//             <TabsContent value={category} className="mt-0">
//               {loading ? (
//                 <div className="text-center py-12">
//                   <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                   <p className="mt-4 text-muted-foreground">
//                     Loading images...
//                   </p>
//                 </div>
//               ) : error ? (
//                 <div className="text-center py-12">
//                   <p className="text-red-500">{error}</p>
//                   <Button onClick={refreshImages} className="mt-4">
//                     Retry
//                   </Button>
//                 </div>
//               ) : currentImages.length === 0 ? (
//                 <div className="text-center py-12">
//                   <p className="text-muted-foreground">
//                     No images found for this category.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {currentImages.map((image, index) => (
//                     <Dialog key={index}>
//                       <DialogTrigger asChild>
//                         <div
//                           className="relative group cursor-pointer overflow-hidden rounded-lg"
//                           onClick={() => setSelectedImage(image.src)}
//                         >
//                           <img
//                             src={image.src || "/placeholder.svg"}
//                             alt={image.alt}
//                             className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
//                           />
//                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
//                             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
//                               {/* <p className="font-medium">{image.alt}</p>
//                               <p className="text-sm">Click to enlarge</p> */}
//                             </div>
//                           </div>

//                           {/* Download button */}
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="absolute bottom-2 right-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent dialog from opening
//                               handleDownload(image.src, image.alt);
//                             }}
//                           >
//                             <Download className="h-5 w-5" />
//                             <span className="sr-only">Download</span>
//                           </Button>
//                         </div>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
//                         <div className="relative">
//                           <img
//                             src={image.src || "/placeholder.svg"}
//                             alt={image.alt}
//                             className="w-full h-auto max-h-[80vh] object-contain"
//                           />
//                           <div className="absolute top-2 right-2 flex gap-2">
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="bg-black/50 text-white hover:bg-black/70"
//                               onClick={() =>
//                                 handleDownload(image.src, image.alt)
//                               }
//                             >
//                               <Download className="h-5 w-5" />
//                               <span className="sr-only">Download</span>
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="bg-black/50 text-white hover:bg-black/70"
//                               onClick={() => setSelectedImage(null)}
//                             >
//                               <X className="h-5 w-5" />
//                               <span className="sr-only">Close</span>
//                             </Button>
//                           </div>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-muted">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">
//             Ready to Create Your Own Memorable Event?
//           </h2>
//           <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
//             Let us help you plan and execute an event that will be remembered
//             for years to come.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button size="lg" asChild>
//               <a href="/booking">Book Now</a>
//             </Button>
//             <Button size="lg" variant="outline" asChild>
//               <a href="/contact">Contact Us</a>
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { X, Download, ArrowRight,Heart, Link } from "lucide-react";
import { Button } from "../components/ui/button";
import { useGallery } from "../context/gallery-context";
import { cn } from "../lib/utils";

export default function GalleryPage() {
  const { images, loading, error, refreshImages } = useGallery();
  const [category, setCategory] = useState("all");
  const [, setSelectedImage] = useState<string | null>(null);

  // Enhanced categories with better descriptions
  const categories = [
    {
      id: "all",
      name: "All Events",
      description: "Complete collection of our work",
      icon: "🎉",
    },
    {
      id: "weddings",
      name: "Weddings",
      description: "Romantic celebrations",
      icon: "💍",
    },
    {
      id: "decoration",
      name: "Decoration",
      description: "Stunning event styling",
      icon: "🎨",
    },
    {
      id: "pasni",
      name: "Pasni",
      description: "Traditional ceremonies",
      icon: "👶",
    },
    {
      id: "school",
      name: "School Events",
      description: "Educational celebrations",
      icon: "🎓",
    },
  ];

  const currentImages = images[category] || [];

  // Enhanced download functionality with better UX
  const handleDownload = async (imageUrl: string, imageName: string) => {
    try {
      // Show loading state
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to download image");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = imageName || "sami-tent-house-event.jpg";

      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      // Could add toast notification here
      alert("Failed to download image. Please try again.");
    }
  };

  return (
    <div>
      {/* Enhanced Hero Section with luxury styling */}
      <section className="relative h-[50vh] min-h-[400px] sm:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/heroimage.png?height=600&width=1200"
            alt="Event Gallery Showcase"
            className="w-full h-full object-cover"
          />
          {/* Luxury gradient overlay */}
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Our Event Gallery
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
              Browse through our portfolio of successful events and get inspired
              for your celebration
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section with modern design */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-navy">
              Explore Our Work
            </h2>
            <div className="w-20 h-1 gradient-gold mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
              Take a look at some of the amazing events we've had the privilege
              to organize and manage. Each event tells a unique story of
              celebration, joy, and unforgettable moments.
            </p>
          </div>

          {/* Enhanced Category Tabs with better mobile design */}
          <Tabs
            defaultValue="all"
            value={category}
            onValueChange={setCategory}
            className="w-full"
          >
            <div className="flex justify-center mb-8 sm:mb-12">
              <TabsList className="bg-cream-dark border border-border p-1 rounded-xl">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className={cn(
                      "data-[state=active]:bg-primary data-[state=active]:text-navy",
                      "px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-all duration-300",
                      "flex items-center gap-2 touch-friendly"
                    )}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="hidden sm:inline">{cat.name}</span>
                    <span className="sm:hidden">{cat.name.split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={category} className="mt-0">
              {loading ? (
                /* Enhanced loading state */
                <div className="text-center py-16">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
                  <p className="text-lg text-muted-foreground font-medium">
                    Loading beautiful moments...
                  </p>
                </div>
              ) : error ? (
                /* Enhanced error state */
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">😔</div>
                  <p className="text-red-500 text-lg mb-4">{error}</p>
                  <Button
                    onClick={refreshImages}
                    className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
                  >
                    Try Again
                  </Button>
                </div>
              ) : currentImages.length === 0 ? (
                /* Enhanced empty state */
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-muted-foreground text-lg">
                    No images found for this category yet.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Check back soon for new additions!
                  </p>
                </div>
              ) : (
                /* Enhanced gallery grid with masonry-like layout for mobile */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {currentImages.map((image, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div
                          className="relative group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
                          onClick={() => setSelectedImage(image.src)}
                        >
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-105"
                          />

                          {/* Enhanced overlay with gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                            {/* Image info */}
                            <div className="text-white">
                              <p className="font-medium text-sm">{image.alt}</p>
                              <p className="text-xs text-white/80">
                                Click to enlarge
                              </p>
                            </div>

                            {/* Like button (decorative) */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-white/20 backdrop-blur-sm text-white hover:text-primary opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 touch-friendly"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add to favorites functionality could go here
                              }}
                            >
                              <Heart className="h-4 w-4" />
                              <span className="sr-only">Add to favorites</span>
                            </Button>
                          </div>

                          {/* Download button - always visible on mobile, hover on desktop */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-navy hover:bg-white shadow-lg touch-friendly",
                              "opacity-100 sm:opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(image.src, image.alt);
                            }}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download image</span>
                          </Button>

                          {/* Category badge */}
                          <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-semibold">
                            {
                              categories.find((cat) => cat.id === category)
                                ?.icon
                            }{" "}
                            {
                              categories.find((cat) => cat.id === category)
                                ?.name
                            }
                          </div>
                        </div>
                      </DialogTrigger>

                      {/* Enhanced modal dialog */}
                      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
                        <div className="relative bg-navy/90 backdrop-blur-md rounded-xl">
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                          />

                          {/* Enhanced modal controls */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 touch-friendly"
                              onClick={() =>
                                handleDownload(image.src, image.alt)
                              }
                            >
                              <Download className="h-5 w-5" />
                              <span className="sr-only">Download image</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 touch-friendly"
                              onClick={() => setSelectedImage(null)}
                            >
                              <X className="h-5 w-5" />
                              <span className="sr-only">Close modal</span>
                            </Button>
                          </div>

                          {/* Image information overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h3 className="text-white font-heading text-xl font-bold mb-2">
                              {image.alt}
                            </h3>
                            <p className="text-white/80 text-sm">
                              Part of our{" "}
                              {categories
                                .find((cat) => cat.id === category)
                                ?.name.toLowerCase()}{" "}
                              collection
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Enhanced stats section */}
          {currentImages.length > 0 && (
            <div className="text-center mt-12 p-6 bg-cream-dark rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="font-heading text-2xl font-bold text-primary">
                    {currentImages.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Images in{" "}
                    {categories.find((cat) => cat.id === category)?.name}
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-primary">
                    6000+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Events Completed
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-primary">
                    10+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Years of Experience
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Each image represents a unique celebration and cherished memory
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section with luxury styling */}
      <section className="py-12 sm:py-16 lg:py-20 text-white relative overflow-hidden bg-muted">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 gradient-gold opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 gradient-gold opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-black/90">
            Ready to Create Your Own Memorable Event?
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-muted-foreground text-lg leading-relaxed">
            Let us help you plan and execute an event that will be remembered
            for years to come. Every detail will be crafted with the same care
            and elegance you see in our gallery.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-friendly"
              asChild
            >
              <Link to="/booking" className="flex items-center gap-2">
                Book Your Event Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 touch-friendly"
              asChild
            >
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">
                90+
              </div>
              <div className="text-sm text-muted-foreground">Expert Vendors</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">
                Free
              </div>
              <div className="text-sm text-muted-foreground">Initial Consultation</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
