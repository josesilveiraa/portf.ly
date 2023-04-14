import '@/styles/global.css';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-800 ">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
