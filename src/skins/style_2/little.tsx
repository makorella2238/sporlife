'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

import {
  useMatch,
  useScenario,
  useScoreboard,
  useTimer
} from '@/hooks';
import { format_time } from '@/lib/helpers';

export const Little = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const timer = useTimer();
  const { scoreboard } = useScoreboard();
  const scenario = useScenario();
  
  return (
    <Box style={{display: show ? 'block' : 'none'}}>
      <Main>
        <Team color={match?.team_1?.color}>
          <TeamLogo src={match?.team_1?.img} />
          <TeamName>{match?.team_1?.name}</TeamName>
          <Score align='right'>{scoreboard?.team_1_score}</Score>
        </Team>
        <Team color={match?.team_2?.color}>
          <Score align='left'>{scoreboard?.team_2_score}</Score>
          <TeamName>{match?.team_2?.name}</TeamName>
          <TeamLogo src={match?.team_2?.img} />
        </Team>
      </Main>
      <Scoreboard>
        <ScoreboardBody>
          <ScoreboardRow>
            <ScoreboardScore>{scoreboard?.team_1_fouls}</ScoreboardScore>
            <ScoreboardText>Фолы</ScoreboardText>
            <ScoreboardScore>{scoreboard?.team_2_fouls}</ScoreboardScore>
          </ScoreboardRow>
          <ScoreboardRow>
            <ScoreboardText>{format_time(timer?.time ?? 0)}</ScoreboardText>
            <ScoreboardText>{scenario}</ScoreboardText>
          </ScoreboardRow>
        </ScoreboardBody>
      </Scoreboard>
    </Box>
  );
};

const Box = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  width: 640px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 12px;
`;

const Main = styled.div`
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  border-radius: 40px;
  overflow: hidden;
  box-sizing: border-box;
`;

const Team = styled.div`
  flex: 1 1 50%;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  box-sizing: border-box;
  ${props => `background-color: ${props.color};`}
  text-align: center;
`;

const TeamLogo = styled.img`
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  object-fit: contain;
  margin: 8px;
`;

const TeamName = styled.div`
  flex: 1 0;
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const Score = styled.div<{ align: 'left' | 'right' }>`
  width: 64px;
  height: 32px;
  margin: 8px;
  line-height: 32px;
  font-size: 32px;
  color: #000;
  ${props => `text-align: ${props.align};`}
`

const Scoreboard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ScoreboardBody = styled.div`
  width: 180px;
  background-color: #6d237f;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

const ScoreboardRow = styled.div`
  flex: 1 0;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  box-sizing: border-box;
`;

const ScoreboardScore = styled.div`
  width: 36px;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

const ScoreboardText = styled.div`
  flex: 1 0;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  color: #fff;
  text-align: center;
`