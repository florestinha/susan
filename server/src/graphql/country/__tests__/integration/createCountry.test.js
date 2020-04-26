import test from 'tape';
import { omit } from 'ramda';
import createTestClient from '../../../../__tests__/integration/createTestClient';
import CREATE_COUNTRY_MUTATION from '../mutations/CREATE_COUNTRY_MUTATION';

test('create country', async (t) => {
  const { mutate, clean } = await createTestClient();
  const randomName = `${Math.random()}`;
  const randomCode = `${Math.random()}`;
  const randomValue = `${Math.random()}`;

  const createResult = await mutate({
    mutation: CREATE_COUNTRY_MUTATION,
    variables: {
      input: {
        name: randomName,
        code: randomCode,
      },
    },
  });

  t.equal(createResult.errors, undefined, 'should not throw an error');
  t.deepEqual(
    omit(['code'], createResult.data.createCountry.country),
    {
      name: randomName,
    },
    'should return the created country',
  );

  clean();

  const duplicateName = await mutate({
    mutation: CREATE_COUNTRY_MUTATION,
    variables: {
      input: {
        name: randomName,
        code: randomValue,
      },
    },
  });

  t.equal(
    duplicateName.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if Name already exists',
  );

  clean();

  const duplicateCode = await mutate({
    mutation: CREATE_COUNTRY_MUTATION,
    variables: {
      input: {
        name: randomValue,
        code: randomCode,
      },
    },
  });

  t.equal(
    duplicateCode.errors[0].extensions.exception.code,
    '23505',
    'should receive error 23505 if Code already exists',
  );

  clean();

  const emptyCode = await mutate({
    mutation: CREATE_COUNTRY_MUTATION,
    variables: {
      input: {
        name: randomValue,
        code: null,
      },
    },
  });

  t.notEqual(
    emptyCode.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if Code is null',
  );

  clean();

  const emptyName = await mutate({
    mutation: CREATE_COUNTRY_MUTATION,
    variables: {
      input: {
        name: null,
        code: randomValue,
      },
    },
  });

  t.notEqual(
    emptyName.errors[0].message.search('invalid value null'),
    -1,
    'should receive error if Name is null',
  );

  t.end();
  test.onFinish(() => process.exit(0));
});
