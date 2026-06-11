# Guía de Deployment para SiteGround

## Archivos Preparados para Deploy

El proyecto ha sido construido exitosamente y está listo para ser desplegado en SiteGround. Los archivos se encuentran en:
- **Carpeta**: `dist/`
- **Archivo ZIP**: `dist.zip` (4.4 MB) - **¡LISTO PARA SUBIR!**

### Contenido del archivo `dist.zip`:
- `index.html` - Archivo principal de la aplicación
- `assets/` - Archivos CSS y JavaScript optimizados
  - `index-CKmHH6_y.css` (310.20 KB)
  - `index-ChKLVOyy.js` (442.49 KB)
- `images/` - Todas las imágenes del sitio (logos, banners, productos, etc.)
- `Resume.pdf` - Archivo PDF del currículum
- `.htaccess` - Configuración del servidor para SPA

## Pasos para Deploy en SiteGround

### 1. Acceder al Panel de Control
1. Inicia sesión en tu cuenta de SiteGround
2. Ve a "Site Tools" desde tu panel de control
3. Navega a "File Manager" en la sección "Files"

### 2. Preparar el Directorio
1. Navega a la carpeta `public_html` (o la carpeta raíz de tu dominio)
2. **IMPORTANTE**: Haz una copia de seguridad de cualquier archivo existente
3. Elimina todos los archivos existentes en la carpeta (excepto si tienes otros sitios en subdirectorios)

### 3. Subir el Archivo ZIP
**OPCIÓN RECOMENDADA:**
1. Sube el archivo `dist.zip` a la carpeta `public_html`
2. Haz clic derecho sobre `dist.zip` en el File Manager
3. Selecciona "Extract" para descomprimir todos los archivos
4. Elimina el archivo `dist.zip` después de extraer

**OPCIÓN ALTERNATIVA:**
1. Extrae `dist.zip` en tu computadora
2. Sube todos los archivos y carpetas individualmente

### 4. Verificar la Estructura
Después de extraer, tu estructura en `public_html` debe verse así:
```
public_html/
├── index.html
├── .htaccess
├── Resume.pdf
├── assets/
│   ├── index-ChKLVOyy.js
│   └── index-CKmHH6_y.css
└── images/
    ├── logo.svg
    ├── logo-light.svg
    ├── (todas las demás imágenes...)
```

### 5. Configurar Permisos
1. Asegúrate de que el archivo `.htaccess` tenga permisos 644
2. Las carpetas deben tener permisos 755
3. Los archivos deben tener permisos 644

### 6. Verificar el Sitio
1. Visita tu dominio en el navegador
2. Verifica que todas las páginas funcionen correctamente
3. Prueba la navegación entre secciones
4. Verifica que las imágenes se carguen correctamente
5. **NUEVO**: Verifica que el logo se vea completo en el menú móvil

## Características del .htaccess Incluido

El archivo `.htaccess` incluye:
- **Routing de SPA**: Redirige todas las rutas a `index.html`
- **Compresión**: Habilita compresión gzip para mejor rendimiento
- **Cache**: Configura headers de cache para recursos estáticos
- **Seguridad**: Headers de seguridad básicos

## Últimas Mejoras Incluidas

✅ **Logo móvil corregido**: El logo ahora se ve completo en el menú móvil sin cortarse
✅ **Botones alineados**: Los botones "Buy Now" están alineados horizontalmente
✅ **Cards responsivas**: Las tarjetas de contacto se apilan correctamente en móvil
✅ **Padding optimizado**: El título "Origin & Sustainability" tiene el espaciado correcto

## Solución de Problemas Comunes

### Si el sitio no carga:
1. Verifica que `index.html` esté en la raíz de `public_html`
2. Comprueba que el archivo `.htaccess` esté presente
3. Verifica los permisos de archivos y carpetas

### Si las imágenes no cargan:
1. Asegúrate de que la carpeta `images/` esté completa
2. Verifica que las rutas en el código coincidan con la estructura

### Si las rutas no funcionan:
1. Verifica que el archivo `.htaccess` esté presente y tenga el contenido correcto
2. Asegúrate de que el módulo mod_rewrite esté habilitado (SiteGround lo tiene por defecto)

### Si el logo se ve cortado en móvil:
1. Verifica que los archivos CSS se hayan subido correctamente
2. Limpia la caché del navegador

## Información Técnica

- **Tamaño del ZIP**: 4.4 MB
- **Archivos principales**:
  - CSS: 310.20 KB (41.20 KB comprimido)
  - JavaScript: 442.49 KB (140.52 KB comprimido)
- **Optimizado para**: Producción con Vite
- **Compatible con**: Todos los navegadores modernos
- **Responsive**: Totalmente optimizado para móvil y desktop

## Contacto

Si encuentras algún problema durante el deployment, revisa esta guía o contacta al desarrollador.

---
*Actualizado: Septiembre 2024 - Incluye corrección del logo móvil*