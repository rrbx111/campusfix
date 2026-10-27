# CampusFix Lite
Smart Campus Facility and Room Management System — NSTP Building
Proposed BulSU CC102 “Tech for Good” frontend prototype.

## Run locally
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Right-click index.html and choose Open with Live Server.
Alternatively, run `python -m http.server 8000` in the folder and visit http://localhost:8000.
Opening index.html directly also supports most interactions, but browser storage rules differ for file URLs. A local server is recommended.
No npm installation, build, backend, or API key is required. QR libraries are bundled. The optional Google Fonts stylesheet requires internet; system fonts are used offline.

## Try the demo
- Student: Explore Room 101 → Check in → My activity → Check out → Leave feedback.
- Room details → Room QR → Download QR or copy the deep link.
- Scan room QR → Start camera, or enter NSTP-101 manually.
- Reservations → Request a room. Switch to Administrator → approve/reject.
- Facility reports → Report an issue. Switch to Administrator → view report → assign/update status and add a note. Switch back to see the notification.
- Administrator → Administration: add/edit room records, change maintenance/unavailable status, update demo directory, rename the building, export/restore JSON backup.
- Class schedules → Add class (Administrator). Conflicting sessions are truncated and approved reservations cancelled with a notification.
- Analytics and logs are available to the Administrator demo role.

## Rules and limitations
All room names, floors, capacities, equipment, people, announcements, and schedules are SAMPLE DATA, not verified BulSU records. Initial sample events are relative to first launch; after time passes, add new events using the admin interface.
Role switching is NOT authentication. Directory records do not create real accounts. Browser role checks are a demonstration, not security.
Room status order: maintenance/unavailable → active class → approved reservation → active session → available.
Classes preempt informal occupancy. Maintenance immediately blocks check-in and ends active sessions. Unavailable rooms reject new reservations; existing approvals should be reviewed by an administrator after status changes.
Reservation conflicts are checked at request AND approval. Pending requests do not block occupancy. Adjacent times do not conflict.
Session expiry is reconciled on startup and every 15 seconds while the application is active; this is not a server-enforced timer. There is no reliable occupancy verification or concurrent multi-device consistency. Same-origin tabs receive best-effort storage updates.
Camera scanning requires HTTPS or localhost, camera hardware, and permission. Physical camera scanning could not be tested in this environment. QR links pointing to localhost are not reachable from another device. For a phone demo, serve on an accessible LAN hostname with trusted HTTPS; each browser still has separate data.
Notifications are in-app local records, not push, SMS, or email. No image malware scanner or secure upload storage exists. Optional report photos are stored locally, limited to 1 MB, and should contain no sensitive information. Browser quotas can reject persistence; an in-app notice reports this.
Backup export downloads a JSON file; restore replaces local demo data after confirmation. Keep backups private. Avoid real student records or credentials.
Faculty can view all schedules, identify assignments through the faculty column, create their own reservation requests, and cancel their requests. Administrator approval remains mandatory.

## Architecture and backend migration
- index.html: accessible semantic shell and dialog.
- styles.css: responsive layout (desktop/tablet/mobile).
- engine.js: pure availability, overlap, conflict and session-boundary rules.
- app.js: views, forms, demo identity, notifications and local persistence adapter.
- vendor/: qrcode-generator 1.4.4 and jsQR 1.4.0, bundled with upstream license headers.
- tests.cjs: scheduling regression assertions; run `node tests.cjs`.

Future FastAPI endpoints: GET /rooms, GET /rooms/{id}, POST /sessions, POST /sessions/{id}/checkout, CRUD /schedules, POST /reservations, PATCH /reservations/{id}, CRUD /reports, POST /reports/{id}/updates, GET /notifications, POST /feedback, GET /analytics.
Replace repository.load/save with async API methods, split app.js views into modules, and retain the pure scheduling rules as a specification. PostgreSQL should own users, rooms, buildings, equipment, schedules, reservations, sessions, reports, report updates, announcements, notifications, feedback and audit events. Enforce conflict rules transactionally with row locks or exclusion constraints. Use server time and a cleanup worker for sessions. Enforce authenticated RBAC and ownership on EVERY endpoint. WebSocket or SSE events should refresh affected room/query views after committed changes. Store uploads outside the database with size/type validation, malware scanning and authorization. Use private backups, retention limits, rate limits, and an immutable server audit trail.

## Validation performed
JavaScript syntax checks and scheduling regression assertions pass. Browser smoke checks verified dashboard rendering, student check-in/activity/check-out, role switching, and administrator reservation approval. Camera permission/hardware, multi-device synchronization, and production security are not verified and are not production capabilities. Responsive CSS is included; exhaustive device testing remains pending.

## References / disclosure
qrcode-generator: https://github.com/kazuhikoarase/qrcode-generator (MIT)
jsQR: https://github.com/cozmo/jsQR (Apache-2.0)
Google Fonts: DM Sans / Manrope (optional, system fallback)
AI assisted with architecture, source code, sample data and documentation. The group must verify its campus problem claims and replace illustrative records with authorized, accurate data before presenting them as factual.
