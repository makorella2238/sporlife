'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

import { PersonKind, person_kinds } from '@/models';

export const Person = ({ kind, show }: { kind: PersonKind, show: boolean }) => {
  return (
    <div style={{position: 'absolute', top: 0, left: 0, backgroundColor: 'red', display: show ? 'block' : 'none'}}>
      <h1>Person. Style 2</h1>
      <h2>{kind}</h2>
    </div>
  );
};