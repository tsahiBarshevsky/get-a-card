import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';

export default function Sidebar({isOpen, toggle}) 
{
    const style = {
        opacity: (isOpen ? '100%' : '0%'),
        top: (isOpen ? '0' : '-100%')
    };

    return (
        <aside className="sidebar-container" style={style} isOpen={isOpen} onClick={toggle}>
            <div className="top-line">
                <h1 className="logo">Get a</h1>
                <FaTimes className="close-icon" />
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-link">
                    <Scroll to="about-section"
                        exact='true' onClick={toggle}
                        smooth={true} duration={1500}
                        spy={true} offset={-45}>About</Scroll>
                </li>
                <li className="sidebar-link">
                    <Scroll to="how-it-works-section"
                        exact='true' onClick={toggle}
                        smooth={true} duration={1500}
                        spy={true} offset={-45}>Help</Scroll>
                </li>
                <li className="sidebar-link">
                    <Scroll to="examples-section"
                        exact='true' onClick={toggle}
                        smooth={true} duration={1500}
                        spy={true} offset={-25}>Examples</Scroll>
                </li>
                <li className="sidebar-link">
                    <Link to="/registartion" className="link">Sign up</Link>
                </li>
                <li className="sidebar-link">
                    <Link to="/login" className="link">Sign in</Link>
                </li>
            </ul>
        </aside>
    )
}
