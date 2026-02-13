# 🎓 Learning Management System (LMS)

A modern, full-featured Learning Management System built with Next.js, NextAuth, and Supabase.

## ✨ Features

- **Student Portal**
  - Google OAuth authentication
  - Interactive timetable with real-time updates
  - Leave application system
  - Anonymous feedback submission
  - Quiz progress tracking
  - Course module access

- **Admin Dashboard**
  - User management (students & admins)
  - Timetable editor
  - Leave application review
  - Student progress monitoring
  - Feedback viewing
  - Bulk student seeding

## 🗄️ Database

This application uses **Supabase (PostgreSQL)** for data storage.

### Quick Setup

1. **Create Supabase Project**
   - Visit [https://supabase.com](https://supabase.com)
   - Create a new project
   - Run the SQL schema from `supabase-schema.sql`

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXTAUTH_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Student Portal: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/pages/adminLogin](http://localhost:3000/pages/adminLogin)
   - Default Admin: `admin@ggu.edu.in` / `admin123`

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Step-by-step setup guide
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Detailed migration documentation
- **[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)** - Technical migration details
- **[supabase-schema.sql](./supabase-schema.sql)** - Database schema

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, TailwindCSS
- **Authentication:** NextAuth.js with Google OAuth
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel-ready

## 🔐 Default Credentials

**Admin Account:**
- Email: `admin@ggu.edu.in`
- Password: `admin123`

⚠️ **Change this password in production!**

## 📦 Project Structure

```
lms/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth configuration
│   │   ├── users/        # User management
│   │   ├── timetable/    # Timetable management
│   │   ├── leaves/       # Leave applications
│   │   ├── feedback/     # Feedback system
│   │   ├── progress/     # Quiz progress
│   │   └── modules/      # Course modules
│   ├── pages/            # Application pages
│   │   ├── adminDashboard/
│   │   ├── studentDashboard/
│   │   ├── login/
│   │   └── ...
│   └── components/       # Reusable components
├── lib/
│   ├── db.ts            # Supabase client
│   └── schema.ts        # Type definitions
├── scripts/             # Utility scripts
└── public/              # Static assets
```

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables (Production)

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🧪 Testing

After setup, test these features:
- [ ] Google OAuth login
- [ ] Admin credentials login
- [ ] Timetable display
- [ ] Leave application submission
- [ ] Feedback submission
- [ ] Admin user management
- [ ] Admin timetable editing

## 📝 Migration from MongoDB

This project was migrated from MongoDB to Supabase. See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues or questions:
- Check [QUICK_START.md](./QUICK_START.md) for setup help
- Review [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for database info
- Consult [Supabase Documentation](https://supabase.com/docs)

---

Built with ❤️ using Next.js and Supabase
