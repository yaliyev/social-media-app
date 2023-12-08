import { Avatar, Col, Row } from 'antd'
import React from 'react'

const Comment = () => {
  return (
    <>
    <Col span={24}>
          <Row>
            <Col span={10}>
                
            <Avatar alt="Remy Sharp" src={"https://images.pexels.com/photos/8123680/pexels-photo-8123680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />
            <b>yaqo2003</b>
            </Col>
            <Col span={14} style={{padding:'4px'}}>
             Very awesome post,you have uploaded.
            </Col>
          </Row>

         
        </Col> 
         

       
    </>
    

        
  )
}



export default Comment