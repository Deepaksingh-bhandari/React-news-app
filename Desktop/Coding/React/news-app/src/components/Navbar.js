import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// export class Navbar extends Component {
// render() {
const Navbar = (props) => {
    let { title } = props
    let location = useLocation()
    console.log(location, location.pathname)
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="someValue">{title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {props.category.map((elem,i) => {
                            return (
                            <li key={`route${i}`} className="nav-item">
                                <Link  className={`nav-link ${elem.toLowerCase()===location.pathname.substring(1).toLowerCase()?'active':''}`} aria-current="page" to={`/${elem}`}>{elem}</Link>
                            </li>
                            )
                        })}
                        {/* <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">General</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/business">Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/entertainment">Entertainment</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/health">Health</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sports">Sports</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/technology">Technology</Link>
                        </li> */}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
