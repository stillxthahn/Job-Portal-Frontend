import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IRootState } from '../../../main';

const LayoutDefault = () => {
    const authen = useSelector((state: IRootState) => state['authReducer']);
    console.log(authen)
    return (
        <>
            <div className="mx-auto min-h-screen">
                <Header />
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LayoutDefault