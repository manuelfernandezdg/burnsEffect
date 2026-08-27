# Burns Effect

Slider de bienvenida con efecto **Ken Burns continuo**. A diferencia de los
carruseles tradicionales, el zoom de cada imagen **nunca se detiene**: mientras
una foto se desvanece y aparece la siguiente, el movimiento de escala sigue
siempre activo. El resultado es una transición suave, sin el "corte seco" ni la
imagen "quieta" que suelen tener los crossfades simples.

- Sin dependencias ni frameworks (vanilla JS + CSS).
- Animación de zoom `infinite alternate`: 1 → 1.15 → 1, siempre en movimiento.
- Crossfade configurable entre slides.
- Barra de progreso opcional.
- Respeta `prefers-reduced-motion` (desactiva el zoom).
- Pausa automática cuando la pestaña no es visible.
- API reutilizable: varias instancias en la misma página.

**Ver en vivo:** [manuelfernandezdg.github.io/burnsEffect](https://manuelfernandezdg.github.io/burnsEffect/)

## Estructura

```
burnsEffect/
├── index.html              # Demo + generador de código en vivo
├── css/
│   ├── burns-effect.css    # Componente reutilizable (drop-in)
│   └── demo.css            # Estilos de la página demo (sigue el benchmark)
├── js/
│   ├── burns-effect.js     # initBurnsEffect() — el componente
│   └── app.js              # Lógica de la demo y el generador
├── img/                    # 5 webp de ejemplo
├── assets/img/logo.jpg     # Logo del footer (Dystopia Workshop)
├── LICENSE                 # MIT
└── README.md
```

## Sistema de diseño

Este proyecto sigue el benchmark de Dystopia Workshop (`../DESIGN.md`): `demo.css`
usa `@layer reset, tokens, base, components`, BEM plano y los tokens canónicos
(azul `hsl(214,…)` + naranja `hsl(22,…)`). La demo tiene footer de marca.

**Excepción documentada:** `burns-effect.css` / `burns-effect.js` son un
componente reutilizable aparte de la demo (no usan el sistema de tokens del
benchmark, son autocontenidos). Ver `AGENTS.md`.

## Uso mínimo

```html
<link rel="stylesheet" href="css/burns-effect.css?v=2">
<script src="js/burns-effect.js?v=2" defer></script>

<div id="burns" class="burns" style="height:60vh"></div>

<script>
  initBurnsEffect('#burns', {
    images: ['img/001.webp', 'img/002.webp', 'img/003.webp'],
    delay: 5000,        // ms entre cambios de slide
    transition: 1500,   // ms de crossfade
    zoom: 10000,        // ms de un ciclo de zoom (ida)
    timer: true,        // barra de progreso
  });
</script>
```

## Opciones

| Opción      | Tipo      | Default | Descripción                                         |
|-------------|-----------|---------|-----------------------------------------------------|
| `images`    | `string[]`| `[]`    | URLs de las imágenes (una por slide).               |
| `delay`     | `number`  | `5000`  | Milisegundos que cada slide permanece activo.       |
| `transition`| `number`  | `1500`  | Milisegundos del crossfade (opacidad).              |
| `zoom`      | `number`  | `10000` | Milisegundos de un ciclo de zoom completo (ida).    |
| `timer`     | `boolean` | `true`  | Muestra la barra de progreso.                       |

## API

```js
const instance = initBurnsEffect(target, options);
instance.next();        // avanza al siguiente slide manualmente
instance.destroy();     // detiene y limpia el slider
```

`target` puede ser un selector (`'#id'`) o un elemento del DOM.

## Cache-busting

Los `<link>` y `<script>` usan `?v=`. Subí ese número en todos los `?v=` cuando
actualices los archivos para forzar la recarga en el cliente/CDN.

## Ejecutar la demo

Requiere servir por HTTP (el componente usa imágenes relativas, no `file://`):

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Licencia

MIT — Copyright (c) 2026 Dystopia Workshop / Dystopia Studio.
