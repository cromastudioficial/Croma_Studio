import React, { useState, useEffect, useRef } from 'react';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  comment: string;
  avatar: string;
  rating: number;
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Laura Martínez",
      position: "Propietaria de Tienda Online",
      comment: "Los productos personalizados de Croma Studio superaron mis expectativas. La calidad de impresión y los colores son impecables, además el servicio fue excelente.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      position: "Organizador de Eventos",
      comment: "Contratamos a Croma Studio para personalizar merchandising para un evento corporativo y quedamos muy satisfechos. Entrega puntual y excelente acabado.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "María González",
      position: "Diseñadora Independiente",
      comment: "Como diseñadora, valoro mucho la calidad de impresión y Croma Studio realmente destaca. He recomendado sus servicios a todos mis clientes.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollTo({
        left: activeIndex * testimonialRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  return (
    <section id="testimonios" className="py-24 px-[5%] bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#2180de] font-bold relative inline-block pb-2 
          after:content-[''] after:absolute after:w-0 after:h-1 after:bg-[#2180de] after:bottom-0 after:left-0 
          after:transition-all after:duration-1000 after:ease-in-out hover:after:w-full animate-[titleGlow_3s_ease-in-out_infinite]">
          Testimonios
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div 
          ref={testimonialRef}
          className="flex overflow-x-hidden w-full snap-x"
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="min-w-full px-8 snap-center"
            >
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.position}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-[#2180de]' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
        
        <button 
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-[#2180de]"
          onClick={() => setActiveIndex(prevIndex => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <button 
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-[#2180de]"
          onClick={() => setActiveIndex(prevIndex => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;