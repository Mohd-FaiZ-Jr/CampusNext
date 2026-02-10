import "./globals.css";
import "./styles/chat-animations.css";
import Providers from "./components/Providers";
import ChatIcon from "./components/ChatIcon";
import { Orbitron, Poppins, Raleway, Montserrat, Nunito } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "CampusNest.",
  description: "Student Housing Platform",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${poppins.variable} ${raleway.variable} ${montserrat.variable} ${nunito.variable}`}>
        <Providers>
          {children}
          <ChatIcon />
        </Providers>
      </body>
    </html>
  );
}
