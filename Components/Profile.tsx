"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  //   const [profileData, setProfileData] = useState({});

  //   setProfileData(profileData);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const session = await getSession();
  //     //   const profileId = params?.profileId;
  //     console.log(session?.user.id);
  //     let res = await fetch(`/api/profile`, {
  //       method: "GET",
  //     });
  //     let data = await res.json();
  //     console.log("profileData: " + JSON.stringify(data));
  //     console.log("test");
  //   };

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  //   return;
  // }, []);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  useEffect(() => {
    // console.log("session.data.user.id", useSession());
    if (session.data?.user?.id !== undefined) {
      fetch(`${baseUrl}/api/profile?profileId=${session.data?.user?.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          console.log(data);
        });
    }
  }, [session]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Log before fetch
  //       console.log("Attempting fetch...");

  //       const baseUrl =
  //         process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  //       const res = await fetch(`${baseUrl}/api/profile`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       // Log response status
  //       console.log("Response status:", res.status);

  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }

  //       const data = await res.json();
  //       console.log("Response data:", data);
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    //     <!--
    //   This example requires some changes to your config:

    //   ```
    //   // tailwind.config.js
    //   module.exports = {
    //     // ...
    //     plugins: [
    //       // ...
    //       require('@tailwindcss/forms'),
    //     ],
    //   }
    //   ```
    // -->
    // <!--
    //   This example requires updating your template:

    //   ```
    //   <html class="h-full bg-gray-900">
    //   <body class="h-full">
    //   ```
    // -->
    <div className="h-full bg-primary">
      {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
      <div className=" relative z-50 xl:hidden" role="dialog" aria-modal="true">
        {/*
Off-canvas menu backdrop, show/hide based on off-canvas menu state.

Entering: "transition-opacity ease-linear duration-300"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "transition-opacity ease-linear duration-300"
  From: "opacity-100"
  To: "opacity-0"
    */}
        <div className="fixed inset-0 flex">
          {/*
  Off-canvas menu, show/hide based on off-canvas menu state.

  Entering: "transition ease-in-out duration-300 transform"
    From: "-translate-x-full"
    To: "translate-x-0"
  Leaving: "transition ease-in-out duration-300 transform"
    From: "translate-x-0"
    To: "-translate-x-full"
*/}
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            {/*
    Close button, show/hide based on off-canvas menu state.

    Entering: "ease-in-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-300"
      From: "opacity-100"
      To: "opacity-0"
  */}
          </div>
        </div>
      </div>
      <div className="xl:pl-72">
        <main>
          <h1 className="sr-only">Account Settings</h1>
          <header className="border-b border-white/5"></header>
          {/* Settings forms */}
          <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                  Account Settings
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Update your account information and settings.
                </p>
              </div>
              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full flex items-center gap-x-8">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                    <div>
                      <button
                        type="button"
                        className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                      >
                        Change avatar
                      </button>
                      <p className="mt-2 text-xs leading-5 text-gray-400">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                          example.com/
                        </span>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="janesmith"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="timezone"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Timezone
                    </label>
                    <div className="mt-2">
                      <select
                        id="timezone"
                        name="timezone"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                      >
                        <option>Pacific Standard Time</option>
                        <option>Eastern Standard Time</option>
                        <option>Greenwich Mean Time</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                  Change password
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Update your password associated with your account.
                </p>
              </div>
              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Current password
                    </label>
                    <div className="mt-2">
                      <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      New password
                    </label>
                    <div className="mt-2">
                      <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Confirm password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                  Log out other sessions
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Please enter your password to confirm you would like to log
                  out of your other sessions across all of your devices.
                </p>
              </div>
              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="logout-password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Your password
                    </label>
                    <div className="mt-2">
                      <input
                        id="logout-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Log out other sessions
                  </button>
                </div>
              </form>
            </div>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                  Delete account
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  No longer want to use our service? You can delete your account
                  here. This action is not reversible. All information related
                  to this account will be deleted permanently.
                </p>
              </div>
              <form className="flex items-start md:col-span-2">
                <button
                  type="submit"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                >
                  Yes, delete my account
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
