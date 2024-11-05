//독채인 숙소 객실 정보
import { useEffect, useState } from 'react';
import { Input } from '../../../../assets/Input';
import Counter from '../../../../assets/Counter';
import InputChips from '../../../../assets/InputChips';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';
import axios from 'axios';

interface OnlyRoomInformationProps {
    onStateChange: (data: any) => void;
}

const OnlyRoomInformation: React.FC<OnlyRoomInformationProps> = ({ onStateChange }) => {
    const initialBeds = ['싱글', '슈퍼싱글', '더블', '퀸', '킹', '없음'];

    const [bedRows, setBedRows] = useState<number>(1);
    const [selectedBeds, setSelectedBeds] = useState<{ index: number, type: string }[]>([{ index: 0, type: '' }]);
    const [pricing, setPricing] = useState<string>('');
    const [checkin, setCheckin] = useState<string>('');
    const [checkout, setCheckout] = useState<string>('');
    const [capacity, setCapacity] = useState(1);
    const [room, setRoom] = useState(1);
    const [initialFacilities, setInitialFacilities] = useState<{ id: number, name: string }[]>([]);
    const [selectedFacilityIds, setSelectedFacilityIds] = useState<number[]>([]);
    const [customFacilities, setCustomFacilities] = useState<string[]>([]);
    const [newFacility, setNewFacility] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        axios.get('http://localhost/api/v1/rooms/option-choices/', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            const facilitiesWithIds = response.data.map((facility: string, index: number) => ({
                id: index,
                name: facility
            }));
            setInitialFacilities(facilitiesWithIds);
        })
        .catch(error => {
            console.error('GET 오류', error);
        });
    }, []);

    useEffect(() => {
        onStateChange({
            checkin,
            checkout,
            pricing,
            bedOptions: selectedBeds, 
            capacity,
            room,
            selectedFacilityIds,        // 기본 편의시설은 ID만 전송
            customFacilities             // 커스텀 편의시설은 이름만 전송
        });
    }, [checkin, checkout, pricing, selectedBeds, capacity, room, selectedFacilityIds, customFacilities]);

    const handleIncrementRow = () => {
        setBedRows(bedRows + 1);
        setSelectedBeds([...selectedBeds, { index: bedRows, type: '' }]);
    };

    const handleDecrementRow = (rowIndex: number) => {
        if (bedRows > 1) {
            const updatedBeds = selectedBeds.filter((_, index) => index !== rowIndex);
            setBedRows(bedRows - 1);
            setSelectedBeds(updatedBeds.map((bed, i) => ({ ...bed, index: i }))); 
        }
    };

    const handleBedSelection = (rowIndex: number, bedType: string) => {
        const updatedBeds = [...selectedBeds];
        updatedBeds[rowIndex] = { ...updatedBeds[rowIndex], type: bedType };
        setSelectedBeds(updatedBeds);
    };

    const handleFacilityClick = (facilityId: number) => {
        setSelectedFacilityIds(prev =>
            prev.includes(facilityId) ? prev.filter(id => id !== facilityId) : [...prev, facilityId]
        );
    };

    const addFacility = () => {
        if (
            newFacility.trim() !== '' &&
            !initialFacilities.some(facility => facility.name === newFacility) &&
            !customFacilities.includes(newFacility)
        ) {
            setCustomFacilities([...customFacilities, newFacility]);
            setNewFacility('');
        }
    };

    const handleFacilityKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addFacility();
        }
    };

    return (
        <div className="p-8 mx-auto bg-white border-none rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">객실 정보</h2>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">기준인원</h3>
                <div className="flex items-center">
                    <span className="mr-4 text-lg text-gray-600">성인</span>
                    <Counter size={16} value={capacity} onChange={setCapacity} />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">체크인</h3>
                <Input
                    type="text"
                    id="checkin"
                    placeholder="시간을 입력해주세요."
                    width="w-full"
                    height="h-[60px]"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">체크아웃</h3>
                <Input
                    type="text"
                    id="checkout"
                    placeholder="시간을 입력해주세요."
                    width="w-full"
                    height="h-[60px]"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">객실 재고</h3>
                <p className="mt-1 text-sm text-gray-400">해당 유형은 재고 수량 변경이 불가능합니다.</p>
                <Input
                    type="text"
                    id="room-stock"
                    placeholder="1개"
                    value="1개"
                    width="w-full"
                    height="h-[60px]"
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">방 개수</h3>
                <div className="flex items-center">
                    <Counter size={16} value={room} onChange={setRoom} />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">침대</h3>
                <div className="space-y-4">
                    {Array.from({ length: bedRows }).map((_, rowIndex) => (
                        <div key={selectedBeds[rowIndex].index} className="flex items-center justify-between space-x-4">
                            <button
                                className="flex items-center justify-center w-[32px] h-[32px] text-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md"
                                onClick={() => handleDecrementRow(rowIndex)}
                            >
                                -
                            </button>
                            <span className="text-lg text-gray-600">침대 {rowIndex + 1}</span>
                            <div className="flex items-center justify-between flex-grow space-x-2">
                                {initialBeds.map((bed, bedIndex) => (
                                    <Button
                                        key={bedIndex}
                                        size={BtnSize.m}
                                        text={bed}
                                        type={selectedBeds[rowIndex]?.type === bed ? BtnType.normal : BtnType.line}
                                        className="w-[160px] h-[40px]"
                                        onClick={() => handleBedSelection(rowIndex, bed)}
                                    />
                                ))}
                            </div>
                            <button
                                className="flex items-center justify-center w-[32px] h-[32px] text-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md"
                                onClick={handleIncrementRow}
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">편의시설</h3>
                <div className="grid grid-cols-4 gap-4">
                    {initialFacilities.map((facility) => (
                        <Button
                            key={facility.id}
                            size={BtnSize.m}
                            text={facility.name}
                            type={selectedFacilityIds.includes(facility.id) ? BtnType.normal : BtnType.line}
                            onClick={() => handleFacilityClick(facility.id)}
                            className="w-full"
                        />
                    ))}
                    {customFacilities.map((facility, index) => (
                        <Button
                            key={`custom-facility-${index}`}
                            size={BtnSize.m}
                            text={facility}
                            type={customFacilities.includes(facility) ? BtnType.normal : BtnType.line}
                            onClick={() => setCustomFacilities(prev =>
                                prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
                            )}
                            className="w-full"
                        />
                    ))}
                    <InputChips
                        value={newFacility}
                        setValue={setNewFacility}
                        placeholder="편의시설 입력 후 Enter"
                        editable={true}
                        onKeyPress={handleFacilityKeyPress}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">요금책정</h3>
                <div className="flex items-center">
                    <div className="flex-grow">
                        <Input
                            type="text"
                            id="pricing"
                            placeholder="1박 금액을 작성해주세요."
                            width="w-full"
                            height="h-[60px]"
                            className="text-right"
                            value={pricing}
                            onChange={(e) => setPricing(e.target.value)}
                        />
                    </div>
                    <span className="ml-2 text-lg text-gray-600">원</span>
                </div>
            </div>
        </div>
    );
};

export default OnlyRoomInformation;
