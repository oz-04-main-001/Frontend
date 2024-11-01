//독채인 숙소 객실 정보
import { useEffect, useState } from 'react';
import { Input } from '../../../../assets/Input';
import Counter from '../../../../assets/Counter';
import InputChips from '../../../../assets/InputChips';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';

interface OnlyRoomInformationProps {
    onStateChange: (data: any) => void;
}

const OnlyRoomInformation: React.FC<OnlyRoomInformationProps> = ({ onStateChange }) => {
    const initialBeds = ['싱글', '슈퍼싱글', '더블', '퀸', '킹', '없음'];
    const initialFacilities = ['주차가능', '조식운영', '와이파이', '객실금연', '레스토랑', '바', '연회장', '뷔페'];

    const [bedRows, setBedRows] = useState<number>(1);
    const [selectedBeds, setSelectedBeds] = useState<string[]>(['']);
    const [pricing, setPricing] = useState<string>('');
    const [checkin, setCheckin] = useState<string>('');
    const [checkout, setCheckout] = useState<string>('');
    const [capacity, setCapacity] = useState(1);
    const [room, setRoom] = useState(1);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [customFacilities, setCustomFacilities] = useState<string[]>([]);
    const [newFacility, setNewFacility] = useState<string>('');

    useEffect(() => {
        onStateChange({
            checkin,
            checkout,
            pricing,
            selectedBeds,
            capacity,
            room,
            bedRows,
            selectedFacilities,
        });
    }, [checkin, checkout, pricing, selectedBeds, capacity, room, bedRows, selectedFacilities]);

    const handleIncrementRow = () => {
        setBedRows(bedRows + 1);
        setSelectedBeds([...selectedBeds, '']);
    };

    const handleDecrementRow = (rowIndex: number) => {
        if (bedRows > 1) {
            const updatedBeds = selectedBeds.filter((_, index) => index !== rowIndex);
            setBedRows(bedRows - 1);
            setSelectedBeds(updatedBeds);
        }
    };

    const handleBedSelection = (rowIndex: number, bedType: string) => {
        const updatedBeds = [...selectedBeds];
        updatedBeds[rowIndex] = bedType;
        setSelectedBeds(updatedBeds);
    };

    const handleFacilityClick = (facility: string) => {
        setSelectedFacilities(prev =>
            prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
        );
    };

    const addFacility = () => {
        if (
            newFacility.trim() !== '' &&
            !initialFacilities.includes(newFacility) &&
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
                        <div key={rowIndex} className="flex items-center justify-between space-x-4">
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
                                        type={selectedBeds[rowIndex] === bed ? BtnType.normal : BtnType.line}
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
                <div className="grid grid-cols-3 gap-4">
                    {initialFacilities.map((facility, index) => (
                        <Button
                            key={index}
                            size={BtnSize.m}
                            text={facility}
                            type={selectedFacilities.includes(facility) ? BtnType.normal : BtnType.line}
                            onClick={() => handleFacilityClick(facility)}
                            className="w-full"
                        />
                    ))}
                    {customFacilities.map((facility, index) => (
                        <Button
                            key={`custom-facility-${index}`}
                            size={BtnSize.m}
                            text={facility}
                            type={selectedFacilities.includes(facility) ? BtnType.normal : BtnType.line}
                            onClick={() => handleFacilityClick(facility)}
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
