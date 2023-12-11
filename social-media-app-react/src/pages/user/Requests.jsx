import { Button, Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserById, getUsers, putUser } from '../../services/api/user_request';
import { putUserReducer} from '../../redux/slices/userSlice';

const Requests = () => {

  let user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [requestUsers, setRequestUsers] = useState([]);
  const [requestsToThisUser, setRequestsToThisUser] = useState([]);

  const navigateTo = useNavigate();

  useEffect(() => {
    function loadRequests() {
      setRequestsToThisUser([...user.userObject.requests]);
    }

    if (user.userObject == null) {

      navigateTo("/login")

    } else {
      loadRequests();
    }

  }, []);

  useEffect(() => {
    async function loadUsers() {
      let newUsersData = [];
      let data = await getUsers();

      requestsToThisUser.filter((requestUser) => {
        let requestUserInData = data.find((iteratedDataUser) => iteratedDataUser.id == requestUser.id);

        if (requestUserInData != undefined) {
          newUsersData.push({ ...requestUserInData, status: requestUser.status });
        }

      })

      setRequestUsers(newUsersData);

    }

    if (requestsToThisUser.length != 0) {
      loadUsers();
    }


  }, [requestsToThisUser])

  async function acceptRequest(followerUserId) {

    const thisUserId = user.userObject.id;

    const followerUser = await getUserById(followerUserId);
    
    let requestWhichMustBeDeletedFromFollowerUserRequestIndex = -1;


    followerUser.requests.find((iteratedRequest, index) => {
      if (iteratedRequest.id == thisUserId && iteratedRequest.status == 'sent') {
        requestWhichMustBeDeletedFromFollowerUserRequestIndex = index;
      }
    })

    if (requestWhichMustBeDeletedFromFollowerUserRequestIndex != -1) {
      followerUser.requests.splice(requestWhichMustBeDeletedFromFollowerUserRequestIndex, 1);

      followerUser.followings.push({ id: thisUserId });

      const thisUser = { ...user.userObject };

      let requestWhichMustBeDeletedFromThisUserRequestIndex = -1;

      
      thisUser.requests.find((iteratedRequestThisUser, index) => {
        
        if (iteratedRequestThisUser.id == followerUserId && iteratedRequestThisUser.status == 'pending') {
          requestWhichMustBeDeletedFromThisUserRequestIndex = index;
        }
      })
      
      if (requestWhichMustBeDeletedFromThisUserRequestIndex != -1) {
       
         const dataRequests = [...thisUser.requests];
         console.log(dataRequests);
         dataRequests.splice(Number(requestWhichMustBeDeletedFromThisUserRequestIndex),1)
        
         const newThisUser  = {
          ...thisUser,
          requests: dataRequests,
          followers: [...thisUser.followers,{ id: followerUserId }]
         }
       
         dispatch(putUserReducer(newThisUser))
         putUser(followerUser);
         putUser(newThisUser);
         setRequestUsers(newThisUser.requests)

         


      }

      



    }









  }

  return (
    <Col span={24}>

      <Row style={{ padding: '20px' }}>

        {requestUsers.map((iteratedUser) => {
          if (iteratedUser.status == 'pending') {
            return <Col key={iteratedUser.id} span={6} style={{ padding: '10px' }}>

              <Card
                style={{

                }}
                cover={

                  <img
                    alt="example"
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                  />
                }
                actions={[

                  // <FileImageOutlined title='User posts' onClick={() => { dispatch(set_open_user_posts_modal_open(true)) }} />,

                ]}
              >

                <Meta
                  title={<h3 style={{ textAlign: 'center' }}>{iteratedUser.username}</h3>}
                  description={<p style={{ textAlign: 'center' }}>{iteratedUser.bio}</p>}
                />

                <Meta description={<div style={{ display: 'flex', justifyContent: 'center', columnGap: '10px' }}>
                  <Button onClick={() => { acceptRequest(iteratedUser.id) }} type='primary' style={{ backgroundColor: 'green' }} >Accept</Button>
                  <Button type='primary' style={{ backgroundColor: 'red' }} >Decline</Button> </div>}
                />


              </Card>
            </Col>
          }


        })}

      </Row>

    </Col>
  )
}

export default Requests