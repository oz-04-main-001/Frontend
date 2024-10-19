import { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div>
      <main className="px-20">{children}</main>
    </div>
  );
}
