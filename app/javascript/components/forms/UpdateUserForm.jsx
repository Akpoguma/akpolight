import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Form as BootStrapForm, Stack,
} from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, updateUserFormFields } from '../../helpers/forms/UpdateUserFormHelpers';
import Form from './Form';
import FormControl from './FormControl';
import useUpdateUser from '../../hooks/mutations/users/useUpdateUser';
import { useAuth } from '../../contexts/auth/AuthProvider';
import Spinner from '../shared/stylings/Spinner';

export default function UpdateUserForm() {
  // TODO: Make LOCALES a context that provides the available languages and their native names in the client app.
  const LOCALES = {
    en: 'English',
    ar: 'العربيّة',
    fr: 'Français',
    es: 'Española',
  };

  const currentUser = useAuth();
  const methods = useForm({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      language: currentUser?.language,
    },
    resolver: yupResolver(validationSchema),
  });
  const { formState: { isSubmitting } } = methods;
  const updateUser = useUpdateUser(currentUser?.id);
  const fields = updateUserFormFields;

  return (
    <Form methods={methods} onSubmit={updateUser.mutate}>
      <FormControl field={fields.name} type="text" />
      <FormControl field={fields.email} type="email" />
      <FormControl field={fields.language} control={BootStrapForm.Select}>
        {
          Object.keys(LOCALES).map((code) => <option key={code} value={code}>{LOCALES[code]}</option>)
        }
      </FormControl>
      {
        // TODO: Refactor this to use FormControl instead.
      }
      <BootStrapForm.Group className="mb-3" controlId={fields.userRole.controlId}>
        <BootStrapForm.Label className="small mb-0">
          {fields.userRole.label}
        </BootStrapForm.Label>
        <BootStrapForm.Select field={fields.userRole} type="select" />
      </BootStrapForm.Group>

      <Stack direction="horizontal" gap={2} className="float-end">
        <Button
          variant="primary-light"
          onClick={() => methods.reset({
            name: currentUser.name,
            email: currentUser.email,
          })}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Update
          {
            isSubmitting && <Spinner />
          }
        </Button>
      </Stack>
    </Form>
  );
}
