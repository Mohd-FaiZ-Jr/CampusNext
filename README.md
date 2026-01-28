# 🏠 Student Housing App

A modern web application built with Next.js that helps students find and book housing accommodations near their universities. Features include property listings, real-time chat, booking management, and admin dashboard.

## ✨ Features

- 🔍 **Property Search & Filters** - Browse properties by college, price, gender preference, and amenities
- 🗺️ **Interactive Maps** - View property locations with Leaflet integration
- 💬 **Real-time Chat** - Communicate with landlords via Socket.IO
- 📅 **Booking System** - Request bookings and manage reservations
- 👤 **User Roles** - Separate dashboards for students, landlords, and admins
- 🖼️ **Image Upload** - Cloudinary integration for property images
- 🔐 **Authentication** - Secure JWT-based authentication

## 🚀 Deployment on Render

### Prerequisites

1. **MongoDB Database** - Get a free MongoDB Atlas cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Cloudinary Account** - Sign up at [cloudinary.com](https://cloudinary.com) for image hosting
3. **GitHub Repository** - Push your code to GitHub

### Deployment Steps

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Settings:**
   - **Name**: `student-housing-app` (or your choice)
   - **Language**: Node
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables:**

   Click "Add Environment Variable" and add these:

   | Key                     | Value                                                            |
   | ----------------------- | ---------------------------------------------------------------- |
   | `MONGODB_URI`           | Your MongoDB connection string                                   |
   | `JWT_SECRET`            | Any random secure string (e.g., `my-super-secret-jwt-key-12345`) |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name                                       |
   | `CLOUDINARY_API_KEY`    | Your Cloudinary API key                                          |
   | `CLOUDINARY_API_SECRET` | Your Cloudinary API secret                                       |

5. **Select Instance Type**: Choose "Free" tier

6. **Click "Deploy Web Service"** and wait for deployment to complete!

## 💻 Local Development

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/StudentHousingApp.git
cd StudentHousingApp

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory (use `.env.example` as reference):

```env
MONGODB_URI=mongodb://localhost:27017/studenthousing
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Seed Database (Optional)

```bash
# Create admin user
node scripts/create-admin.mjs

# Seed sample properties
node scripts/seed-properties.mjs
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Express.js, MongoDB, Mongoose
- **Real-time**: Socket.IO
- **Authentication**: JWT, bcryptjs
- **Maps**: Leaflet, Maplibre GL
- **Image Upload**: Cloudinary, Multer

## 📁 Project Structure

```
StudentHousingApp/
├── app/
│   ├── api/              # API routes
│   ├── backend/          # Backend models and utilities
│   ├── components/       # React components
│   ├── admin/           # Admin dashboard
│   ├── landlord/        # Landlord dashboard
│   └── explore/         # Property browsing
├── scripts/             # Database seeding scripts
├── public/              # Static assets
└── server.js           # Custom server with Socket.IO
```

## 🔒 Environment Variables

See `.env.example` for all required environment variables.

## 📝 License

This project is private and for educational purposes.
