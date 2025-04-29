import React from 'react';

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const Services = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Sublimación Textil",
      description: "Personalización de playeras, sudaderas y más con tecnología de sublimación para colores vibrantes y duraderos.",
      icon: "fas fa-tshirt"
    },
    {
      id: 2,
      title: "Personalización de Tazas",
      description: "Transformamos tazas comunes en piezas únicas con tus diseños favoritos, resistentes al lavado.",
      icon: "fas fa-coffee"
    },
    {
      id: 3,
      title: "Diseño Gráfico",
      description: "¿No tienes diseño? Nuestros creativos desarrollan ideas únicas adaptadas a tus necesidades.",
      icon: "fas fa-palette"
    },
    {
      id: 4,
      title: "Impresiones Digitales",
      description: "Tarjetas de presentación, flyers, stickers y más con la más alta calidad de impresión.",
      icon: "fas fa-print"
    },
    {
      id: 5,
      title: "Fotografía de Productos",
      description: "Realizamos fotos profesionales de tus productos para catálogos y redes sociales.",
      icon: "fas fa-camera"
    },
    {
      id: 6,
      title: "Embalaje Personalizado",
      description: "Diseñamos empaques únicos que realzan la presentación de tus productos.",
      icon: "fas fa-box"
    },
  ];

  return (
    <section id="servicios" className="py-24 px-[5%] bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#2180de] font-bold relative inline-block pb-2 
          after:content-[''] after:absolute after:w-0 after:h-1 after:bg-[#2180de] after:bottom-0 after:left-0 
          after:transition-all after:duration-1000 after:ease-in-out hover:after:w-full animate-[titleGlow_3s_ease-in-out_infinite]">
          Nuestros Servicios
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-center mb-6">
              <i className={`${service.icon} text-5xl text-[#2180de]`}></i>
            </div>
            <h3 className="text-xl font-bold text-center text-[#2180de] mb-4">{service.title}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;