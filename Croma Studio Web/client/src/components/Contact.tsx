const Contact = () => {
  return (
    <section id="contacto" className="py-24 px-[5%] bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#2180de] font-bold relative inline-block pb-2 
          after:content-[''] after:absolute after:w-0 after:h-1 after:bg-[#2180de] after:bottom-0 after:left-0 
          after:transition-all after:duration-1000 after:ease-in-out hover:after:w-full animate-[titleGlow_3s_ease-in-out_infinite]">
          Contacto
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md mb-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl text-[#2180de] mb-6 font-bold">Información de Contacto</h3>
              
              <div className="mb-8 flex items-start">
                <div className="bg-[#e9f4ff] p-3 rounded-full mr-4">
                  <i className="fas fa-map-marker-alt text-[#2180de]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#212121]">Dirección</h4>
                  <p className="text-gray-700">Ciudad de México, México</p>
                </div>
              </div>
              
              <div className="mb-8 flex items-start">
                <div className="bg-[#e9f4ff] p-3 rounded-full mr-4 animate-pulse">
                  <i className="fas fa-phone-alt text-[#2180de]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#212121]">Teléfono</h4>
                  <p className="text-gray-700">
                    <a href="tel:5542424621" className="hover:text-[#2180de] transition-colors hover:font-bold">55 4242 4621</a>
                  </p>
                </div>
              </div>
              
              <div className="mb-8 flex items-start">
                <div className="bg-[#e9f4ff] p-3 rounded-full mr-4">
                  <i className="fas fa-envelope text-[#2180de]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#212121]">Email</h4>
                  <p className="text-gray-700">
                    <a href="mailto:cromastudiof@gmail.com" className="hover:text-[#2180de] transition-colors">cromastudiof@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl text-[#2180de] mb-6 font-bold">Horario de Atención</h3>
              
              <div className="mb-8 flex items-start">
                <div className="bg-[#e9f4ff] p-3 rounded-full mr-4">
                  <i className="fas fa-clock text-[#2180de]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#212121]">Días Laborables</h4>
                  <p className="text-gray-700">Lunes a Viernes: 9am - 6pm</p>
                  <p className="text-gray-700">Sábado: 10am - 2pm</p>
                  <p className="text-gray-700">Domingo: Cerrado</p>
                </div>
              </div>
              
              <h3 className="text-2xl text-[#2180de] mb-6 font-bold">Síguenos</h3>
              
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#e9f4ff] p-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <i className="fab fa-facebook-f text-[#2180de] text-xl"></i>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#e9f4ff] p-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <i className="fab fa-instagram text-[#2180de] text-xl"></i>
                </a>
                <a 
                  href="https://wa.me/5542424621" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#e9f4ff] p-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <i className="fab fa-whatsapp text-[#2180de] text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://wa.me/5542424621" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors animate-pulse"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            <span>Contáctanos por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;