import type {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../lib/db";
import {
  calendarData as plannedMealStarterObject,
  shoppingList as shoppingListStarterObject,
  ingredients as ingredientsStarterObject,
  savedMeals as savedMealsStarterObject,
  getMonthName,
} from "@/lib/utils";
import { startingPlannedMeals } from "@/@types/types";
import { useReducer } from "react";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        //Where you would check the DB to see if user exists in a DB
        const user = { id: 1, name: "test", email: "testEmail@gmail.com" };
        // if (credentials?.password && typeof credentials?.password == "string") {
        //   const hashedPassword = bcrypt.hash(
        //     credentials?.password,
        //     10,
        //     function (err, hash) {
        //       if (err) {
        //         console.log(err);
        //       }
        //       return hash;
        //     }
        //   );

        //   const existingUser = await db.user.findUnique({
        //     where: {
        //       email: credentials?.email,
        //       password: credentials?.password,
        //     },
        //   });
        // }

        if (
          credentials?.email === "test@test.com" &&
          credentials?.password === "test"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user, account, profile, email, credentials);
      // console.log("user ", user);
      // console.log("account ", account);
      // console.log("profile ", profile);
      // console.log("email ", email);
      // console.log("credentials ", credentials);
      const isAllowedToSignIn = true;
      if (user.email !== null) {
        const existingUser = await db.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!existingUser) {
          const transaction = await db.$transaction(async (db) => {
            const newUser = await db.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                image: user.image ?? "",
                profile: {
                  create: {
                    bio: "",
                  },
                },
              },
            });

            const updateNewProfile = await db.profile.update({
              where: {
                id: newUser.id,
              },
              data: {
                user: {
                  connect: {
                    id: newUser.id,
                  },
                },
              },
            });

            const newHousehold = await db.household.create({
              data: {
                name: "Household",
                members: {
                  connect: {
                    id: newUser.id,
                  },
                },
              },
            });

            const newSavedMeals = await db.savedMeal.create({
              data: {
                name: "Starter Meal",
                ingredients: ["Ketchup", "Mustard"],
                household: {
                  connect: {
                    id: newHousehold.id,
                  },
                },
              },
            });

            const newShoppingList = await db.shoppingList.create({
              data: {
                data: shoppingListStarterObject,
                user: {
                  connect: {
                    id: newUser.id,
                  },
                },
                household: {
                  connect: {
                    id: newHousehold.id,
                  },
                },
              },
            });
            const currDate = new Date();
            const newHouseholdPlannedMeals = await db.plannedMeal.create({
              data: {
                householdId: newHousehold.id,
                data: plannedMealStarterObject,
                month: getMonthName(currDate.getMonth()),
                year: currDate.getFullYear(),
              },
            });
          });
        }
      }

      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: async ({
      token,
      user,
      account,
      profile,
    }: {
      token: JWT;
      user?: User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
    }) => {
      // console.log(user);
      // if (user?.email !== null) {
      //   const dbUser = await db.user.findUnique({
      //     where: { email: user.email },
      //   });
      //   if (dbUser) {
      //     const newToken = {
      //       ...token,
      //       id: dbUser.id,
      //       role: dbUser.role,
      //       name: dbUser.name,
      //       email: dbUser.email,
      //       profilePic: dbUser.image,
      //       householdId: dbUser.householdId,
      //     };
      //     return newToken;
      //   }
      // }

      // // Always return the token
      // return token;
      try {
        // Only do this lookup when user signs in
        if (user) {
          const dbUser = await db.user.findUnique({
            where: { email: user.email },
            select: {
              id: true,
              role: true,
              name: true,
              email: true,
              image: true,
              householdId: true,
            },
          });

          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.profilePic = dbUser.image;
            token.householdId = dbUser.householdId;
          }
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },

    session: async ({ session, token }: { session: Session; token: JWT }) => {
      try {
        if (token && session.user) {
          session.user.id = token.id;
          session.user.role = token.role;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.profilePic = token.profilePic;
          session.user.householdId = token.householdId;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
};
