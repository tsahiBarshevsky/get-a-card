import React from 'react';
import { Link } from 'react-router-dom';
import { Link as Scroll, animateScroll } from 'react-scroll';
import { FaBars } from 'react-icons/fa';

export default function Navbar({toggle}) 
{
    const toggleHome = () => 
    {
        animateScroll.scrollToTop();
    }

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                <div className="logo" onClick={() => toggleHome()}>
                    <h1 className="content">Get a</h1>
                </div>
                <div className="mobile-icon">
                    <FaBars />
                </div>
                <ul className="nav-menu">
                    <li className="nav-link">
                        <Scroll to="about-section"
                            exact='true' 
                            smooth={true} duration={1500}
                            spy={true}>About</Scroll>
                    </li>
                    <li className="nav-link">
                        <Scroll to="how-it-works-section"
                            exact='true' 
                            smooth={true} duration={1500}
                            spy={true}>Help</Scroll>
                    </li>
                    <li className="nav-link">
                        <Scroll to="examples-section"
                            exact='true' 
                            smooth={true} duration={1500}
                            spy={true}>Examples</Scroll>
                    </li>
                    <li className="nav-link">
                        <Link to="/registartion" className="link">Sign up</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/login" className="link">Sign in</Link>
                    </li>
                </ul>
            </div>
            {/* <div className="logo" onClick={() => toggleHome()}>
                <h1 className="content">Get a</h1>
            </div>
            <div className="menu-icon" onClick={() => handelClick()}>
                {clicked ? <FaTimes className="icon" /> : <FaBars className="icon" />}
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {ScrollItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Scroll className={item.cName}
                                to={item.section} exact='true' 
                                smooth={true} duration={1500}
                                spy={true}>
                                {item.title}
                            </Scroll>
                        </li>
                    )
                })}
                {MoveItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link className={item.cName} to={item.path}>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul> */}
        </nav>
    )
}
