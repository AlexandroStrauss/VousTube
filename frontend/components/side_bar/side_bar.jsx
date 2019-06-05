import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import {Link } from 'react-router-dom';
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    // componentDidMount() {
    //     this.props.currentUser;
    // }
    render () {
        return (
            // <section className={this.state.open ? "sidebar-collapsed" : "sidebar-open"}>
                <div className="sidebar-holder">
                <Link to="/" >
                <button>
                    <i className="material-icons">home</i>
                    <p>Home</p>
                </button>
                </Link>

                <a href="https://linkedin.com" >
                <button>
                    <FontAwesomeIcon icon={faLinkedin} />
                    <p>LinkedIn</p>
                </button> 
                </a>

                <a href="https://github.com/AlexandroStrauss">
                <button>
                    <FontAwesomeIcon icon={faGithub} />
                    <p>Github</p>
                </button> 
                </a>
                </div>
            // </section>
        )  
    }
}
//not signed in

export default SideBar;


        // if (this.props.currentUser) {
        //     return (
        //         <div className="sidebar-collapsed"> 
        //             <i class="material-icons">subscriptions</i>
        //             <i class="material-icons">folder</i>
        //         </div>
        //     )
        // } else {
        //     return (
        //         <div className="sidebar-collapsed">
        //             <i class="material-icons">home</i>
        //             <FontAwesomeIcon icon={faFire} />
        //             <FontAwesomeIcon icon={faPhoenixFramework} />
        //             <i class="material-icons">subscriptions</i>
        //             <i class="material-icons">folder</i>
        //             <i class="material-icons">history</i>
        //         </div>
