import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const LayoutDefault = () => {
    const authen = useSelector((state) => state.authReducer);

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