# Proyecto - Somnus App

## Descripción

Somnus es un proyecto de la asignatura de Desarrollo Ágil de Software de la Universidad Tecnológica de la Mixteca. El proyecto utiliza como metodología ágil de desarrollo Scrum. Consiste en una aplicación móvil (enfocada en Android) orientada a mejorar la calidad de sueño de los estudiantes universitarios.

## Instalación y ejecución

### Requisitos

- Node.js >= 18.0.0 (De preferencia usar una versión LTS)
- npm

### Instalación

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`

### Ejecución

1. Tener un emulador corriendo o un dispositivo conectado
2. En Android, ejecutar la aplicación con `npm run android`, si esto no funciona, hacer lo siguiente: `npm start` y de las opciones que salen presionar la tecla `a` (run on Android)
3. (Extra) En caso de tener problemas al correr la aplicación, ejecutar `npm start -- --reset-cache` para limpiar la caché y volver a intentar.

### Ejecución de pruebas

1. Ejecutar las pruebas con `npm run test`

## Estado del proyecto

### Directorio de código

- `src/` - Código fuente del proyecto
- `src/assets/` - Recursos estáticos
- `src/components/` - Componentes de React
- `src/screens/` - Pantallas de la aplicación
- `src/services/` - Servicios de la aplicación
- `src/utils/` - Funciones auxiliares
- `__tests__/` - Pruebas unitarias 
- `android/` - Proyecto de Android  
- `App.tsx` - Punto de entrada de la aplicación
- `SetupColors.ts` - Configuración de colores de la aplicación
- `src/Main.tsx` - Componente principal de la aplicación