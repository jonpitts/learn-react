import * as UI from '@chakra-ui/react';
import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import * as reactHookForm from 'react-hook-form';
import flatMap from 'lodash/flatMap';
import startCase from 'lodash/startCase';

/**
 * Utility for simulating delays in async operations.
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  // Unwrap the data into a flat list of strings.
  const breeds: string[] = flatMap(data.message, (names, key) => {
    return names.map((name) => `${name} ${key}`);
  }).sort();

  return [breeds, loading, error];
};

interface FormData {
  name: string;
  breed: string;
  info?: string;
}

interface FormExampleProps {
  onSubmit?: (data: FormData) => any;
}

const FormExample: React.FC<FormExampleProps> = ({ onSubmit }) => {
  const [breeds, loading, error] = useBreeds();
  const form = reactHookForm.useForm<FormData>({ mode: 'onChange' });
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = form;
  const name = watch('name');
  const toast = UI.useToast({
    // Default toast properties
    position: 'top-right',
    isClosable: true,
  });

  const onValid: reactHookForm.SubmitHandler<FormData> = async (data) => {
    await onSubmit?.(data);
    toast({
      title: 'Form submitted',
      description: `Best of luck to ${data.name}!`,
      status: 'success',
    });
  };

  const onInvalid: reactHookForm.SubmitErrorHandler<FormData> = (data) => {
    toast({
      title: 'Oops!',
      description: 'Please fix the errors in the form.',
      status: 'error',
    });
  };

  if (loading) {
    return <UI.Spinner />;
  }
  if (error) {
    return <UI.Alert colorScheme="red">Error loading dog breeds.</UI.Alert>;
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
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <fieldset disabled={isSubmitting}>
            <UI.FormControl mb={4} isInvalid={!!errors.name}>
              <UI.FormLabel>Dog's name</UI.FormLabel>
              <UI.Input
                {...register('name', {
                  required: 'Required.',
                  maxLength: {
                    value: 20,
                    message: 'Name must be 20 characters or less.',
                  },
                  validate: {
                    cujo: (value) => value.toLowerCase() !== 'cujo',
                  },
                })}
              />
              <UI.FormErrorMessage>
                {errors.name?.type === 'cujo'
                  ? 'Cujo is not allowed.'
                  : errors.name?.message}
              </UI.FormErrorMessage>
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

            <UI.Button
              disabled={isSubmitting}
              colorScheme="green"
              type="submit"
            >
              Submit
            </UI.Button>
          </fieldset>
        </form>
      </UI.Box>
    </UI.Box>
  );
};

const LincChallange1Page: React.FC = () => {
  return (
    <UI.Box p={4}>
      <FormExample onSubmit={() => sleep(2000)} />
    </UI.Box>
  );
};
export default LincChallange1Page;
