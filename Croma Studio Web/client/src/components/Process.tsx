import React from 'react';

type ProcessStep = {
  id: number;
  title: string;
  description: string;
};

const Process = () => {
  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: "Consulta",
      description: "Platicamos sobre tu proyecto y necesidades"
    },
    {
      id: 2,
      title: "Diseño",
      description: "Creamos propuestas personalizadas"
    },
    {
      id: 3,
      title: "Aprobación",
      description: "Revisamos y ajustamos según tus comentarios"
    },
    {
      id: 4,
      title: "Producción",
      description: "Fabricamos tus productos con la más alta calidad"
    },
    {
      id: 5,
      title: "Entrega",
      description: "Recibes tus productos listos para usar"
    }
  ];

  return (
    <section id="proceso" className="py-24 px-[5%] bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#2180de] font-bold relative inline-block pb-2 
          after:content-[''] after:absolute after:w-0 after:h-1 after:bg-[#2180de] after:bottom-0 after:left-0 
          after:transition-all after:duration-1000 after:ease-in-out hover:after:w-full animate-[titleGlow_3s_ease-in-out_infinite]">
          Nuestro Proceso
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Línea horizontal */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-[#2180de]/20 hidden md:block"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start">
          {processSteps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center mb-12 md:mb-0 relative z-10 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#2180de] text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg transition-all duration-300 group-hover:scale-110">
                {step.id}
              </div>
              <h3 className="text-lg font-bold text-[#2180de] mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center max-w-[150px] text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;