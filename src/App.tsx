import React from 'react';
import HeaderLayoutMobile from "./components/layout/HeaderLayoutMobile";
import FooterLayout from "./components/layout/FooterLayout";
import NavigationLayout from "./components/layout/NavigationLayout";
import HeaderLayoutDesktop from "./components/layout/HeaderLayoutDesktop";

class App extends React.Component {

    public render() {
        return (
            <React.Fragment>
                <div className="page-wrapper">
                    <HeaderLayoutMobile/>
                    <NavigationLayout/>

                    <div className="page-container">
                        <HeaderLayoutDesktop/>
                        <div className="main-content">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
