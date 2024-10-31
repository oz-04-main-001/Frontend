//환불 정책
import React from 'react';
import Chips from '../../../../assets/Chips';

const RefundPolicy: React.FC = () => {
    const refundPolicies = [
        { percentage: '100%', text: '체크인 7일 전' },
        { percentage: '80%', text: '체크인 5일 전' },
        { percentage: '40%', text: '체크인 3일 전' },
        { percentage: '10%', text: '체크인 1일 전' },
        { percentage: '0%', text: '체크인 당일' },
    ];

    return (
        <div className="p-8 bg-white border-none rounded-lg">
            <h2 className="mb-2 text-lg text-gray-400">환불정책</h2>
            <div className="grid grid-cols-1 gap-4">
                {refundPolicies.map((policy, index) => (
                    <div key={index} className="flex items-center">
                        <Chips text={policy.percentage} className="p-2 text-gray-700 border-gray-100" />
                        <Chips text={policy.text} className="p-2 text-gray-700 border-gray-100" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RefundPolicy;