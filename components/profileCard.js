import React from "react";
import PersonnelList from "./personnelList";
import { baseURL } from "../utils/API";
import styled from "styled-components";
import { Card, Image } from "semantic-ui-react";

const ProfileCardLimiter = styled.div``;

const ProfileCard = props => {
  const { p_id, p_firstname, p_lastname, p_title, p_phone, p_email } = props;
  console.log("FROM PROPS: ", props);
  return (
    <ProfileCardLimiter>
      <Card>
        <Image src={baseURL + "profiles/" + p_id + ".jpg"} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {p_title} {p_firstname} {p_lastname}
          </Card.Header>
          {/* <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta> */}
          <Card.Description>
            {/* title: {p_title} */}
            phone: {p_phone} <br />
            e-mail: {p_email}
          </Card.Description>
        </Card.Content>
        {/* <Card.Content extra>{props.children}</Card.Content> */}
      </Card>
    </ProfileCardLimiter>
  );
};

export default ProfileCard;
