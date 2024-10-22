//객실이 여러개인 숙소 등록 - 객실 리스트 
import React, { useState } from 'react';
import SVGIcon from '../../../../assets/logo';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button'; 
import SettingIcon from '../../../../assets/icons/setting.svg'; 
import { useNavigate } from 'react-router-dom';


const MultiRoomList: React.FC = () => {
    const [rooms, setRooms] = useState<string[]>(['스탠다드', '디럭스']); 
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null); 
    const [editingRoom, setEditingRoom] = useState<string | null>(null); 
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [highlightedRoom, setHighlightedRoom] = useState<string | null>(null); 
    const navigate = useNavigate(); 

    const handleAddRoom = () => {
        const newRoom = `신규 객실 ${rooms.length + 1}`;
        setRooms([...rooms, newRoom]);
        setSelectedRoom(newRoom); 
        setHighlightedRoom(newRoom); 
        navigate('/multi-starter-room'); 
    };

    const handleEditRoomName = (room: string) => {
        setEditingRoom(room);
        setNewRoomName(room);
    };

    const handleSaveRoomName = (index: number) => {
        const updatedRooms = rooms.map((room, i) => (i === index ? newRoomName : room));
        setRooms(updatedRooms);
        setHighlightedRoom(newRoomName); 
        setEditingRoom(null); 
    };

    const handleSettingsClick = () => {
        navigate('/multi-accommodations'); 
    };

    return (
        <div className="w-[385px] min-h-screen h-auto bg-gray-100 p-8 overflow-auto"> 
            <div className="absolute top-0 left-0 w-full p-4"> 
                <SVGIcon width="40px" height="40px" />
            </div>

            <div className="pt-[100px]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img src={SettingIcon} alt="Settings" className="w-6 h-6 mr-2" onClick={handleSettingsClick} />
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
                            className={`flex items-center justify-between p-4 ${
                                highlightedRoom === room ? 'bg-gray-50' : 'bg-gray-100'
                            } rounded-lg shadow-sm`}
                        >
                            {editingRoom === room ? (
                                <input
                                    type="text"
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                    onBlur={() => handleSaveRoomName(index)}
                                />
                            ) : (
                                <span>{room}</span>
                            )}

                            <img
                                src={SettingIcon}
                                alt="Settings"
                                className="w-5 h-5 cursor-pointer"
                                onClick={() => handleEditRoomName(room)}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default MultiRoomList;

