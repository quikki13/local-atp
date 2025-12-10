"use client";

import { Dialog, Flex, Button, Select } from "@radix-ui/themes";

import { Formik, Form, Field } from "formik";

import { createSeason } from "@/app/api/actions";

export const DialogContent = () => {
  const currYear = new Date().getFullYear();
  const yearsList = Array.from({ length: 10 }, (_, index) => currYear - 5 + index);

  const select = (value: string, func: (e: React.ChangeEvent<unknown>) => void) => {
    return (
      <>
        <Select.Root
          name='year'
          value={value}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onValueChange={(e) => func({ target: { name: "year", value: e } })}
        >
          <Select.Trigger placeholder='Year' />
          <Select.Content>
            <Select.Group>
              <Select.Label>Select year</Select.Label>
              {yearsList.map((year) => (
                <Select.Item key={year} value={year.toString()}>
                  {year.toString()}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </>
    );
  };

  return (
    <Dialog.Content maxWidth='450px'>
      <Dialog.Title>Adding Season</Dialog.Title>
      <Dialog.Description size='2' mb='4'>
        Pick the year for the new season. You would be able to use it for creating new tours
      </Dialog.Description>

      <Formik
        initialValues={{ year: (currYear + 1).toString() }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
          createSeason(values);
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <Flex direction='column' gap='3'>
              <Field name='year' component={() => select(values.year, handleChange)} />
            </Flex>

            <Flex gap='3' mt='4' justify='end'>
              <Dialog.Close>
                <Button variant='soft' color='gray'>
                  Cancel
                </Button>
              </Dialog.Close>

              <Dialog.Close>
                <Button type='submit' disabled={isSubmitting}>
                  Submit
                </Button>
              </Dialog.Close>
            </Flex>
          </Form>
        )}
      </Formik>
    </Dialog.Content>
  );
};
