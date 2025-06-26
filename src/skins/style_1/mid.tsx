"use client";

import { useMatch} from "@/hooks";
import styled from "styled-components";
export const Mid = ({ show }: { show: boolean }) => {
  const match = useMatch();

  return (
    <Wrapper style={{ display: show ? 'flex' : 'none' }}>
      <BackgroundImage />
      <TitleContainer>
        <TitleLine>ФИНАЛЬНЫЙ ДЕНЬ</TitleLine>
        <TitleLine>ЛЕТНЕГО КУБКА</TitleLine>
      </TitleContainer>

      <TeamsContainer>
        <TourBlock variant="normal">
          <TourText>СК ТУЛГУ</TourText>
        </TourBlock>
        <TourBlock variant="inverted">
          <TourText>1 ТУР</TourText>
        </TourBlock>
      </TeamsContainer>
      
      <TeamsRow>
        <TeamBox side="left" style={{ marginRight: "250px" }}>
          <TeamLogo side="left" src={match?.team_1?.img} />
          <TeamName side="left">{match?.team_1?.name}</TeamName>
          <TeamSlash side="left" />
        </TeamBox>

        <TeamBox side="right" style={{ marginLeft: "250px" }}>
          <TeamSlash side="right" />
          <TeamLogo side="right" src={match?.team_2?.img} />
          <TeamName side="right">{match?.team_2?.name}</TeamName>
        </TeamBox>
      </TeamsRow>
      <BottomInfo>
        <DateText>31.07.2025</DateText>
        <GradientSlash />
        <TimeText>03:00</TimeText>
      </BottomInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 50px;
  margin-top: 20px;
  margin-left: 100px;
  position: relative;
  width: 1400px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Furore", sans-serif;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/Group.png") no-repeat center center / cover;
  z-index: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const TitleLine = styled.div`
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 56px;
  line-height: 70px;
  letter-spacing: -2%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  z-index: 5;
  margin-top: 40px;
  margin-bottom: 64px;
`;

const TourBlock = styled.div<{ variant?: "normal" | "inverted" }>`
  position: relative;
  padding: 20px 50px;
  background: #00063C;
  border-top: 4px solid #29356A;
  border-bottom: 4px solid #29356A;
  overflow: hidden;
  transform: ${({ variant }) => (variant === "inverted" ? "skewX(-20deg)" : "skewX(20deg)")};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 8px;
    height: 100%;
    background-color: #29356A;
    z-index: 1;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  /* "отменяем" наклон внутри текста */
  > * {
    transform: ${({ variant }) => (variant === "inverted" ? "skewX(20deg)" : "skewX(-20deg)")};
    display: inline-block;
  }
`;


const TourText = styled.div`
  font-size: 37px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;

const BottomInfo = styled.div`
  position: absolute;
  bottom: 60px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 5;
  padding: 15px 40px;
`;

const DateText = styled.div`
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 37px;
  line-height: 40px;
  letter-spacing: 0%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  /* leading-trim: cap-height; */
`;

const TimeText = styled(DateText)``;

const GradientSlash = styled.div`
  width: 21px;
  height: 26px;
  background: url("/line.png") no-repeat center center / cover;
`;

const TeamsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  margin-top: 20px;
  z-index: 5;
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  position: relative;
  display: flex;
  height: 78px;
  width: 650px;

  ${({ side }) =>
    side === "left"
      ? `
        background: linear-gradient(90deg, #008BB1 0%, #191919 100%);
        justify-content: flex-start;
        padding-left: 100px;
        
      `
      : `
        background: linear-gradient(90deg, #191919 0%, #FF0000 100%);
        justify-content: flex-end;
        padding-right: 100px;
        
      `};
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  height: 78px;
  width: 570px;
  display: flex;
  align-items: center;
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 48px;
  line-height: 37.33px;
  letter-spacing: -2%;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;

  ${({ side }) =>
    side === "left"
      ? `
        padding-left: 30px;
        justify-content: flex-end; 
      `
      : `
        padding-right: 30px;
        justify-content: flex-start;
      `};
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  width: 263px;
  height: 263px;
  object-fit: contain;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  ${(props) =>
    props.side === "left"
      ? `
        left: -70px;
        filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7));
      `
      : `
        right: -70px;
        filter: drop-shadow(-5px 5px 10px rgba(0, 0, 0, 0.7));
      `}
`;

const TeamSlash = styled.div<{ side: "left" | "right" }>`
  position: absolute;
  width: 5px;
  height: 100%;
  background: ${(props) => (props.side === "left" ? "#008BB1" : "#FF0000")};
  top: 0;
  z-index: 3;

  ${(props) =>
    props.side === "left" &&
    `
    right: -10px;
    transform: skewX(20deg);
  `}

  ${(props) =>
    props.side === "right" &&
    `
    left: -10px;
    transform: skewX(-20deg);
  `}
`;
