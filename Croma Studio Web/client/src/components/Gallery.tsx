import React, { useEffect } from 'react';

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Playeras'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Tazas'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1575377222312-dd1a63a51638?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Termos'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Playeras para niños'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Tazas'
    }
  ];

  useEffect(() => {
    // Animación para los elementos de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('opacity-100', 'translate-y-0');
      }, 100 * index);
    });
  }, []);

  return (
    <section id="galeria" className="py-24 px-[5%] bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#2180de] font-bold relative inline-block pb-2 
          after:content-[''] after:absolute after:w-0 after:h-1 after:bg-[#2180de] after:bottom-0 after:left-0 
          after:transition-all after:duration-1000 after:ease-in-out hover:after:w-full animate-[titleGlow_3s_ease-in-out_infinite]">
          Galería de Trabajos
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {galleryItems.map((item) => (
          <div 
            key={item.id} 
            className="gallery-item relative overflow-hidden rounded-lg shadow-md opacity-0 translate-y-8 transition-all duration-500 group"
          >
            <img 
              src={item.image} 
              alt={`Gallery item ${item.id}`} 
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-white p-4 font-medium">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;