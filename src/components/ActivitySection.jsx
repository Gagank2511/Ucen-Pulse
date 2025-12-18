/**
 * ActivitySection Component
 * Displays the list of filtered activities with search indicator
 */

import React from "react";
import ActivityList from "./ActivityList.jsx";
import { DISPLAY_LIMITS } from "../constants/appConstants.js";

export default function ActivitySection({ activities, searchQuery, onDelete }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium dark:text-white transition-colors">
          Recent activities ({activities.length})
        </h2>
        {searchQuery && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Filtered by: "{searchQuery}"
          </span>
        )}
      </header>
      <section className="mt-3">
        <ActivityList
          activities={activities.slice(0, DISPLAY_LIMITS.ACTIVITIES)}
          onDelete={onDelete}
        />
      </section>
    </article>
  );
}

