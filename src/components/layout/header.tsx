"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../theme-provider";
import { cn } from "../../lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Services", path: "/services" },
    // { name: "Packages", path: "/packages" },
    { name: "Book Now", path: "/booking" },
    { name: "Contact", path: "/contact" },
    { name: "Outlets", path: "/outlets" },
  ];
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/assets/eventlogo.png"
            alt="SH Events"
            className="h-24 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path
                  ? "text-primary"
                  : isScrolled
                  ? "text-foreground/80"
                  : "text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center ml-4">
          {/* <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search events..."
              className="w-[200px] pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form> */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white"
          >
            {theme === "dark" ? "🌙" : "☀️"}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="secondary"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background shadow-lg md:hidden">
            <div className="container mx-auto px-4 py-4">
              {/* <form onSubmit={handleSearch} className="relative mb-4">
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="w-full pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form> */}
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2",
                      location.pathname === item.path
                        ? "text-primary bg-muted"
                        : "text-foreground/80"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="justify-start"
                >
                  {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </Button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Search, Menu, X, Sun, Moon, Phone, Mail } from "lucide-react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useTheme } from "../theme-provider";
// import { cn } from "../../lib/utils";

// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();
//   const { theme, setTheme } = useTheme();

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   // Enhanced scroll detection for luxury header styling
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   // Enhanced navigation items with better organization
//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "Contact", path: "/contact" },
//     { name: "Outlets", path: "/outlets" },
//   ];

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//     // Implement search functionality
//   };

//   return (
//     <>
//       {/* Top contact bar - luxury touch */}
//       <div className="hidden lg:block bg-navy text-white text-sm py-2">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center space-x-2">
//               <Phone className="h-4 w-4 text-primary" />
//               <span>9819513221</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Mail className="h-4 w-4 text-primary" />
//               <span>samitenthouse@gmail.com</span>
//             </div>
//           </div>
//           <div className="text-primary font-medium">
//             Creating Unforgettable Moments Since 2010
//           </div>
//         </div>
//       </div>

//       {/* Main header with luxury styling and mobile improvements */}
//       <header
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
//           "lg:top-10", // Account for top bar on desktop
//           isScrolled
//             ? "bg-background/95 backdrop-blur-md shadow-lg py-2 lg:py-3"
//             : "bg-transparent py-4 lg:py-6"
//         )}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
//           {/* Enhanced Logo with luxury styling */}
//           <Link to="/" className="flex items-center group">
//             <img
//               src="/assets/eventlogo.png"
//               alt="Sami Tent House - Premium Event Management"
//               className={cn(
//                 "transition-all duration-300",
//                 isScrolled ? "h-16 w-auto" : "h-20 sm:h-24 w-auto"
//               )}
//             />
//           </Link>

//           {/* Desktop Navigation with luxury styling */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={cn(
//                   "text-sm font-medium transition-all duration-300 relative group font-body",
//                   "hover:text-primary px-3 py-2 rounded-md",
//                   location.pathname === item.path
//                     ? "text-primary font-semibold"
//                     : isScrolled
//                     ? "text-foreground/80 hover:text-primary"
//                     : "text-white hover:text-primary"
//                 )}
//               >
//                 {item.name}
//                 {/* Luxury underline animation */}
//                 <span
//                   className={cn(
//                     "absolute bottom-0 left-3 right-3 h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
//                     location.pathname === item.path && "scale-x-100"
//                   )}
//                 />
//               </Link>
//             ))}
//           </nav>

//           {/* Enhanced CTA and Theme Toggle */}
//           <div className="hidden lg:flex items-center space-x-4">
//             {/* Primary CTA Button */}
//             <Button
//               className="gradient-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
//               asChild
//             >
//               <Link to="/booking">Book Now</Link>
//             </Button>

//             {/* Theme Toggle with luxury styling */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleTheme}
//               className={cn(
//                 "transition-colors duration-300",
//                 isScrolled
//                   ? "text-foreground hover:text-primary"
//                   : "text-white hover:text-primary"
//               )}
//             >
//               {theme === "dark" ? (
//                 <Sun className="h-5 w-5" />
//               ) : (
//                 <Moon className="h-5 w-5" />
//               )}
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </div>

//           {/* Enhanced Mobile Menu Button */}
//           <div className="lg:hidden flex items-center space-x-2">
//             <Button
//               className="gradient-gold text-navy font-semibold text-sm px-3 py-2"
//               asChild
//             >
//               <Link to="/booking">Book</Link>
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "touch-friendly transition-colors duration-300",
//                 isScrolled
//                   ? "text-foreground hover:text-primary"
//                   : "text-white hover:text-primary"
//               )}
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </div>
//         </div>

//         {/* Enhanced Mobile Menu with luxury styling */}
//         {isMenuOpen && (
//           <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-xl border-t border-border animate-slide-down">
//             <div className="container mx-auto px-4 py-6">
//               {/* Mobile navigation with improved spacing */}
//               <nav className="flex flex-col space-y-1 mb-6">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     className={cn(
//                       "text-base font-medium transition-all duration-300 p-4 rounded-lg touch-friendly font-body",
//                       "hover:bg-muted hover:text-primary active:bg-muted active:text-primary",
//                       location.pathname === item.path
//                         ? "text-primary bg-muted font-semibold"
//                         : "text-foreground/80"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </nav>

//               {/* Mobile contact info */}
//               <div className="border-t border-border pt-4 mb-4 space-y-3">
//                 <div className="flex items-center space-x-3 text-sm text-muted-foreground">
//                   <Phone className="h-4 w-4 text-primary" />
//                   <span>9819513221</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-sm text-muted-foreground">
//                   <Mail className="h-4 w-4 text-primary" />
//                   <span>samitenthouse@gmail.com</span>
//                 </div>
//               </div>

//               {/* Mobile theme toggle */}
//               <Button
//                 variant="ghost"
//                 onClick={toggleTheme}
//                 className="justify-start w-full touch-friendly"
//               >
//                 {theme === "dark" ? (
//                   <>
//                     <Sun className="h-5 w-5 mr-2" />
//                     Light Mode
//                   </>
//                 ) : (
//                   <>
//                     <Moon className="h-5 w-5 mr-2" />
//                     Dark Mode
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Spacer to prevent content overlap - accounts for both top bar and header */}
//       <div
//         className={cn(
//           "transition-all duration-300",
//           "h-20 sm:h-24 lg:h-32" // Adjusted for top bar
//         )}
//       />
//     </>
//   );
// }
