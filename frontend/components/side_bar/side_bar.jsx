import { faFire, faPhoenixFramework } from "@fortawesome/free-solid-svg-icons";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentUser;
    }

    componentDidMount() {
        this.props.currentUser;
    }

    render () {
        if (this.props.currentUser) {
            return (
                <div className="sidebar-collapsed"> 
                    <i class="material-icons">home</i>
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faPhoenixFramework} />
                    <i class="material-icons">subscriptions</i>
                    <i class="material-icons">folder</i>
                </div>
            )
        } else {
            return (
                <div className="sidebar-collapsed">
                    <i class="material-icons">home</i>
                    <FontAwesomeIcon icon={faFire} />
                    <FontAwesomeIcon icon={faPhoenixFramework} />
                    <i class="material-icons">subscriptions</i>
                    <i class="material-icons">folder</i>
                    <i class="material-icons">history</i>
                </div>
            )
        }

    }
}
//not signed in

export default SideBar;