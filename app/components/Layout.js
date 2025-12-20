import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}