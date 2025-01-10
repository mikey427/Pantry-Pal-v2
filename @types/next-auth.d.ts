// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: Number;
//       name: String;
//       profilePic: String;
//       role: String;
//     } & DefaultSession["user"];
//   }
// }

import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: Role;
      name: string;
      email: string | null;
      profilePic: string | null;
      householdId: number | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    role: Role;
    profilePic: string | null;
    householdId: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: Role;
    profilePic: string | null;
    householdId: number | null;
  }
}
