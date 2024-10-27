// app/components/Nav.js

const Nav = () => {
    return (
      <nav id="nav-container">
        <div className="bg"></div>
        <div className="menu_icon_group">
          <div className="button">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </div>
        </div>
        <div id="nav-content">
          <ul className="navbar">
            <li>
              <input type="checkbox" id="jobs" />
              <label htmlFor="jobs">
                <span className="drop-down-icon">Learn By Topics</span>
              </label>
              <ul className="drop-down">
                <li><a href="/">Arrays</a></li>
                <li><a href="/">Stacks</a></li>
              </ul>
            </li>
            <li><a href="/">Leetcode 75</a></li>
            <li><a href="/">System Design</a></li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Nav;
  