import IconClock from "../Images/icon-clock";
import IconTag from "../Images/icon-tag";

const CreateNewNote = () => {
  return (
    <div className="newNote-container">
      <textarea
        name="heading"
        id="heading"
        placeholder="Enter a title"
      ></textarea>
      <div className="tags">
        <h3>
          <IconTag color={"--Neutral700"} size={16}></IconTag>Tags
        </h3>
        <input
          type="text"
          name="tags"
          id="tags"
          placeholder="Add tags separated by commas (e.g. Work, Planning)"
        ></input>
      </div>
      <div className="lastSaved">
        <h3>
          <IconClock color={"--Neutral700"} size={16}></IconClock>Last edited
        </h3>
        <input
          type="text"
          name="lastEdited"
          id="lastEdited"
          placeholder="Not yet saved"
        />
      </div>
      <hr></hr>
      <textarea
        name="text"
        id="text"
        placeholder="Start typing your note here..."
      ></textarea>
    </div>
  );
};

export default CreateNewNote;
