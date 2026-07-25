# CRUD_API
# Express Task API

A lightweight, in-memory CRUD (Create, Read, Update, Delete) API built with Node.js and Express, fully documented using Swagger UI.

---

## 📌 Features

* **Full CRUD Operations**: Create, read, update, and delete tasks.
* **Input Validation**: Rejects empty inputs with standard `400 Bad Request` responses.
* **RESTful HTTP Status Codes**:
  * `200 OK` — Standard success for reads/updates
  * `201 Created` — Successful resource creation
  * `204 No Content` — Successful deletion
  * `400 Bad Request` — Missing or invalid payload
  * `404 Not Found` — Task ID does not exist
* **Interactive Documentation**: Built-in Swagger UI generated via `swagger-jsdoc` at `/docs`.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v14+ recommended)
* `npm` (comes bundled with Node.js)

### Installation

1. Clone or download this repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd YOUR_REPO_NAME
