# 💎 Welth — AI-Powered Financial Intelligence Platform

Welth is a modern, high-performance financial management platform designed to help users track transactions, manage budgets, scan receipts with AI, and get real-time financial insights. Built with a premium dark-themed UI, fluid animations, and robust security integrations.

---

## 🚀 Key Features

*   **Multi-Account Tracking**: Manage multiple bank, savings, and investment accounts in one unified dashboard.
*   **AI Receipt Scanner**: Scan receipts via camera or image uploads using Google Gemini AI to auto-extract transaction amounts, dates, categories, and descriptions.
*   **Interactive Visualizations**: Interactive monthly expense breakdown pie charts and transaction history bar charts powered by Recharts.
*   **Intelligent Budgeting**: Set monthly budgets, track spending velocity, and receive smart progress alerts (On Track, High, Critical).
*   **Recurring Transactions**: Automatically schedule transaction intervals (Daily, Weekly, Monthly, Yearly) via background cron jobs.
*   **Premium UX/UI**: Beautiful glassmorphic components, glowing accents, smooth Lenis inertia scrolling, and responsive layouts.
*   **Ironclad Security**: Automated rate limiting, bot protection, and API shielding powered by Arcjet.

---

## 🛠️ Tech Stack

*   **Frontend**: Next.js 15+ (App Router with Turbopack), React 19, Tailwind CSS v4, shadcn/ui components, Lucide icons
*   **Database & ORM**: PostgreSQL database, Prisma ORM
*   **Authentication**: Clerk Auth (Secure login, signup, user profiles)
*   **AI & Machine Learning**: Google Gemini AI (`@google/generative-ai`)
*   **Orchestration & Jobs**: Inngest (Background cron jobs and event streams)
*   **Security Suite**: Arcjet (Rate limiting, email verification, bot shield)
*   **Mailing Service**: Resend & React Email templates
*   **Smooth Scrolling**: Lenis

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/H-vishwa/WelthAi-Finance-Platform.git
cd WelthAi-Finance-Platform/my-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the `my-app` directory and fill in your keys:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"
DIRECT_URL="your-postgresql-direct-connection-string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_pub_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# AI Core
GEMINI_API_KEY="your_gemini_api_key"

# Security (Arcjet)
ARCJET_KEY="your_arcjet_key"

# Background Jobs (Inngest)
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"

# Email Notifications (Resend)
RESEND_API_KEY="your_resend_api_key"
```

### 4. Database Setup & Migrations
Synchronize your schema with your database and generate the Prisma Client:
```bash
# Push schema to DB
npx prisma db push

# Generate client
npx prisma generate
```

### 5. Running the Application

To run the Next.js dev server:
```bash
npm run dev
```

To run the Inngest Development Server for managing background queues/cron jobs:
```bash
npx inngest-cli dev
```

The application will be running on `http://localhost:3000`.

---

## 📁 Project Structure

```text
my-app/
├── actions/             # Server Actions (Budgets, Accounts, Transactions)
├── app/                 # Next.js App Router Pages & Layouts
│   ├── (main)/          # Main platform views (Dashboard, Accounts, Transactions)
│   └── globals.css      # Core Design System & Styling
├── components/          # Reusable UI components (Header, Smooth Scroll, Drawers)
├── data/                # Static categories & landing page structures
├── emails/              # React Email design templates
├── hooks/               # Custom hooks (scroll reveal, useFetch)
├── lib/                 # Shared client configurations (Prisma, Clerk, Arcjet)
└── prisma/              # Schema definition & seed scripts
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🛡️ License

Distributed under the [MIT License](LICENSE).

---

**Made with 💡 by [H-vishwa](https://github.com/H-vishwa) and contributors**
