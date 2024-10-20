//환불 정책
import React from 'react';
import Chips from '../../../../assets/Chips'; 
const RefundPolicy: React.FC = () => {
    const refundPolicies = [
        { percentage: '100%', text: '체크인 7일전' },
        { percentage: '80%', text: '체크인 5일전' },
        { percentage: '40%', text: '체크인 2일전' },
        { percentage: '10%', text: '체크인 1일전' },
        { percentage: '0%', text: '체크인 당일' },
    ];

    return (
        <div className="w-[1062px] h-[540px] rounded-lg bg-white p-8 border-none">
            <h2 className="mb-2 text-lg text-gray-400">환불정책</h2>
            <p className="mb-6 text-sm text-gray-400">체크인 기준으로 환불 수수료를 작성해주세요.</p>

            <div className="grid grid-cols-1 gap-4">
                {refundPolicies.map((policy, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-[100px] h-[60px]">
                            <Chips text={policy.percentage} className="w-full h-full text-center text-black" />
                        </div>
                        <span className="ml-4 text-base text-black">{policy.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RefundPolicy;
