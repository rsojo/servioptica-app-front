# Especificación para restaurar el flujo cliente con `checkClient`

## Objetivo
Reactivar el flujo histórico de cliente en `PreLogin` (NIT -> `checkClient` -> sede/registro/OTP -> login), sin perder los cambios recientes de OIDC.

## Estado actual (marzo 2026)
- El flujo `checkClient` quedó desactivado por bandera en:
  - `src/components/pages/PreLogin.tsx`
- Bandera actual:
  - `const USE_CHECKCLIENT_FLOW = false;`
- Con `false`, `PreLogin` muestra login directo (`document` + `password`) y evita el camino de validación previa.

---

## Cómo volver a activar el camino histórico

### 1) Encender bandera
En `src/components/pages/PreLogin.tsx` cambiar:
- `USE_CHECKCLIENT_FLOW = false`
- a `USE_CHECKCLIENT_FLOW = true`

### 2) Verificar render esperado en `PreLogin`
Con la bandera en `true` debe volver a renderizarse:
- `PreLoginForm` para pasos iniciales.
- `OtpCodeLightBox` en pasos de OTP.
- `RecoverPasswordForm` cuando aplique.
- `LoginForm` solo en `step === 5` (como estaba originalmente).

### 3) Validar transiciones de pasos
Confirmar estos estados:
- `step 1`: captura NIT y llama `checkClient`.
- `step 2`: selección de sede (`checkClient` múltiple).
- `step 3`: OTP de activación.
- `step 4`: asignación de contraseña.
- `step 5`: login final.
- `step 6/7`: recuperación de contraseña y OTP.

### 4) Mantener integración OIDC
No remover:
- `handleOidcLogin()`
- fallback `403` (local login no permitido) -> iniciar OIDC.

Esto conserva transición híbrida (`ADMIN` local / `CLIENT` OIDC) según guía.

---

## Pruebas mínimas sugeridas

1. **Cliente nuevo/inactivo**
- NIT válido -> OTP -> asignación contraseña -> login.

2. **Cliente activo**
- NIT válido -> salto a login (`step 5`) -> acceso dashboard cliente.

3. **Múltiples sedes**
- NIT con varias sedes -> selección en `step 2` -> continuidad correcta.

4. **Fallback OIDC**
- Si `POST /api/auth/login` responde `403`, verificar redirección a flujo OpenID.

5. **Errores de red/API**
- Mensajes de error visibles en snackbar en cada etapa.

---

## Riesgos al reactivar
- Dependencia de códigos HTTP (`202`, `208`, `302`) en `checkClient`.
- Riesgo de regresión en UX si backend cambió contratos de registro/OTP.
- Doble camino de autenticación (legacy + OIDC) requiere monitoreo funcional.

---

## Nota operativa
Para un rollback rápido en QA/producción, basta con alternar la bandera `USE_CHECKCLIENT_FLOW` y hacer build/deploy.
