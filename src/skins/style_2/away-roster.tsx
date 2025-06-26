'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

export const AwayRoster = ({ show }: { show: boolean }) => {
  useEffect(() => {
    // TODO: Some animation here
  }, [show]);

  return (
    <div style={{position: 'absolute', top: 0, left: 0, backgroundColor: 'red', display: show ? 'block' : 'none'}}>
      <h1>Away Roster. Style 2</h1>
    </div>
  );
};