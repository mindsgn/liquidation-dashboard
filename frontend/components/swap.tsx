import React from 'react';
import { NetworkSelection } from './NetworkSelection';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { TokenSelection } from './TokenSelection';

export const SwapUI = () => {
  return(
    <div className="swap">
        <div className="row border">
          <div>
            <NetworkSelection
              type="source"/>
          </div>
          <div>
            <NetworkSelection
              type="destination"/>
          </div>
        </div>
        <div className="row border">
          <div>
            <TokenSelection />
          </div>
          <div>
          <NumberInput
            defaultValue={15} min={10} max={20}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          </div>
        </div>
        <div className="row">
          <button>Transfer</button>
        </div>
    </div>
  );
};
