'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

export const Big = ({ show }: { show: boolean }) => {
  return (
    <div style={{position: 'absolute', top: 0, left: 0, backgroundColor: 'red', display: show ? 'block' : 'none'}}>
      <h1>Big. Style 2</h1>
    </div>
  );
};