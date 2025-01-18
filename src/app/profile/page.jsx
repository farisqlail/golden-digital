"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarDetail, Footer } from "@/components";
import { getResourceWithToken } from "../../../utils/Fetch";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        router.push("/login");
        return;
      }

      try {
        const data = await getResourceWithToken("profile", authToken);
        setProfileData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  const logout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  const historyTransaction = () => {
    router.push("/profile/history")
  }

  const comingSoon = () => {
    router.push("/comingsoon")
  }

  return (
    <>
      <NavbarDetail />
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center gap-6 p-4 md:p-8">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 w-full md:max-w-sm">
          <div className="flex items-center gap-2 cursor-pointer">
            <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm md:text-base">Profile</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={historyTransaction}>
            <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 11H15M9 7H13M9 15H15M5 6.2V21L7.5 19L10 21L12 19L14 21L16.5 19L19 21V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm md:text-base">Pesanan</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={comingSoon}>
            <svg className="w-7 h-7 text-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.87617 3.75H19.1238L21 8.86683V10.5C21 11.2516 20.7177 11.9465 20.25 12.4667V21H3.75V12.4667C3.28234 11.9465 3 11.2516 3 10.5V8.86683L4.87617 3.75ZM18.1875 13.3929C18.3807 13.3929 18.5688 13.3731 18.75 13.3355V19.5H15V15H9L9 19.5H5.25V13.3355C5.43122 13.3731 5.61926 13.3929 5.8125 13.3929C6.63629 13.3929 7.36559 13.0334 7.875 12.4667C8.38441 13.0334 9.11371 13.3929 9.9375 13.3929C10.7613 13.3929 11.4906 13.0334 12 12.4667C12.5094 13.0334 13.2387 13.3929 14.0625 13.3929C14.8863 13.3929 15.6156 13.0334 16.125 12.4667C16.6344 13.0334 17.3637 13.3929 18.1875 13.3929ZM10.5 19.5H13.5V16.5H10.5L10.5 19.5ZM19.5 9.75V10.5C19.5 11.2965 18.8856 11.8929 18.1875 11.8929C17.4894 11.8929 16.875 11.2965 16.875 10.5V9.75H19.5ZM19.1762 8.25L18.0762 5.25H5.92383L4.82383 8.25H19.1762ZM4.5 9.75V10.5C4.5 11.2965 5.11439 11.8929 5.8125 11.8929C6.51061 11.8929 7.125 11.2965 7.125 10.5V9.75H4.5ZM8.625 9.75V10.5C8.625 11.2965 9.23939 11.8929 9.9375 11.8929C10.6356 11.8929 11.25 11.2965 11.25 10.5V9.75H8.625ZM12.75 9.75V10.5C12.75 11.2965 13.3644 11.8929 14.0625 11.8929C14.7606 11.8929 15.375 11.2965 15.375 10.5V9.75H12.75Z" stroke="currentColor" strokeWidth="0.9"
                strokeLinecap="round" />
            </svg>
            <span className="text-sm md:text-base">Reseller</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
            <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm md:text-base">Keluar</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-4 w-full md:max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="rounded-full border-2 p-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                  fill="currentColor"
                />
                <path
                  d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <span className="font-semibold">Nama Lengkap:</span>
              <span>{profileData.data.name || "-"}</span>
              <span className="font-semibold">No Whatsapp:</span>
              <span>{profileData.data.number || "-"}</span>
              <span className="font-semibold">Email:</span>
              <span>{profileData.data.email || "-"}</span>
              <span className="font-semibold">Point:</span>
              <span>{profileData.data.point || "-"}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
