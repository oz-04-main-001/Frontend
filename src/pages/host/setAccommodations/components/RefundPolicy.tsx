//환불 정책
import React, { useState } from 'react';
import InputChips from '../../../../assets/InputChips'; 

const RefundPolicy: React.FC = () => {
    const [refundPolicies, setRefundPolicies] = useState([
        { percentage: '', text: '' },
        { percentage: '', text: '' },
        { percentage: '', text: '' },
        { percentage: '', text: '' },
        { percentage: '', text: '' },
    ]);

    const handlePercentageChange = (index: number, value: string) => {
        const updatedPolicies = [...refundPolicies];
        updatedPolicies[index].percentage = value;
        setRefundPolicies(updatedPolicies);
    };

    const handleTextChange = (index: number, value: string) => {
        const updatedPolicies = [...refundPolicies];
        updatedPolicies[index].text = value;
        setRefundPolicies(updatedPolicies);
    };

    return (
        <div className="p-8 bg-white border-none rounded-lg">
            <h2 className="mb-2 text-lg text-gray-400">환불정책</h2>
            <p className="mb-6 text-sm text-gray-400">체크인 기준으로 환불 수수료를 작성해주세요.</p>

            <div className="grid grid-cols-1 gap-4">
                {refundPolicies.map((policy, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-[100px] h-[80px]">
                            <InputChips
                                value={policy.percentage}
                                setValue={(value) => handlePercentageChange(index, value)}
                                placeholder="퍼센트"
                                editable={true}
                                className="w-full h-full p-2 border border-gray-100 rounded-md"  
                            />
                        </div>
                        <div className="ml-4 w-[200px]">
                            <InputChips
                                value={policy.text}
                                setValue={(value) => handleTextChange(index, value)}
                                placeholder="환불 조건 작성"
                                editable={true}
                                className="w-full h-full p-2 border border-gray-100 rounded-md" 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RefundPolicy;
