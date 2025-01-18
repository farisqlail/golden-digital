import React from 'react';
import Image from 'next/image';

const ComingSoon = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-800">Coming Soon</h1>
                <p className="mt-4 text-lg text-gray-600">Kami sedang mengembangkan sesuati yang luar biasa!</p>
                <div className="mt-6 mb-4 flex justify-center">
                    <Image
                        width={1024}
                        height={800}
                        alt="subscribe image"
                        src={`/image/coming-soon.png`}
                        className="h-full rounded-lg w-2/4"
                    />
                </div>
                <div className="mt-8">
                    <p className="text-gray-500">Tetap ikuti perkembangan kami!</p>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;  
