import Sidebar from "../ui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ">{children}</div>
    </div>
  );
}
