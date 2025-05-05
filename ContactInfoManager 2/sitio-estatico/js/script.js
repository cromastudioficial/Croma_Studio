// =================================================================
// SCRIPT PRINCIPAL - SITIO WEB CROMA STUDIO
// =================================================================
// Este archivo contiene todas las funcionalidades interactivas del sitio

// ===============================================================
// CONFIGURACIÓN DEL SITIO - PARÁMETROS CONFIGURABLES
// ===============================================================

// Número de teléfono para WhatsApp (incluye el código de país)
const TELEFONO_WHATSAPP = '5215542424621';

// Base de datos de productos
const productos = [
  {
    id: 1,
    category: 'Playeras Sublimación',
    title: 'Playera Cuello Redondo Manga Corta Dama',
    description: '100% poliéster, ideal para sublimación. Colores vibrantes que duran.',
    price: 180,
    originalPrice: 220,
    badge: 'Popular',
    image: 'images/image_1745815256975.png',
    needsSize: true
  },
  {
    id: 2,
    category: 'Playeras Sublimación',
    title: 'Playera Tipo Polo Manga Corta Caballero',
    description: 'Estilo clásico, 100% poliéster. Perfecta para diseños complejos.',
    price: 250,
    originalPrice: 290,
    image: 'images/image_1745815268901.png',
    needsSize: true
  },
  {
    id: 3,
    category: 'Playeras Sublimación',
    title: 'Playera Cuello Redondo Manga Larga Caballero',
    description: 'Comodidad y estilo en todas las temporadas.',
    price: 220,
    badge: 'Nuevo',
    image: 'images/image_1745815256975.png',
    needsSize: true
  },
  {
    id: 4,
    category: 'Playeras Sublimación',
    title: 'Playera Cuello Redondo Manga Corta Niños',
    description: 'Tamaños para niños de 2 a 12 años. Diseños divertidos.',
    price: 180,
    image: 'images/image_1745815268901.png',
    needsSize: true
  },
  {
    id: 9,
    category: 'Tazas',
    title: 'Taza de Cerámica Tradicional 11 Oz',
    description: 'Cerámica de alta calidad, resistente al microondas y lavavajillas.',
    price: 100,
    originalPrice: 120,
    badge: 'Popular',
    image: 'images/image_1745815290230.png',
    needsSize: false
  },
  {
    id: 10,
    category: 'Tazas',
    title: 'Taza Mágica Cambiante con Calor 12 Oz',
    description: 'Cambia de color con el calor. ¡Sorprende a tus clientes!',
    price: 150,
    image: 'images/image_1745815305739.png',
    needsSize: false
  }
];

// Variables globales
let cart = [];
let selectedProduct = null;

// ===============================================================
// INICIALIZACIÓN Y EVENTOS DOM
// ===============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar carrito desde localStorage si existe
  initCart();
  
  // Inicializar fondo de gradiente animado
  initGradientBackground();
  
  // Configurar animaciones de elementos del DOM
  setupAnimations();
  
  // Configurar navegación y comportamiento del menú
  setupNavigation();
  
  // Efecto de escritura para el título
  setupTypewriterEffect();
  
  // Generar elementos flotantes en el hero
  generateFloatingElements();
});

// ===============================================================
// FUNCIONES DE INICIALIZACIÓN
// ===============================================================

// Inicializar carrito
function initCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Inicializar fondo de gradiente animado
function initGradientBackground() {
  const canvas = document.getElementById('gradient-background');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  // Ajustar tamaño del canvas
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Variables para el fondo
  let mouseX = width / 2;
  let mouseY = height / 2;
  const circles = [];
  const particles = [];
  let hue = 215; // Azul neón
  
  // Manejar movimiento del ratón
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Crear partículas al mover el ratón
    createParticles(mouseX, mouseY, 2);
  });
  
  // Manejar clic del ratón
  document.addEventListener('mousedown', function(e) {
    // Crear círculos al hacer clic
    for (let i = 0; i < 3; i++) {
      const radius = Math.random() * 100 + 50;
      const randomHue = Math.random() * 360;
      circles.push({
        x: mouseX,
        y: mouseY,
        radius: radius,
        color: `hsla(${randomHue}, 100%, 60%, 0.4)`,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: 100 + Math.random() * 100
      });
    }
  });
  
  // Crear círculos iniciales
  for (let i = 0; i < 5; i++) {
    circles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 150 + 100,
      color: `hsla(${Math.random() * 360}, 100%, 60%, 0.4)`,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      life: 0,
      maxLife: 200 + Math.random() * 100
    });
  }
  
  // Crear partículas
  function createParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 5 + 2;
      const speed = Math.random() * 2 + 1;
      const angle = Math.random() * Math.PI * 2;
      const particleHue = (hue + Math.random() * 30) % 360;
      
      particles.push({
        x: x,
        y: y,
        size: size,
        color: `hsla(${particleHue}, 100%, 60%, 0.8)`,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.01 + Math.random() * 0.02
      });
    }
  }
  
  // Animación principal
  function animate() {
    // Fondo
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, 'rgba(20, 0, 50, 1)');
    bgGradient.addColorStop(1, 'rgba(0, 5, 20, 1)');
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Cambiar tono con el tiempo
    hue = (hue + 0.1) % 360;
    
    // Dibujar círculos
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      
      // Actualizar posición
      circle.x += circle.vx;
      circle.y += circle.vy;
      
      // Rebotar en los bordes
      if (circle.x - circle.radius < 0 || circle.x + circle.radius > width) {
        circle.vx *= -1;
      }
      if (circle.y - circle.radius < 0 || circle.y + circle.radius > height) {
        circle.vy *= -1;
      }
      
      // Actualizar vida
      circle.life++;
      const opacity = 1 - (circle.life / circle.maxLife);
      
      // Dibujar círculo
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        circle.x, circle.y, 0, 
        circle.x, circle.y, circle.radius
      );
      const colorStart = circle.color.replace('0.4', `${opacity * 0.7}`);
      const colorEnd = circle.color.replace('0.4', '0');
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorEnd);
      
      ctx.fillStyle = gradient;
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Eliminar círculos "muertos"
      if (circle.life >= circle.maxLife) {
        circles.splice(i, 1);
        i--;
      }
    }
    
    // Dibujar partículas
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      
      // Actualizar posición
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Aplicar gravedad
      particle.vy += 0.05;
      
      // Actualizar alpha
      particle.alpha -= particle.decay;
      
      // Dibujar partícula
      ctx.beginPath();
      ctx.fillStyle = particle.color.replace('0.8', `${particle.alpha}`);
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Eliminar partículas "muertas"
      if (particle.alpha <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
    
    // Restaurar composición
    ctx.globalCompositeOperation = 'source-over';
    
    // Dibujar círculos de fondo
    const time = Date.now() * 0.001;
    for (let i = 0; i < 5; i++) {
      const x = Math.sin(time * (0.2 + i * 0.1)) * width * 0.4 + width * 0.5;
      const y = Math.cos(time * (0.3 + i * 0.1)) * height * 0.4 + height * 0.5;
      const size = 100 + Math.sin(time * (0.4 + i * 0.1)) * 50;
      
      ctx.beginPath();
      const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      const circleHue = (hue + i * 30) % 360;
      circleGradient.addColorStop(0, `hsla(${circleHue}, 100%, 70%, 0.3)`);
      circleGradient.addColorStop(1, `hsla(${circleHue}, 100%, 70%, 0)`);
      
      ctx.fillStyle = circleGradient;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  // Iniciar animación
  animate();
}

// Configurar navegación y comportamiento del menú
function setupNavigation() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Menú móvil
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Cerrar menú al hacer clic en un enlace
  if (navLinks && navMenu && menuButton) {
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuButton.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Cambiar estilo del header al hacer scroll
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Configurar animaciones de elementos del DOM
function setupAnimations() {
  // Función para animar elementos al hacer scroll
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.section-header, .product-category, .service-card, .process-step, .gallery-item, .testimonial-card, .about-text, .value-card, .contact-info, .contact-form');
    
    const triggerBottom = window.innerHeight * 0.8;
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('animated');
      }
    });
  }
  
  // Ejecutar animación al cargar y al hacer scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Animar cards de productos con delay
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animated');
    }, 100 * index);
  });
}

// Efecto de escritura para el título
function setupTypewriterEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(function() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        
        // Al terminar, mostrar subtítulo
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
          heroSubtitle.classList.add('visible');
          
          // Y después, mostrar botones
          setTimeout(() => {
            const heroButtons = document.querySelector('.hero-buttons');
            if (heroButtons) heroButtons.classList.add('visible');
          }, 1000);
        }
      }
    }, 100);
  }
}

// Generar elementos flotantes en el hero
function generateFloatingElements() {
  const floatingContainer = document.querySelector('.floating-elements');
  if (!floatingContainer) return;
  
  for (let i = 0; i < 15; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    // Posición y tamaño aleatorio
    element.style.top = `${Math.random() * 100}%`;
    element.style.left = `${Math.random() * 100}%`;
    element.style.opacity = (Math.random() * 0.8 + 0.2).toString();
    element.style.animationDuration = `${Math.random() * 10 + 5}s`;
    element.style.animationDelay = `${Math.random() * 5}s`;
    element.style.transform = `scale(${Math.random() * 2 + 0.5})`;
    
    floatingContainer.appendChild(element);
  }
}

// ===============================================================
// FUNCIONES DE PRODUCTOS Y CARRITO
// ===============================================================

// Abrir modal de personalización
function personalizarProducto(productId) {
  selectedProduct = productos.find(p => p.id === productId);
  if (!selectedProduct) return;
  
  // Actualizar modal con datos del producto
  document.getElementById('modal-product-image').src = selectedProduct.image;
  document.getElementById('modal-product-title').textContent = selectedProduct.title;
  document.getElementById('modal-product-description').textContent = selectedProduct.description;
  document.getElementById('modal-product-price').textContent = `$${selectedProduct.price} MXN`;
  document.getElementById('modal-product-category').textContent = selectedProduct.category;
  
  // Mostrar/ocultar badge
  const badge = document.getElementById('modal-product-badge');
  if (selectedProduct.badge) {
    badge.textContent = selectedProduct.badge;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
  
  // Mostrar/ocultar precio original
  const originalPrice = document.getElementById('modal-product-original-price');
  if (selectedProduct.originalPrice) {
    originalPrice.textContent = `$${selectedProduct.originalPrice} MXN`;
    originalPrice.style.display = 'inline';
  } else {
    originalPrice.style.display = 'none';
  }
  
  // Mostrar/ocultar opciones según tipo de producto
  document.getElementById('talla-container').style.display = selectedProduct.needsSize ? 'block' : 'none';
  document.getElementById('color-container').style.display = selectedProduct.needsSize ? 'block' : 'none';
  
  // Resetear selección
  document.querySelectorAll('.option-button').forEach(button => {
    button.classList.remove('selected');
  });
  document.querySelectorAll('#talla-container .option-button')[1].classList.add('selected'); // M por defecto
  document.querySelectorAll('#color-container .option-button')[0].classList.add('selected'); // Blanco por defecto
  
  document.getElementById('imagen-url').value = '';
  document.getElementById('instrucciones').value = '';
  
  // Mostrar modal
  document.getElementById('personalizacion-modal').classList.add('active');
  
  // Configurar botones de opciones
  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', function() {
      // Desactivar otros botones del mismo grupo
      const parent = this.parentElement;
      parent.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
      });
      
      // Activar este botón
      this.classList.add('selected');
    });
  });
}

// Cerrar modal
function cerrarModal() {
  document.getElementById('personalizacion-modal').classList.remove('active');
}

// Agregar al carrito
function agregarAlCarrito() {
  if (!selectedProduct) return;
  
  // Obtener valores seleccionados
  const talla = selectedProduct.needsSize ? 
    document.querySelector('#talla-container .option-button.selected').getAttribute('data-value') : 
    null;
    
  const color = selectedProduct.needsSize ? 
    document.querySelector('#color-container .option-button.selected').getAttribute('data-value') : 
    null;
    
  const imagen = document.getElementById('imagen-url').value;
  const instrucciones = document.getElementById('instrucciones').value;
  
  // Crear objeto para el carrito
  const item = {
    ...selectedProduct,
    customization: {
      talla,
      color,
      imagen,
      instrucciones
    },
    quantity: 1
  };
  
  // Agregar al carrito
  cart.push(item);
  saveCart();
  updateCartCount();
  
  // Cerrar modal
  cerrarModal();
  
  // Mostrar mensaje
  alert('¡Producto añadido al carrito!');
}

// Guardar carrito en localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar contador del carrito
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
  
  // Actualizar vista del carrito
  updateCartView();
}

// Actualizar vista del carrito
function updateCartView() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCart = document.querySelector('.empty-cart');
  const totalAmount = document.getElementById('cart-total-amount');
  
  if (cart.length === 0) {
    // Mostrar mensaje de carrito vacío
    if (emptyCart) emptyCart.style.display = 'flex';
    if (cartItemsContainer) {
      cartItemsContainer.querySelectorAll('.cart-item').forEach(item => item.remove());
    }
    if (totalAmount) totalAmount.textContent = '$0.00';
    return;
  }
  
  // Ocultar mensaje de carrito vacío
  if (emptyCart) emptyCart.style.display = 'none';
  
  // Limpiar carrito
  if (cartItemsContainer) {
    cartItemsContainer.querySelectorAll('.cart-item').forEach(item => item.remove());
  }
  
  // Calcular total
  let total = 0;
  
  // Agregar items al carrito
  cart.forEach((item, index) => {
    total += item.price;
    
    if (!cartItemsContainer) return;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <div class="cart-item-customizations">
          ${item.customization.talla ? `<span>Talla: ${item.customization.talla}</span>` : ''}
          ${item.customization.color ? `<span>Color: ${item.customization.color}</span>` : ''}
        </div>
        <div class="cart-item-price-row">
          <span class="cart-item-price">$${item.price}.00</span>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
    
    cartItemsContainer.insertBefore(cartItem, emptyCart);
  });
  
  // Actualizar total
  if (totalAmount) {
    totalAmount.textContent = `$${total}.00`;
  }
}

// Mostrar/ocultar carrito
function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.toggle('active');
  }
}

// Quitar item del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
}

// Finalizar en WhatsApp
function proceedToWhatsapp() {
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
    
    message += `   - Cantidad: 1\n\n`;
  });
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `Total: $${total} MXN\n\n`;
  message += "¿Podrían confirmarme la disponibilidad y tiempo de entrega? Gracias!";
  
  const url = `https://wa.me/${TELEFONO_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  
  // Cerrar carrito
  toggleCart();
}

// Función para abrir WhatsApp directamente (para consultas generales)
function abrirWhatsApp(asunto) {
  const mensaje = `Hola! Me gustaría obtener información sobre ${asunto}.`;
  const url = `https://wa.me/${TELEFONO_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}