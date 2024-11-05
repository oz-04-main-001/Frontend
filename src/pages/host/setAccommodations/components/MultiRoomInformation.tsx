// 숙소 객실 정보 컴포넌트
import { useEffect, useState } from 'react';
import { Input } from '../../../../assets/Input';
import InputChips from '../../../../assets/InputChips';
import Counter from '../../../../assets/Counter';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';
import axios from 'axios';

interface MultiRoomInformationProps {
    room: number;
    onRoomChange: (value: number) => void;
    capacity: number;
    onCapacityChange: (value: number) => void;
    onStateChange: (data: any) => void;
}

const MultiRoomInformation: React.FC<MultiRoomInformationProps> = ({
    room,
    onRoomChange,
    capacity,
    onCapacityChange,
    onStateChange,
}) => {
    const initialRoomTypes = ['스탠다드', '스위트', '더블', '펜트하우스', '슈페리어'];
    const bedOptions = ['싱글', '슈퍼싱글', '더블', '퀸', '킹', '없음'];

    const [initialFacilities, setInitialFacilities] = useState<string[]>([]);
    const [customFacilities, setCustomFacilities] = useState<string[]>([]);
    const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
    const [customRoomTypes, setCustomRoomTypes] = useState<string[]>([]);
    const [newRoomType, setNewRoomType] = useState<string>('');
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [newFacility, setNewFacility] = useState<string>('');
    const [bedRows, setBedRows] = useState<number>(1);
    const [roomName, setRoomName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedBeds, setSelectedBeds] = useState<{ type: string; quantity: number }[]>([{ type: '', quantity: 1 }]);
    const [pricing, setPricing] = useState<string>('');
    const [checkin, setCheckin] = useState<string>('');
    const [checkout, setCheckout] = useState<string>('');
    const [roomCount, setRoomCount] = useState<number>(room);
    const [capacityCount, setCapacityCount] = useState<number>(capacity);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        axios
            .get('http://localhost/api/v1/rooms/option-choices/', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialFacilities(response.data);
            })
            .catch((error) => {
                console.error('GET 오류', error);
            });
    }, []);

    useEffect(() => {
        onStateChange({
            selectedRoomType,
            customRoomTypes,
            selectedFacilities,
            roomName,
            description,
            selectedBeds,
            pricing,
            checkin,
            checkout,
            room: roomCount,
            capacity: capacityCount,
        });
    }, [selectedRoomType, customRoomTypes, selectedFacilities, roomName, description, selectedBeds, pricing, checkin, checkout, roomCount, capacityCount]);

    const addRoomType = () => {
        if (newRoomType.trim() && !initialRoomTypes.includes(newRoomType) && !customRoomTypes.includes(newRoomType)) {
            setCustomRoomTypes([...customRoomTypes, newRoomType]);
            setNewRoomType('');
        }
    };

    const addFacility = () => {
        if (newFacility.trim() && !initialFacilities.includes(newFacility) && !customFacilities.includes(newFacility)) {
            setCustomFacilities([...customFacilities, newFacility]);
            setSelectedFacilities([...selectedFacilities, newFacility]);
            setNewFacility('');
        }
    };

    const handleRoomTypeClick = (type: string) => {
        setSelectedRoomType(selectedRoomType === type ? null : type);
    };

    const handleFacilityClick = (facility: string) => {
        setSelectedFacilities((prev) =>
            prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
        );
    };

    const handleIncrementRow = () => {
        setBedRows(bedRows + 1);
        setSelectedBeds([...selectedBeds, { type: '', quantity: 1 }]);
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
        updatedBeds[rowIndex] = { type: bedType, quantity: 1 };
        setSelectedBeds(updatedBeds);
    };

    const handleRoomCountChange = (value: number) => {
        setRoomCount(value);
        onRoomChange(value);
    };

    const handleCapacityCountChange = (value: number) => {
        setCapacityCount(value);
        onCapacityChange(value);
    };

    return (
        <div className="p-8 bg-white border-none rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">객실</h2>
            <div className="mb-8">
                <h3 className="mb-4 text-lg text-gray-400">객실 유형</h3>
                <div className="grid grid-cols-3 gap-4">
                    {initialRoomTypes.map((type, index) => (
                        <Button
                            key={index}
                            size={BtnSize.m}
                            text={type}
                            type={selectedRoomType === type ? BtnType.normal : BtnType.line}
                            onClick={() => handleRoomTypeClick(type)}
                            className="w-full"
                        />
                    ))}
                    {customRoomTypes.map((type, index) => (
                        <Button
                            key={`custom-${index}`}
                            size={BtnSize.m}
                            text={type}
                            type={selectedRoomType === type ? BtnType.normal : BtnType.line}
                            onClick={() => handleRoomTypeClick(type)}
                            className="w-full"
                        />
                    ))}
                    <InputChips
                        value={newRoomType}
                        setValue={setNewRoomType}
                        placeholder="객실 유형 입력 후 Enter"
                        editable
                        onKeyPress={(e) => e.key === 'Enter' && addRoomType()}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">이름</h3>
                <Input
                    type="text"
                    id="room-name"
                    placeholder="객실 이름을 입력해주세요."
                    width="w-full"
                    height="h-[60px]"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value.slice(0, 50))}
                />
                <p className="text-sm text-gray-500">{roomName.length} / 50</p>
            </div>
            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">설명</h3>
                <Input
                    type="text"
                    id="room-description"
                    placeholder="객실에 대한 설명을 입력해주세요."
                    width="w-full"
                    height="h-[137px]"
                    className="resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
                />
                <p className="text-sm text-gray-500">{description.length} / 1000</p>
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
                        editable
                        onKeyPress={(e) => e.key === 'Enter' && addFacility()}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">방 개수</h3>
                <Counter size={16} value={roomCount} onChange={handleRoomCountChange} />
            </div>
            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">기준인원</h3>
                <Counter size={16} value={capacityCount} onChange={handleCapacityCountChange} />
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
                                {bedOptions.map((bed, bedIndex) => (
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
                <h3 className="mb-2 text-lg text-gray-400">요금책정</h3>
                <div className="flex items-center">
                    <div className="flex-grow">
                        <Input
                            type="text"
                            id="pricing"
                            placeholder="1박 금액을 작성해주세요."
                            height="h-[60px]"
                            width="w-full"
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

export default MultiRoomInformation;
