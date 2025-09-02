"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarDetail, Footer } from "@/components";
import { getResourceWithToken } from "../../../utils/Fetch";
import { LogOut, Receipt, Store, TicketPercent, User } from "lucide-react";
import Sidebar from "@/components/Sidebar";

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

  return (
    <>
      <NavbarDetail />
      <div className="min-h-screen flex flex-col md:flex-row justify-center gap-6 p-4 md:p-8">
        <Sidebar
        />

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-4 w-full md:max-w-4xl h-fit">
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
