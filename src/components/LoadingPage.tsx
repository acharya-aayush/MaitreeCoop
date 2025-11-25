import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50">
            <div className="text-center space-y-6">
                {/* Animated Logo Placeholder */}
                <div className="relative">
                    <div className="w-32 h-32 mx-auto">
                        {/* Outer spinning ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-green-200 border-t-green-600 animate-spin"></div>

                        {/* Inner pulsing circle */}
                        <div className="absolute inset-4 rounded-full bg-green-100 animate-pulse flex items-center justify-center">
                            <span className="text-3xl font-bold text-green-700">मैत्री</span>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        मैत्री बहुउद्देश्यीय सहकारी संस्था
                    </h2>
                    <p className="text-gray-600">Maitree Multipurpose Cooperative</p>
                </div>

                {/* Loading Indicator */}
                <div className="flex items-center justify-center space-x-2 text-green-600">
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span className="text-sm font-medium">Loading...</span>
                </div>

                {/* Progress Dots */}
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};
