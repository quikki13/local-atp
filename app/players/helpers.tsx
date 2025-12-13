import { Table, Skeleton } from "@radix-ui/themes";

import { IPlayer } from "./types";

export const tableBody = (players: IPlayer[]) => {
  return players.map((player) => {
    return (
      <Table.Row align='center' key={player.id}>
        <Table.RowHeaderCell>{player.name}</Table.RowHeaderCell>
        <Table.Cell>{player.email || '-'}</Table.Cell>
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
        <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Player"}</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Email"}</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
};
