# Retrospectiva del Proyecto: NeoHorizon Tech 🚀

Este documento resume el desempeño del equipo durante la fase de prototipado y diseño del e-commerce para **DH Venture Capitals**.

## 1. ¿Qué salió bien? (Madrugadas de éxito)
*   **Identidad Visual Sólida:** Logramos establecer una estética *Cyberpunk-Minimalista* coherente en todas las páginas (Home, Detalle, Carrito, Auth).
*   **Modularidad en CSS:** El uso de variables globales (`:root`) facilitó la implementación del modo oscuro y los acentos neón de forma consistente.
*   **UX de Producto:** La implementación de la galería con previsualización *on-hover* y el selector de variantes dinámico elevan la calidad percibida del sitio.
*   **Adaptabilidad:** El diseño responde bien a cambios inmediatos (como la inclusión de SVGs inline cuando fallaron las librerías externas).

## 2. ¿Qué dificultades encontramos? (Bugs y bloqueos)
*   **Gestión de Recursos Externos:** Depender de CDNs para iconos generó fricción inicial. Se resolvió migrando a SVGs locales para mayor control.
*   **Layout de Detalle de Producto:** Hubo desafíos iniciales para mantener el diseño de dos columnas sin que el contenido se desplazara verticalmente; se corrigió reforzando las propiedades de *Flexbox*.
*   **Consistencia de Imágenes:** Encontrar placeholders que mantuvieran la calidad técnica deseada tomó más tiempo del previsto.

## 3. ¿Qué aprendimos? (Lecciones para el Sprint)
*   **Inline vs Externo:** Para prototipos rápidos, los SVGs inline son más fiables que las fuentes de iconos externas.
*   **Documentación Viva:** Mantener el `README.md` actualizado desde el día 1 ayuda a no perder el foco del público objetivo (Gamers y Profesionales).
*   **Simplicidad es Poder:** A veces, un formulario limpio con un buen efecto de *Glassmorphism* comunica más profesionalismo que uno cargado de animaciones complejas.

## 4. Próximos Pasos (Hacia Node.js & React)
*   **Componentización:** Migrar este HTML estático a componentes reutilizables de React.
*   **Estado Global:** Implementar Context API o Redux para que el botón "Añadir al carrito" funcione realmente entre páginas.
*   **API REST:** Comenzar el desarrollo del backend en Node.js para servir el catálogo de productos desde una base de datos real.

---
