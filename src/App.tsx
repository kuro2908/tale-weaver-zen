import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoryDetail from "./pages/StoryDetail";
import Reader from "./pages/Reader";
import Search from "./pages/Search";
import Rankings from "./pages/Rankings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditStory from "./pages/EditStory";
import EditChapter from "./pages/EditChapter";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/truyen/:slug" element={<StoryDetail />} />
          <Route path="/truyen/:slug/:chapterNumber" element={<Reader />} />
          <Route path="/tim-kiem" element={<Search />} />
          <Route path="/xep-hang" element={<Rankings />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/author/stories/edit/:id" element={<EditStory />} />
          <Route path="/author/stories/:id/chapters/edit/:chapterId" element={<EditChapter />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
