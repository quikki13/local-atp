import { Table, Skeleton } from "@radix-ui/themes";

import { ISeason } from "./types";

export const tableBody = (seasons: ISeason[]) => {
  return seasons.map((season) => {
    return (
      <Table.Row align='center' key={season.id}>
        <Table.RowHeaderCell>{season.name}</Table.RowHeaderCell>
        <Table.Cell>{season.year}</Table.Cell>
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
    </Table.Row>
  );
};

export const tableHead = (isSkeleton: boolean) => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Season name"}</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Year"}</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
};
