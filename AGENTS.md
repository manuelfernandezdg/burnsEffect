# AGENTS.md — Burns Effect

Instrucciones de proyecto. Leé esto antes de tocar cualquier archivo. El estándar
completo vive en `../DESIGN.md`.

## Proyecto

Slider de bienvenida con efecto Ken Burns continuo (vanilla JS + CSS). Incluye un
**componente reutilizable** y una **demo** con generador de código.

| Archivo | Rol |
|---|---|
| `index.html` | Estructura semántica + footer de marca |
| `css/burns-effect.css` | Componente reutilizable (drop-in, autocontenido) |
| `css/demo.css` | Estilos de la página demo (sigue el benchmark) |
| `js/burns-effect.js` | `initBurnsEffect()` — el componente |
| `js/app.js` | Lógica de la demo y el generador |
| `assets/img/logo.jpg` | Logo del footer (Dystopia Workshop) |
| `README.md` | Documentación del proyecto |

## Excepción documentada: split de archivos

Este proyecto tiene **dos CSS y dos JS a propósito**. `burns-effect.css` /
`burns-effect.js` son un componente reutilizable pensado para copiarse a otros
proyectos, y por eso viven aparte de la demo y fuera del sistema de `@layer`
tokens del benchmark (usa sus propios valores `#000` / `#fff` e instancia
`--slider-transicion` / `--slider-zoom`). Esta separación es una **excepción
explícita** a la regla "un solo archivo" del benchmark, autorizada en
`../DESIGN.md` § Excepciones.

Lo que SÍ sigue el benchmark es la **demo**: `demo.css` usa `@layer`,
tokens canónicos y BEM plano; `index.html` es semántico con footer de marca.

## Reglas duras

- **No commitear** salvo que el usuario lo pida explícitamente.
- **No crear backups** del proyecto; `/tmp/opencode/` es temporal.
- **BEM plano + `@layer`** (en `demo.css`): sin nesting nativo; `@media` a nivel de capa.
- **No agregar comentarios** al código. El código se explica solo.
- **"Menos es más"**: tras cada cambio, revisar y eliminar CSS/JS muerto.
- **Semántica HTML**: `section`, `footer`, `label for`, `aria-label`; el footer del documento va fuera de `<main>`.
- **Sin hardcodear** colores ni `font-size`/`letter-spacing` en `demo.css`: usar `var(--…)` desde `@layer tokens`.
- Paleta de la demo: **canónica del benchmark** (azul `hsl(214,…)` + naranja `hsl(22,…)`).

## No cambiar IDs que usa el JS

`opt-delay`, `opt-transition`, `opt-zoom`, `opt-timer`, `opt-images`, `btn-apply`,
`btn-copy`, `output`, `demo`, `demo-2`. El componente usa clases `.burns`,
`.burns-slide`, `.burns-timer__bar` generadas por `initBurnsEffect`.

## Verificación obligatoria antes de cerrar una tarea

1. `node --check js/app.js && node --check js/burns-effect.js`
2. Llaves del CSS balanceadas (ambos archivos).
3. Si el cambio es visual: servir `python3 -m http.server` y comprobar render, o pedir Ctrl+Shift+R.

## Git

El `.gitignore` de este proyecto **NO** ignora los `.md` de documentación.
