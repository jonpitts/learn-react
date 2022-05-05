import * as UI from '@chakra-ui/react';
import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import * as reactHookForm from 'react-hook-form';
// import util from 'util';
import flatMap from 'lodash/flatMap';
import startCase from 'lodash/startCase';

interface FormData {
  name: string;
  breed: string;
  info?: string;
}

interface BreedData {
  message: {
    [x: string]: string[];
  };
}

/**
 * Loads, parses and sorts the breed data.
 */
const useBreeds = (): [string[], boolean, AxiosError | undefined] => {
  const [{ data, loading, error }] = useAxios<BreedData>(
    'https://dog.ceo/api/breeds/list/all'
  );

  if (!data?.message) {
    return [[], loading, error];
  }

  const breeds: string[] = flatMap(data.message, (names, key) => {
    return names.map((name) => `${name} ${key}`);
  }).sort();

  return [breeds, loading, error];
};

const FormExample: React.FC = () => {
  const [breeds, loading, error] = useBreeds();
  const form = reactHookForm.useForm<FormData>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  // const formData = watch();
  const name = watch('name');

  const onSubmit: reactHookForm.SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  if (loading) {
    return <UI.Spinner size="xl" />;
  }
  if (error) {
    return <UI.Text>Error</UI.Text>;
  }

  return (
    <UI.Box
      bg="white"
      borderRadius={4}
      shadow="xl"
      mb={8}
      p={4}
      maxW="500px"
      mx="auto"
    >
      <UI.Heading size="md" mb={4}>
        "Pup of the Year" submission form
      </UI.Heading>
      <UI.Box mb={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UI.FormControl mb={4} isInvalid={!!errors.name}>
            <UI.FormLabel>Dog's name</UI.FormLabel>
            <UI.Input
              {...register('name', {
                required: 'Required.',
                maxLength: {
                  value: 20,
                  message: 'Name must be 20 characters or less.',
                },
              })}
            />
            <UI.FormErrorMessage>{errors.name?.message}</UI.FormErrorMessage>
          </UI.FormControl>

          <UI.FormControl mb={4} isInvalid={!!errors.breed}>
            <UI.FormLabel>Breed</UI.FormLabel>
            <UI.Select
              placeholder="Select one"
              {...register('breed', {
                required: 'Required.',
              })}
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {startCase(breed)}
                </option>
              ))}
            </UI.Select>
            <UI.FormErrorMessage>{errors.breed?.message}</UI.FormErrorMessage>
          </UI.FormControl>

          <UI.FormControl mb={4}>
            <UI.FormLabel>
              Tell us about {name?.trim() || 'your dog'}
            </UI.FormLabel>
            <UI.Textarea
              resize="none"
              {...register('info', {
                maxLength: {
                  value: 200,
                  message: 'Name must be 200 characters or less.',
                },
              })}
            />
          </UI.FormControl>

          <UI.Button colorScheme="green" type="submit">
            Submit
          </UI.Button>
        </form>
      </UI.Box>
      {/* <UI.UnorderedList>
        <UI.ListItem>data: {util.inspect(formData)}</UI.ListItem>
        <UI.ListItem>errors: {util.inspect(errors)}</UI.ListItem>
      </UI.UnorderedList> */}
    </UI.Box>
  );
};

const LincChallange1Page: React.FC = () => {
  return (
    <UI.Box p={4}>
      <FormExample />
    </UI.Box>
  );
};
export default LincChallange1Page;
