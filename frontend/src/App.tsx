import { HashRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { FeedPage } from "@/pages/FeedPage";
import { AuthPage } from "@/pages/AuthPage";
import { BlogPage } from "@/pages/BlogPage";
import { CreatePage } from "@/pages/CreatePage";

function App() {
  return (
      <div className="bg-gray-950 text-gray-100 min-h-screen font-sans">
        {/* The NavBar will be displayed on every page */}
        <NavBar />
        <main>
          {/* The Routes component will render the correct page based on the URL */}
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
