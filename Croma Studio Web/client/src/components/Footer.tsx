const Footer = () => {
  return (
    <footer className="bg-[#15212f] text-white py-12 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-white">
            Croma Studio
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Transformamos tus ideas en productos personalizados de alta calidad. 
            Especialistas en sublimación y DTF para negocios y eventos.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#2180de]/20 p-3 rounded-full text-white hover:bg-[#2180de]/30 transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#2180de]/20 p-3 rounded-full text-white hover:bg-[#2180de]/30 transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="https://wa.me/5542424621" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#2180de]/20 p-3 rounded-full text-white hover:bg-[#2180de]/30 transition-colors"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-6">Enlaces Rápidos</h3>
          <ul className="space-y-3">
            <li>
              <a href="#inicio" className="text-gray-300 hover:text-white transition-colors">Inicio</a>
            </li>
            <li>
              <a href="#productos" className="text-gray-300 hover:text-white transition-colors">Productos</a>
            </li>
            <li>
              <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">Servicios</a>
            </li>
            <li>
              <a href="#proceso" className="text-gray-300 hover:text-white transition-colors">Proceso</a>
            </li>
            <li>
              <a href="#galeria" className="text-gray-300 hover:text-white transition-colors">Galería</a>
            </li>
            <li>
              <a href="#nosotros" className="text-gray-300 hover:text-white transition-colors">Nosotros</a>
            </li>
            <li>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-6">Contacto</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <i className="fas fa-map-marker-alt mt-1.5 mr-3 text-[#2180de]"></i>
              <span className="text-gray-300">Ciudad de México, México</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-phone-alt mt-1.5 mr-3 text-[#2180de]"></i>
              <div className="text-gray-300">
                <div>55 4242 4621</div>
              </div>
            </li>
            <li className="flex items-start">
              <i className="fas fa-envelope mt-1.5 mr-3 text-[#2180de]"></i>
              <span className="text-gray-300">cromastudiof@gmail.com</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-clock mt-1.5 mr-3 text-[#2180de]"></i>
              <div className="text-gray-300">
                <div>Lun-Vie: 9am - 7pm</div>
                <div>Sáb: 10am - 2pm</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700/30 mt-12 pt-8 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Croma Studio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
