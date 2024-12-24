"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Navbar, Footer } from "@/components";

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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const logout = () => {
        localStorage.removeItem("authToken");
        router.push("/")
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex justify-center gap-6 pt-11">
                {/* Sidebar */}
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 max-w-sm w-full h-full">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="9" r="3" stroke="#f59e0b" stroke-width="1.5" /> <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" /> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" /> </g>

                            </svg>
                        </div>
                        <span>Profile</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                <g id="SVGRepo_iconCarrier"> <path d="M9 11H15M9 7H13M9 15H15M5 6.2V21L7.5 19L10 21L12 19L14 21L16.5 19L19 21V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2Z" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

                            </svg>
                        </div>
                        <span>Pesanan</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
                        <div>
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                <g id="SVGRepo_iconCarrier"> <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" /> </g>

                            </svg>
                        </div>
                        <span>Keluar</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-md p-4 max-w-4xl w-full h-full">
                    <div className="flex justify-between gap-6">
                        {/* Avatar */}
                        <div className="rounded-full border-2 p-4 max-h-fit">
                            <svg
                                width="32px"
                                height="32px"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                                    fill="#000000"
                                />
                                <path
                                    d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                                    fill="#000000"
                                />
                            </svg>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <span>Nama Lengkap</span>
                            <span>{profileData.data.name || "-"}</span>
                            <span>No Whatsapp</span>
                            <span>{profileData.data.number || "-"}</span>
                            <span>Email</span>
                            <span>{profileData.data.email || "-"}</span>
                            <span>Point</span>
                            <span>{profileData.data.point || "-"}</span>
                        </div>

                        {/* Icon */}
                        <div>
                            <svg
                                width="32px"
                                height="32px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
