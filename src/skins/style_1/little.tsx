"use client";

import styled from "styled-components";
import { useMatch, useScoreboard, useScenario } from "@/hooks";

export const Little = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();
  const scenario = useScenario();

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <FuroreFont />

      {scoreboard.is_fouls && <FollsContainer>
        {/* <FollsSlashLeft /> */}
        <FollsContent>
          <FollsCount>{scoreboard?.team_1_fouls ?? 0}</FollsCount>
          <FollsText>ФОЛЫ</FollsText>
          <FollsCount>{scoreboard?.team_2_fouls ?? 0}</FollsCount>
        </FollsContent>
        {/* <FollsSlashRight /> */}
      </FollsContainer>}

      <Row>
        <TeamBox side="left">
          <TeamLogo side="left" src={match?.team_1?.img} />
          <TeamName>эксп</TeamName>
          <TeamSlash side="left" />
        </TeamBox>

        <ScoreBox>
          <ScoreText>
            {scoreboard?.team_1_score}–{scoreboard?.team_2_score}
          </ScoreText>
        </ScoreBox>

        <TeamBox side="right">
          <TeamSlash side="right" />
          <TeamLogo side="right" src={match?.team_2?.img} />
          <TeamName>ТЗМС</TeamName>
        </TeamBox>
      </Row>

      <ScenarioContainer>
        <ScenarioSlashLeft />
        <ScenarioText>64:35</ScenarioText>
        <ScenarioSlashRight />
      </ScenarioContainer>
    </Wrapper>
  );
};

// Подключаем шрифт Furore
const FuroreFont = styled.div`
  @font-face {
    font-family: "Furore";
    font-style: normal;
    font-weight: 400;
    src: url("https://fonts.gstatic.com/s/furore/v1/ypvEbB4cI5nq3x4.woff2")
        format("woff2"),
      url("https://fonts.gstatic.com/s/furore/v1/ypvEbB4cI5nq3x4.woff")
        format("woff");
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  font-family: "Furore", sans-serif;
  z-index: 100;
  width: 680px;
`;

const FollsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -10px;
  z-index: 5;
`;

const FollsContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  padding: 8px 20px;
  flex-grow: 1;
  position: relative;
  clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 10px 100%);
  z-index: 1;
`;


const FollsText = styled.div`
  margin: 0 15px;
  font-family: "Furore", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  text-transform: uppercase;
  flex-grow: 1;
  text-align: center;
`;

const FollsCount = styled.div`
  font-family: "Furore", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  min-width: 20px;
  text-align: center;
`;


const Row = styled.div`
  height: 56px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end; /* выравниваем по нижнему краю */
  justify-content: center;
  gap: 0;
  width: 100%;
  position: relative;
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  height: 56px;
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.side === "right" ? "row-reverse" : "row"};
  align-items: center;
  justify-content: flex-start;
  padding: ${(props) => (props.side === "left" ? "0 0 0 15px" : "0 15px 0 0")};
  height: 100%;
  background: ${(props) =>
    props.side === "left"
      ? "linear-gradient(90deg, #008BB1 0%, #191919 100%)"
      : "linear-gradient(90deg, #191919 0%, #FF0000 100%)"};
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  width: 90px;
  height: 90px;
  object-fit: contain;
  left: ${(props) => (props.side === "left" ? "-70px" : "auto")};
  right: ${(props) => (props.side === "right" ? "-70px" : "auto")};
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
`;

const TeamName = styled.div`
  height: 56px;
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 37px;
  line-height: 48px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding: 0 20px;
  z-index: 1;
`;

const TeamSlash = styled.div<{ side: "left" | "right" }>`
  position: absolute;
  width: 4px;
  height: 100%;
  background: ${(props) =>
    props.side === "left" ? "#008BB1" : "#FF0000"}; /* Поменяли цвета местами */
  top: 0;

  /* Левая команда — теперь наклон как у ТМЗ */
  ${(props) =>
    props.side === "left" &&
    `
    right: -10px;
    transform: skewX(15deg);
  `}

  /* Правая команда — теперь наклон как у Express-Office */
  ${(props) =>
    props.side === "right" &&
    `
    left: -10px;
    transform: skewX(-15deg);
  `}

  z-index: 3;
`;

const ScoreBox = styled.div`
  position: relative;
  color: #001134;
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ScoreText = styled.div`
  font-family: "Furore", sans-serif;
  font-size: 37px;
  font-weight: 700;
  text-align: center;
  line-height: 1;
`;

const ScenarioContainer = styled.div`
  display: flex;
  align-items: stretch;
  width: auto;
  margin-top: 0; /* Убрали отступ */
`;

const ScenarioText = styled.div`
  font-family: "Furore", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  background: #000;
  padding: 8px 15px;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase; /* Капс */
`;

const ScenarioSlashLeft = styled.div`
  width: 20px;
  background: #000;
  transform: skewX(20deg);
  margin-right: -10px;
`;

const ScenarioSlashRight = styled.div`
  width: 20px;
  background: #000;
  transform: skewX(-20deg);
  margin-left: -10px;
`;
