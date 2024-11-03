import { useState } from 'react';
import Header from '../../../assets/Header';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import AccommodationsPhoto from './components/AccommodationsPhoto';
import AccommodationInformation from './components/AccommodationInformation';
import AccommodationUse from './components/AccommodationUse';
import RefundPolicy from './components/RefundPolicy';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate } from 'react-router-dom';

const OnlyAccommodation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accommodationsPhoto: [],
    accommodationInfo: {
      name: '',
      address: '',
      description: '',
      sido: '',
      sigungu: '',
      roadname: '',
      latitude: '',
      longitude: '',
    },
    accommodationUse: { amenities: [], rules: '' },
  });

  const handleFormChange = (sectionName: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [sectionName]: data,
    }));
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    const accommodation = {
      name: formData.accommodationInfo.name,
      description: formData.accommodationInfo.description,
      rules: formData.accommodationUse.rules,
      is_active: true,
    };
    const accommodation_type = {
      type_name: '호텔',
      is_customized: false,
    };
    const GPS_info = {
      city: formData.accommodationInfo.sido,
      states: formData.accommodationInfo.sigungu,
      road_name: formData.accommodationInfo.roadname,
      address: formData.accommodationInfo.address,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(formData.accommodationInfo.longitude),
          parseFloat(formData.accommodationInfo.latitude),
        ],
      },
    };
    const amenities = {
      new: [{ name: '소방시설', is_custom: true }],
      default: [{ accommodation: 0, amenitiy_id: 0 }],
    };
    formDataToSend.append(
      'accommodation',
      new Blob([JSON.stringify(accommodation)], { type: 'application/json' })
    );
    formDataToSend.append(
      'accommodation_type',
      new Blob([JSON.stringify(accommodation_type)], {
        type: 'application/json',
      })
    );
    formDataToSend.append(
      'GPS_info',
      new Blob([JSON.stringify(GPS_info)], { type: 'application/json' })
    );
    formDataToSend.append(
      'amenities',
      new Blob([JSON.stringify(amenities)], { type: 'application/json' })
    );

    formData.accommodationsPhoto.forEach((image, index) => {
      formDataToSend.append(`images[${index}]`, image);
    });

    for (let [key, value] of formDataToSend.entries()) {
      if (value instanceof Blob) {
        value.text().then(text => console.log(`${key}: ${text}`));
      } else {
        console.log(`${key}: ${value}`);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/' },
          { title: '서비스 등록', link: '/host/select-type' },
        ]}
      />
      <div className="container mx-auto mt-[10vh] max-w-4xl">
        <div className="flex items-center mb-8">
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-3xl font-bold">숙소 등록</h1>
        </div>
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-600">숙소</h2>
          <AccommodationsPhoto
            onStateChange={data =>
              handleFormChange('accommodationsPhoto', data)
            }
          />
          <AccommodationInformation
            onStateChange={data => handleFormChange('accommodationInfo', data)}
          />
          <AccommodationUse
            onStateChange={data => handleFormChange('accommodationUse', data)}
          />
          <RefundPolicy />
        </div>

        <div className="flex justify-center mt-12 mb-10">
          <div className="w-full max-w-[410px]">
            <Button
              size={BtnSize.l}
              text="다음"
              type={BtnType.normal}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlyAccommodation;
