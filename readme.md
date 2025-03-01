# Property Booking System - Test-Driven Development (TDD)

## 📌 Description
This project implements a **Test-Driven Development (TDD)** approach for a property booking system. It includes unit and integration/E2E tests to ensure correct functionality for mappers, user and property creation, refund policies, and booking cancellation services.

## 🛠 Technologies Used
- **Node.js** - Runtime environment
- **TypeScript** - Main programming language
- **Express** - Web framework for REST API
- **TypeORM** - ORM for database interaction
- **Jest** - Testing framework
- **Supertest** - For E2E route testing

---

## 🚀 Installation

### 1️⃣ Clone the repository:
```bash
 git clone https://github.com/jeansouzak/fc4-tdd.git
 cd fc4-tdd
```

### 2️⃣ Install dependencies:
```bash
yarn install
```

---

## 📌 Running Tests
This project contains **unit and integration/E2E tests**. You can run all tests or specific parts of the system.

### 🔹 Run All Tests
```bash
yarn test
```

### 🔹 Run Unit Tests for Mappers
```bash
yarn test src/infrastructure/persistence/mappers/property_mapper.test.ts
yarn test src/infrastructure/persistence/mappers/booking_mapper.test.ts
```

### 🔹 Run E2E Tests for User Creation
```bash
yarn test src/infrastructure/web/user_controller_e2e.test.ts
```

### 🔹 Run E2E Tests for Property Creation
```bash
yarn test src/infrastructure/web/property_controller_e2e.test.ts
```

### 🔹 Run Tests for Refund Policies (RefundRuleFactory)
```bash
yarn test src/domain/cancelation/refund_rule_factory.test.ts
```

### 🔹 Run Tests for Booking Cancellation
```bash
yarn test src/application/services/booking_service.test.ts
```

