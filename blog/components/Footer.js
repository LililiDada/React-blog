import '../public/style/components/Footer.css';
import Glasses from "../public/assets/glasses.png"
const Footer = ()=>(
    <div className='footer'>
        <div className="footer-top">
            <img src={Glasses} className="footer-img"/>
            <span>你未必光芒万丈，但始终温暖有光</span>
        </div>
        <span>©2020 李大山歪</span>
        
    </div>
)

export default Footer