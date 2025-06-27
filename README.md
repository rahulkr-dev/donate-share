# 🎁 Community Donation Platform

A modern, full-stack donation platform built with Next.js 15, enabling community members to share and discover items available for donation. Connect generous donors with people who need them through an intuitive, beautiful interface.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-brightgreen)

## ✨ Features

### 🎯 Core Features
- **📱 Responsive Design** - Modern, mobile-first UI with dark/light mode support
- **🔐 Authentication** - Secure user authentication with session management
- **📸 Image Upload** - S3-powered image upload with drag-and-drop interface
- **🎨 Modern UI** - Beautiful interface built with shadcn/ui components
- **⚡ Real-time** - Fast, responsive experience with optimistic updates
- **🔍 Search & Filter** - Easy discovery of available donations

### 🎁 Donation Management
- **Post Donations** - Easy-to-use form for listing items
- **Image Gallery** - Multiple image support with thumbnail navigation
- **Categories** - Organized by item types (Clothing, Books, Electronics, etc.)
- **Location-based** - Local community focus
- **Status Tracking** - Track availability and donation status

### 👥 User Experience
- **Contact Donors** - Direct email/phone communication
- **Donation History** - Track your contributions
- **Profile Management** - User profiles with donation statistics
- **Mobile Responsive** - Seamless experience across all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database
- AWS S3 bucket (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd donation
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/donation_db"
   
   # Authentication
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_REGION="us-east-1"
   S3_BUCKET="your-bucket-name"
   ```

4. **Database Setup**
   ```bash
   # Generate and run migrations
   pnpm db:generate
   pnpm db:migrate
   
   # Optional: Seed with sample data
   pnpm db:seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend & Database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication solution

### Storage & State
- **[AWS S3](https://aws.amazon.com/s3/)** - Scalable image storage
- **[TanStack Query](https://tanstack.com/query)** - Powerful data fetching
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - Schema validation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

## 📁 Project Structure

```
donation/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── db/                   # Database configuration
│   ├── schema/           # Drizzle schema definitions
│   └── migrations/       # Database migrations
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🎨 Key Components

### Image Upload System
- **Drag & Drop Interface** - Intuitive file selection
- **Image Validation** - File type and size restrictions
- **S3 Integration** - Secure cloud storage with presigned URLs
- **Preview Gallery** - Real-time image previews
- **Upload Progress** - Visual feedback with retry functionality

### Authentication Flow
- **Secure Sessions** - JWT-based authentication
- **User Profiles** - Complete user management
- **Protected Routes** - Route-level security

### Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Dark/Light Mode** - System preference detection
- **Accessible** - WCAG compliant components

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build image
docker build -t donation-platform .

# Run container
docker run -p 3000:3000 donation-platform
```

### Manual Deployment
1. Build the application: `pnpm build`
2. Start the production server: `pnpm start`
3. Configure environment variables on your hosting platform

## 📚 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript checks
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication powered by [Better Auth](https://www.better-auth.com/)

---

Made with ❤️ for building stronger communities through sharing.
