import React from "react";
import ActivityForm from "./ActivityForm.jsx";
import ActivityList from "../components/ActivityList.jsx";

export default function ActivitySection({ activities, onAdd, onDelete }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Add Activity</h2>
        <ActivityForm onAdd={onAdd} />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
        <ActivityList activities={activities} onDelete={onDelete} />
      </div>
    </div>
  );
}