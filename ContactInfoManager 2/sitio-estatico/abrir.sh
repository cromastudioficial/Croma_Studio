#!/bin/bash
echo "Abriendo el sitio web de Croma Studio..."

# Detectar el sistema operativo y abrir el navegador apropiadamente
case "$(uname -s)" in
   Darwin)
     # macOS
     open ./index.html
     ;;
   Linux)
     # Linux
     if command -v xdg-open > /dev/null; then
       xdg-open ./index.html
     else
       echo "No se pudo abrir automáticamente. Por favor, abre el archivo index.html manualmente."
     fi
     ;;
   *)
     # Otros sistemas
     echo "No se pudo abrir automáticamente. Por favor, abre el archivo index.html manualmente."
     ;;
esac

echo "Si el sitio no se abre automáticamente, puedes abrir el archivo \"index.html\" manualmente."
read -p "Presiona Enter para continuar..."