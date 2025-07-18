import {
Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';

const socialIcons = [
  { icon: <Facebook size={16} />, link: '#' },
  { icon: <Instagram size={16} />, link: '#' },
  { icon: <Twitter size={16} />, link: '#' },
  { icon: <Linkedin size={16} />, link: '#' },
  { icon: <Youtube size={16} />, link: '#' },
//   { icon: <Whatsapp size={16} />, link: '#' },
];

const Footer = () => {
  return (
    <footer className="bg-[#003C80] text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        
        {/* Left */}
        <div className="text-sm mb-2 md:mb-0">
          © 2025 All rights reserved
        </div>

        {/* Center */}
        <div className="flex gap-3 mb-2 md:mb-0">
          {socialIcons.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="bg-[#00b3e6] hover:bg-[#00a1cc] text-white rounded-full p-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
