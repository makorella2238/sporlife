'use client';

import styled from 'styled-components';
import { useMatch, useScoreboard, useScenario } from '@/hooks';

export const Big = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();
  const scenario = useScenario();

  return (
    <Wrapper style={{ display: show ? 'flex' : 'none' }}>
      <FuroreFont />
      <Row>
        <TeamBox side="left">
          <TeamLogo side="left" src={match?.team_1?.img} />
          <TeamName>{match?.team_1?.name}</TeamName>
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
          <TeamName>{match?.team_2?.name}</TeamName>
        </TeamBox>
      </Row>

      <ScenarioContainer>
        <ScenarioSlashLeft />
        <ScenarioText>{scenario}</ScenarioText>
        <ScenarioSlashRight />
      </ScenarioContainer>
    </Wrapper>
  );
};

// Подключаем шрифт Furore
const FuroreFont = styled.div`
  @font-face {
    font-family: 'Furore';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/furore/v1/ypvEbB4cI5nq3x4.woff2') format('woff2'),
         url('https://fonts.gstatic.com/s/furore/v1/ypvEbB4cI5nq3x4.woff') format('woff');
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  font-family: 'Furore', sans-serif;
  z-index: 100;
  width: 1500px; /* Увеличили ширину для полного отображения названий */
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end; /* выравниваем по нижнему краю */
  justify-content: center;
  gap: 0;
  height: 90px;
  width: 100%;
  position: relative;
`;

const TeamBox = styled.div<{ side: 'left' | 'right' }>`
  position: relative;
  display: flex;
  flex-direction: ${props => (props.side === 'right' ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: flex-start;
  padding: ${props => 
    props.side === 'left' 
      ? '0 0 0 80px' 
      : '0 80px 0 0'};
  height: 100%;
  background: ${props =>
    props.side === 'left'
      ? 'linear-gradient(90deg, #008BB1 0%, #191919 100%)'
      : 'linear-gradient(90deg, #191919 0%, #FF0000 100%)'};
`;

const TeamLogo = styled.img<{ side: 'left' | 'right' }>`
  position: absolute;
  width: 141px;
  height: 141px;
  object-fit: contain;
  left: ${props => props.side === 'left' ? '-70px' : 'auto'};
  right: ${props => props.side === 'right' ? '-70px' : 'auto'};
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
`;

const TeamName = styled.div`
  font-family: 'Furore', sans-serif;
  font-weight: 400;
  font-size: 48px;
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

const TeamSlash = styled.div<{ side: 'left' | 'right' }>`
  position: absolute;
  width: 5px;
  height: 100%;
  background: ${props => props.side === 'left' ? '#008BB1' : '#FF0000'}; /* Поменяли цвета местами */
  top: 0;

  /* Левая команда — теперь наклон как у ТМЗ */
  ${props => props.side === 'left' && `
    right: -10px;
    transform: skewX(20deg);
  `}

  /* Правая команда — теперь наклон как у Express-Office */
  ${props => props.side === 'right' && `
    left: -10px;
    transform: skewX(-20deg);
  `}

  z-index: 3;
`;


const ScoreBox = styled.div`
  position: relative;
  background: #000;
  color: #fff;
  font-weight: bold;
  padding: 0 40px;
  height: 80px; /* На 10px ниже */
  margin-bottom: -10px; /* Смещение вниз */
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  z-index: 1;
`;

const ScoreText = styled.div`
  font-family: 'Furore', sans-serif;
  font-size: 72px;
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
  font-family: 'Furore', sans-serif;
  font-size: 32px;
  font-weight: 400;
  color: #fff;
  background: #000;
  padding: 8px 12px;
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
