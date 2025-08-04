import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f1f5f9] border-t border-gray-200 mt-0">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-800 hover:text-indigo-600 transition-colors font-bold text-lg"
          >
            <img src="/logo.png" alt="Zettro Logo" className="w-8 h-8" />
            ZETTRO
          </Link>
        </div>

        {/* Socials */}
        <div className="flex gap-5">
          {/* GitHub */}
          <a
            href="https://github.com/akshay-kakade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.612-4.033-1.612-.547-1.385-1.333-1.754-1.333-1.754-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.42-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.45 11.45 0 0 1 3-.404c1.02.005 2.047.138 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.913 1.233 3.222 0 4.61-2.807 5.623-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.577C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/maverick_7821/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4.25 2.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5z" />
            </svg>
          </a>

          {/* YouTube (high-res) */}
          <a
            href="https://www.youtube.com/@itsgametimebudy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-600 transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" viewBox="0 0 576 512" fill="currentColor">
              <path d="M549.7 124.1c-6.3-23.8-25-42.5-48.9-48.9C456.5 64 288 64 288 64s-168.5 0-212.8 11.2c-23.8 6.3-42.5 25-48.9 48.9C16 168.5 16 256 16 256s0 87.5 10.3 131.9c6.3 23.8 25 42.5 48.9 48.9C119.5 448 288 448 288 448s168.5 0 212.8-11.2c23.8-6.3 42.5-25 48.9-48.9C560 343.5 560 256 560 256s0-87.5-10.3-131.9zM232 336V176l142 80-142 80z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/akshay-kakade-860224356/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 7h4V21h-4V7zM8.5 7h3.64v1.77h.05c.51-.95 1.76-1.95 3.61-1.95 3.86 0 4.58 2.54 4.58 5.85V21h-4V13.5c0-1.78-.03-4.08-2.49-4.08-2.49 0-2.87 1.94-2.87 3.95V21h-4V7z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-gray-500 text-xs md:text-sm">
          <div>&copy; {new Date().getFullYear()} Zettro. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
