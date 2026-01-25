import { ChangeEvent, useState } from "react";
import { Dialog, Flex, Text, Button, Select } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";

import { Datepicker } from "@/app/components/datepicker";
import { createTour } from "@/app/api/actions";

import { IDialogContentProps } from "./types";

export const DialogContent = ({ seasons, setToursData }: IDialogContentProps) => {
  const [postData, setPostdata] = useState({ date: "", season_id: "" });

  const validateData = postData.date && postData.season_id;

  const onSave = async () => {
    if (validateData) {
      const { date, season_id } = postData;
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth() + 1;
      const monthName = new Date(date).toLocaleString('en-US', { month: 'long' });
      const day = new Date(date).getDate();

      const name = `${day} ${monthName} ${year}`;
      const formatedDate = `${year}-${month}-${day}`;

      const prepearedPostData = {
        date: formatedDate,
        name,
        season: seasons.find((el) => el.id === postData.season_id)?.name || "",
        season_id: season_id,
        id: uuidv4(),
      };

      await createTour(prepearedPostData);
      setToursData((prev) => {
        return { ...prev, tours: [...prev.tours, prepearedPostData] };
      });
    }
  };

  const select = () => {
    return (
      <Select.Root
        value={postData.season_id}
        onValueChange={(value) => setPostdata({ ...postData, season_id: value })}
      >
        <Select.Trigger placeholder='Select a season' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Seasons</Select.Label>
            {seasons.map((season) => (
              <Select.Item
                key={season.id}
                value={season.id}
                onSelect={() => console.log(season.id)}
              >
                {season.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  };

  return (
    <Dialog.Content maxWidth='450px'>
      <Dialog.Title>Adding tour</Dialog.Title>
      <Dialog.Description size='2' mb='4'>
        Adding new play tour to the system
      </Dialog.Description>

      <Flex direction='column' gap='3'>
        <label>
          <Text as='div' size='2' mb='1' weight='bold'>
            Season
          </Text>
          {select()}
        </label>
        <label>
          <Text as='div' size='2' mb='1' weight='bold'>
            Date
          </Text>
          <Datepicker
            value={postData.date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostdata({ ...postData, date: e.target.value })
            }
          />
        </label>
      </Flex>

      <Flex gap='3' mt='4' justify='end'>
        <Dialog.Close>
          <Button variant='soft' color='gray'>
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={() => validateData && onSave()}>Save</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
};
