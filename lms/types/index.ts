// Component Props Types
export interface OptionItem {
  id: number;
  name: string;
  link: string;
  color: string;
  img: string;
}

export interface OptionCardProps {
  item: OptionItem;
}

export interface OptionCardLProps {
  name: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  stats?: {
    Credits?: number;
    Modules?: number;
  };
}

// Global type augmentation for MongoDB client promise
declare global {
  var _mongoClientPromise: Promise<import('mongodb').MongoClient> | undefined;
}

// NextAuth type augmentation
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
      hasAdminRecord?: boolean;
      hasStudentRecord?: boolean;
    };
  }

  interface User {
    id?: string;
    isAdmin?: boolean;
    loginType?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    hasAdminRecord?: boolean;
    hasStudentRecord?: boolean;
  }
}

export {};
