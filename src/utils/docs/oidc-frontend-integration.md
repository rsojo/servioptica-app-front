# Guía de uso del módulo OpenID (Base para cambios en Frontend)

## 1) Objetivo

Este documento define cómo debe consumir el frontend React el módulo OIDC implementado en backend, manteniendo la arquitectura híbrida actual:

- `ADMIN` -> login local (`/api/auth/login`)
- `CLIENT` -> login OIDC (`/api/auth/oidc/*`)

---

## 2) Resumen de endpoints disponibles

## 2.1 OIDC (clientes)

- `GET /api/auth/oidc/start`
  - Genera URL de autorización OIDC.
  - Query opcional: `return_to`

- `GET /api/auth/oidc/callback`
  - Recibe `code` y `state` desde el IdP.
  - Intercambia el código, vincula/crea usuario cliente y devuelve token local (Sanctum).

- `POST /api/auth/oidc/logout` (requiere `Authorization: Bearer <token>`)
  - Cierra sesión local.
  - Retorna `end_session_url` del IdP para logout federado.

- `GET /api/auth/oidc/logout/callback`
  - Callback posterior al logout del IdP.

- `GET /api/auth/me` (requiere `Authorization: Bearer <token>`)
  - Retorna perfil autenticado, tipo de usuario y datos OIDC mapeados.

## 2.2 Login local (solo admin)

- `POST /api/auth/login`
  - Solo habilitado para usuarios `ADMIN`.
  - Si usuario no es admin, backend responde `403`.

---

## 3) Flujo frontend recomendado (CLIENT OIDC)

1. Usuario cliente hace clic en “Ingresar con OpenID”.
2. Front llama `GET /api/auth/oidc/start`.
3. Front redirige el navegador a `data.authorization_url`.
4. IdP autentica y redirige a backend `GET /api/auth/oidc/callback?code=...&state=...`.
5. Backend responde JSON con token local:
   - `data.access_token`
   - `data.token_type`
   - `data.user`
6. Front guarda token y navega al área autenticada.
7. Front consulta `GET /api/auth/me` para hidratar sesión.

Notas:
- El token que usa frontend contra la API es el token local emitido por backend (Sanctum).
- No usar directamente el token crudo del IdP en requests a la API de negocio.

---

## 4) Flujo frontend recomendado (ADMIN local)

1. Usuario admin usa formulario existente.
2. Front llama `POST /api/auth/login` con `document` + `password`.
3. Si éxito, backend devuelve token local.
4. Front guarda token y continúa flujo actual.

Si responde `403` con mensaje `Login local habilitado solo para administradores.`, mostrar CTA para login OIDC.

---

## 5) Contratos de respuesta relevantes

## 5.1 `GET /api/auth/oidc/start`

Respuesta exitosa:
- `error: false`
- `data.authorization_url`
- `data.state`

## 5.2 `GET /api/auth/oidc/callback`

Respuesta exitosa:
- `error: false`
- `data.access_token`
- `data.token_type` (`Bearer`)
- `data.admin` (`false`)
- `data.user` (`id`, `name`, `email`, `document`)

Errores frecuentes:
- `400`: callback inválido (`code/state`, intercambio o validación)
- `403`: OIDC deshabilitado en modo local o usuario no permitido por tipo

## 5.3 `GET /api/auth/me`

Respuesta exitosa:
- `data.auth_source`: `oidc_client` o `local_admin`
- `data.type`: tipo de usuario interno
- `data.oidc`: datos mapeados (`id_contacto`, `nit`, `nombre`, `razon_social`, `punto`, `grupo_empresarial`)

---

## 6) Reglas funcionales que frontend debe respetar

1. Si el usuario es cliente, usar flujo OIDC.
2. Si el login local retorna `403` por tipo, redirigir a OIDC.
3. No inferir privilegios por datos de UI: usar `GET /api/auth/me` y backend como fuente de verdad.
4. Para logout OIDC:
   - llamar `POST /api/auth/oidc/logout`
   - eliminar token local del storage
   - redirigir a `data.end_session_url` si viene informado

---

## 7) Manejo de sesión en frontend

- Guardar `access_token` de forma consistente con la app actual.
- En cada request autenticado enviar:
  - `Authorization: Bearer <access_token>`
- Al iniciar app:
  1. leer token
  2. llamar `GET /api/auth/me`
  3. si `401`, limpiar sesión y enviar a login

---

## 8) Matriz rápida de errores UX

- `401 Usuario no autenticado` -> limpiar token y mostrar login.
- `403 OIDC deshabilitado en modo local` -> mostrar fallback a login admin.
- `403 OIDC solo para usuarios cliente` -> mostrar mensaje “Este usuario debe usar login administrador”.
- `400 Error en callback OIDC` -> mostrar error y opción “Reintentar login OIDC”.
- error de red/CORS -> mostrar estado de conectividad y endpoint objetivo.

---

## 9) Variables esperadas por entorno (referencia)

Frontend debe conocer la base API por ambiente y usar rutas API anteriores.
Backend depende de:

- `AUTH_MODE=local|dual|oidc`
- `OIDC_ISSUER`
- `OIDC_DISCOVERY_URL`
- `OIDC_CLIENT_ID`
- `OIDC_CLIENT_SECRET`
- `OIDC_REDIRECT_URI`
- `OIDC_POST_LOGOUT_REDIRECT_URI`
- `OIDC_SCOPES`

Para cambios de front, asumir `AUTH_MODE=dual` durante transición.

---

## 10) Checklist para equipo Frontend (listo para agente)

- [ ] Añadir botón “Ingresar con OpenID” en login cliente.
- [ ] Implementar llamada a `GET /api/auth/oidc/start` y redirección.
- [ ] Implementar pantalla/control de retorno desde callback backend.
- [ ] Guardar token local devuelto por callback.
- [ ] Implementar `GET /api/auth/me` al bootstrap de sesión.
- [ ] Mantener login admin actual (`POST /api/auth/login`).
- [ ] Implementar logout OIDC (`POST /api/auth/oidc/logout` + redirect a IdP si aplica).
- [ ] Agregar manejo UX para errores `400/401/403` del módulo OIDC.

---

## 11) Referencias backend

- `routes/api.php`
- `app/Http/Controllers/OidcAuthController.php`
- `app/Http/Controllers/AuthController.php`
- `app/Services/OidcService.php`
- `config/auth.php`
- `config/services.php`

---

## 12) Estado de arquitectura

Este módulo está preparado para transición híbrida.
El corte completo a OIDC (`AUTH_MODE=oidc`) debe ejecutarse solo cuando frontend y pruebas E2E estén cerradas.
