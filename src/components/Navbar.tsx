"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link 
          href="/" 
          className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
        >
          ESDRA
        </Link>
        <div className="flex space-x-8">
          <Link 
            href="#visao" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            Visão
          </Link>
          <Link 
            href="#tecnologias" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            Tecnologias
          </Link>
          <Link 
            href="#projetos" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            Projetos
          </Link>
          <Link 
            href="#contato" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}
