import { Component } from "react";
import { MenuData } from "./MenuData";
import { Link } from "react-router-dom";
import './NavbarStyles.css';

class NavBar extends Component{
    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="safeCycleIcon">
                    SafeCycle
                </h1>
                <ul className="nav-menu">
                    {MenuData.map((item,index) => {return(
                        <li key={index}>
                        <a href={item.url} className={item.cName}>
                            <i className={item.icon}>
                                </i>{item.title}
                        </a>
                    </li>
                    )})
                    }
                </ul>
            </nav>
        )
    }
}

export default NavBar
