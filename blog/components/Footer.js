import '../public/style/components/Footer.css';
import Glasses from "../public/assets/glasses.png"
const Footer = ()=>(
    <div className='footer'>
        <div className="footer-top">
            <img src={Glasses} className="footer-img"/>
            <span>或许你不够优秀，但只要你不断努力！</span>
        </div>
        <span>©2020 李大山歪</span>
        
    </div>
)

export default Footer