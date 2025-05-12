
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SinglePost from "./components/blog/SinglePost";
import Lightbox from "./components/ui/lightbox";

// Define our pages in a central location
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Index />} />
          
          {/* Blog routes */}
          <Route path="/blog" element={<Index initialSection="blog" />} />
          <Route path="/post/:id" element={<SinglePost />} />
          
          {/* Information pages */}
          <Route path="/news" element={<Index initialSection="news" />} />
          <Route path="/services" element={<Index initialSection="services" />} />
          <Route path="/destinations" element={<Index initialSection="destinations" />} />
          
          {/* Client area routes */}
          <Route path="/chatbot" element={<Index initialSection="chatbot" />} />
          <Route path="/time-currency" element={<Index initialSection="time-currency" />} />
          <Route path="/assistant" element={<Index initialSection="assistant" />} />
          
          {/* External application routes */}
          <Route path="/cost-calculator" element={<Index initialSection="cost-calculator" />} />
          <Route path="/community" element={<Index initialSection="community" />} />
          <Route path="/planner" element={<Index initialSection="planner" />} />
          
          {/* Consultation routes */}
          <Route path="/consult/relocation" element={<Index initialSection="consult-relocation" />} />
          <Route path="/consult/education" element={<Index initialSection="consult-education" />} />
          <Route path="/consult/real-estate" element={<Index initialSection="consult-real-estate" />} />
          
          {/* Legacy lightbox routes - we'll maintain these for backward compatibility */}
          <Route path="/blog-lightbox" element={<Lightbox url="news" onClose={() => window.history.back()} />} />
          <Route path="/services-lightbox" element={<Lightbox url="services" onClose={() => window.history.back()} />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
