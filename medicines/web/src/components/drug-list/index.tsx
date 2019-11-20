import React from 'react';
import styled from 'styled-components';
import { mhraBlue90, primaryColor } from '../../styles/colors';
import { baseSpace } from '../../styles/dimensions';

const StyledDrugList = styled.section`
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border-bottom: 1px solid ${mhraBlue90};
    padding: ${baseSpace} 0;
  }

  a {
    color: ${primaryColor};
  }
`;

export interface IDrug {
  name: string;
  url: string;
}

const DrugList = (props: { drugs: IDrug[] }) => (
  <StyledDrugList>
    <ul>
      {props.drugs.map(drug => (
        <li key={drug.name}>
          <a href={drug.url}>{drug.name}</a>
        </li>
      ))}
    </ul>
  </StyledDrugList>
);

export default DrugList;
