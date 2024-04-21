import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const LayoutDefault = () => {
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