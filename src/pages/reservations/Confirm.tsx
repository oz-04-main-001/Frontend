//예약확정대기중

import { useState } from 'react';

export default function Confirm() {
  const [isConfirmed, setIsConfirmed] = useState<boolean | string>(false);
  // const changeState = () => {
  //   setIsConfirmed(true);
  // };
  if (isConfirmed === true) {
    setIsConfirmed('완료');
  }
  return <div>Confirming</div>;
}
