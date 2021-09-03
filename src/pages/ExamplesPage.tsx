import React from 'react';
import _ from 'lodash';
import * as UI from '@chakra-ui/react';
import * as dateFns from 'date-fns';
import numeral from 'numeral';
import { motion } from 'framer-motion';

// emotion
// localstorage state
// query state
// context provider
// axios get
// hook form
// font awesome

// react-use examples (useKey, useHover, useTimeout, useInterval, useCopyToClipboard, usePrevious)

const StateExample: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with component state</UI.Heading>
      {/* https://reactjs.org/docs/hooks-state.html */}
      <UI.UnorderedList>
        <UI.ListItem>
          <UI.Button
            colorScheme="green"
            my={2}
            onClick={() => setCount((value) => value + 1)}
          >
            Click me!
          </UI.Button>
          <UI.Text>The button has been clicked {count} times.</UI.Text>
        </UI.ListItem>
      </UI.UnorderedList>
    </UI.Box>
  );
};

// Wrap components with Framer Motion
// (You only have to do this once.)
const MotionUI = {
  Box: motion(UI.Box),
};

const MotionExample: React.FC = () => {
  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with animation</UI.Heading>
      {/* https://www.framer.com/docs/ */}
      <MotionUI.Box
        animate={{ rotate: 360 }}
        transition={{ loop: Infinity, duration: 2, ease: 'linear' }}
        bg="green.300"
        borderRadius="4px"
        w="50px"
        h="50px"
        m={4}
      ></MotionUI.Box>
    </UI.Box>
  );
};

const CollectionsExample: React.FC = () => {
  const mockList: string[] = ['react', 'is', 'neat'];

  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with collections</UI.Heading>
      {/* https://lodash.com/docs */}
      <UI.UnorderedList>
        <UI.ListItem>
          <UI.Text>Rendering a list:</UI.Text>
          {_.map(mockList, (text, i) => (
            <UI.Badge key={i} mr={2} colorScheme="blue">
              {text}
            </UI.Badge>
          ))}
        </UI.ListItem>
      </UI.UnorderedList>
    </UI.Box>
  );
};

const NumbersExample: React.FC = () => {
  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with numbers</UI.Heading>
      {/* http://numeraljs.com */}
      <UI.UnorderedList>
        <UI.ListItem>Formatting: {numeral(1000).format('0,0')}</UI.ListItem>
        <UI.ListItem>Formatting: {numeral(1000).format('0o')}</UI.ListItem>
      </UI.UnorderedList>
    </UI.Box>
  );
};

const DatesExample: React.FC = () => {
  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with dates</UI.Heading>
      {/* https://date-fns.org/docs/Getting-Started */}
      <UI.UnorderedList>
        <UI.ListItem>
          Formatting: {dateFns.format(new Date(), 'MM/dd/yyyy')}
        </UI.ListItem>
      </UI.UnorderedList>
    </UI.Box>
  );
};

const ExamplesPage: React.FC = () => {
  return (
    <UI.Box p="4">
      <UI.Heading size="3xl" mb={8}>
        Examples
      </UI.Heading>

      <StateExample />
      <CollectionsExample />
      <NumbersExample />
      <DatesExample />
      <MotionExample />
    </UI.Box>
  );
};

export default ExamplesPage;
