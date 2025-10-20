# 📚 Development Log - Cliente de Reddit con Angular 20

## 🎯 Objetivo del Proyecto
Crear un cliente web para Reddit que permita visualizar múltiples subreddits en columnas personalizables, interactuando con la API JSON pública de Reddit.

---

## 📖 Conceptos Fundamentales de Angular (Para Principiantes)

### ¿Qué es Angular?
Angular es un **framework** (conjunto de herramientas) para construir aplicaciones web. Piensa en él como una caja de herramientas completa que te da todo lo necesario para crear páginas web interactivas y dinámicas.

### ¿Qué es un Componente?
Un **componente** es como un "bloque de construcción" de tu aplicación. Es una pieza de la interfaz de usuario que tiene:
- **HTML** (lo que se ve en la pantalla)
- **CSS** (cómo se ve, los estilos)
- **TypeScript** (la lógica, lo que hace)

Ejemplo: Un botón, una tarjeta de post, una columna de subreddit... cada uno puede ser un componente.

### ¿Qué es un Servicio?
Un **servicio** es una clase especial que usamos para:
- Compartir datos entre diferentes componentes
- Realizar tareas complejas (como llamadas a APIs)
- Mantener la lógica de negocio separada de los componentes

**Diferencia clave**: Los componentes se ocupan de MOSTRAR cosas, los servicios se ocupan de HACER cosas.

### ¿Qué es Standalone?
Los componentes **standalone** son la forma moderna de crear componentes en Angular. Antes, necesitabas crear "módulos" para agrupar componentes. Ahora, cada componente puede funcionar de forma independiente (stand-alone = que está solo).

---

## 🚀 Paso 1: Creación del Proyecto Angular 20

### Comando Ejecutado
```bash
npx @angular/cli@20 new reddit-client --routing=true --style=css --ssr=false --skip-git=true --standalone=true
```

### Explicación del Comando
- `npx @angular/cli@20`: Ejecuta la herramienta de línea de comandos de Angular versión 20
- `new reddit-client`: Crea un nuevo proyecto llamado "reddit-client"
- `--routing=true`: Incluye el sistema de navegación (aunque no lo usaremos mucho en este proyecto)
- `--style=css`: Usaremos CSS normal para los estilos
- `--ssr=false`: No usaremos Server-Side Rendering (renderizado en el servidor)
- `--skip-git=true`: No inicializa un repositorio Git
- `--standalone=true`: Usa componentes standalone (la forma moderna)

### Estructura del Proyecto Creado

```
reddit-client/
├── src/                          # Código fuente de la aplicación
│   ├── app/                      # Carpeta principal de la aplicación
│   │   ├── app.ts               # Componente principal (raíz)
│   │   ├── app.html             # Template HTML del componente principal
│   │   ├── app.css              # Estilos del componente principal
│   │   ├── app.config.ts        # Configuración de la aplicación
│   │   └── app.routes.ts        # Definición de rutas
│   ├── main.ts                   # Punto de entrada de la aplicación
│   ├── index.html                # HTML principal que carga Angular
│   └── styles.css                # Estilos globales
├── public/                       # Archivos públicos (imágenes, favicon, etc.)
├── docs/                         # 📝 Documentación (este archivo)
├── angular.json                  # Configuración del proyecto Angular
├── package.json                  # Dependencias del proyecto
└── tsconfig.json                 # Configuración de TypeScript
```

### ¿Qué es cada archivo importante?

#### `src/main.ts` - El Punto de Entrada
Este es el **primer archivo** que se ejecuta cuando cargas la aplicación. Es como la "puerta de entrada".

#### `src/app/app.ts` - El Componente Raíz
Este es el componente principal de toda la aplicación. Todos los demás componentes que creemos estarán "dentro" de este.

#### `src/app/app.config.ts` - La Configuración
Aquí definimos cómo funciona nuestra aplicación (proveedores de servicios, configuraciones globales, etc.).

#### `package.json` - Las Dependencias
Lista todas las bibliotecas y herramientas que nuestra aplicación necesita para funcionar.

---

## ✅ Resultado del Paso 1
✓ Proyecto Angular 20 creado exitosamente
✓ Estructura de carpetas generada
✓ Dependencias instaladas automáticamente
✓ Configuración inicial lista

---

## 🎯 Próximos Pasos
1. Explorar y limpiar el código generado automáticamente
2. Crear la estructura básica de nuestra interfaz de columnas
3. Crear el servicio para consumir la API de Reddit
4. Implementar la gestión de estado con Signals

---

## 🔍 Paso 2: Análisis de los Archivos Generados

### Archivo: `src/main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

**Explicación línea por línea:**

1. **`import { bootstrapApplication }`**: Importamos la función que "arranca" (bootstrap) nuestra aplicación Angular.
2. **`import { appConfig }`**: Importamos la configuración de nuestra aplicación.
3. **`import { App }`**: Importamos el componente raíz (el principal).
4. **`bootstrapApplication(App, appConfig)`**: Esta función "inicia" nuestra aplicación usando el componente `App` con la configuración `appConfig`.
5. **`.catch((err) => ...)`**: Si hay un error al iniciar, lo mostramos en la consola.

**En resumen**: Este archivo es como el "interruptor de encendido" de toda la aplicación.

---

### Archivo: `src/app/app.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reddit-client');
}
```

**Conceptos nuevos:**

#### ¿Qué es el `@Component` decorator?
El **decorador** `@Component` (la parte que empieza con `@`) es como una "etiqueta" que le dice a Angular: "Oye, esta clase es un componente". Le pasamos un objeto con información:

- **`selector: 'app-root'`**: Es el nombre de la "etiqueta HTML" de este componente. En el HTML verás `<app-root></app-root>`.
- **`imports: [RouterOutlet]`**: Los otros componentes que este componente necesita usar. Como es standalone, debemos declarar aquí lo que usamos.
- **`templateUrl: './app.html'`**: La ruta al archivo HTML de este componente.
- **`styleUrl: './app.css'`**: La ruta al archivo CSS de este componente.

#### ¿Qué es un Signal?
**Signals** es una nueva característica de Angular 20 para manejar datos reactivos.

**Analogía**: Imagina que un Signal es como un "contenedor inteligente" para un valor. Cuando cambias el valor dentro del contenedor, Angular automáticamente actualiza todo lo que usa ese valor en la pantalla.

```typescript
protected readonly title = signal('reddit-client');
```

Aquí creamos un signal llamado `title` con el valor inicial `'reddit-client'`.

**Diferencia con variables normales**: Si usas una variable normal y cambias su valor, Angular no sabe que cambió. Con Signals, Angular SÍ se entera y actualiza la interfaz automáticamente.

---

### Archivo: `src/app/app.config.ts`

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
```

**¿Qué son los Providers?**
Los **providers** son servicios y configuraciones que estarán disponibles en TODA la aplicación.

- **`provideBrowserGlobalErrorListeners()`**: Captura errores globales.
- **`provideZoneChangeDetection()`**: Configura cómo Angular detecta cambios (no te preocupes mucho por esto ahora).
- **`provideRouter(routes)`**: Habilita el sistema de navegación entre páginas.

**Importante**: Más adelante agregaremos aquí el `provideHttpClient()` para poder hacer llamadas a la API de Reddit.

---

### Archivo: `package.json` - Las Dependencias

Este archivo lista todas las bibliotecas que usamos:

**Dependencias principales** (las que la app necesita para funcionar):
- **`@angular/core`**: El núcleo de Angular
- **`@angular/common`**: Funcionalidades comunes (pipes, directivas)
- **`rxjs`**: Biblioteca para trabajar con Observables (¡la usaremos mucho!)
- **`zone.js`**: Ayuda a Angular a detectar cambios

**Dependencias de desarrollo** (solo para programar):
- **`@angular/cli`**: La herramienta de línea de comandos
- **`typescript`**: El lenguaje que usamos (JavaScript con tipos)

---

## ✅ Resultado del Paso 2
✓ Archivos principales analizados y comprendidos
✓ Conceptos fundamentales explicados: Components, Signals, Providers, Decorators
✓ Preparados para empezar a construir nuestra aplicación

---

*Documentación actualizada: Paso 2 completado*

---

## 🧹 Paso 3: Limpieza y Configuración Inicial

### 3.1. Limpieza del HTML generado

Hemos eliminado todo el contenido de ejemplo (343 líneas de código de demostración de Angular) y lo hemos reemplazado con nuestra estructura básica:

```html
<div class="app-container">
  <header class="app-header">
    <h1>📱 Reddit Client</h1>
    <button class="add-column-btn" (click)="showAddDialog()">➕ Add Subreddit</button>
  </header>
  
  <main class="columns-container">
    <!-- Aquí irán las columnas de subreddits -->
    <p *ngIf="subreddits().length === 0" class="empty-message">
      Click "Add Subreddit" to start browsing Reddit!
    </p>
  </main>
</div>
```

**Conceptos nuevos en el HTML:**

#### Event Binding: `(click)="showAddDialog()"`
El **event binding** (enlace de eventos) se escribe con paréntesis `()`. Le dice a Angular: "Cuando el usuario haga click en este botón, ejecuta el método `showAddDialog()`".

**Sintaxis**: `(nombreDelEvento)="métodoAEjecutar()"`

Ejemplos:
- `(click)="metodo()"` → Cuando se hace click
- `(input)="metodo()"` → Cuando cambia el valor de un input
- `(submit)="metodo()"` → Cuando se envía un formulario

#### Directiva `*ngIf`
La directiva **`*ngIf`** muestra o oculta un elemento según una condición.

**Sintaxis**: `*ngIf="condición"`

En nuestro caso: `*ngIf="subreddits().length === 0"` significa "muestra este párrafo SOLO si el array de subreddits está vacío".

**Nota**: El asterisco `*` es importante. Le dice a Angular que es una "directiva estructural" (que modifica la estructura del DOM).

#### Signals en Templates: `subreddits()`
Para usar un Signal en el template HTML, lo llamamos como una función con paréntesis: `subreddits()`.

**Diferencia**:
- Variable normal: `{{ variable }}`
- Signal: `{{ signal() }}` ← ¡Nota los paréntesis!

---

### 3.2. Configuración de HttpClient

Ahora necesitamos configurar **HttpClient** para poder hacer llamadas a la API de Reddit.

#### ¿Qué es HttpClient?
**HttpClient** es un módulo de Angular que nos permite hacer peticiones HTTP (GET, POST, PUT, DELETE, etc.) a APIs externas.

**Analogía**: Es como el "cartero" de nuestra aplicación. Nosotros le decimos "ve a esta URL y tráeme los datos", y él va, los obtiene y nos los devuelve.

#### Código añadido en `app.config.ts`:

```typescript
import { provideHttpClient, withFetch } from '@angular/common/http';

// En los providers:
provideHttpClient(withFetch())
```

**Explicación**:
- **`provideHttpClient()`**: Hace que HttpClient esté disponible en toda la aplicación.
- **`withFetch()`**: Le dice a Angular que use la moderna API `fetch()` del navegador en lugar de XMLHttpRequest.

---

## 📦 Paso 4: Creación de Modelos (Interfaces de TypeScript)

### ¿Qué son las Interfaces en TypeScript?

TypeScript es "JavaScript con tipos". Las **interfaces** nos permiten definir la "forma" o estructura que deben tener nuestros objetos.

**Analogía**: Una interfaz es como un "molde" o "contrato". Define qué propiedades debe tener un objeto y de qué tipo son.

### Archivo: `src/app/models/reddit.model.ts`

```typescript
export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
  url: string;
  thumbnail?: string;
  subreddit: string;
}

export interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}
```

**Explicación línea por línea:**

- **`export`**: Permite que otras partes del código puedan usar esta interfaz.
- **`interface RedditPost`**: Define cómo es un post de Reddit.
- **`id: string`**: El id es de tipo texto (string).
- **`score: number`**: La puntuación es un número.
- **`thumbnail?: string`**: El `?` significa que esta propiedad es **opcional** (puede existir o no).

**¿Por qué dos interfaces?**
- **`RedditPost`**: Representa un post individual con todos sus datos.
- **`RedditResponse`**: Representa la estructura completa que nos devuelve la API de Reddit (que incluye muchos posts dentro de `data.children`).

---

## 🔧 Paso 5: Creación del Servicio de Reddit

### ¿Qué es un Servicio? (Profundización)

Ya hablamos brevemente de los servicios, pero ahora vamos más a fondo:

**Un servicio es una clase que:**
1. Contiene lógica de negocio (cálculos, validaciones, etc.)
2. Maneja datos (obtiene, transforma, almacena)
3. Se puede compartir entre múltiples componentes

**¿Por qué separar en servicios?**
- **Reutilización**: Varios componentes pueden usar el mismo servicio.
- **Organización**: El componente se ocupa de la UI, el servicio de la lógica.
- **Testing**: Es más fácil probar servicios que componentes.

### Archivo: `src/app/services/reddit.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { RedditResponse, RedditPost } from '../models/reddit.model';

@Injectable({
  providedIn: 'root'
})
export class RedditService {
  private readonly REDDIT_API = 'https://www.reddit.com';

  constructor(private http: HttpClient) {}

  getSubredditPosts(subreddit: string): Observable<RedditPost[]> {
    const url = `${this.REDDIT_API}/r/${subreddit}.json`;
    
    return this.http.get<RedditResponse>(url).pipe(
      map(response => response.data.children.map(child => child.data)),
      catchError(error => {
        console.error(`Error fetching r/${subreddit}:`, error);
        return of([]);
      })
    );
  }
}
```

### Conceptos Fundamentales del Servicio

#### 1. El decorador `@Injectable`

```typescript
@Injectable({
  providedIn: 'root'
})
```

- **`@Injectable`**: Le dice a Angular "esta clase es un servicio y puede recibir otros servicios inyectados".
- **`providedIn: 'root'`**: Hace que el servicio sea un **singleton** (solo existe una instancia en toda la aplicación).

**Ventaja del singleton**: Si 10 componentes usan este servicio, todos usan la misma instancia. No se crean 10 copias.

#### 2. Inyección de Dependencias

```typescript
constructor(private http: HttpClient) {}
```

**Esto es la "Inyección de Dependencias"** (Dependency Injection o DI).

**¿Qué significa?**
En lugar de hacer esto:
```typescript
this.http = new HttpClient(); // ❌ NO hacemos esto
```

Angular lo hace por nosotros automáticamente:
- Ve que necesitamos `HttpClient`
- Busca si ya existe una instancia
- Nos la "inyecta" (pasa) automáticamente en el constructor

**Beneficios:**
- No tenemos que crear instancias manualmente
- Fácil de testear (podemos inyectar versiones "falsas" para pruebas)
- Angular gestiona el ciclo de vida por nosotros

---

## 🌊 Paso 6: Entendiendo Observables y RxJS

### ¿Qué es un Observable?

Un **Observable** es una forma de manejar datos **asíncronos** (que llegan en el futuro).

**Analogía del periódico:**
Imagina que te suscribes a un periódico:
1. **Te suscribes** → `observable.subscribe()`
2. **El periódico llega cada día** → Los datos llegan cuando están listos
3. **Lees el periódico cuando llega** → Ejecutas código cuando llegan los datos
4. **Puedes cancelar la suscripción** → `subscription.unsubscribe()`

### ¿Qué es RxJS?

**RxJS** (Reactive Extensions for JavaScript) es una biblioteca para trabajar con Observables.

Proporciona **operadores** (funciones) para transformar, filtrar y combinar datos.

### Operadores de RxJS en nuestro servicio

#### 1. `pipe()`

```typescript
return this.http.get<RedditResponse>(url).pipe(...)
```

**`pipe()`** es como una "tubería" por donde pasan los datos. Dentro del pipe, aplicamos transformaciones.

**Analogía**: Es como una cadena de montaje en una fábrica. Los datos pasan por diferentes estaciones (operadores) y se van transformando.

#### 2. `map()`

```typescript
map(response => response.data.children.map(child => child.data))
```

**`map()`** transforma los datos. Recibe un valor y devuelve otro.

**En nuestro caso:**
- **Recibe**: La respuesta completa de Reddit (formato complejo)
- **Devuelve**: Solo el array de posts (formato simplificado)

**Equivalente en arrays:**
```typescript
[1, 2, 3].map(x => x * 2) // [2, 4, 6]
```

#### 3. `catchError()`

```typescript
catchError(error => {
  console.error(`Error fetching r/${subreddit}:`, error);
  return of([]);
})
```

**`catchError()`** captura errores en la cadena del Observable.

**¿Qué hace?**
- Si hay un error (subreddit no existe, sin internet, etc.)
- Lo captura
- Devuelve un Observable alternativo (en este caso, un array vacío)

#### 4. `of()`

```typescript
return of([]);
```

**`of()`** crea un Observable que inmediatamente emite un valor.

**Ejemplo:**
```typescript
of([1, 2, 3]).subscribe(data => console.log(data)); // [1, 2, 3]
```

---

## 🔄 Paso 7: Programación Asíncrona en Angular

### ¿Qué es "asíncrono"?

**Código Síncrono** (bloqueante):
```typescript
const data = getData(); // Espera aquí hasta que termine
console.log(data);
```

**Código Asíncrono** (no bloqueante):
```typescript
getData().subscribe(data => {
  console.log(data); // Se ejecuta cuando los datos lleguen
});
console.log('Esto se ejecuta primero!');
```

### ¿Por qué usar asíncrono?

Las llamadas a APIs por internet pueden tardar 1 segundo, 5 segundos o más. Si bloqueáramos el código:
- ❌ La interfaz se congelaría
- ❌ El usuario no podría hacer nada
- ❌ Mala experiencia de usuario

Con código asíncrono:
- ✅ La aplicación sigue funcionando
- ✅ El usuario puede seguir interactuando
- ✅ Cuando llegan los datos, se procesan

### Cómo usar nuestro servicio

```typescript
// En un componente:
this.redditService.getSubredditPosts('javascript').subscribe({
  next: (posts) => {
    // Se ejecuta cuando los datos llegan exitosamente
    console.log('Posts recibidos:', posts);
  },
  error: (err) => {
    // Se ejecuta si hay un error
    console.error('Error:', err);
  },
  complete: () => {
    // Se ejecuta cuando el Observable termina
    console.log('Petición completada');
  }
});
```

---

## ✅ Resultado de los Pasos 3-7

✓ HTML limpiado y estructura básica creada
✓ HttpClient configurado en la aplicación
✓ Interfaces de TypeScript creadas para los datos de Reddit
✓ Servicio de Reddit implementado con métodos para obtener posts
✓ Conceptos clave explicados: Interfaces, Servicios, Observables, RxJS, Async
✓ Componente principal actualizado con Signal y método básico

---

*Documentación actualizada: Pasos 3-7 completados*

---

## 🎨 Paso 8: Implementación de Componentes de UI

### 8.1. Componente de Columna de Subreddit

Hemos creado el componente `SubredditColumnComponent` que muestra los posts de un subreddit en una columna vertical.

#### Archivo: `src/app/components/subreddit-column.component.ts`

**Características principales:**

1. **Componente Standalone**: Es independiente y declara todas sus dependencias.
2. **Uso de Signals**: Para el estado reactivo (posts, loading, error).
3. **Ciclo de vida**: Implementa `OnInit` para cargar datos al inicializar.
4. **Comunicación con el padre**: Usa `@Input` y `@Output` para recibir y emitir datos.

**Conceptos nuevos explicados:**

#### ¿Qué es @Input?

```typescript
@Input({ required: true }) subreddit!: string;
```

**`@Input()`** permite que un componente hijo reciba datos desde su componente padre.

**Analogía**: Es como una "entrada" o "puerto USB". El componente padre le "conecta" datos al componente hijo.

**Ejemplo de uso:**
```html
<!-- En el componente padre -->
<app-subreddit-column [subreddit]="'javascript'"></app-subreddit-column>
```

Los corchetes `[]` indican "property binding" (enlace de propiedad).

**Opciones de @Input:**
- `required: true`: El valor es obligatorio, debe proporcionarse siempre.
- El signo `!` después del nombre indica a TypeScript "confía en mí, este valor se inicializará".

#### ¿Qué es @Output?

```typescript
@Output() close = new EventEmitter<void>();
```

**`@Output()`** permite que un componente hijo envíe eventos hacia su componente padre.

**Analogía**: Es como un "timbre" o "walkie-talkie". El hijo puede llamar al padre para avisarle de algo.

**EventEmitter** es un objeto que emite eventos. El tipo `<void>` significa que no envía ningún dato con el evento.

**Cómo emitir un evento:**
```typescript
onClose() {
  this.close.emit(); // "Toca el timbre" para avisar al padre
}
```

**Cómo escucharlo en el padre:**
```html
<app-subreddit-column 
  [subreddit]="'javascript'" 
  (close)="removeSubreddit('javascript')">
</app-subreddit-column>
```

Los paréntesis `()` indican "event binding" (enlace de evento).

#### Ciclo de vida: ngOnInit

```typescript
ngOnInit() {
  this.loadPosts();
}
```

**`ngOnInit()`** es un "hook" del ciclo de vida que se ejecuta **una sola vez** cuando el componente se inicializa.

**¿Cuándo se ejecuta?**
1. Angular crea el componente
2. Angular establece los valores de @Input
3. **ngOnInit se ejecuta** ← Aquí cargamos los datos
4. El componente se renderiza

**¿Por qué usarlo en lugar del constructor?**
- En el constructor, los @Input aún no están disponibles
- ngOnInit garantiza que todo está listo

#### Template moderno con Control Flow Syntax

Angular 20 introduce una nueva sintaxis de control de flujo más legible:

```typescript
@if (loading()) {
  <div class="loading">Loading posts...</div>
} @else if (error()) {
  <div class="error">Error message</div>
} @else {
  <div>Content</div>
}
```

**Ventajas sobre *ngIf:**
- Más legible y natural
- Mejor rendimiento
- Sintaxis más similar a otros lenguajes

**@for loop:**
```typescript
@for (post of posts(); track post.id) {
  <app-post-card [post]="post"></app-post-card>
}
```

El `track` es importante para el rendimiento. Le dice a Angular cómo identificar cada elemento único.

---

### 8.2. Componente de Tarjeta de Post

Hemos creado el componente `PostCardComponent` que muestra la información de un post individual.

#### Archivo: `src/app/components/post-card.component.ts`

**Características principales:**

1. **Componente de presentación**: Solo muestra datos, no maneja lógica compleja.
2. **Métodos de formato**: `formatScore()` y `formatTime()` para presentar datos de forma amigable.
3. **Estilos inline**: Los estilos están definidos en el mismo archivo del componente.

**Métodos de utilidad:**

#### formatScore()

```typescript
formatScore(score: number): string {
  if (score >= 1000) {
    return (score / 1000).toFixed(1) + 'k';
  }
  return score.toString();
}
```

Convierte números grandes en formato legible:
- `1500` → `"1.5k"`
- `850` → `"850"`

#### formatTime()

```typescript
formatTime(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  
  if (days > 0) return days + 'd';
  if (hours > 0) return hours + 'h';
  if (minutes > 0) return minutes + 'm';
  return 'now';
}
```

Convierte un timestamp UNIX en tiempo relativo:
- `hace 2 días` → `"2d"`
- `hace 3 horas` → `"3h"`
- `hace 45 minutos` → `"45m"`

---

### 8.3. Actualización del Componente Principal

Hemos actualizado el archivo `src/app/app.ts` para:

1. **Importar el componente de columnas**:
```typescript
import { SubredditColumnComponent } from './components/subreddit-column.component';
```

2. **Declararlo en imports**:
```typescript
imports: [CommonModule, SubredditColumnComponent]
```

3. **Añadir método para remover columnas**:
```typescript
removeSubreddit(subreddit: string) {
  this.subreddits.update(current => current.filter(s => s !== subreddit));
}
```

**Signal.update()**: Este método actualiza el valor de un Signal de forma inmutable.

**¿Qué significa inmutable?**
En lugar de modificar el array directamente:
```typescript
// ❌ NO hacer esto (mutación)
this.subreddits().push(newItem);
```

Creamos un nuevo array:
```typescript
// ✅ Hacer esto (inmutabilidad)
this.subreddits.update(current => [...current, newItem]);
```

**Ventajas de la inmutabilidad:**
- Angular detecta cambios más fácilmente
- Previene bugs difíciles de rastrear
- Es el estilo de programación funcional

---

### 8.4. Actualización del HTML Principal

Hemos actualizado `src/app/app.html` con:

1. **Estado vacío mejorado**: Un diseño más atractivo cuando no hay columnas.
2. **Nueva sintaxis de control flow**: Usando `@if` y `@for`.
3. **Property y Event Binding**: Para pasar datos y eventos entre componentes.

```html
@for (subreddit of subreddits(); track subreddit) {
  <app-subreddit-column 
    [subreddit]="subreddit" 
    (close)="removeSubreddit(subreddit)">
  </app-subreddit-column>
}
```

**Desglose:**
- `@for`: Itera sobre el array de subreddits
- `track subreddit`: Usa el nombre del subreddit como identificador único
- `[subreddit]="subreddit"`: Pasa el nombre como @Input
- `(close)="removeSubreddit(subreddit)"`: Escucha el evento @Output

---

### 8.5. Estilos CSS Mejorados

Hemos actualizado `src/app/app.css` con:

1. **Estado vacío elegante**: Diseño centrado con tarjeta blanca y gradiente en el botón.
2. **Altura fija para columnas**: `height: calc(100vh - 80px)` para que las columnas ocupen toda la altura disponible.
3. **Animaciones suaves**: Transiciones en hover para mejor UX.

**Conceptos CSS aplicados:**

#### calc() en CSS

```css
height: calc(100vh - 80px);
```

**`calc()`** permite hacer cálculos en CSS.

- `100vh`: 100% de la altura del viewport (ventana del navegador)
- `- 80px`: Restamos la altura del header
- **Resultado**: Las columnas ocupan toda la altura menos el header

#### Gradientes CSS

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**`linear-gradient()`** crea un degradado lineal.

- `135deg`: Ángulo del degradado (diagonal)
- `#667eea 0%`: Color inicial (púrpura claro) al 0%
- `#764ba2 100%`: Color final (púrpura oscuro) al 100%

---

## ✅ Resultado del Paso 8

✓ Componente `SubredditColumnComponent` creado con gestión de estado usando Signals
✓ Componente `PostCardComponent` creado con formateo de datos
✓ Comunicación entre componentes implementada con @Input y @Output
✓ Interfaz principal actualizada con nueva sintaxis de control flow
✓ Estilos CSS mejorados con gradientes y animaciones
✓ Conceptos explicados: @Input, @Output, EventEmitter, ngOnInit, Control Flow, Inmutabilidad

---

*Documentación actualizada: Paso 8 completado*

---

## 🔧 Paso 9: Solución del Problema de CORS

### 9.1. El Problema

Al intentar acceder a la API de Reddit directamente desde el navegador, encontramos un error de **CORS** (Cross-Origin Resource Sharing):

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://www.reddit.com/r/music.json
```

**¿Qué es CORS?**

**CORS** es una política de seguridad de los navegadores que impide que una página web haga peticiones a un dominio diferente al que la está sirviendo.

**Analogía**: Es como un guardia de seguridad que solo deja pasar peticiones que vienen del mismo edificio. Si intentas acceder desde otro edificio (dominio), el guardia te bloquea.

**En nuestro caso:**
- Nuestra app está en: `http://localhost:4200`
- Queremos datos de: `https://www.reddit.com`
- ❌ El navegador bloquea la petición por seguridad

**¿Por qué Reddit bloquea CORS?**

Reddit cambió sus políticas y ahora requiere autenticación OAuth para la mayoría de las peticiones desde navegadores. Las APIs JSON públicas tienen restricciones CORS estrictas.

---

### 9.2. La Solución: Proxy de Desarrollo

La solución es usar un **proxy** que intercepte nuestras peticiones y las redirija a Reddit, evitando las restricciones CORS.

**¿Cómo funciona?**

```
Navegador → Servidor Local (sin CORS) → Reddit API → Servidor Local → Navegador
```

El servidor de desarrollo de Angular actúa como intermediario:
1. El navegador hace la petición a `/api/r/subreddit.json` (mismo origen)
2. El proxy intercepta la petición
3. El proxy la envía a `https://www.reddit.com/r/subreddit.json`
4. Reddit responde al proxy (sin problema de CORS)
5. El proxy devuelve la respuesta al navegador

---

### 9.3. Configuración del Proxy

#### Archivo: `proxy.conf.json`

```json
{
  "/api": {
    "target": "https://www.reddit.com",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

**Explicación de cada opción:**

- **`"/api"`**: Intercepta todas las URLs que empiecen con `/api`
- **`"target"`**: El servidor al que redirigir las peticiones
- **`"secure": true`**: Acepta certificados SSL
- **`"changeOrigin": true`**: Cambia el header `Origin` para que Reddit lo acepte
- **`"logLevel": "debug"`**: Muestra información de las peticiones en la consola
- **`"pathRewrite"`**: Reescribe la ruta eliminando `/api` del inicio
  - Petición: `/api/r/javascript.json`
  - Se convierte en: `/r/javascript.json`
  - URL final: `https://www.reddit.com/r/javascript.json`

---

### 9.4. Actualización del Servicio

Hemos modificado el servicio para usar la ruta del proxy en lugar de llamar directamente a Reddit:

```typescript
export class RedditService {
  // Antes: 'https://www.reddit.com'
  // Ahora: '/api' (será interceptado por el proxy)
  private readonly REDDIT_API = '/api';

  getSubredditPosts(subreddit: string): Observable<RedditPost[]> {
    // Esta petición va a: http://localhost:4200/api/r/javascript.json
    // El proxy la redirige a: https://www.reddit.com/r/javascript.json
    const url = `${this.REDDIT_API}/r/${subreddit}.json?limit=25&raw_json=1`;
    
    return this.http.get<RedditResponse>(url).pipe(
      map(response => response.data.children.map(child => child.data)),
      catchError(error => {
        console.error(`Error fetching r/${subreddit}:`, error);
        return of([]);
      })
    );
  }
}
```

**Parámetros en la URL:**
- **`limit=25`**: Limita los resultados a 25 posts
- **`raw_json=1`**: Obtiene el JSON sin escapes HTML

---

### 9.5. Configuración en angular.json

Para que Angular CLI use el proxy, agregamos la configuración en `angular.json`:

```json
"serve": {
  "builder": "@angular/build:dev-server",
  "options": {
    "proxyConfig": "proxy.conf.json"
  },
  ...
}
```

Esto le dice al servidor de desarrollo: "Cuando arranques, usa las reglas definidas en `proxy.conf.json`".

---

### 9.6. Conceptos Importantes

#### Same-Origin Policy

La **Same-Origin Policy** (Política del Mismo Origen) es una medida de seguridad fundamental en los navegadores.

**Dos URLs tienen el mismo origen si tienen:**
1. El mismo protocolo (http/https)
2. El mismo dominio
3. El mismo puerto

**Ejemplos:**

✅ Mismo origen:
- `http://localhost:4200/app`
- `http://localhost:4200/api`

❌ Diferente origen:
- `http://localhost:4200` vs `https://localhost:4200` (protocolo diferente)
- `http://localhost:4200` vs `http://localhost:3000` (puerto diferente)
- `http://localhost:4200` vs `https://www.reddit.com` (dominio diferente)

#### Soluciones para CORS

Hay varias formas de resolver problemas de CORS:

1. **Proxy de desarrollo** (nuestra solución) ✅
   - Pros: Fácil de configurar, no requiere cambios en el backend
   - Contras: Solo funciona en desarrollo

2. **Configurar CORS en el servidor**
   - Pros: Solución permanente
   - Contras: Necesitas control del servidor (no tenemos control de Reddit)

3. **JSONP** (técnica antigua)
   - Pros: Funciona sin CORS
   - Contras: Solo GET, inseguro, obsoleto

4. **Servicios proxy públicos** (cors-anywhere, etc.)
   - Pros: Funciona en producción
   - Contras: Depende de servicios de terceros, límites de tasa

---

### 9.7. Nota sobre Producción

⚠️ **IMPORTANTE**: Esta solución de proxy solo funciona en desarrollo.

Para producción, necesitarías:

1. **Backend propio**: Crear un servidor Node.js/Express que haga las peticiones a Reddit
2. **Serverless Functions**: Usar funciones cloud (Netlify Functions, Vercel, AWS Lambda)
3. **Proxy reverso**: Configurar un servidor como Nginx

**Ejemplo de función serverless (Netlify):**

```javascript
// netlify/functions/reddit.js
exports.handler = async (event) => {
  const subreddit = event.queryStringParameters.subreddit;
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const data = await response.json();
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
```

---

## ✅ Resultado del Paso 9

✓ Problema de CORS identificado y comprendido
✓ Archivo `proxy.conf.json` creado con configuración de proxy
✓ Servicio actualizado para usar rutas locales
✓ Configuración de Angular CLI actualizada
✓ Servidor reiniciado con proxy funcionando
✓ Conceptos explicados: CORS, Same-Origin Policy, Proxies, Soluciones

---

*Documentación actualizada: Paso 9 completado*
