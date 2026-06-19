# 🔗 Quan2Qual

<div align="center">

![Quan2Qual Logo](https://img.shields.io/badge/Quan2Qual-Análisis%20de%20Redes%20Sociales-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3TDEyIDEyTDIyIDdMMTIgMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yIDEyTDEyIDE3TDIyIDEyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTIgMTdMMTIgMjJMMjIgMTciIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=)

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=vercel)](https://quan2qual.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Transforma datos cualitativos en estructuras cuantitativas para Análisis de Redes Sociales**

[📖 Documentación](#-tabla-de-contenidos) • [🚀 Demo](https://quan2qual.vercel.app/) • [📥 Instalación](#-instalación) • [🤝 Contribuir](#-contribuir)

</div>

---

## 📑 Tabla de Contenidos

- [📖 Descripción](#-descripción)
- [✨ Características Principales](#-características-principales)
- [🎯 Demo y Capturas](#-demo-y-capturas)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📋 Requisitos Previos](#-requisitos-previos)
- [📥 Instalación](#-instalación)
- [🚀 Uso Básico](#-uso-básico)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔌 API Endpoints](#-api-endpoints)
- [🌐 Deployment](#-deployment)
- [🤝 Contribuir](#-contribuir)
- [🗺️ Roadmap](#️-roadmap)
- [📄 Licencia](#-licencia)
- [👥 Autores](#-autores)
- [🙏 Agradecimientos](#-agradecimientos)

---

## 📖 Descripción

**Quan2Qual** es una plataforma web innovadora diseñada para **interpretar datos cualitativos y transformarlos en estructuras cuantitativas**, facilitando el **Análisis de Redes Sociales (ARS)**. La aplicación permite cargar contenido multimedia (video, audio o imágenes), crear actores (nodos), definir tipos de relación y establecer relaciones (aristas) entre ellos de forma intuitiva mediante *drag & drop*, para finalmente exportar los datos a formatos CSV compatibles con **Gephi**.

### 🎯 Objetivo Principal

Sustituir el registro manual en Excel —lento y propenso a errores— por una plataforma visual e intuitiva que automatiza la captura y estructuración de interacciones sociales, reduciendo significativamente el tiempo de análisis y eliminando la necesidad de conocimientos técnicos avanzados.

### 🎓 Contexto Académico

Este proyecto fue desarrollado como **Trabajo de Grado** en Ingeniería Multimedia en la **Universidad Militar Nueva Granada (UMNG)**, Bogotá, Colombia.

---

## ✨ Características Principales

### 🎬 Gestión Multimedia
- **Carga de múltiples formatos**: MP4 (video), WAV/MP3 (audio), JPG/PNG (imágenes)
- **Visualizador interactivo** con controles de reproducción integrados
- **Línea de tiempo** con marcadores para eventos clave
- **Análisis de formas de onda** para archivos de audio (WaveSurfer.js)

### 👥 Creación de Actores (Nodos)
- **Personalización completa**: nombre, color, ícono
- **Atributos dinámicos**: añade campos personalizados ilimitados
- **Vista en tarjetas y tabla** con edición en tiempo real
- **Drag & Drop** sobre el visualizador multimedia

### 🔗 Relaciones (Aristas)
- **Tipos de relación predefinidos y personalizados**
- **Peso/intensidad** ajustable mediante slider (0-1)
- **Direccionalidad**: relaciones dirigidas y no dirigidas
- **Campos personalizados** para cada tipo de relación
- **Conexión visual** mediante flechas interactivas (react-xarrows)
- **Marcas temporales** para relaciones en video/audio

### 📊 Exportación de Datos
- **Formato Gephi-compatible**: genera archivos CSV de nodos y aristas
- **Exportación con un clic**: sin necesidad de formateo manual
- **Preservación de atributos**: incluye todos los campos personalizados
- **Nomenclatura automática**: `nodes_<sessionId>.csv` y `edges_<sessionId>.csv`

### 🌍 Internacionalización
- **Soporte multiidioma**: Español e Inglés
- **Detección automática** del idioma del navegador
- **Selector de idioma** integrado en la interfaz

### 💾 Gestión de Proyectos y Sesiones
- **Organización jerárquica**: Usuarios → Proyectos → Sesiones
- **Persistencia en la nube** con MongoDB Atlas
- **Recuperación de sesiones** en cualquier momento
- **Eliminación en cascada** para mantener la integridad de datos

---

## 🎯 Demo y Capturas

### 🌐 Aplicación en Vivo

👉 **[https://quan2qual.vercel.app/](https://quan2qual.vercel.app/)**

### 📸 Capturas de Pantalla

<details>
<summary>🖼️ Ver capturas de pantalla (clic para expandir)</summary>

#### Login y Dashboard
![Login](quan2qual_screenshots/01b_login_limpio.png)
*Interfaz de inicio de sesión con soporte multiidioma*

![Dashboard](quan2qual_screenshots/02_dashboard.png)
*Panel principal con gestión de proyectos*

#### Creación de Proyectos y Sesiones
![Crear Proyecto](quan2qual_screenshots/03_crear_proyecto.png)
*Formulario de creación de nuevo proyecto*

![Tipo de Sesión](quan2qual_screenshots/04_tipo_sesion.png)
*Selección del tipo de multimedia para la sesión*

#### Espacio de Trabajo
![Workspace](quan2qual_screenshots/05_workspace.png)
*Vista completa del espacio de trabajo con multimedia*

![Video Cargado](quan2qual_screenshots/10_video_cargado.png)
*Visualizador de video con controles integrados*

#### Gestión de Actores
![Crear Actor](quan2qual_screenshots/06_crear_actor.png)
*Formulario de creación de actor con personalización completa*

![Actores Creados](quan2qual_screenshots/08_actores_creados.png)
*Panel de actores con vista en tarjetas*

![Editar Actor](quan2qual_screenshots/18_editar_actor.png)
*Modal de edición de actor existente*

#### Relaciones y Tipos
![Panel Relaciones](quan2qual_screenshots/11_panel_relaciones.png)
*Panel de gestión de relaciones*

![Tipos de Relación](quan2qual_screenshots/12_tipos_relacion_dropdown.png)
*Selector de tipos de relación predefinidos*

![Formulario Tipo Relación](quan2qual_screenshots/13_formulario_tipo_relacion.png)
*Creación de nuevo tipo de relación*

![Tipo Personalizada](quan2qual_screenshots/14_tipo_relacion_personalizada.png)
*Tipo de relación con campos personalizados*

#### Drag & Drop e Interacción
![Drag and Drop](quan2qual_screenshots/15_drag_drop.png)
*Arrastrar actores sobre el visualizador multimedia*

![Paneles de Datos](quan2qual_screenshots/16_paneles_datos.png)
*Vista de paneles de datos con actores y relaciones*

#### Exportación
![Exportar](quan2qual_screenshots/17_exportar.png)
*Función de exportación a CSV para Gephi*

#### Persistencia
![Abrir Proyecto](quan2qual_screenshots/19_abrir_proyecto.png)
*Recuperación de proyectos existentes*

![Abrir Sesión](quan2qual_screenshots/20_abrir_sesion.png)
*Selección de sesiones guardadas*

![Sesión Persistida](quan2qual_screenshots/21_sesion_persistida.png)
*Sesión recuperada con todos los datos intactos*

</details>

---

## 🛠️ Tecnologías Utilizadas

### Frontend

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | ![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite) |
| **UI/Estilos** | ![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.8-319795?logo=chakra-ui) ![Emotion](https://img.shields.io/badge/Emotion-11-DB7093) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-0055FF?logo=framer) |
| **Estado** | ![Zustand](https://img.shields.io/badge/Zustand-5.0--rc-000000) |
| **Routing** | ![React Router](https://img.shields.io/badge/React_Router-6.16-CA4245?logo=react-router) |
| **i18n** | ![i18next](https://img.shields.io/badge/i18next-23.5-26A69A?logo=i18next) |
| **Audio/Video** | ![WaveSurfer.js](https://img.shields.io/badge/WaveSurfer.js-7.8-FF6B00) |
| **Interacción** | `react-draggable`, `react-xarrows`, `react-color` |
| **Formularios** | `formik` |
| **Exportación** | `@json2csv/plainjs`, `file-saver` |
| **Iconografía** | `react-icons`, `@fortawesome`, `@chakra-ui/icons` |

### Backend

| Categoría | Tecnologías |
|-----------|-------------|
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js) |
| **Base de Datos** | ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb) (Driver oficial 6.8) |
| **Autenticación** | `bcryptjs` |
| **Serverless** | ![Vercel Functions](https://img.shields.io/badge/Vercel-Functions-000000?logo=vercel) |

### DevOps y Herramientas

| Categoría | Tecnologías |
|-----------|-------------|
| **Linting** | ![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3?logo=eslint) |
| **CI/CD** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?logo=github-actions) |
| **Hosting** | ![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel) |

### Arquitectura

```
┌─────────────────────────────────────────┐
│  UI Layer (React + Vite + Chakra UI)    │
│  SPA con React Router 6                  │
└─────────────────────────────────────────┘
              ↕ (eventos / render)
┌─────────────────────────────────────────┐
│  Application Layer (Zustand Stores)     │
│  5 stores especializados                │
└─────────────────────────────────────────┘
              ↕ (REST API)
┌─────────────────────────────────────────┐
│  Communication Layer (Node.js)          │
│  API REST genérica + Serverless         │
└─────────────────────────────────────────┘
              ↕ (MongoDB Driver)
┌─────────────────────────────────────────┐
│  Data Layer (MongoDB Atlas)             │
│  7 colecciones principales              │
└─────────────────────────────────────────┘
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 16.x ([Descargar](https://nodejs.org/))
- **npm** >= 8.x (incluido con Node.js) o **yarn** >= 1.22
- **MongoDB Atlas** cuenta gratuita ([Registrarse](https://www.mongodb.com/cloud/atlas/register))
- **Git** ([Descargar](https://git-scm.com/downloads))
- Navegador web moderno (Chrome, Firefox, Edge) con resolución mínima 1366×768

---

## 📥 Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/christian31q/quan2qual.git
cd quan2qual
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

#### **Frontend (`.env`)**

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Base URL (vacío para usar proxy local o mismo origen en producción)
VITE_API_BASE_URL=

# Debug de cliente Mongo (opcional)
VITE_MONGO_DEBUG=true
```

#### **Backend (`.env.server`)**

Crea un archivo `.env.server` en la raíz del proyecto:

```env
# Puerto del servidor local
API_PORT=3002

# Nombre de la base de datos
MONGO_DB=quan2qual

# URI de conexión a MongoDB Atlas
# Reemplaza <usuario> y <password> con tus credenciales
MONGO_URI=mongodb+srv://<usuario>:<password>@quan2qual.rcmcu.mongodb.net/?appName=Quan2Qual

# Debug de servidor (opcional)
MONGO_DEBUG=true
```

> **📌 Nota**: Para obtener tu `MONGO_URI`:
> 1. Crea un cluster en [MongoDB Atlas](https://cloud.mongodb.com/)
> 2. Ve a "Database" → "Connect" → "Connect your application"
> 3. Copia la cadena de conexión y reemplaza `<usuario>` y `<password>`

### 4️⃣ Ejecutar en Desarrollo

#### **Opción A: Frontend y Backend por separado**

Terminal 1 (Backend):
```bash
npm run api
```

Terminal 2 (Frontend):
```bash
npm run dev
```

#### **Opción B: Ambos simultáneamente**

```bash
npm run dev:full
```

La aplicación estará disponible en:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:3002](http://localhost:3002)

### 5️⃣ Verificar la Instalación

```bash
npm run check:api
```

Deberías ver:
```
✅ API Health Check: OK
```

---

## 🚀 Uso Básico

### 1. Iniciar Sesión

1. Accede a la aplicación
2. Ingresa con tus credenciales autorizadas
3. Serás redirigido al dashboard principal

> **⚠️ Importante**: La plataforma **no permite registro público de usuarios**. Solo usuarios autorizados pueden acceder.

### 2. Crear un Proyecto

1. En el dashboard, haz clic en "**Crear Proyecto**"
2. Asigna un nombre descriptivo
3. El proyecto quedará guardado en tu lista

### 3. Crear una Sesión

1. Abre un proyecto existente
2. Selecciona "**Nueva Sesión**"
3. Elige el tipo de multimedia: **Video**, **Audio** o **Imagen**
4. Carga tu archivo multimedia

### 4. Crear Actores

1. En el espacio de trabajo, abre el panel de "**Actores**"
2. Haz clic en "**+ Nuevo Actor**"
3. Completa:
   - Nombre del actor
   - Color representativo
   - Ícono (selecciona de la biblioteca)
   - Atributos personalizados (opcional)
4. El actor aparecerá en el panel lateral

### 5. Definir Tipos de Relación

1. Abre el panel de "**Tipos de Relación**"
2. Puedes usar tipos predefinidos o crear personalizados:
   - **Predefinidos**: amistad, colaboración, conflicto, etc.
   - **Personalizados**: define nombre, peso, campos adicionales

### 6. Establecer Relaciones

1. **Arrastra actores** desde el panel lateral al visualizador multimedia
2. **Conecta dos actores** arrastrando entre sus fichas
3. Aparecerá un popup para:
   - Seleccionar el tipo de relación
   - Definir peso/intensidad (0-1)
   - Establecer direccionalidad
   - Añadir marcas temporales (en video/audio)

### 7. Exportar Datos

1. Una vez completado tu análisis, haz clic en "**Exportar**"
2. Se generarán dos archivos CSV:
   - `nodes_<sessionId>.csv` — datos de actores
   - `edges_<sessionId>.csv` — datos de relaciones
3. Importa estos archivos directamente en **Gephi** para visualización y análisis avanzado

---

## 📂 Estructura del Proyecto

```
quan2qual/
├── 📁 api/                          # Funciones serverless (Vercel)
│   ├── health.js                    # Health check endpoint
│   └── mongo/[action].js            # API genérica MongoDB
│
├── 📁 server/
│   └── index.js                     # Servidor API local (desarrollo)
│
├── 📁 scripts/
│   └── check-api.mjs                # Script de verificación de API
│
├── 📁 public/                       # Assets estáticos
│   ├── favicon.ico
│   └── icons/
│
├── 📁 src/
│   ├── App.jsx                      # Definición de rutas (React Router)
│   ├── main.jsx                     # Punto de entrada React
│   ├── ProtectedRoute.jsx           # Guardia de rutas autenticadas
│   ├── i18n.js                      # Configuración i18next
│   │
│   ├── 📁 api/
│   │   └── request.jsx              # Cliente fetch para API
│   │
│   ├── 📁 utils/
│   │   └── mongoUtils.jsx           # CRUD por colección
│   │
│   ├── 📁 context/
│   │   └── AuthContext.jsx          # Contexto de autenticación
│   │
│   ├── 📁 store/                    # Estado global (Zustand)
│   │   ├── actorStore.js            # Store de actores
│   │   ├── relationStore.js         # Store de relaciones
│   │   ├── relationTypesStore.js    # Store de tipos de relación
│   │   ├── actorDragStore.js        # Store de instancias de actores
│   │   └── audioStore.js            # Store de audio/wavesurfer
│   │
│   ├── 📁 pages/                    # 13 páginas (vistas de ruta)
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CreateProjectPage.jsx
│   │   ├── SessionPage.jsx
│   │   ├── VideoPage.jsx
│   │   ├── AudioPage.jsx
│   │   ├── ImagePage.jsx
│   │   └── ...
│   │
│   ├── 📁 container/                # 10 contenedores (lógica de vista)
│   │   ├── LoginContainer.jsx
│   │   ├── DashboardContainer.jsx
│   │   ├── CreateProjectContainer.jsx
│   │   └── ...
│   │
│   ├── 📁 components/               # 43+ componentes reutilizables
│   │   ├── 📁 actors/
│   │   │   ├── ActorCard.jsx
│   │   │   ├── EditActorModal.jsx
│   │   │   └── TableBodyActors.jsx
│   │   ├── 📁 relations/
│   │   │   ├── RelationPopup.jsx
│   │   │   ├── EditRelationModal.jsx
│   │   │   └── TableBodyRelations.jsx
│   │   ├── 📁 types relations/
│   │   │   ├── EditTypeModal.jsx
│   │   │   └── TableBodyTypes.jsx
│   │   ├── ExportButton.jsx
│   │   ├── VideoUploadSection.jsx
│   │   ├── AudioUploadSection.jsx
│   │   └── ...
│   │
│   ├── 📁 assets/                   # Imágenes, videos, íconos
│   └── 📁 styles/                   # CSS personalizado
│
├── index.html                       # HTML raíz (Vite)
├── vite.config.js                   # Configuración Vite + proxy
├── package.json                     # Dependencias y scripts
├── .env.example                     # Plantilla variables frontend
├── .env.server.example              # Plantilla variables backend
└── .github/workflows/node.js.yml    # CI (GitHub Actions)
```

---

## 🔌 API Endpoints

La aplicación expone una **API REST genérica sobre MongoDB** que permite operaciones CRUD flexibles.

### 🏥 Health Check

```http
GET /api/health
```

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2026-06-18T12:00:00.000Z",
  "mongo": "connected"
}
```

### 📡 Operaciones MongoDB

```http
POST /api/mongo/:action
```

**Acciones soportadas:** `find`, `findOne`, `insertOne`, `updateOne`, `deleteOne`, `deleteMany`

#### Formato de Request

```json
{
  "collection": "actors",
  "database": "quan2qual",     // opcional
  "filter": {
    "session_id": "abc123"
  },
  "document": {                 // para insertOne
    "name": "Actor 1",
    "color": "#FF5733",
    "icon": "user"
  },
  "update": {                   // para updateOne
    "$set": {
      "name": "Actor Modificado"
    }
  }
}
```

#### Ejemplos de Respuesta

**`find`:**
```json
{
  "documents": [
    { "_id": "507f1f77bcf86cd799439011", "name": "Actor 1", ... },
    { "_id": "507f191e810c19729de860ea", "name": "Actor 2", ... }
  ]
}
```

**`findOne`:**
```json
{
  "document": { "_id": "507f1f77bcf86cd799439011", "name": "Actor 1", ... }
}
```

**`insertOne`:**
```json
{
  "insertedId": "507f1f77bcf86cd799439011"
}
```

**`updateOne`:**
```json
{
  "matchedCount": 1,
  "modifiedCount": 1,
  "upsertedId": null
}
```

**`deleteOne` / `deleteMany`:**
```json
{
  "deletedCount": 1
}
```

### 🔐 Conversión Automática

La API realiza conversión automática de tipos MongoDB:

- `{ "$oid": "<id>" }` → `ObjectId`
- `ObjectId` → string en respuestas
- `Date` → ISO string

### 📚 Colecciones Principales

| Colección | Descripción |
|-----------|-------------|
| `users` | Usuarios autorizados (email, password hash, role) |
| `projects` | Proyectos del usuario |
| `sessions` | Sesiones multimedia dentro de proyectos |
| `actors` | Actores (nodos) definidos en sesiones |
| `types` | Tipos de relación (predefinidos y personalizados) |
| `actors_instances` | Instancias de actores con posición en el visor |
| `relationships` | Relaciones (aristas) entre actores |

---

## 🌐 Deployment

### Vercel (Producción)

La aplicación está desplegada en **Vercel** con funciones serverless:

1. **Fork/Clone** el repositorio
2. Conecta tu repositorio a [Vercel](https://vercel.com/)
3. Configura las **variables de entorno** en el dashboard de Vercel:
   ```
   MONGO_URI=mongodb+srv://...
   MONGO_DB=quan2qual
   ```
4. Vercel detectará automáticamente la configuración de Vite
5. Deploy automático en cada push a `main`

### Build Local

```bash
npm run build
```

Los archivos optimizados se generarán en `/dist`.

### Preview del Build

```bash
npm run preview
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### 1. Fork del Proyecto

Haz clic en el botón "Fork" en GitHub.

### 2. Crea una Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

### 3. Commit de Cambios

```bash
git commit -m "✨ feat: añadir nueva funcionalidad X"
```

**Convención de commits:**
- `✨ feat:` nueva funcionalidad
- `🐛 fix:` corrección de bug
- `📝 docs:` documentación
- `🎨 style:` formato/estilo
- `♻️ refactor:` refactorización
- `⚡ perf:` mejora de rendimiento
- `✅ test:` añadir tests

### 4. Push a la Rama

```bash
git push origin feature/nueva-funcionalidad
```

### 5. Abre un Pull Request

Describe tus cambios en detalle y referencia cualquier issue relacionado.

### 🐞 Reportar Bugs

Abre un [issue](https://github.com/christian31q/quan2qual/issues) con:
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs. observado
- Capturas de pantalla (si aplica)
- Entorno (navegador, SO, versión de Node)

---

## 🗺️ Roadmap

### 🚀 Próximas Características

- [ ] **Integración con Cloudinary** para almacenamiento de multimedia en la nube
- [ ] **Colaboración en tiempo real** con WebSockets
- [ ] **Análisis de redes avanzado** con métricas incorporadas (centralidad, clustering, etc.)
- [ ] **Exportación a formatos adicionales** (GraphML, JSON-Graph, D3.js)
- [ ] **Plantillas de proyectos** predefinidas para casos de uso comunes
- [ ] **API pública documentada** con autenticación OAuth2
- [ ] **Visualización de grafos 3D** integrada en la plataforma
- [ ] **Importación desde CSV/Excel** para migración rápida de datos existentes
- [ ] **Historial de versiones** de sesiones con rollback
- [ ] **Anotaciones multimedia** con timestamps sincronizados
- [ ] **Soporte para más idiomas** (Francés, Alemán, Portugués)

### 🔧 Mejoras Técnicas

- [ ] Migrar `zustand@5.0.0-rc.2` a versión estable
- [ ] Implementar autenticación JWT con refresh tokens
- [ ] Añadir capa de autorización granular en API
- [ ] Optimizar carga de multimedia con lazy loading
- [ ] Implementar SSR con Next.js (opcional)
- [ ] Añadir tests unitarios y de integración (Jest + React Testing Library)
- [ ] Configurar Storybook para documentación de componentes
- [ ] Implementar PWA para uso offline

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2026 Sebastián Lamprea Manrique - Universidad Militar Nueva Granada

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para 
utilizar el Software sin restricciones, incluyendo sin limitación los derechos 
de usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o 
vender copias del Software, y permitir a las personas a quienes se les 
proporcione el Software hacer lo mismo, sujeto a las siguientes condiciones:
...
```

---

## 👥 Autores

### 💻 Desarrollador Principal

**Sebastián Lamprea Manrique**
- 📧 Email: [sebastian.lamprea@unimilitar.edu.co](mailto:sebastian.lamprea@unimilitar.edu.co)
- 🎓 Ingeniería Multimedia - Universidad Militar Nueva Granada
- 🆔 Código: 1202193

### 🎯 Director de Proyecto

**Christian David Quintero Guerrero**
- 📧 Email: [christian.quintero@unimilitar.edu.co](mailto:christian.quintero@unimilitar.edu.co)
- 🏛️ Universidad Militar Nueva Granada

### 🏫 Institución

**Universidad Militar Nueva Granada (UMNG)**
- 📍 Bogotá, Colombia
- 🌐 [www.umng.edu.co](https://www.umng.edu.co/)

---

## 🙏 Agradecimientos

Este proyecto no habría sido posible sin el apoyo de:

- **Universidad Militar Nueva Granada (UMNG)** por el apoyo institucional y académico
- **Christian David Quintero Guerrero** por la dirección y mentoría durante el desarrollo
- **Comunidad de código abierto** por las increíbles herramientas utilizadas:
  - [React Team](https://react.dev/) por el framework frontend
  - [Chakra UI](https://chakra-ui.com/) por los componentes de interfaz
  - [MongoDB](https://www.mongodb.com/) por la base de datos
  - [Vercel](https://vercel.com/) por el hosting y funciones serverless
  - [WaveSurfer.js](https://wavesurfer-js.org/) por la visualización de audio
  - Y todos los mantenedores de las librerías utilizadas
- **Gephi** por inspirar el formato de exportación
- **Investigadores en ARS** (Análisis de Redes Sociales) por establecer las bases teóricas

### 📚 Referencias Académicas

- Wasserman, S., & Faust, K. (1994). *Social Network Analysis: Methods and Applications*. Cambridge University Press.
- Freeman, L. C. (2004). *The Development of Social Network Analysis*. A Study in the Sociology of Science.
- Borgatti, S. P., Everett, M. G., & Johnson, J. C. (2018). *Analyzing Social Networks*. SAGE Publications.

---

<div align="center">

### ⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub ⭐

[![GitHub stars](https://img.shields.io/github/stars/christian31q/quan2qual?style=social)](https://github.com/christian31q/quan2qual/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/christian31q/quan2qual?style=social)](https://github.com/christian31q/quan2qual/network/members)

---

**Desarrollado con ❤️ por Sebastián Lamprea Manrique**

**Universidad Militar Nueva Granada · Bogotá, Colombia · 2026**

[🔝 Volver arriba](#-quan2qual)

</div>
