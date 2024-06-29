import ActiveEvent from "./Event/ActiveEvent";

export default function EventManagement() {
  return (
    <div className="w-full">
      <div className="event">
        <h4 className="font-medium mb-5 text-lg">Active Events</h4>
        <ActiveEvent />
      </div>
    </div>
  );
}
