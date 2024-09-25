"use client";

import Header from "./components/header/Header";
import TaskList from "./tasks/TaskList";

export default function GenUI() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 my-10 mx-60">
      <Header />
      <TaskList />
    </div>
  );
}
