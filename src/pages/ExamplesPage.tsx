import React from 'react';
import _ from 'lodash';
import * as UI from '@chakra-ui/react';
import * as dateFns from 'date-fns';
import numeral from 'numeral';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';
import useAxios from 'axios-hooks';

// localstorage state
// context provider
// hook form
// react-use examples (useKey, useHover, useTimeout, useInterval, useCopyToClipboard, usePrevious)

const RestExample: React.FC = () => {
  // https://github.com/simoneb/axios-hooks
  const [{ data, loading, error }, refetch] = useAxios(
    'https://baconipsum.com/api/?type=meat-and-filler&paras=1'
  );

  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with REST</UI.Heading>
      <UI.UnorderedList>
        <UI.ListItem>loading: {JSON.stringify(loading)}</UI.ListItem>
        <UI.ListItem>error: {JSON.stringify(error)}</UI.ListItem>
        <UI.ListItem>data: {JSON.stringify(data)}</UI.ListItem>
      </UI.UnorderedList>
      <UI.Button my={2} onClick={() => refetch()}>
        Refetch
      </UI.Button>
    </UI.Box>
  );
};

const QueryStateExample: React.FC = () => {
  const [count, setCount] = useQueryParam('count', withDefault(NumberParam, 0));

  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with querystring state</UI.Heading>
      {/* https://github.com/pbeshai/use-query-params#readme */}
      {/* Note that this implementation is dependent on React Router. */}
      <UI.Button my={2} onClick={() => setCount(count + 1)}>
        Click me!
      </UI.Button>
      <UI.Text>The button has been clicked {count} times.</UI.Text>
    </UI.Box>
  );
};

const ToastExample: React.FC = () => {
  const toast = UI.useToast();
  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with toasts</UI.Heading>
      {/* https://chakra-ui.com/docs/feedback/toast */}
      <UI.Button
        my={4}
        onClick={() =>
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </UI.Button>
    </UI.Box>
  );
};

const IconExample: React.FC = () => {
  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with icons</UI.Heading>
      {/* https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react */}
      <UI.SimpleGrid gap={4} padding={4}>
        <FontAwesomeIcon icon={icons.faCoffee} />
        <FontAwesomeIcon icon={icons.faCoffee} flip="horizontal" />
        <FontAwesomeIcon icon={icons.faCoffee} spin />
      </UI.SimpleGrid>
    </UI.Box>
  );
};

const StateExample: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <UI.Box mb={8}>
      <UI.Heading size="md">Working with component state</UI.Heading>
      {/* https://reactjs.org/docs/hooks-state.html */}
      <UI.Button my={2} onClick={() => setCount((value) => value + 1)}>
        Click me!
      </UI.Button>
      <UI.Text>The button has been clicked {count} times.</UI.Text>
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

      <NumbersExample />
      <DatesExample />
      <IconExample />
      <MotionExample />
      <ToastExample />
      <CollectionsExample />
      <StateExample />
      <QueryStateExample />
      <RestExample />
    </UI.Box>
  );
};

export default ExamplesPage;
