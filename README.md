# Family Reunion RSVP & QR Check-In System

## Overview

A complete digital event management system built for managing **Family Reunion 2026** registrations, QR ticket generation, attendance verification, and real-time event operations.

This project evolved from a simple RSVP landing page into a full operational attendance platform capable of handling:

* online registrations
* QR ticket generation
* WhatsApp ticket dispatch
* live attendance tracking
* admin dashboard operations
* manual walk-in entries
* QR scanning & verification

The system is optimized for real-world event-day operations on both desktop and mobile devices.

---

# Core Features

## Public Website

### Landing Page

* Responsive modern UI
* Event introduction
* Reunion branding
* Countdown timer
* Smooth scrolling sections
* Mobile-first experience
* Animated presentation sections

---

## Registration System

Participants register through Google Forms integration.

Collected details:

* Name
* Family Name
* Place
* WhatsApp Number
* Total Members
* Male Count
* Female Count
* Kids Below 8
* Special Support Requirements

---

## Community / Family Wall

A public visual section showcasing:

* participating families
* reunion engagement
* community interaction before event day

---

# Operational Admin System

## Admin Dashboard

Centralized operational dashboard with:

### Features

* Live participant listing
* Search by:

  * family
  * participant
  * registration ID
* Attendance statistics
* QR delivery tracking
* Real-time syncing
* Manual check-in
* Manual participant entry
* Mobile responsive control center

---

## Real-Time Refresh

Dashboard auto-refreshes every 10 seconds to support:

* multiple volunteers
* concurrent check-ins
* live attendance visibility
* QR dispatch monitoring

---

## QR Ticket System

Every participant receives:

* unique registration ID
* QR-based entry ticket
* WhatsApp shareable ticket link

Example:

```text
FR2026-001
```

---

## QR Scanner System

Dedicated mobile-friendly check-in interface with:

* live QR scanning
* instant participant fetch
* attendance confirmation
* duplicate prevention
* check-in timestamp tracking

---

## Manual Check-In

Operational fallback system for:

* invalid phone numbers
* elderly attendees
* lost QR tickets
* walk-in confirmations
* technical failures

Admins can manually mark attendance directly from dashboard.

---

## Manual Entry System

Supports on-site registrations during event.

Features:

* instant QR generation
* live dashboard update
* attendance tracking
* walk-in participant handling

Keyboard shortcut:

```text
CTRL + M
```

opens manual entry modal instantly.

---

# Architecture

## Final System Architecture

```text
Google Form Responses
        ↓
Import / Normalization Script
        ↓
ParticipantsDB
        ↓
Apps Script API Backend
        ↓
React Frontend
```

---

# Data Architecture

## Raw Form Sheet

Used only for:

* original submissions
* audit trail
* backup preservation

Never modified directly by operations.

---

## ParticipantsDB

Operational database powering:

* admin dashboard
* QR system
* scanner
* attendance tracking
* manual entries

---

# Phone Number Validation System

The system automatically:

* removes spaces
* removes country code
* extracts first number
* handles malformed formatting
* validates Indian mobile numbers

Invalid numbers are flagged safely instead of guessed.

Example:

```text
INVALID_NUMBER
```

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Lucide Icons
* React Hot Toast

---

## Backend

* Google Apps Script
* Google Sheets API

---

## Database

* Google Sheets (ParticipantsDB)

---

## Deployment

* Vercel (Frontend)
* Google Apps Script Web App (Backend)

---

# Apps Script Responsibilities

Backend handles:

* participant fetching
* QR dispatch updates
* attendance updates
* manual entries
* ticket APIs
* participant lookup
* operational syncing

---

# API Flows

## Fetch All Participants

```text
GET /exec
```

---

## Fetch Single Participant

```text
GET /exec?id=FR2026-001
```

---

## Mark QR Sent

```text
GET /exec?sent=true&id=FR2026-001
```

---

## Confirm Check-In

```text
GET /exec?checkin=true&id=FR2026-001
```

---

## Add Manual Entry

```text
GET /exec?action=manualEntry
```

---

# Operational Features

## Duplicate Check-In Prevention

Already checked-in attendees cannot be checked in twice.

---

## QR Delivery Tracking

Tracks whether participant QR ticket has been dispatched.

---

## Attendance Timestamp Logging

Every successful check-in stores:

* date
* time

---

## Live Operational Sync

Dashboard continuously refreshes during event operations.

---

# Mobile Optimization

Optimized for:

* mobile QR scanning
* volunteer operations
* event-day handling
* low-width screens
* touch interactions

---

# Future Improvements

## Planned Enhancements

* analytics dashboard
* export attendance CSV
* volunteer roles
* family grouping analytics
* offline scan queue
* bulk WhatsApp integration
* live attendance charts
* badge printing support

---

# Lessons Learned

This project evolved significantly during development:

### Initial Stage

Simple RSVP website.

### Final Stage

Production-oriented operational attendance system.

Key engineering improvements included:

* separation of raw vs operational data
* normalization pipelines
* live operational syncing
* graceful failure handling
* operational redundancy
* mobile-first event tooling

---

# Important Operational Notes

## Never Use Raw Form Sheet Directly

Always use:

```text
ParticipantsDB
```

for operational features.

---

## Deployment Requirement

Apps Script changes require:

```text
Deploy → New Version
```

before frontend updates become live.

---

# Author

Built and engineered by Shifana K.

Designed for real-world family reunion event operations with focus on:

* operational simplicity
* reliability
* mobile usability
* event-day efficiency
