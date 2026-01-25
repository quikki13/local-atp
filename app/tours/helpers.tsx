import { Dispatch, SetStateAction } from "react";
import { Button, Table, Skeleton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

import { removeTour } from "@/api/actions";

import { ITour, ITourWithSeason } from "./types";

export const tableBody = (tours: ITour[], setData: Dispatch<SetStateAction<ITourWithSeason>>) => {
  return tours.map((tour) => {

    const onClick = () => {
      removeTour(tour.id);
      setData((prev) => {
        return { ...prev, tours: prev.tours.filter((el) => el.id !== tour.id) };
      });
    };

    return (
      <Table.Row align='center' key={tour.id} onClick={() => console.log("click on tour")}>
        <Table.RowHeaderCell>{tour.season}</Table.RowHeaderCell>
        <Table.Cell>{tour.name}</Table.Cell>
        <Table.Cell>
          <Button variant='surface' color='crimson' className='cursor-pointer' onClick={onClick}>
            <TrashIcon />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  });
};

export const skeletonBody = () => {
  return (
    <Table.Row align='center'>
      <Table.RowHeaderCell>
        <Skeleton />
      </Table.RowHeaderCell>
      <Table.Cell>
        <Skeleton />
      </Table.Cell>
      <Table.Cell>
        <Skeleton />
      </Table.Cell>
    </Table.Row>
  );
};

export const tableHead = (isSkeleton: boolean) => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Season"}</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Tour"}</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>{isSkeleton && <Skeleton />}</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
};
