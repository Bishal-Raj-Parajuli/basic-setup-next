import db from "@/database/drizzle";
import { users } from "@/database/schema";
import React from "react";

const page = async () => {
  const user = await db.select().from(users);
  console.log(user);
  return (
    <section className="flex flex-col h-[calc(100vh-4rem)] justify-center items-center space-y-8">
      <h3 className="text-3xl font-bold">Hello World 👋</h3>
      <div>
        <p>This is a minimal basic next app for building projects.</p>
      </div>
    </section>
  );
};

export default page;
