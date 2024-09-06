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



import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function prismaExample() {
  const newUser = await prisma.user.create({
    data: {
      name: "Elliott",
      email: "xelliottx@example-user.com",
      image: "https://example.com/image.png",
    },
  });

  const users = await prisma.user.findMany();

  return users;
}
