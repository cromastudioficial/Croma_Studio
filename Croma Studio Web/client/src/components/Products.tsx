import { useState, useEffect } from 'react';

type Product = {
  id: number;
  category: string;
  subcategory?: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
};

type ProductCategory = {
  id: string;
  title: string;
  products: Product[];
};

const ProductCustomizationModal = ({ 
  product, 
  onClose, 
  onAddToCart 
}: { 
  product: Product, 
  onClose: () => void, 
  onAddToCart: (productId: number, customization: any) => void 
}) => {
  const [talla, setTalla] = useState<string>('M');
  const [color, setColor] = useState<string>('Blanco');
  const [imagen, setImagen] = useState<string>('');
  const [instrucciones, setInstrucciones] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(product.id, { talla, color, imagen, instrucciones });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-[#2180de]">Personaliza tu Producto</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {product.badge && (
                <div className="absolute top-2 right-2 bg-[#ff7043] text-white px-2 py-1 rounded text-sm font-bold">
                  {product.badge}
                </div>
              )}
            </div>
            
            <div>
              <div className="text-[#2180de] text-sm mb-1">{product.category}</div>
              <h4 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h4>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="text-xl font-bold text-[#2180de] mb-6">
                ${product.price} MXN
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice} MXN</span>
                )}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {product.category.includes("Playera") && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Talla</label>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        type="button"
                        key={size}
                        className={`px-4 py-2 border rounded-md ${
                          talla === size ? 'bg-[#2180de] text-white border-[#2180de]' : 'bg-white text-gray-700 border-gray-300'
                        }`}
                        onClick={() => setTalla(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {['Blanco', 'Negro', 'Gris', 'Azul', 'Rojo'].map(colorOption => (
                      <button
                        type="button"
                        key={colorOption}
                        className={`px-4 py-2 border rounded-md ${
                          color === colorOption ? 'bg-[#2180de] text-white border-[#2180de]' : 'bg-white text-gray-700 border-gray-300'
                        }`}
                        onClick={() => setColor(colorOption)}
                      >
                        {colorOption}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Imagen o Diseño (URL)</label>
              <input
                type="text"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="Pega el enlace a tu imagen o diseño"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2180de] focus:border-transparent"
              />
              <p className="text-gray-500 text-sm mt-1">También puedes enviarnos tu imagen por WhatsApp después de hacer el pedido</p>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Instrucciones Especiales</label>
              <textarea
                value={instrucciones}
                onChange={(e) => setInstrucciones(e.target.value)}
                placeholder="Añade detalles específicos sobre tu personalización"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2180de] focus:border-transparent h-32"
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-3 bg-[#2180de] text-white rounded-md hover:bg-[#1a6abf] transition-colors"
              >
                Agregar al Carrito
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  
  const [productCategories] = useState<ProductCategory[]>([
    {
      id: "playeras-sublimacion",
      title: "Playeras Sublimación",
      products: [
        {
          id: 1,
          category: 'Playeras Sublimación logo pequeño',
          title: 'Playera Unisex',
          description: '100% poliéster, ideal para sublimación. Colores vibrantes que duran.',
          price: 120,
          originalPrice: 145,
          badge: 'Popular',
          image: 'https://maywayul.com/wp-content/uploads/2021/03/Playera-sublimada-con-diseno-de-corazon-scaled-1.png'
        },
        {
          id: 2,
          category: 'Playeras Sublimación un solo lado',
          title: 'Playera Unisex',
          description: 'Estilo clásico, 100% poliéster. Perfecta para diseños complejos.',
          price: 150,
          originalPrice: 170,
          badge: 'Nuevo',
          image: 'https://supercreativa.com.mx/wp-content/uploads/2021/03/Create-your-future.jpg'
        },
        {
          id: 3,
          category: 'Playeras Sublimación ambos lados',
          title: 'Playera Unisex',
          description: 'Comodidad y estilo en todas las temporadas.',
          price: 195,
          badge: 'Nuevo',
          image: 'https://www.printfresh.com.gt/wp-content/uploads/2022/05/playera-unionista.png'
        },
        {
          id: 4,
          category: 'Playeras Sublimación ambos lados',
          title: 'Playera Cuello Redondo Manga larga',
          description: 'Comodidad y estilo en todas las temporadas.',
          price: 200,
          originalPrice: 230,
          image: 'https://http2.mlstatic.com/D_NQ_NP_670859-MLM71757468312_092023-O-playera-sublimada-full-print-personalizada-manga-larga.webp'
        }
      ]
    },
    {
      id: "playeras-dtf",
      title: "Playeras DTF",
      products: [
        {
          id: 5,
          category: 'Playeras DTF logo pequeño',
          title: 'Playera Cuello Redondo Manga Corta (DTF)',
          description: 'Algodón o poliéster, alta calidad de impresión.',
          price: 190,
          originalPrice: 215,
          badge: 'Popular',
          image: 'https://http2.mlstatic.com/D_NQ_NP_949469-MLM45445549036_042021-O-playera-con-mi-logo-mi-marca-playera-empresa-personalizada.webp'
        },
        {
          id: 6,
          category: 'Playeras DTF un solo lado',
          title: 'Playera Cuello Redondo Manga Corta (DTF)',
          description: 'Algodón o poliéster, gran durabilidad.',
          price: 210,
          originalPrice: 230,
          image: 'https://http2.mlstatic.com/D_NQ_NP_985371-MLM75121291558_032024-O-playera-personalizada-cualquier-mandanos-tu-diseno.webp'
        },
        {
          id: 7,
          category: 'Playeras DTF ambos lados',
          title: 'Playera Cuello Redondo (DTF)',
          description: 'Algodón o poliéster, ideal para todas las temporadas.',
          price: 245,
          image: 'https://promoscreativos.com/wp-content/uploads/2024/04/Playeras-personalizadas-en-DTF.jpg'
        },
        {
          id: 8,
          category: 'Playeras DTF oversize',
          title: 'Playera Cuello Redondo (DTF)',
          description: 'Algodón o poliéster, comodidad y estilo.',
          price: 350,
          image: 'https://http2.mlstatic.com/D_NQ_NP_697454-MLM85733256850_062025-O.webp'
        }
      ]
    },
    {
      id: "tazas",
      title: "Tazas y termos Personalizadas",
      products: [
        {
          id: 9,
          category: 'Taza blanca',
          title: 'Taza de Cerámica Tradicional 11 Oz',
          description: 'Cerámica de alta calidad, resistente al microondas y lavavajillas.',
          price: 85,
          originalPrice: 100,
          badge: 'Popular',
          image: 'https://printdepot.com.mx/wp-content/uploads/2024/11/TAZA-personalizada-monterrey-economicas.png'
        },
        {
          id: 10,
          category: 'Tazas bicolor',
          title: 'Taza de Cerámica bicolor 11 Oz',
          description: 'Sorprende a tus clientes!',
          price: 95,
          image: 'https://mecolour.com.mx/wp-content/uploads/2024/01/Taza-con-interior-y-asa-de-color-Verde-oscuro-2.jpg'
        },
        {
          id: 11,
          category: 'Termo',
          title: 'Termo sublimado',
          description: 'Ideal para café o té.',
          price: 130,
          image: 'https://gpspromocionales.com.mx/data/images/products/1655749463-12042022210135_SB19esq_n2.jpg.jpg'
        },
        {
          id: 12,
          category: 'Termo a Laser',
          title: 'Termo con grabado laser',
          description: 'Perfecto para viajes.',
          price: 300,
          badge: 'Nuevo',
          image: 'https://innovaprintonline.mx/cdn/shop/files/Grabado_Laser_de_Nombre_en_Termo_-_innpresiona-7406721.webp?v=1738956045'
        }
      ]
    }
  ]);

  useEffect(() => {
    // Activate animations for products with delay
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('opacity-100');
      }, 100 * index);
    });
  }, []);

  const handlePersonalizar = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToWishlist = (productId: number) => {
    console.log(`Added product ${productId} to wishlist`);
    alert(`¡Producto agregado a favoritos!`);
  };
  
  const handleAddToCart = (productId: number, customization: any) => {
    const productToAdd = [...productCategories.flatMap(cat => cat.products)].find(p => p.id === productId);
    if (productToAdd) {
      const cartItem = {
        ...productToAdd,
        customization,
        quantity: 1
      };
      
      // Actualizar estado local
      const newCart = [...cart, cartItem];
      setCart(newCart);
      
      // Guardar en localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      // Notificar a otros componentes
      window.dispatchEvent(new Event('cartUpdated'));
      
      console.log("Producto agregado al carrito:", cartItem);
      
      // Mostrar mensaje de confirmación
      alert("¡Producto personalizado agregado! Puedes ver tu carrito haciendo clic en el ícono de carrito en la parte superior.");
    }
  };
  
  const proceedToWhatsapp = () => {
    if (cart.length === 0) return;
    
    let message = "Hola! Me gustaría ordenar los siguientes productos:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   - Precio: $${item.price} MXN\n`;
      
      if (item.customization) {
        if (item.customization.talla) message += `   - Talla: ${item.customization.talla}\n`;
        if (item.customization.color) message += `   - Color: ${item.customization.color}\n`;
        if (item.customization.imagen) message += `   - Imagen: ${item.customization.imagen}\n`;
        if (item.customization.instrucciones) message += `   - Instrucciones: ${item.customization.instrucciones}\n`;
      }
      
      message += `   - Cantidad: ${item.quantity}\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Total: $${total} MXN\n\n`;
    message += "¿Podrían confirmarne la disponibilidad y tiempo de entrega? Gracias!";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5542424621?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="productos" className="py-24 px-[5%] bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#2180de] font-bold relative inline-block pb-2 
          after:content-[''] after:absolute after:w-0 after:h-1 after:bg-[#2180de] after:bottom-0 after:left-0 
          after:transition-all after:duration-1000 after:ease-in-out hover:after:w-full animate-[titleGlow_3s_ease-in-out_infinite]">
          Nuestros Productos
        </h2>
      </div>

      {productCategories.map((category) => (
        <div key={category.id} className="w-full">
          <h3 className="text-center my-12 relative text-[#2180de] text-3xl font-semibold 
            before:content-[''] before:absolute before:w-0 before:h-[2px] before:bg-[#2180de] before:top-[calc(100%+4px)] before:left-1/2 before:-translate-x-1/2
            before:transition-all before:duration-500 hover:before:w-28 inline-block animate-pulse">
            {category.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {category.products.map((product) => (
              <div 
                key={product.id}
                className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-2.5 right-2.5 bg-[#ff7043] text-white px-2.5 py-1.5 rounded text-sm font-bold">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-[#2180de] text-sm mb-1">{product.category}</div>
                  <h4 className="text-xl font-semibold mb-2.5 text-gray-800">{product.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="text-xl font-bold text-[#2180de] mb-4">
                    ${product.price}.00 
                    {product.originalPrice && (
                      <span className="text-sm text-gray-600 line-through ml-1">${product.originalPrice}.00</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <button 
                      className="grow bg-[#2180de] text-white border-none py-2.5 rounded cursor-pointer transition-colors font-medium hover:bg-[#1a6abf]"
                      onClick={() => handlePersonalizar(product)}
                    >
                      Personalizar
                    </button>
                    <button 
                      className="w-10 bg-[#F5F5F5] border-none rounded ml-2.5 cursor-pointer transition-colors hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => handleAddToWishlist(product.id)}
                    >
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Modal de personalización */}
      {selectedProduct && (
        <ProductCustomizationModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      
      {/* Botón flotante de proceder al pedido */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-75 blur-sm animate-pulse"></div>
            <button 
              onClick={proceedToWhatsapp}
              className="relative bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors flex items-center hover:scale-105 transform duration-300"
            >
              <i className="fab fa-whatsapp text-2xl mr-2"></i>
              <span className="font-medium">Finalizar en WhatsApp</span>
              <span className="bg-red-500 text-white text-xs rounded-full ml-2 px-2 py-1 animate-bounce">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
