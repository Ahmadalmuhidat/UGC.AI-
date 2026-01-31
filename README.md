# UGC.AI

An advanced AI-powered platform designed to transform static product photos into high-converting User-Generated Content (UGC) videos using Google's Gemini models.

![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-blue?style=for-the-badge&logo=google-cloud)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%204-06B6D4?style=for-the-badge&logo=tailwindcss)

## Features

- **Model & Product Sync**: Upload a product image and a model photo; our AI seamlessly blends them into a realistic, ecommerce-quality scene.
- **AI Video Generation**: Convert static images into dynamic, professional-looking video ads with studio-quality transitions.
- **Credits System**: Integrated usage-based economy managed through Clerk webhooks and Stripe/Billing integration.
- **Premium UI/UX**: Modern, responsive interface built with Tailwind CSS 4, Framer Motion animations, and Lenis smooth scrolling.
- **User Dashboard**: Manage your previous generations, track credits, and view results.

## Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **State/Navigation**: [React Router 7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Server**: [Express 5](https://expressjs.com/)
- **Database**: [PostgreSQL (Neon)](https://neon.tech/) with [Prisma ORM](https://www.prisma.io/)
- **AI Services**: [Google Gemini Pro Vision & Veo](https://ai.google.dev/gemini-api/docs)
- **File Storage**: [Cloudinary](https://cloudinary.com/) (Images & Videos)
- **Middleware**: Clerk Express Middleware, Multer (File uploads)

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- Clerk, Cloudinary, and Google Cloud API accounts

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd Ads-Video-Generator

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../fontend
npm install
```

### 2. Environment Setup
Create a `.env` file in both directories:

**Backend (`/backend/.env`):**
```env
PORT=3000
DATABASE_URL=your_postgresql_url
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
CLERK_WEBHOOK_SIGNING_SECRET=your_secret
CLOUDINARY_URL=your_cloudinary_url
GOOGLE_CLOUD_API_KEY=your_gemini_key
```

**Frontend (`/fontend/.env`):**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_key
VITE_API_BASE_URL=http://localhost:3000
```

### 3. Database Migration
```bash
cd backend
npx prisma migrate dev
```

### 4. Run the Project
```bash
# Start Backend (from backend directory)
npm run start

# Start Frontend (from fontend directory)
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

