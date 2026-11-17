# context-meter

Mod de Claude Code que dibuja una barra sobre el prompt con el avance del contexto:
tokens usados vs ventana, con iconos de clima según el porcentaje, y el `cwd` alineado a la derecha.

```
☀  12% de 200k · 21:04                                     C:\Users\pedro\proyecto
```

| % contexto | icono |
|---|---|
| < 50 | ☀ verde |
| 50–69 | ☁ gris claro |
| 70–79 | ☁☁ gris oscuro |
| 80–89 | ☁☁⚡ amarillo |
| 90–94 | ☁☁☁⚡⚡ rojo |
| ≥ 95 | ☁☁☁⚡⚡⚡ rojo |

## Instalación

Copia la carpeta en `~/.claude/mods/context-meter` (en Windows: `%USERPROFILE%\.claude\mods\context-meter`) y reinicia Claude Code.

## Notas

- `.claude-plugin/types/` **no** se versiona: el motor de Claude Code escribe ahí las declaraciones
  TypeScript en cada carga del mod, según tu versión. `tsconfig.json` las extiende desde esa ruta.
- Todo el render vive en `hooks/register.tsx` (hook `ui.render` → `AbovePrompt`).
