// "use client";
// import { useEffect } from "react";
// import { getSession } from "next-auth/react";

// export default function Page() {
//   const handleClick = (): void => {
//     // TODO: Implement click handler logic
//     console.log("API TEST CALL");
//   };

//   useEffect(() => {
//     console.log(getSession());
//   });

//   return (
//     <div>
//       <button onClick={handleClick}>API TEST CALL</button>
//     </div>
//   );
// }

// model User {
//   id           Int            @id @default(autoincrement())
//   name         String
//   email        String         @unique
//   image        String?
//   role         Role           @default(USER)
//   createdAt    DateTime       @default(now())
//   updatedAt    DateTime       @updatedAt
//   householdId  Int
//   household    Household      @relation(fields: [householdId], references: [id])
//   profile      Profile?
//   ShoppingList ShoppingList[]
// }

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function user() {
//   const newUser = await prisma.user.create({
//     data: {
//       name: "Elliott",
//       email: "xelliottx@example-user.com",
//     //   image: "https://example.com/image.png",
//       householdId:

//     },
//   });

//   const users = await prisma.user.findMany();

//   return users;
// }
