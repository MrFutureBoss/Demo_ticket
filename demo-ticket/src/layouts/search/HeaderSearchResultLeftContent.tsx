import ResultLists from "@/components/list/ResultLists";
import React from "react";

export default function HeaderSearchResultLeftContent() {
  return (
    <>
      <div className="search-result-title">
        <p>RECENTLY VIEWS</p>
      </div>
      <ResultLists />
    </>
  );
}
