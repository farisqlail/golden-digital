"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getResource } from "../../../utils/Fetch";
import { Typography } from "@material-tailwind/react";
import { NavbarDetail, Footer } from "@/components";

import LogoSection from "./partial/LogoSection"
import BenefitSection from "./partial/BenefitSection"
import SubscribeSection from "./partial/SubscribeSection"
import FAQSection from "./partial/FAQSection"

export default function Faq() {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResource("video-tutorial");
                setVideo(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <NavbarDetail />
            <section className="py-8 px-8 ">
                <div className="container mx-auto sm:mb-20 mb-0 text-center">
                    <Typography className="mb-2 font-bold uppercase text-white text-xl mb-8">
                        Video Support Golden Digital
                    </Typography>
                    <div className="w-full overflow-x-auto">
                        <div className="flex items-center gap-6 justify-start lg:justify-center">
                            {video.slice(0, 4).map((product) => (
                                <div key={product.id} className="w-full">
                                    {product.link_video ? (
                                        <iframe
                                            className="lg:w-full lg:h-[400px] h-[200px] rounded-lg"
                                            src={product.link_video.includes("shorts")
                                                ? product.link_video.replace("shorts/", "embed/")
                                                : product.link_video.replace("watch?v=", "embed/")}
                                            title={`Video ${product.id}`}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="lg:h-[400px] h-[200px] bg-gray-200 flex items-center justify-center rounded-lg">
                                            <Typography variant="h6" className="text-gray-500">
                                                No Video Available
                                            </Typography>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2 mt-2">
                                        <span className="text-white text-left">{product.name}</span>
                                        <small className="text-gray-600 text-left"> {product.account}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <LogoSection />
            <BenefitSection />
            <SubscribeSection />
            <FAQSection />
            <Footer />
        </>
    );
}  
