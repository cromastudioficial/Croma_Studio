import { useState, useEffect } from 'react';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Listen for cart updates from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        setCartItems(cart);
        setCartCount(cart.length);
      }
    };

    // Check on initial load
    handleStorageChange();

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for cart updates within the same window
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const removeFromCart = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const proceedToWhatsapp = () => {
    if (cartItems.length === 0) return;
    
    let message = "Hola! Me gustaría ordenar los siguientes productos:\n\n";
    
    cartItems.forEach((item, index) => {
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
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Total: $${total} MXN\n\n`;
    message += "¿Podrían confirmarne la disponibilidad y tiempo de entrega? Gracias!";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5542424621?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsCartOpen(false);
  };

  return (
    <header className="bg-white/95 shadow-md fixed w-full top-0 z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center px-[5%] py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative h-[60px] w-[60px] rounded-full p-[2px] bg-gradient-to-r from-[#2180de] to-[#64b5f6] animate-pulse shadow-lg shadow-[#2180de]/30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2180de] to-[#64b5f6] animate-spin opacity-75 blur-sm"></div>
            <div className="relative h-full w-full rounded-full overflow-hidden bg-white">
              <img 
                src="https://myunitecedu-my.sharepoint.com/:i:/g/personal/marco_gutierrezo_my_unitec_edu_mx/EcW2M-ll88JOjFxErG2EV54BIKHumQ_HoxuMHQMv2weuyw?e=A3ib3P" 
                alt="Croma Logo" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <a 
                href="#inicio" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="#productos" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Productos
              </a>
            </li>
            <li>
              <a 
                href="#servicios" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Servicios
              </a>
            </li>
            <li>
              <a 
                href="#proceso" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Proceso
              </a>
            </li>
            <li>
              <a 
                href="#galeria" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Galería
              </a>
            </li>
            <li>
              <a 
                href="#testimonios" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Testimonios
              </a>
            </li>
            <li>
              <a 
                href="#nosotros" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Nosotros
              </a>
            </li>
            <li>
              <a 
                href="#contacto" 
                className="font-medium relative text-gray-700 transition-all duration-300 
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#2180de] 
                after:transition-transform after:duration-300
                hover:text-[#2180de] hover:after:scale-x-100"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        
        <div 
          className="relative cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={toggleCart}
        >
          <i className="fas fa-shopping-cart text-xl"></i>
          <div className="absolute -top-2.5 -right-2.5 bg-[#ff7043] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
            {cartCount}
          </div>
          
          {/* Cart Modal */}
          {isCartOpen && (
            <div className="absolute top-full right-0 mt-4 w-80 max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl z-50">
              <div className="p-4 border-b">
                <h3 className="font-bold text-lg text-gray-800">Tu Carrito</h3>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <i className="fas fa-shopping-cart text-4xl mb-3 text-gray-300"></i>
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="divide-y">
                    {cartItems.map((item, index) => (
                      <div key={index} className="p-4 flex">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium text-gray-800">{item.title}</h4>
                          <div className="text-sm text-gray-600">
                            {item.customization?.talla && <span>Talla: {item.customization.talla}</span>}
                            {item.customization?.color && <span> | Color: {item.customization.color}</span>}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-[#2180de]">${item.price}.00</span>
                            <button 
                              onClick={() => removeFromCart(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-[#2180de]">
                        ${cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)}.00
                      </span>
                    </div>
                    <button 
                      onClick={proceedToWhatsapp}
                      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>Finalizar en WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        
        <button 
          className="md:hidden text-[#212121]" 
          aria-label="Menu"
          onClick={handleMobileMenu}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
            <div className="bg-white h-screen w-64 p-5 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-bold text-xl text-[#2180de]">Menú</h3>
                <button onClick={handleMobileMenu} className="text-xl">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#inicio" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a 
                    href="#productos" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a 
                    href="#servicios" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a 
                    href="#proceso" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Proceso
                  </a>
                </li>
                <li>
                  <a 
                    href="#galeria" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Galería
                  </a>
                </li>
                <li>
                  <a 
                    href="#testimonios" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Testimonios
                  </a>
                </li>
                <li>
                  <a 
                    href="#nosotros" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a 
                    href="#contacto" 
                    className="block py-2 hover:text-[#2180de]"
                    onClick={handleMobileMenu}
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
