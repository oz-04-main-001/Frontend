import PaymentInfo from './PaymentInfo';
import AccmoInfoCard from './AccmoInfoCard';
import GuestInfo from './GuestInfo';
import Divider from '../../assets/Divider';
import Button, { BtnSize, BtnType } from '../../assets/buttons/Button';
import Layout from '../../layouts/Layout2';

export default function ReservationCompleted({}) {
  
  const Pagenation = () => {};
  return (
    <div className="">
      <Layout>
        <AccmoInfoCard />
      </Layout>

      <Divider />
      <Layout>
        <GuestInfo />
      </Layout>

      <Divider />
      <Layout>
        <PaymentInfo />
      </Layout>

      <div className="flex content-center justify-center mt-12 glow">
        <div className="w-3/4">
          <Button
            size={BtnSize.l}
            text="예약하기"
            type={BtnType.normal}
            onClick={Pagenation}
          />
        </div>
        <PaymentInfo />
      </div>
    </div>
  );
}
