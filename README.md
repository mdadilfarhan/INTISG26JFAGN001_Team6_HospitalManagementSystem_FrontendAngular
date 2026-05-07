# PulsePoint

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# PulsePoint — Frontend Team Documentation

> **Angular 21 | Standalone Components | TypeScript**  
> **API Gateway:** `http://localhost:8090`

---

## Table of Contents

1. [Tech Stack and Prerequisites](#1-tech-stack-and-prerequisites)
2. [Project Structure](#2-project-structure)
3. [What Is Already Built](#3-what-is-already-built)
4. [How Authentication Works](#4-how-authentication-works)
5. [Adding Your Dashboard — Step by Step](#5-adding-your-dashboard--step-by-step)
6. [Calling Your Backend APIs](#6-calling-your-backend-apis)
7. [Getting Current User Information](#7-getting-current-user-information)
8. [Navbar — Dashboard Navigation](#8-navbar--dashboard-navigation)
9. [Environment Configuration](#9-environment-configuration)
10. [Quick Checklist](#10-quick-checklist)
11. [Important Rules](#11-important-rules)

---

## 1. Tech Stack and Prerequisites

| Technology | Version / Detail | Purpose |
|---|---|---|
| Angular | 21 | Frontend framework |
| TypeScript | Latest | Programming language |
| Node.js | 18+ | Required to run Angular CLI |
| Angular CLI | 21 | Project scaffolding and build |
| CSS | Vanilla | Styling (no external framework) |
| API Gateway | http://localhost:8090 | Single entry point for all APIs |

> ⚠️ **All API calls go through the gateway at `http://localhost:8090`. Never call individual microservices directly from the frontend.**

---

## 2. Project Structure

```
PulsePoint/
└── src/
    └── app/
        ├── core/                            
        │   ├── models/                      ← all TypeScript interfaces and enums
        │   │   ├── auth.model.ts
        │   │   ├── user.model.ts
        │   │   ├── notification.model.ts
        │   │   ├── role-name.enum.ts
        │   │   ├── notification-type.enum.ts
        │   │   └── index.ts                 ← import EVERYTHING from here
        │   ├── services/                    ← HTTP API services
        │   │   ├── auth.service.ts
        │   │   ├── user.service.ts
        │   │   └── notification.service.ts
        │   ├── guards/
        │   │   ├── auth.guard.ts            ← checks if user is logged in
        │   │   └── role.guard.ts            ← checks if user has correct role
        │   └── interceptors/
        │       └── auth.interceptor.ts      ← auto-attaches Bearer token to every request
        ├── auth/                            ← login and signup page (built)
        │   ├── auth.component.ts            ← ADD your role to route mapping here
        │   ├── auth.component.html
        │   └── auth.component.css
        ├── adminDashboard/                  ← admin dashboard (built)
        │   ├── adminDashboard.component.ts
        │   ├── adminDashboard.component.html
        │   └── adminDashboard.component.css
        ├── your-feature/                    ← ADD YOUR COMPONENT HERE
        ├── app.component.ts
        ├── app.routes.ts                    ← ADD YOUR ROUTE HERE
        └── app.config.ts

    environments/
    └── environment.ts                       ← API gateway URL lives here
```

> **Core Folder Rule:** The `core/` folder is shared infrastructure. Do not modify existing files inside it. Adding new model files or service files inside `core/` for your own feature is perfectly fine.

---

## 3. What Is Already Built

| Feature | File Location | Status |
|---|---|---|
| Login page | `src/app/auth/` | ✅ Done |
| Signup page | `src/app/auth/` | ✅ Done |
| Admin dashboard | `src/app/adminDashboard/` | ✅ Done |
| Auth service | `core/services/auth.service.ts` | ✅ Done |
| User service | `core/services/user.service.ts` | ✅ Done |
| Notification service | `core/services/notification.service.ts` | ✅ Done |
| HTTP Interceptor | `core/interceptors/auth.interceptor.ts` | ✅ Done |
| Auth Guard | `core/guards/auth.guard.ts` | ✅ Done |
| Role Guard | `core/guards/role.guard.ts` | ✅ Done |
| JWT token handling | `core/services/auth.service.ts` | ✅ Done |
| All models and enums | `core/models/` | ✅ Done |

---

## 4. How Authentication Works

### 4.1 Login Flow

```
User fills username and password
        ↓
auth.component.ts calls authService.login()
        ↓
POST http://localhost:8090/auth/login
        ↓
Gateway skips JWT check for /auth/* routes
        ↓
User Service validates credentials and returns:
  { accessToken, refreshToken, id, username, fullName, roles }
        ↓
Tokens stored in localStorage automatically by AuthService
        ↓
Role decoded from token → ROLE_REDIRECT_MAP → navigate to dashboard
```

### 4.2 Every API Request Flow

```
Any HTTP call made in Angular
        ↓
authInterceptor runs automatically (no action needed from you)
        ↓
Reads accessToken from localStorage
        ↓
Clones the request and adds:  Authorization: Bearer <token>
        ↓
Request goes to API Gateway at localhost:8090
        ↓
Gateway validates JWT signature
        ↓
Gateway decodes token and adds: X-User-Id and X-User-Role headers
        ↓
Forwards request to your microservice
        ↓
Service reads headers for authorisation and returns data
```

> ✅ **You never need to add `Authorization`, `X-User-Role`, or `X-User-Id` headers in your services. The interceptor and gateway handle everything automatically. Just write clean HTTP calls with a URL only.**

### 4.3 Route Protection Flow

```
User visits /your-dashboard
        ↓
AuthGuard checks: token exists and not expired?
  YES → pass through
  NO  → redirect to /login
        ↓
RoleGuard checks: role decoded from token
  role is in allowedRoles for this route?
  YES → allow access
  NO  → redirect to /login
        ↓
Your dashboard loads successfully
```

### 4.4 Auto Logout on 401

```
Token expires during active session
        ↓
Any API call returns 401 Unauthorized
        ↓
authInterceptor catches the error automatically
        ↓
Clears localStorage and redirects to /login
```

---

## 5. Adding Your Dashboard — Step by Step

### Step 1 — Generate your component

Run this command from the `PulsePoint` root directory:

```bash
ng g c your-feature-name --standalone --skip-tests
```

Example for doctor dashboard:

```bash
ng g c doctor --standalone --skip-tests
```

This creates:

```
src/app/doctor/
├── doctor.component.ts
├── doctor.component.html
└── doctor.component.css
```

---

### Step 2 — Add your route in `app.routes.ts`

Open `src/app/app.routes.ts` and add your route inside the routes array:

```typescript
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // ... existing routes ...

  // ADD YOUR ROUTE HERE
  {
    path: 'doctor-dashboard',
    loadComponent: () =>
      import('./doctor/doctor.component').then(m => m.DoctorComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['DOCTOR'] }   // ← your role here
  },
];
```

> ⚠️ **Role names must match exactly (case-sensitive):**
> `ADMIN` | `DOCTOR` | `PHARMACIST` | `LAB_TECHNICIAN` | `USER`

---

### Step 3 — Add your role to the redirect map

Open `src/app/auth/auth.component.ts` and find `ROLE_REDIRECT_MAP`:

```typescript
private readonly ROLE_REDIRECT_MAP: Record<string, string> = {
  'ADMIN':          '/adminDashboard',
  'DOCTOR':         '/doctor-dashboard',    // ← add your entry
  'PHARMACIST':     '/pharmacy-dashboard',  // ← add your entry
  'LAB_TECHNICIAN': '/lab-dashboard',       // ← add your entry
  'USER':           '/patient-dashboard'    // ← add your entry
};
```

> After this step, when a user with your role logs in they will be automatically redirected to your dashboard.

---

## 6. Calling Your Backend APIs

### 6.1 Add your models

Create a new file in `src/app/core/models/` for your feature's DTOs:

```typescript
// src/app/core/models/appointment.model.ts  (example)

export interface AppointmentResponse {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status: string;
}

export interface CreateAppointmentRequest {
  patientId: number;
  doctorId: number;
  date: string;
}
```

Then export it from `src/app/core/models/index.ts`:

```typescript
// Add this one line to index.ts
export * from './appointment.model';
```

---

### 6.2 Create your service

Create a new file in `src/app/core/services/`:

```typescript
// src/app/core/services/appointment.service.ts  (example)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppointmentResponse, CreateAppointmentRequest } from '../models/index';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  // Your service base path — no prefix needed
  private baseUrl = `${environment.apiGatewayUrl}/appointments`;

  constructor(private http: HttpClient) {}

  // GET all
  getAll(): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.baseUrl}/all`);
  }

  // GET by ID
  getById(id: number): Observable<AppointmentResponse> {
    return this.http.get<AppointmentResponse>(`${this.baseUrl}/${id}`);
  }

  // POST create
  create(request: CreateAppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(
      `${this.baseUrl}/create`,
      request
    );
  }

  // DELETE
  delete(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/delete/${id}`,
      { responseType: 'text' as 'json' }
    );
  }
}
```

> ✅ **Never add `Authorization`, `X-User-Role`, or `X-User-Id` headers to your service. Write only the URL and HTTP method. The interceptor handles the rest.**

---

### 6.3 Use the service in your component

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../core/services/appointment.service';
import { AppointmentResponse } from '../core/models/index';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  appointments: AppointmentResponse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to load.';
        this.isLoading = false;
      }
    });
  }
}
```

---

## 7. Getting Current User Information

Inject `AuthService` in your component to read user data decoded directly from the JWT token:

```typescript
import { AuthService } from '../core/services/auth.service';

constructor(private authService: AuthService) {}

// Get current user ID
const userId = this.authService.getUserId();
// returns: number | null

// Get current user role
const role = this.authService.getRole();
// returns: 'ADMIN' | 'DOCTOR' | 'PHARMACIST' | 'LAB_TECHNICIAN' | 'USER' | null

// Get current username
const username = this.authService.getUsername();
// returns: string | null

// Check if logged in — also validates token expiry
const loggedIn = this.authService.isLoggedIn();
// returns: boolean

// Logout — clears localStorage and redirects to /login
this.authService.logout();
```

> All methods decode information directly from the signed JWT token stored in `localStorage`. The token is verified by the API gateway on every request so the data is always trustworthy.

---

## 8. Environment Configuration

**File:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiGatewayUrl: 'http://localhost:8090'
};
```

Use it in every service like this:

```typescript
import { environment } from '../../../environments/environment';

// In your service class
private baseUrl = `${environment.apiGatewayUrl}/your-service-path`;
```

> ⚠️ **Never hardcode `http://localhost:8090` directly in your service files. Always use `environment.apiGatewayUrl` so that changing the gateway URL in future only requires editing one file.**

---

## 9. Quick Checklist — Adding a New Feature

```
[ ] Run: ng g c your-feature-name --standalone --skip-tests
[ ] Create model interfaces in core/models/your-feature.model.ts
[ ] Export your model from core/models/index.ts
[ ] Create your service in core/services/your-feature.service.ts
[ ] Add route in app.routes.ts with canActivate: [authGuard, roleGuard]
    and data: { roles: ['YOUR_ROLE'] }
[ ] Add your role to route mapping in auth.component.ts ROLE_REDIRECT_MAP
[ ] Add your role to route mapping in the shared navbar component when built
[ ] Build your component by injecting your service in the constructor
[ ] Handle loading state with an isLoading boolean
[ ] Handle errors in the error callback of subscribe()
```

---

