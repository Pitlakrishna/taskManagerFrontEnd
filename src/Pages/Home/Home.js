import React, { useContext, useEffect, useState } from 'react'
import Layout from '../layout/LayoutsData'
import { MessageContext } from "../../context"
import { Empty } from 'antd';

const Home = () => {
    const [messgae, setMessage] = useState('')
    const { messageContent } = useContext(MessageContext)



    return (
        <Layout>
            <div style={{ width: "70vw", height: "93vh", backgroundColor: "#FFF" }} className='pt-5 , ps-5' >
                <p>{messageContent}</p>
                <div style={{ height: "73vh", display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                    <div style={{ display: messageContent ? "none" : "flex" }} >
                        <Empty />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home