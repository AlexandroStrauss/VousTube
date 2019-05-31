import { faLinkedIn, faFire, faPhoenixFramework } from "@fortawesome/free-solid-svg-icons";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentUser;
    }

    componentDidMount() {
        this.props.currentUser;
    }
    render () {
        return (
            <div className="sidebar-collapsed">
                <button><i class="material-icons">home</i></button>
                <button><FontAwesomeIcon icon={faLinkedIn} /></button> 
                <button><FontAwesomeIcon icon={faGithub} /></button> 
            </div>
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
