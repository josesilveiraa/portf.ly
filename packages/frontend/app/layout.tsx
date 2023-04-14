import '@/styles/global.css';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';

interface IRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayout) {
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
