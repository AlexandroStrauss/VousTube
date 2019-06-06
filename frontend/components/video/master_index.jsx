import React from 'react';
import VideoIndexContainer from './video_index_container';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBar from '../side_bar/side_bar';
class MasterIndex extends React.Component {

    render() {
        return (
            <NavBarContainer />

            <div id="index-container">
                <section className={this.state.open ? "sidebar-open" : "sidebar-collapsed"}>
                    <SideBar />
                </section>

                <VideoIndexContainer />

            </div>
        )
    }
}

export default MasterIndex;