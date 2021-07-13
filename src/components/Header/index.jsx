import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { Dropdown } from '@edx/paragon';
import { redirectToLogout } from '@edx/frontend-platform/auth';
import { Link } from 'react-router-dom';

import './index.scss';

const Header = () => {
    const { authenticatedUser } = useContext(AppContext);

    return (
        <header className="site-header mb-3 py-3 border-bottom-blue">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col justify-content-start">
                        <Link to="/">
                            <img src={process.env.LOGO_URL} alt="edX logo" height="48" width="50" />
                        </Link>
                    </div>
                    <div className="col-auto justify-content-end">
                        <Dropdown>
                            <Dropdown.Toggle>{authenticatedUser.username}</Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item
                                    type="button"
                                    onClick={() => redirectToLogout(process.env.STUDIO_BASE_URL)}
                                >
                                    Sign Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
};

export { Header };
