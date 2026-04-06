# 🗺️ Wanderlust — Planificador de Viaje

Aplicación React + Vite para planificar itinerarios de viaje con seguimiento de ahorros.

---

## 🚀 Setup local (paso a paso)

### 1. Prerrequisitos
Necesitas tener instalado **Node.js** (versión 18 o superior).
- Descárgalo en: https://nodejs.org (elige la versión LTS)
- Para verificar: abre tu terminal y escribe `node -v`

### 2. Crea el proyecto

Descarga o copia esta carpeta `wanderlust/` a tu computador.

Luego abre la terminal en esa carpeta y corre:

```bash
npm install
```

Esto descarga todas las dependencias (React, Vite, etc.).

### 3. Corre en desarrollo

```bash
npm run dev
```

Abre tu navegador en **http://localhost:5173** — ¡ya funciona!

Cualquier cambio que hagas en el código se ve en tiempo real.

### 4. Build para producción

```bash
npm run build
```

Genera la carpeta `dist/` con los archivos optimizados listos para subir.

---

## ☁️ Deploy en Vercel (gratis)

### Opción A — Desde GitHub (recomendada)

1. Crea una cuenta en https://github.com si no tienes
2. Crea un repositorio nuevo (ej: `wanderlust-planner`)
3. Sube tu carpeta:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git remote add origin https://github.com/TU_USUARIO/wanderlust-planner.git
   git push -u origin main
   ```
4. Ve a https://vercel.com → Sign up con tu cuenta de GitHub
5. Haz clic en **"Add New Project"** → importa tu repositorio
6. Vercel detecta Vite automáticamente → haz clic en **Deploy**
7. ¡En ~1 minuto tu app tiene URL pública! (ej: `wanderlust-planner.vercel.app`)

Cada vez que hagas `git push`, Vercel re-deploya automáticamente ✨

### Opción B — Drag & drop (más fácil)

1. Corre `npm run build`
2. Ve a https://vercel.com
3. Arrastra la carpeta `dist/` al área de drop
4. ¡Listo! — aunque con esta opción el re-deploy es manual.

---

## 📁 Estructura del proyecto

```
wanderlust/
├── index.html                  ← Entry point HTML
├── vite.config.js              ← Config de Vite
├── package.json                ← Dependencias
└── src/
    ├── main.jsx                ← Monta React en el DOM
    ├── App.jsx                 ← Enrutador entre páginas
    ├── index.css               ← Variables CSS globales
    ├── components/
    │   ├── Homepage.jsx        ← Página de inicio con fotos
    │   ├── Homepage.module.css
    │   ├── Planner.jsx         ← Página del planificador
    │   ├── Planner.module.css
    │   ├── ExpenseTable.jsx    ← Tabla de gastos
    │   ├── ExpenseTable.module.css
    │   ├── SavingsCard.jsx     ← Tarjeta de ahorros + barra
    │   └── SavingsCard.module.css
    ├── hooks/
    │   └── usePlannerState.js  ← Estado + localStorage
    └── utils/
        └── fmt.js              ← Formateador de números
```

---

## 🛠️ Cómo extender el proyecto

- **Agregar más monedas**: edita el array `CURRENCIES` en `Planner.jsx`
- **Agregar categorías**: edita el array `CATEGORIES` en `ExpenseTable.jsx`
- **Cambiar colores**: edita las variables CSS en `src/index.css`
- **Agregar múltiples viajes**: el hook `usePlannerState.js` es el lugar para expandir la lógica

---

## 🧰 Tecnologías usadas

| Tecnología | Para qué |
|---|---|
| React 18 | UI con componentes |
| Vite 5 | Dev server + build ultra rápido |
| CSS Modules | Estilos aislados por componente |
| localStorage | Persistencia sin backend |
| Intl.NumberFormat | Formato de moneda |
