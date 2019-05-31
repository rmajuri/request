import React from 'react';
import './_header.scss';
import DigiLogo from './digitails_logo.svg';

const Header = () => (
    <header className="header">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header-content">
                        <svg className="header-svg">
                            <use xlinkHref={ `${DigiLogo}#digi` } className="header-svg-use" />
                        </svg>
                        <nav className="header-nav">
                            <ul className="header-nav-list">
                                <li className="header-nav-list-item">
                                    <a href="#form-section" className="header-nav-list-item-anchor">
                                        Make Request
                                    </a>
                                </li>
                                <li className="header-nav-list-item">
                                    <a href="#howto" className="header-nav-list-item-anchor">
                                        See Other Requests
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
