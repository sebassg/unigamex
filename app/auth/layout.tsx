import Sidebar from "../ui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <div className="flex-1 h-dvh overflow-y-auto">{children}</div> {/* Añadimos overflow-y-auto para que el contenido sea desplazable si es necesario */}
    </div>
  );
}
