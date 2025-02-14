# ServiOptica Frontend Application

Este proyecto es una aplicación frontend desarrollada en React, diseñada para gestionar distintas funcionalidades administrativas y de usuario final. Utiliza tecnologías modernas como Material UI (MUI), React Router, Jotai para manejo de estado, y una arquitectura modular para garantizar escalabilidad y mantenibilidad.

---

## 📁 Estructura del Proyecto

### **Carpetas principales**
1. **`src/`**: Contiene todo el código fuente de la aplicación.
   - **`api/`**: Contiene servicios y funciones para interactuar con la API backend. Cada funcionalidad está organizada en subcarpetas:
     - **`Auth/`**: Gestión de autenticación.
     - **`Faq/`**: Funciones relacionadas con preguntas frecuentes.
     - **`Promotions/`**: Gestión de promociones.
     - **`Users/`**: Operaciones relacionadas con usuarios (CRUD).
   - **`assets/`**: Recursos estáticos como imágenes, fuentes y estilos globales.
   - **`components/`**: Componentes React reutilizables organizados en:
     - **`atoms/`**: Componentes más pequeños y básicos (botones, inputs, etc.).
     - **`layout/`**: Componentes responsables del diseño general como cabeceras, pies de página y estructuras de páginas.
     - **`molecules/`**: Componentes más complejos que combinan múltiples átomos.
     - **`organisms/`**: Bloques funcionales que combinan moléculas y átomos.
     - **`pages/`**: Componentes para las páginas principales de la aplicación (Dashboard, Login, FAQ, etc.).
   - **`context/`**: Manejo de estado global con React Context. Ejemplo:
     - **`MessageContext.tsx`**: Proporciona una capa para mostrar mensajes globales (snackbars, alertas, etc.).
   - **`hooks/`**: Hooks personalizados para encapsular lógica reutilizable.
   - **`router/`**: Configuración de rutas de la aplicación usando React Router.
   - **`scripts/`**: Scripts de automatización para flujos de desarrollo (gestión de ramas y actualizaciones).
   - **`store/`**: Configuración de estado global usando Jotai.
   - **`style/`**: Estilos globales o específicos de componentes.
   - **`utils/`**: Funciones utilitarias reutilizables en toda la aplicación.

### **Archivos clave**
- **`App.tsx`**: Punto de entrada principal de la aplicación donde se configura el `Router` y los proveedores globales.
- **`index.tsx`**: Renderiza la aplicación en el DOM.
- **`react-app-env.d.ts`**: Archivo de soporte para el tipado de TypeScript.
- **`reportWebVitals.ts`**: Para medir métricas de rendimiento de la aplicación.

---

## ⚙️ Tecnologías utilizadas

### **Frameworks y librerías principales**
- **React**: Para la creación de interfaces de usuario.
- **React Router**: Gestión de navegación.
- **Jotai**: Manejo de estado global.
- **Material UI (MUI)**: Sistema de diseño y componentes estilizados.

### **Herramientas para desarrollo**
- **TypeScript**: Para tipado estático y mayor seguridad en el desarrollo.
- **Styled Components**: Para estilos CSS en JavaScript.
- **Swiper**: Para carruseles interactivos.
- **Testing Library**: Para pruebas unitarias y funcionales.

---

## 🚀 Scripts disponibles

En el archivo `package.json`, se incluyen los siguientes scripts para facilitar el desarrollo:

- **`start`**: Inicia la aplicación en modo desarrollo en el puerto 8000.
- **`build`**: Genera una versión optimizada para producción.
- **`test`**: Ejecuta las pruebas configuradas.
- **`eject`**: Extrae la configuración de React Scripts para personalización avanzada.
- **Scripts personalizados**:
  - **`update-master`**: Actualiza la rama master desde dev.
  - **`start-branch`**: Crea una nueva rama desde dev.
  - **`end-branch`**: Realiza un merge de la rama actual a dev y la elimina.
  - **`update-branch`**: Actualiza la rama actual desde dev.

---

## 🌐 Arquitectura de la aplicación

1. **Modularidad**: 
   - Cada funcionalidad está aislada en su propio módulo dentro de la carpeta `api/`.
   - Los componentes están organizados jerárquicamente para promover la reutilización y el diseño limpio.

2. **Estado global**: 
   - **Jotai** se utiliza en la carpeta `store/` para manejar estados clave como autenticación.
   - Contextos como `MessageContext` permiten manejar funcionalidades globales específicas (mensajes, alertas).

3. **UI y Estilo**:
   - MUI proporciona una base visual consistente, con personalización adicional usando `@emotion`.

4. **Rutas**:
   - Definidas en `src/router/`, se soportan rutas públicas, privadas y específicas para admins.

---

## 🛠️ Desarrollo continuo

El flujo de desarrollo incluye scripts automatizados para manejo de ramas y actualizaciones (`scripts/`). Esto permite a los desarrolladores mantener sincronizadas las ramas `dev` y `master` y trabajar en ramas de características específicas sin conflictos.

---
