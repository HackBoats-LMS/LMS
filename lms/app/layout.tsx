import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HACKBOATS LMS",
  description: "Lms",
  icons: {
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAASFBMVEVHcEzzbStLyPVHx/TyZyPyZyL0Zhz4YgA+yfdFx/XyayfyaCP6YABRxO5Gx/RHyPRByfbyaCRGx/RGx/TyZyJFx/TyaCTyaCS0WiWKAAAAGHRSTlMADhQy7P+Qz3v/GOD/4JhlUCZAzTHtS1oJ89+PAAAAh0lEQVR4AdWRxREEIRAAV3HX/DM9/Iziv/1BGhnZHsf+MTnOwtG3rhvUCbghwh1Utsh9036KcTwQMymP4zhFsjOpyjzJcyWPJolOkCpNdulZu1XZKXLEs5D87AFpl9D1WWSMUWIZkKyfzuVZE53LVEc/kf3PEu/+KS0e+NaMUGW8gRpKbE/jBZuhCmk4MzsUAAAAAElFTkSuQmCC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
