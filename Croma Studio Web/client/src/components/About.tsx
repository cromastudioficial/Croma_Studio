import React from 'react';

type ValueCard = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const About = () => {
  const values: ValueCard[] = [
    {
      id: 1,
      title: "Calidad",
      description: "Materiales premium y procesos cuidadosos",
      icon: "fas fa-medal"
    },
    {
      id: 2,
      title: "Creatividad",
      description: "Diseños originales y personalizados",
      icon: "fas fa-lightbulb"
    },
    {
      id: 3,
      title: "Pasión",
      description: "Amamos lo que hacemos y se nota",
      icon: "fas fa-heart"
    },
    {
      id: 4,
      title: "Puntualidad",
      description: "Entregas a tiempo siempre",
      icon: "fas fa-clock"
    }
  ];

  return (
    <section id="nosotros" className="py-24 px-[5%] bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#2180de] font-bold relative inline-block pb-2 
          after:content-[''] after:absolute after:w-0 after:h-1 after:bg-[#2180de] after:bottom-0 after:left-0 
          after:transition-all after:duration-1000 after:ease-in-out hover:after:w-full animate-[titleGlow_3s_ease-in-out_infinite]">
          Sobre Nosotros
        </h2>
      </div>

      <div className="max-w-4xl mx-auto mb-16 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Croma Studio nació en 2025 con la pasión por transformar ideas en productos únicos. Somos 
          especialistas en sublimación y personalización, comprometidos con la calidad, la creatividad y la 
          satisfacción de nuestros clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {values.map((value) => (
          <div 
            key={value.id}
            className="bg-white p-6 rounded-lg text-center hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="text-[#2180de] text-4xl mb-4">
              <i className={value.icon}></i>
            </div>
            <h3 className="text-xl font-bold text-[#2180de] mb-3">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;