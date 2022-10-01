import React from 'react';
import {isMobile} from 'react-device-detect';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from './home.js';

console.log('')
console.log('isMobile')
console.log(isMobile)

class AppDesktop extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render () {
        return (
            <div>
                <Router>
                    {/* {path_location !== '/login' && <Header/>} */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Router>
            </div>
        )
    }
}
class AppMobile extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render () {
        return (
            <div>Edu testing mobile</div>
        )
    }
}
const app = isMobile ? AppMobile : AppDesktop
export default app;