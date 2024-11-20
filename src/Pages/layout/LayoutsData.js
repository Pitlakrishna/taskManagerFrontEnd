import React from 'react'
// import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import "./LayoutsData.css"
import Sidebar from '../../components/Sidebar/Sidebar'

const Layout = ({ children }) => {
    return (
        <div style={{ height: "100vh" }} className='w-100 d-flex flex-column align-items-start ' >
            <Navbar />
            <div className='d-flex flex-row justify-content-start align-items-center '  >
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    )
}

export default Layout