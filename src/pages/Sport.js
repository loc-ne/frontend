import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';

import s1 from '../assets/images/sport1.jpg';
import s2 from '../assets/images/sport2.jpg';
import s3 from '../assets/images/sport3.jpg';
import s4 from '../assets/images/sport4.jpg';
import s5 from '../assets/images/sport5.jpg';
import s6 from '../assets/images/sport6.jpg';
import s7 from '../assets/images/sport7.jpg';
import s8 from '../assets/images/sport8.jpg';


function Sport() {
    return (
        <div>
            <Navbar />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-32 m-12 mb-12">
                <img src={s1} alt="Sport 1" className="w-full h-auto" />
                <img src={s2} alt="Sport 2" className="w-full h-auto" />    
                <img src={s3} alt="Sport 3" className="w-full h-auto" />
                <img src={s4} alt="Sport 4" className="w-full h-auto" />
                <img src={s5} alt="Sport 5" className="w-full h-auto" />
                <img src={s6} alt="Sport 6" className="w-full h-auto" />
                <img src={s7} alt="Sport 7" className="w-full h-auto" />
                <img src={s8} alt="Sport 8" className="w-full h-auto" />
            </div>

            <Footer />
        </div>
    );
}

export default Sport;
