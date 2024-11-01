// 객실 리스트 컴포넌트
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SVGIcon from '../../../../assets/logo';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button'; 
import SettingIcon from '../../../../assets/icons/setting.svg'; 

interface MultiRoomListProps {
    onAddRoom: () => void; 
    onSelectRoom: (room: string) => void; 
}

const MultiRoomList: React.FC<MultiRoomListProps> = ({ onAddRoom, onSelectRoom }) => {
    const [rooms, setRooms] = useState<string[]>(['스탠다드', '디럭스']); 
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null); 
    const [editingRoom, setEditingRoom] = useState<string | null>(null); 
    const [newRoomName, setNewRoomName] = useState<string>(''); 
    const navigate = useNavigate(); 

    const handleAddRoom = () => {
        const newRoom = `신규 객실 ${rooms.length + 1}`; 
        setRooms([...rooms, newRoom]); 
        setSelectedRoom(newRoom); 
        setEditingRoom(newRoom); 
        onAddRoom(); 
    };

    const handleRoomSelect = (room: string) => {
        setSelectedRoom(room);
        onSelectRoom(room); 
    };

    const handleEditRoomName = (room: string) => {
        setEditingRoom(room);
        setNewRoomName(room); 
    };

    const handleSaveRoomName = (index: number) => {
        const updatedRooms = rooms.map((room, i) => (i === index ? newRoomName : room)); 
        setRooms(updatedRooms); 
        setEditingRoom(null); 
    };


    const handleSettingsClick = () => {
        navigate('/MultiAccommodations'); 
    };

    return (
        <div className="min-h-screen p-8 overflow-auto bg-gray-100 w-[300px] fixed left-0 top-0 bottom-0"> 
            <div className="absolute top-0 left-0 w-full p-4"> 
                <SVGIcon width="40px" height="40px" />
            </div>

            <div className="pt-[100px]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img 
                            src={SettingIcon} 
                            alt="Settings" 
                            className="w-6 h-6 mr-2 cursor-pointer" 
                            onClick={handleSettingsClick} 
                        />
                        <span className="text-xl font-bold">숙소</span>
                    </div>
                </div>

                <div className="mb-6">
                    <Button
                        size={BtnSize.l}
                        text="신규 객실 추가하기"
                        type={BtnType.normal}
                        className="w-[265px] h-[30px]"
                        onClick={handleAddRoom}
                    />
                </div>
                
                <div className="space-y-4">
                    {rooms.map((room, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-4 cursor-pointer rounded-lg shadow-sm ${
                                selectedRoom === room ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-100'
                            }`}
                            onClick={() => handleRoomSelect(room)} 
                        >
                            {editingRoom === room ? (
                                <input
                                    type="text"
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                    onBlur={() => handleSaveRoomName(index)}
                                    autoFocus
                                />
                            ) : (
                                <span>{room}</span>
                            )}

                            <img
                                src={SettingIcon}
                                alt="Settings"
                                className="w-5 h-5 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditRoomName(room);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultiRoomList;