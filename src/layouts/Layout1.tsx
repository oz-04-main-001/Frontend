import { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};
export default function Layout1({ children }: Props) {
  return (
    <div>
      <main className="mx-48">{children}</main>
    </div>
  );
}
