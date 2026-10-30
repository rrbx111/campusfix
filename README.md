# CFix
A Facility Reporting and Room Availability System for the NSTP Building.
Proposed BulSU CC102 frontend prototype.

## Run
Extract the ZIP, open the CFix folder in VS Code, and open index.html with Live Server.
Alternatively run `python -m http.server 8000` from the folder and visit http://localhost:8000.
No backend, installation or API keys are required. QR libraries are bundled. Inter fonts are bundled locally, so the typography works offline.

## Updated scope
- Student, Faculty and Administrator demo views.
- Room search and filters, class schedules and room details.
- QR generation and camera scanning with manual room-ID fallback.
- Temporary check-in and check-out, with expiry at the next class.
- Facility reports, optional photos, staff updates, notifications and feedback.
- Administrator room management, demo directory, announcements, analytics and activity logs.
- Local JSON backup export and restore.
- The booking feature has been removed from navigation, room details, forms, dashboard, seed data and availability rules. Legacy booking records are discarded on load or backup restore. Other local records remain.

## Design reference
The user-supplied screenshots guide this redesign: a deep maroon hero, cream surfaces, orange accents, heavy tightly spaced headings, a top navigation bar, and rounded form cards. Inter Regular, Bold and Black are bundled locally as a close visual font match. The precise reference font cannot be verified from screenshots alone. The CFix logo and content remain specific to the NSTP prototype.
The homepage includes a working room finder. Select building, floor, minimum seats and room type, then choose Find a room to apply filters to currently available rooms. Secondary pages are in the More navigation menu. Mobile layouts use a menu button. Room filters, status rules, QR lookup, facility reports and administration remain available.

## Demo limits
This is browser-local sample data, not verified NSTP room information. The role switcher is not authentication. Each browser holds separate records; there is no reliable multi-device synchronization or actual occupancy detection. Session expiry uses the device clock and is checked on startup and about every 15 seconds while open. Notifications stay in the app.
Camera access requires HTTPS or localhost, camera hardware and permission. A phone cannot access the laptop through a localhost link. Manual room lookup is available. Photo limits are 1 MB and JPG/PNG/WebP; production needs secure file validation and malware scanning.
Status order: maintenance/unavailable override, active class, active informal session, available. Only authorized university staff should establish actual room-use policy. Emergency concerns need direct contact with campus staff/security.
No production backend or secure login is included. The Word report and presentation from the earlier package have not been revised in this website-only update.

## Architecture
index.html: app shell. styles.css: responsive appearance. engine.js: pure room and timing rules. app.js: views and local persistence. vendor/: QR libraries.
A future FastAPI/PostgreSQL service must own authentication, permissions, class conflicts, shared records, time enforcement and auditable updates. The pure room rules can serve as domain specifications when replacing the local repository with an API adapter.

## Checks
Run `node tests.cjs`. Checks cover room priority, time boundaries, ignored legacy bookings, all ten page render functions and room detail output. Browser checks also verified the new finder filters, top navigation menu and check-in after the redesign. Physical camera testing and comprehensive device testing remain pending.

## Third-party libraries and AI disclosure
qrcode-generator 1.4.4: https://github.com/kazuhikoarase/qrcode-generator (MIT).
jsQR 1.4.0: https://github.com/cozmo/jsQR (Apache-2.0).
Upstream license headers are retained. AI assisted implementation and documentation. Group members must verify campus facts and complete acceptance testing.

Inter typeface: https://github.com/rsms/inter (SIL Open Font License, included in fonts/OFL.txt).
