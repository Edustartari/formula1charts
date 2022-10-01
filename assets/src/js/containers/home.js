import React from 'react';
import '../../css/home.css';
import Image from '../components/image.js'

// const Home = (props) => {
//     return (
//         <h1>Home page</h1>
//     )
// }

class Home extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div>Edu testing Home</div>
                <Image name={'f1_background_ferrari_2'}/>
            </div>
        )
    }
}
  
export default Home;