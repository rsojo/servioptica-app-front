# Ajuste de Callback OIDC (Backend listo) — Guía para aplicar cambios Frontend

## 1) Objetivo
Aplicar en frontend el ajuste ya implementado en backend para callback OIDC.

El frontend debe:
1. Consumir `created`, `linked`, `onboarding_message`.
2. Mostrar mensaje de onboarding cuando `created = true`.
3. Mostrar mensaje de error cuando callback falle.
4. Mantener flujo actual de sesión y navegación.

---

## 2) Contrato backend esperado

### Campos relevantes en `data`
- `access_token`
- `token_type`
- `admin`
- `created` (boolean)
- `linked` (boolean)
- `onboarding_message` (string|null)
- `user`

### Ejemplo nuevo usuario
```json
{
  "error": false,
  "message": "Inicio de sesión OIDC exitoso.",
  "data": {
    "access_token": "<token>",
    "token_type": "Bearer",
    "admin": false,
    "created": true,
    "linked": false,
    "onboarding_message": "Tu usuario fue creado en APP_URL...",
    "user": {
      "id": 1289,
      "name": "Cliente OIDC",
      "email": "cliente@dominio.com",
      "document": "900123456"
    }
  }
}
```

---

## 3) Cambios frontend requeridos

### A) Tipado
Actualizar `src/api/Auth/type.ts` en `OidcCallbackResponse.data` para incluir:
- `created?: boolean`
- `linked?: boolean`
- `onboarding_message?: string | null`

### B) Callback UI
Actualizar `src/components/pages/OidcCallback.tsx`:

1. Al recibir respuesta exitosa de `oidcCallback`:
   - Si `data.created === true`, mostrar mensaje informativo:
     - Prioridad 1: `data.onboarding_message`
     - Fallback: `Tu usuario fue creado correctamente. Si necesitas acceso local, usa recuperación de contraseña.`

2. Al recibir error (`response.error === true` o sin token):
   - Mostrar mensaje de error:
     - Prioridad 1: `response.message`
     - Fallback: `No fue posible completar el login con OpenID. Intenta nuevamente.`

3. Mantener lógica actual de sesión:
   - guardar token
   - hidratar con `/api/auth/me`
   - navegar a dashboard

### C) No tocar en este ajuste
- `Login_admin` (flujo admin local)
- `PreLogin`/login tradicional
- creación de usuario en backend

---

## 4) Criterios de aceptación
1. Usuario OIDC nuevo (`created=true`) ve mensaje de onboarding.
2. Usuario OIDC existente (`created=false`) entra sin mensaje de onboarding.
3. Si callback falla, se ve mensaje de error claro.
4. No hay regresión en login admin.

---

## 5) Casos de prueba manuales
1. **OIDC usuario nuevo** → login exitoso + mensaje onboarding.
2. **OIDC usuario existente** → login exitoso sin onboarding.
3. **Error callback** (`code/state` inválidos o error backend) → mensaje error + opción reintentar.
4. **Admin local** → sin cambios.

---

## 6) Estimación de implementación
- Tipado + UI callback + pruebas manuales: **1.5 a 2.5 horas**.
