// 숙소 사진 등록
import React, { useState } from 'react';
import CloseIcon from '../../../../assets/icons/close.svg'; 

const AccommodationsPhoto: React.FC = () => {
    const [photos, setPhotos] = useState<File[]>([]); 
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (photos.length < 10) {
                setPhotos([...photos, ...Array.from(e.target.files)].slice(0, 10)); 
            }
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    return (
        <div className="w-[1064px] h-[440px] bg-white mx-auto p-8 rounded-lg">

            <h2 className="mb-2 text-lg text-gray-500">숙소 사진</h2>
            <p className="mb-6 text-sm text-gray-800">숙소 사진은 1장 ~ 10장까지 등록 가능합니다.</p>

            <div className="flex flex-wrap items-start space-x-4">
                {photos.map((photo, index) => (
                    <div key={index} className="relative w-[187px] h-[130px] bg-gray-100">
                        <img
                            src={URL.createObjectURL(photo)}
                            alt={`숙소 사진 ${index + 1}`}
                            className="object-cover w-full h-full"
                        />
                        <button
                            className="absolute top-1 right-1"
                            onClick={() => removePhoto(index)}
                        >
                            <img src={CloseIcon} alt="close icon" className="w-4 h-4" /> 
                        </button>
                    </div>
                ))}
                {photos.length < 10 && (
                    <label className="flex items-center justify-center w-[187px] h-[130px] bg-gray-100 cursor-pointer">
                        <span className="text-gray-400">+</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handlePhotoChange}
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

export default AccommodationsPhoto;
