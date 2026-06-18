# Hooks (opcionales y DESACTIVADOS por defecto)

Estos hooks son **opcionales** y vienen **desactivados**. No se ha modificado tu
`settings.json` real. Para activarlos, copia manualmente el bloque correspondiente
desde `settings.json.example` a tu `settings.json` (de proyecto o de usuario) y
ajusta los comandos a tu entorno.

> ⚠️ No modifiques el `settings.json` real sin tu propia aprobación. Revisa cada
> comando antes de activarlo. Los hooks ejecutan código en tu máquina.

## Hooks propuestos

| # | Hook | Evento Claude Code | Qué hace |
|---|---|---|---|
| a | Validar JSON final parseable | `PostToolUse` (matcher `Write`) | Si se escribió un `.json` en `outputs/json/`, verifica que parsea (`python -m json.tool`). Falla con mensaje si está corrupto. |
| b | Evitar sobrescritura de outputs | `PreToolUse` (matcher `Write`) | Bloquea escrituras sobre un reporte ya existente en `outputs/`; obliga a versionar por fecha/slug. |
| c | Registrar fecha de ejecución | `Stop` | Anota fecha/hora de fin de la corrida en un log local (`outputs/.run-log`). |
| d | Advertir antes de workflows largos | `UserPromptSubmit` | Si el prompt pide profundidad "profunda" o un dynamic workflow, muestra un aviso de costo/tiempo. |
| e | Verificar sección de fuentes | `PostToolUse` (matcher `Write`) | Si se escribió un reporte `.md` en `outputs/reports/`, verifica que contiene la sección "Matriz de evidencia" / fuentes. |

## Cómo activarlos
1. Abre `.claude/hooks/settings.json.example`.
2. Copia SOLO el/los bloque(s) del hook que quieras al `hooks` de tu `settings.json`.
3. Quita las claves `_comment`.
4. Ajusta rutas/comandos a tu sistema (los ejemplos asumen `python3` disponible).
5. Reinicia la sesión de Claude Code para que tome la configuración.

## Notas de seguridad
- Los hooks de tipo `command` ejecutan shell: revísalos línea por línea.
- Prefiere hooks de validación (lectura) sobre hooks que modifican archivos.
- Mantén los hooks idempotentes y silenciosos en caso de éxito.
