"use client"; 

import styled, { keyframes } from "styled-components";
import { useMemo } from "react";
import { useMatch, useScenario, useScoreboard, useTimer } from "@/hooks";

  const getFontSizeByLength = (text: string): number => {
    const length = text.length;

    if (length <= 15) return 36;
    if (length <= 25) return 32; 
    if (length <= 35) return 28;
    if (length <= 45) return 24; 
    return 20;
  };

export const HomeRoster = ({ show }: { show: boolean }) => {
  const match = useMatch();

  const rows = [];
  const players = (match?.results_1 || []).slice(0, 17);

  let i = 0;
  let toggle = true;

  while (i < players.length) {
    const count = toggle ? 3 : 4;
    rows.push(players.slice(i, i + count));
    i += count;
    toggle = !toggle;
  }

  const teamName = match?.team_1?.name || "";
  const dynamicFontSize = useMemo(
    () => getFontSizeByLength(teamName),
    [teamName]
  );

  return (
    <Container>
      <Wrapper style={{ display: show ? "flex" : "none" }}>
        <HeaderRow>
          <Title>СОСТАВ</Title>
          <Subtitle fontSize={dynamicFontSize}>{teamName}</Subtitle>
          <Logo src={match?.team_1?.img} alt="Logo" />
        </HeaderRow>

        <div>
          <div>
            {rows.map((rowPlayers, idx) => (
              <Grid key={idx} columns={rowPlayers.length}>
                {rowPlayers.map((player, i) => (
                  <Parallelogram key={i}>
                    <PlayerImage src="/player.png" alt="Player" />
                    <NameText>
                      {player.player_fio.split(" ").join("\n")}
                    </NameText>
                    <NumberBlock>{player.player_number}</NumberBlock>
                  </Parallelogram>
                ))}
              </Grid>
            ))}
          </div>

          <BottomRow>
            <RepresentativeParallelogram>
              <ParallelogramRow>
                <RepImage src="/player.png" alt="Player" />
                <RepName>
                  {match.team_1.coaches[0].fio.replace(" ", "\n")}
                </RepName>
              </ParallelogramRow>
              <RepPost>Представитель</RepPost>
            </RepresentativeParallelogram>

            <RepresentativeParallelogram>
              <ParallelogramRow>
                <RepImage src="/player.png" alt="Player" />
                <RepName>
                  {match.team_1.coaches[0].fio.replace(" ", "\n")}
                </RepName>
              </ParallelogramRow>
              <RepPost>Представитель</RepPost>
            </RepresentativeParallelogram>
          </BottomRow>
        </div>
      </Wrapper>
    </Container>
  );
};

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;


const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
    background-size: 200% 200%;
  }
  25% {
    background-position: 100% 50%;
    background-size: 250% 250%;
  }
  50% {
    background-position: 50% 100%;
    background-size: 300% 300%;
  }
  75% {
    background-position: 0% 50%;
    background-size: 250% 250%;
  }
  100% {
    background-position: 100% 50%;
    background-size: 200% 200%;
  }
`;

const lightEffect = keyframes`
  0%, 100% {
    box-shadow: 0 0 80px rgba(0, 140, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 120px rgba(0, 200, 255, 0.4);
  }
`;

const shineEffect = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1492px;
  height: 809px;
  font-family: "Furore", sans-serif;
  color: white;
  z-index: 1;
  overflow: hidden;

  background: linear-gradient(
    135deg,
    rgba(14, 28, 88, 0.95) 0%,
    rgba(12, 10, 107, 0.95) 25%,
    rgba(0, 6, 60, 0.95) 50%,  /* заменил #00063C на rgba */
    rgba(4, 20, 87, 0.95) 75%,
    rgba(4, 14, 58, 0.95) 100%
  );
  background-size: 200% 200%;
  
  animation: 
    ${slideDown} 0.5s ease forwards,
    ${gradientMove} 12s ease infinite alternate;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 180, 255, 0.1) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: ${shineEffect} 8s ease infinite;
    pointer-events: none;
  }
  
  &:after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(0, 180, 255, 0.3);
    border-radius: 5px;
    animation: ${lightEffect} 6s ease infinite;
    pointer-events: none;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 142.15px;
  font-weight: 400;
  line-height: 177.69px;
  letter-spacing: -2%;
  color: white;
  margin-right: 27px;
`;

const Subtitle = styled.h2<{ fontSize: number }>`
  width: 350px;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 400;
  line-height: 60px;
  letter-spacing: -2%;
  margin: 0;
  text-align: center;
`;

const HeaderRow = styled.div`
  margin-top: 64px;
  margin-bottom: 44px;
  height: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  margin-top: 14px;
  width: 155px;
  height: 155px;
`;

const Grid = styled.div<{ columns: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, auto);
  grid-auto-rows: 80px;
  justify-content: center;
`;

const Parallelogram = styled.div`
  position: relative;
  width: 347px;
  height: 61px;
  background: white;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
`;

const PlayerImage = styled.img`
  position: absolute;
  left: -1.5px;
  margin-right: 2px;
  width: 101px;
  height: 61px;
  object-fit: cover;
  flex-shrink: 0;
  clip-path: polygon(10px 0%, 100% 0%, 90% 100%, 0% 100%);
`;

const NameText = styled.div`
  flex: 1;
  font-size: 20px;
  line-height: 20px;
  color: #001134;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* прижимаем к правому краю */
  text-align: center;
  white-space: pre-line;
`;

const NumberBlock = styled.div`
  width: 111px;
  height: 61px;
  background: #008bb1;
  color: white;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(40px 0%, 100% 0%, 90% 100%, 0% 100%);
  flex-shrink: 0;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 20px; /* Добавлено для отступа сверху */
`;

const RepresentativeParallelogram = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 0;
  overflow: hidden;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
`;

const RepName = styled.div`
  white-space: pre-line;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* прижимаем к правому краю */
  height: 100%;
  text-align: left;
  padding-right: 46px; /* немного отступа */
  flex: 1;
`;

const ParallelogramRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 61px;
  width: 280px;
  background: #008bb1;
  color: white;
  font-size: 20px;
  font-weight: 400;
  font-family: "Furore", sans-serif;
`;

const RepPost = styled.div`
  width: 100%;
  height: 20px;
  background: white;
  color: #000533;
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -2%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px; /* убираем лишние отступы */
`;

const RepImage = styled.img`
  position: absolute;
  left: -7px;
  width: 101px;
  height: 61px;
  object-fit: cover;
  flex-shrink: 0;
`;
