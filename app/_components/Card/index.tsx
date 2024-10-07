type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return <div className="rounded-lg drop-shadow-md px-8 py-6 bg-white">{children}</div>;
}
