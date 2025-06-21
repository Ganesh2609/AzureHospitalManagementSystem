# Healthcare Management System (HMS)

A comprehensive healthcare management platform built with modern web technologies, designed to streamline healthcare operations for patients, doctors, nurses, and administrators.

## 🏥 Overview

The Healthcare Management System is a full-stack web application that facilitates seamless healthcare operations through role-based access control. The system supports four distinct user roles, each with tailored interfaces and functionalities to optimize healthcare delivery and management.

## 🏗️ System Architecture

### Backend Architecture
The system employs a robust Node.js/Express.js backend with PostgreSQL database integration, featuring:

- **RESTful API Design**: Clean, stateless API endpoints for all system operations
- **Role-Based Authentication**: Secure authentication system with bcrypt password hashing
- **Database Relations**: Normalized PostgreSQL schema with proper foreign key relationships
- **Azure AI Integration**: Advanced sentiment analysis for patient feedback using Azure Cognitive Services
- **File Upload Management**: Secure document handling with Multer middleware

### Frontend Architecture
Built with React 18 and TypeScript, featuring:

- **Component-Based Architecture**: Modular, reusable UI components
- **State Management**: React hooks for efficient state handling
- **UI Framework Integration**: NextUI and Tailwind CSS for modern, responsive design
- **Real-time Updates**: Polling mechanisms for live data synchronization
- **Advanced Animations**: Framer Motion for smooth user interactions

## 🚀 Key Features

### Multi-Role Dashboard System
- **Patient Portal**: Appointment booking, medical history, review system
- **Doctor Interface**: Patient management, appointment scheduling, treatment records
- **Nurse Dashboard**: Appointment approval workflow, patient coordination
- **Admin Panel**: User management, system oversight, analytics

### Intelligent Appointment Management
- **Dynamic Slot Generation**: Real-time availability calculation based on doctor schedules
- **Conflict Prevention**: Automated validation to prevent double-booking
- **Multi-step Approval**: Nurse-mediated appointment approval process
- **Cancellation System**: Comprehensive cancellation with reason tracking

### Advanced Patient Care Features
- **Sentiment Analysis**: AI-powered patient feedback analysis using Azure Cognitive Services
- **Treatment History**: Comprehensive medical record management
- **Billing Integration**: Automated billing generation with treatment itemization
- **Review System**: Star-rated feedback with sentiment classification

### Real-time Communication
- **Notification System**: Database-driven notification management
- **Status Updates**: Live appointment status tracking
- **Automated Alerts**: System-generated notifications for key events

## 📁 Project Structure

```
healthcare-management-system/
├── server/                          # Backend Node.js application
│   ├── server.js                   # Main server file with Express setup
│   ├── package.json                # Backend dependencies
│   └── uploads/                    # File upload directory
├── websitev1/                      # Frontend React application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   │   ├── aceternity/        # Advanced animation components
│   │   │   └── forms/             # Form components
│   │   ├── pages/                 # Page components by role
│   │   │   ├── admin/             # Administrator interface
│   │   │   ├── doctors/           # Doctor dashboard
│   │   │   ├── nurses/            # Nurse interface
│   │   │   └── patients/          # Patient portal
│   │   ├── lib/                   # Utility functions and API actions
│   │   │   ├── actions/           # API interaction functions
│   │   │   ├── utils.ts           # Helper utilities
│   │   │   └── validation.ts      # Form validation schemas
│   │   ├── types/                 # TypeScript type definitions
│   │   └── hooks/                 # Custom React hooks
│   ├── public/                    # Static assets
│   └── package.json               # Frontend dependencies
└── README.md                      # Project documentation
```

## 🛠️ Technology Stack

### Backend Technologies
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with normalized schema design
- **Authentication**: bcrypt for password hashing, JWT-based sessions
- **AI Services**: Azure Cognitive Services for text analytics
- **File Handling**: Multer for secure file uploads
- **API Design**: RESTful architecture with comprehensive error handling

### Frontend Technologies
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with NextUI component library
- **Animations**: Framer Motion for advanced animations
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: Internationalized date picker components
- **Icons**: Lucide React and Tabler Icons

### Development Tools
- **Code Quality**: ESLint with TypeScript support
- **Type Checking**: TypeScript with strict configuration
- **Package Management**: npm with workspace support
- **Development Server**: Vite dev server with HMR

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- Azure Cognitive Services account (for sentiment analysis)

### Database Setup
1. Create a PostgreSQL database
2. Set up the required tables with proper relationships:
   - Users, Patients, Doctors, Nurses
   - Appointments, Appointment Requests, Slots
   - Notifications, Reviews, Billing
   - Specializations and related lookup tables

### Backend Configuration
```bash
cd server
npm install
```

Create a `.env` file with:
```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=healthcare_db
DB_PASSWORD=your_db_password
DB_PORT=5432
AZURE_ENDPOINT=your_azure_endpoint
AZURE_API_KEY=your_azure_api_key
```

Start the backend server:
```bash
npm run dev
```

### Frontend Configuration
```bash
cd websitev1
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **Input Validation**: Comprehensive server-side validation
- **File Upload Security**: Restricted file types and size limits
- **SQL Injection Prevention**: Parameterized queries
- **Role-Based Access**: Endpoint protection based on user roles

## 🎯 Core Functionalities

### Patient Management
- Secure registration with document upload
- Medical history tracking
- Appointment booking with real-time availability
- Review and rating system with sentiment analysis

### Healthcare Provider Tools
- Comprehensive patient dashboards
- Treatment planning and documentation
- Billing management with itemized procedures
- Performance analytics through review sentiment

### Administrative Controls
- User role management
- System monitoring and analytics
- Doctor and nurse registration
- Specialization management

## 🚀 Deployment Considerations

- **Environment Variables**: Secure configuration management
- **Database Migrations**: Structured schema updates
- **File Storage**: Secure document handling in production
- **API Rate Limiting**: Protection against abuse
- **Error Monitoring**: Comprehensive logging system

## 🔄 API Integration

The system provides RESTful APIs for:
- User authentication and authorization
- Appointment CRUD operations
- Real-time availability checking
- Notification management
- File upload and retrieval
- Sentiment analysis integration

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS, ensuring optimal user experience across all devices and screen sizes.

## 🎨 User Experience

- **Intuitive Navigation**: Role-based navigation with clear visual hierarchy
- **Real-time Feedback**: Live updates and notifications
- **Accessibility**: ARIA-compliant components and keyboard navigation
- **Performance**: Optimized rendering with React best practices