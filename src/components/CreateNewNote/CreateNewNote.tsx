import { useEffect } from "react";
import IconClock from "../Images/icon-clock";
import IconTag from "../Images/icon-tag";
import { useMode } from "../../context/ModeContext.tsx";
import "./_CreateNewNote.scss";

interface CreateNewNoteProps {
  setNote: (note: { title: string; tags: string; text: string }) => void;
}

const CreateNewNote = ({ setNote }: CreateNewNoteProps) => {
  const { mode } = useMode();
  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral300" : "--Neutral700");

  //placeholders fot the contentEditable elements

  useEffect(() => {
    const contentEditables = document.querySelectorAll(
      '[contentEditable="true"]'
    );

    contentEditables.forEach((element) => {
      const el = element as HTMLElement;
      const placeholderText = el.getAttribute("data-placeholder") || "";

      const checkPlaceholder = () => {
        if (el.innerText.trim() === "") {
          el.innerText = placeholderText;
          el.classList.add("placeholder");
        }
      };

      el.addEventListener("focus", () => {
        if (el.innerText === placeholderText) {
          el.innerText = "";
          el.classList.remove("placeholder");
        }
      });

      el.addEventListener("blur", checkPlaceholder);

      checkPlaceholder();
    });

    return () => {
      contentEditables.forEach((element) => {
        const el = element as HTMLElement;
        el.removeEventListener("focus", () => {});
        el.removeEventListener("blur", () => {});
      });
    };
  }, []);

  //Capture changes and updates state
  useEffect(() => {
    const updateNoteState = () => {
      const heading =
        (document.getElementById("heading") as HTMLElement)?.innerText || "";
      const tags =
        (document.getElementById("tags") as HTMLElement)?.innerText || "";
      const text =
        (document.getElementById("text") as HTMLElement)?.innerText || "";

      setNote({ title: heading, tags, text });
    };

    document
      .getElementById("heading")
      ?.addEventListener("input", updateNoteState);
    document.getElementById("tags")?.addEventListener("input", updateNoteState);
    document.getElementById("text")?.addEventListener("input", updateNoteState);

    return () => {
      document
        .getElementById("heading")
        ?.removeEventListener("input", updateNoteState);
      document
        .getElementById("tags")
        ?.removeEventListener("input", updateNoteState);
      document
        .getElementById("text")
        ?.removeEventListener("input", updateNoteState);
    };
  }, [setNote]);

  return (
    <div className="newNote-container">
      <h2
        id="heading"
        contentEditable="true"
        data-placeholder="Type here..."
      ></h2>
      <div className="tags">
        <div className="tagHeading">
          <IconTag color={colorIcons} size={16}></IconTag>
          <h3>Tags </h3>
        </div>
        <p
          id="tags"
          contentEditable="true"
          data-placeholder="Add tags separated by commas (e.g. Work, Planning)"
        ></p>
      </div>
      <div className="lastSaved">
        <div className="lastSavedHeading">
          <IconClock color={colorIcons} size={16}></IconClock>
          <h3>Last edited</h3>
        </div>
        <p id="lastSaved" data-placeholder="Not yet saved">
          Not yet saved
        </p>
      </div>
      <hr></hr>
      <p
        id="text"
        contentEditable="true"
        data-placeholder="Start typing your note here..."
      ></p>
    </div>
  );
};

export default CreateNewNote;
