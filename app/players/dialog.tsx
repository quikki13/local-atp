"use client";

import { Dialog, Flex, Button } from "@radix-ui/themes";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { createPlayer } from "@/app/api/actions";

export const DialogContent = () => {
  const getErrorMessage = (name: string) => {
    return (
      <ErrorMessage name={name}>
        {(msg) => <div className='text-red-400 text-[14px]'>{msg}</div>}
      </ErrorMessage>
    );
  };
  return (
    <Dialog.Content maxWidth='450px'>
      <Dialog.Title>Adding new Player</Dialog.Title>
      <Dialog.Description size='2' mb='4'>
        Paste the name of new player in format FirstName SecondName. Email is optional field
      </Dialog.Description>

      <Formik
        initialValues={{ name: "", email: "" }}
        validate={(values) => {
          const playerNameregex = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;
          const errors: { name?: string; email?: string } = {};
          if (!values.name) {
            errors.name = "Player name is required";
          } else if (!playerNameregex.test(values.name)) {
            errors.name =
              "Please use next pattern for name: FirstName SecondName (start its from capitals)";
          } else if (
            values.email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          createPlayer(values);
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex direction='column' gap='3'>
              <Field type='name' name='name' placeholder='Player name' />
              {getErrorMessage("name")}
              <Field type='email' name='email' placeholder='Email' />
              {getErrorMessage("email")}
            </Flex>
            <Flex gap='3' mt='4' justify='end'>
              <Dialog.Close>
                <Button variant='soft' color='gray'>
                  Cancel
                </Button>
              </Dialog.Close>

              <Button type='submit' disabled={isSubmitting}>
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Dialog.Content>
  );
};
