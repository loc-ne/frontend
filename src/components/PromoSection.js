import React from 'react';

const PromoSection = () => {
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-11 items-center p-11 border border-gray-300 rounded-xl">
                    <div className="box max-w-md w-full">
                        <div className="flex items-center justify-center gap-[5px]">
                            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.515625 4.65059C0.515625 2.47532 2.27903 0.711914 4.4543 0.711914H18.686H18.8464V0.712999C25.187 0.798821 30.3005 5.96544 30.3005 12.3264C30.3005 18.7409 25.1005 23.9409 18.686 23.9409C16.3991 23.9409 14.2666 23.2799 12.469 22.1386L6.12226 28.3507C4.034 30.3946 0.515625 28.9151 0.515625 25.993V4.65059ZM10.3185 20.3812C8.30788 18.2931 7.07156 15.4541 7.07156 12.3264C7.07156 11.5642 7.68944 10.9463 8.45163 10.9463C9.21383 10.9463 9.8317 11.5642 9.8317 12.3264C9.8317 17.2165 13.7959 21.1807 18.686 21.1807C23.5762 21.1807 27.5404 17.2165 27.5404 12.3264C27.5404 7.43628 23.5762 3.47206 18.686 3.47206H4.4543C3.80342 3.47206 3.27577 3.9997 3.27577 4.65059V25.993C3.27577 26.4703 3.85048 26.712 4.19159 26.3781L10.3185 20.3812ZM21.4043 11.014C21.9517 11.5444 21.9656 12.4181 21.4353 12.9655L16.478 18.0827C15.9477 18.6301 15.074 18.644 14.5265 18.1137C13.9791 17.5834 13.9652 16.7097 14.4955 16.1622L19.4528 11.045C19.9832 10.4976 20.8569 10.4837 21.4043 11.014Z"
                                    fill="url(#paint0_linear_8787_64324)" />
                                <defs>
                                    <linearGradient id="paint0_linear_8787_64324" x1="15.4081" y1="0.711914" x2="15.4081"
                                        y2="29.2986" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#6936F5" />
                                        <stop offset="1" stop-color="#5551FF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span
                                className="font-manrope font-bold text-xl leading-normal tracking-[-0.209px] text-gray-900">KANGYOO</span>
                        </div>
                        <p className="mt-3 text-center font-normal text-xl leading-8 text-black">Lowest Prices Best Quality
                            Shoppings</p>
                    </div>

                    <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-5 gap-y-6 xl:gap-14 w-full max-lg:max-w-xl">
                        <div className="box flex flex-col items-center">
                            <button
                                className="p-5 rounded-full shadow-sm shadow-transparent bg-indigo-50 flex items-center justify-center transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200 focus-within:bg-indigo-100 focus-within:outline-0">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.5 4.5H4.45C6.24134 4.5 7.13701 4.5 7.6935 5.0565C8.25 5.61299 8.25 6.50866 8.25 8.3C8.25 11.3667 8.25 14.4333 8.25 17.5C8.25 20.3284 8.25 21.7426 9.12868 22.6213C10.0074 23.5 11.4216 23.5 14.25 23.5C20.8 23.5 27.35 23.5 33.9 23.5M13.95 30.15C13.95 31.724 12.674 33 11.1 33C9.52599 33 8.25 31.724 8.25 30.15C8.25 28.576 9.52599 27.3 11.1 27.3C12.674 27.3 13.95 28.576 13.95 30.15ZM32.95 30.15C32.95 31.724 31.674 33 30.1 33C28.526 33 27.25 31.724 27.25 30.15C27.25 28.576 28.526 27.3 30.1 27.3C31.674 27.3 32.95 28.576 32.95 30.15ZM28.6 5.85C24.9 5.85 21.2 5.85 17.5 5.85C16.0858 5.85 15.3787 5.85 14.9393 6.28934C14.5 6.72868 14.5 7.43579 14.5 8.85C14.5 10.65 14.5 12.45 14.5 14.25C14.5 15.6642 14.5 16.3713 14.9393 16.8107C15.3787 17.25 16.0858 17.25 17.5 17.25C21.2 17.25 24.9 17.25 28.6 17.25C30.0142 17.25 30.7213 17.25 31.1607 16.8107C31.6 16.3713 31.6 15.6642 31.6 14.25C31.6 12.45 31.6 10.65 31.6 8.85C31.6 7.43579 31.6 6.72868 31.1607 6.28934C30.7213 5.85 30.0142 5.85 28.6 5.85Z"
                                        stroke="#4F46E5" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                            </button>
                            <p className="mt-2 font-medium text-sm leading-6 text-black w-[81px] text-center">
                                Free delivery
                            </p>
                        </div>

                        <div className="box flex flex-col items-center">
                            <button
                                className="p-5 rounded-full shadow-sm shadow-transparent bg-indigo-50 flex items-center justify-center transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200 focus-within:bg-indigo-100 focus-within:outline-0">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M30.0714 13.7143C30.0714 17.2647 24.7948 20.1429 18.2857 20.1429C11.7766 20.1429 6.5 17.2647 6.5 13.7143M30.0714 20.1429C30.0714 23.6933 24.7948 26.5714 18.2857 26.5714C11.7766 26.5714 6.5 23.6933 6.5 20.1429M30.0714 26.5714C30.0714 30.1218 24.7948 33 18.2857 33C11.7766 33 6.5 30.1218 6.5 26.5714M30.0714 8.35714C30.0714 11.3158 24.7948 13.7143 18.2857 13.7143C11.7766 13.7143 6.5 11.3158 6.5 8.35714C6.5 5.39847 11.7766 3 18.2857 3C24.7948 3 30.0714 5.39847 30.0714 8.35714Z"
                                        stroke="#4F46E5" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                            </button>
                            <p className="mt-2 font-medium text-sm leading-6 text-black w-[81px] text-center">
                                Cash in delivery
                            </p>
                        </div>

                        <div className="box flex flex-col items-center">
                            <button
                                className="p-5 rounded-full shadow-sm shadow-transparent bg-indigo-50 flex items-center justify-center transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200 focus-within:bg-indigo-100 focus-within:outline-0">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18.5006 17.1458H7.30064C5.99424 17.1458 5.34104 17.1458 4.83915 16.8983C3.4278 16.2023 3.50064 14.7113 3.50064 13.3458C3.50064 11.9803 3.4278 10.4893 4.83915 9.79329C5.34104 9.54579 5.99424 9.54579 7.30064 9.54579H18.5006M18.5006 17.1458H29.7006C31.007 17.1458 31.6602 17.1458 32.1621 16.8983C33.5735 16.2023 33.5006 14.7113 33.5006 13.3458C33.5006 11.9803 33.5735 10.4893 32.1621 9.79329C31.6602 9.54579 31.007 9.54579 29.7006 9.54579H18.5006M18.5006 17.1458V9.54579M18.5006 17.1458V32.9458M18.5006 9.54579C18.0206 4.26579 15.4178 3.99037 14.3006 4.74579C12.7357 5.80395 12.901 8.3458 13.701 9.5458M23.5956 9.5458C24.3956 8.3458 24.7463 5.62092 22.9959 4.74579C21.7959 4.14579 19.2755 4.2658 18.7955 9.5458M7.10064 17.1458H29.9006C29.9006 20.4125 29.9006 23.6791 29.9006 26.9458C29.9006 29.7742 29.9006 31.1884 29.022 32.0671C28.1433 32.9458 26.7291 32.9458 23.9006 32.9458C20.3006 32.9458 16.7006 32.9458 13.1006 32.9458C10.2722 32.9458 8.858 32.9458 7.97932 32.0671C7.10064 31.1884 7.10064 29.7742 7.10064 26.9458C7.10064 23.6791 7.10064 20.4125 7.10064 17.1458Z"
                                        stroke="#4F46E5" stroke-width="2.5" />
                                </svg>
                            </button>
                            <p className="mt-2 font-medium text-sm leading-6 text-black w-[81px] text-center">
                                Free Gift Chance
                            </p>
                        </div>

                        <div className="box flex flex-col items-center">
                            <button
                                className="p-5 rounded-full shadow-sm shadow-transparent bg-indigo-50 flex items-center justify-center transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200 focus-within:bg-indigo-100 focus-within:outline-0">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.56402 2.62012C9.52108 2.62012 13.3675 2.62012 15.9301 2.62012C17.184 2.62012 17.811 2.62012 18.3718 2.85767C18.9327 3.09521 19.3689 3.54542 20.2412 4.44582C23.3625 7.66777 29.8652 14.3648 33.5 17.9996M16.2427 15.0069C16.2427 16.6597 14.9028 17.9996 13.25 17.9996C11.5972 17.9996 10.2573 16.6597 10.2573 15.0069C10.2573 13.3541 11.5972 12.0143 13.25 12.0143C14.9028 12.0143 16.2427 13.3541 16.2427 15.0069ZM5.22827 15.7638L5.46523 10.3212C5.52201 9.01698 5.55041 8.36484 5.96295 7.9523C6.37549 7.53976 7.02763 7.51136 8.3319 7.45458L13.7502 7.21867C14.6212 7.18075 15.0568 7.16179 15.4509 7.31631C15.845 7.47082 16.1492 7.77839 16.7577 8.39352C19.2547 10.9177 25.0176 16.7552 29.3051 21.1899C30.5771 22.5055 31.2131 23.1633 31.2062 23.9818C31.1993 24.8004 30.548 25.4516 29.2456 26.754L24.4677 31.5319C23.0766 32.923 22.3811 33.6185 21.5357 33.6063C20.6904 33.594 20.0085 32.8714 18.6447 31.4263C14.4321 26.9623 8.81411 21.2286 6.37182 18.7454C5.77104 18.1345 5.47065 17.8291 5.32141 17.4406C5.17217 17.0522 5.19087 16.6227 5.22827 15.7638Z"
                                        stroke="#4F46E5" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                            </button>
                            <p className="mt-2 font-medium text-sm leading-6 text-black w-[81px] text-center">
                                Price Tag Available
                            </p>
                        </div>

                        <div className="box flex flex-col items-center max-[450px]:col-span-2">
                            <button
                                className="p-5 rounded-full shadow-sm shadow-transparent bg-indigo-50 flex items-center justify-center transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200 focus-within:bg-indigo-100 focus-within:outline-0">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M29 5.33365L8 29.1663M15 9.40385C15 12.1122 12.7614 14.3077 10 14.3077C7.23858 14.3077 5 12.1122 5 9.40385C5 6.69553 7.23858 4.5 10 4.5C12.7614 4.5 15 6.69553 15 9.40385ZM32 25.0962C32 27.8045 29.7614 30 27 30C24.2386 30 22 27.8045 22 25.0962C22 22.3878 24.2386 20.1923 27 20.1923C29.7614 20.1923 32 22.3878 32 25.0962Z"
                                        stroke="#4F46E5" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                            </button>
                            <p className="mt-2 font-medium text-sm leading-6 text-black w-[81px] text-center">
                                Best discount
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default PromoSection;