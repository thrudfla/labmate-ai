// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import {
  clearNotebookDraft,
  loadNotebookDraft,
  loadNotebookEntries,
  saveNotebookDraft,
} from "./notebookStorage.js";

describe("notebook storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads legacy notebook data into the new schema", () => {
    localStorage.setItem(
      "lab_notebook",
      JSON.stringify([{ id: "legacy-1", title: "PCR", notes: "Amplicons", result: "Success" }])
    );

    const entries = loadNotebookEntries();

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      title: "PCR",
      content: "Amplicons",
      status: "Planned",
      tags: [],
    });
  });

  it("persists and restores draft content", () => {
    saveNotebookDraft({ title: "Draft", content: "<strong>Ready</strong>" });

    expect(loadNotebookDraft()).toMatchObject({
      title: "Draft",
      content: "<strong>Ready</strong>",
    });

    clearNotebookDraft();
    expect(loadNotebookDraft()).toBeNull();
  });
});
