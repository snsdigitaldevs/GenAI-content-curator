"use client";

import Header from "./components/header/Header";
import TaskList from "./task-list/TaskList";

export default function GenUI() {
  return (
  <div className="flex flex-col items-center justify-center gap-6 my-10 mx-12">
      <Header />
      <TaskList />
    </div>
  );
}
