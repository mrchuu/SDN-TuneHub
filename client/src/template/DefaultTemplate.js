import SideBar from "../component/SideBar";

export default function DefaultTemplate({ title, children }) {
  return (
    <div className="w-full min-h-screen flex flex-row">
      <SideBar />
      {children}
    </div>
  );
}
