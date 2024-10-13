// app/components/Nav.js

const Nav = () => {
    return (
      <nav id="nav-container">
        <div className="bg"></div>
        <div className="menu_icon_group">
          {/* <div className="button" tabIndex="0">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </div> */}
        </div>
        {/* <div id="nav-content" tabIndex="0">
          <ul className="navbar">
            <li>
              <input type="checkbox" id="jobs" />
              <label htmlFor="jobs">
                <span className="drop-down-icon">टॉप जॉब्स</span>
              </label>
              <ul className="drop-down">
                <li><a href="https://sarkariprep.in/govt-jobs/">सरकारी नौकरी</a></li>
                <li><a href="https://sarkariprep.in/private-jobs/">प्राइवेट जॉब</a></li>
              </ul>
            </li>
            <li><a href="https://sarkariprep.in/syllabus/">Product Based Companies</a></li>
            <li><a href="https://sarkariprep.in/admit-card/">Menu</a></li>
          </ul>
        </div> */}
      </nav>
    );
  };
  
  export default Nav;
  