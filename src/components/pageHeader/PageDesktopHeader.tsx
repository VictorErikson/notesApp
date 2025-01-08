import "./_PageHeader.scss";

const PageDesktopHeader = () => {
  return (
    <header className="desktop-header">
      <h2>All Notes</h2>
      <input
        type="search"
        id="search"
        name="q"
        placeholder="Searchby title,content, or tags..."
      />
      <button>
        <img src="src/assets/images/icon-settings.svg" alt="Settings" />
      </button>
    </header>
  );
};

export default PageDesktopHeader;
