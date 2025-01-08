import "./_MenuBarMobile.scss";

const MenuBarMobile = () => {
  return (
    <nav className="mobile_menu">
      <button>
        <img src="src/assets/images/icon-home.svg"></img>
        <p className="menuText">Home</p>
      </button>
      <button>
        <img src="src/assets/images/icon-search.svg"></img>
        <p className="menuText">Search</p>
      </button>
      <button>
        <img src="src/assets/images/icon-archive.svg"></img>
        <p className="menuText">Archived</p>
      </button>
      <button>
        <img src="src/assets/images/icon-tag.svg"></img>
        <p className="menuText">Tags</p>
      </button>
      <button>
        <img src="src/assets/images/icon-settings.svg"></img>
        <p className="menuText">Settings</p>
      </button>
    </nav>
  );
};

export default MenuBarMobile;
