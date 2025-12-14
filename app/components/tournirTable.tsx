import { Table, Skeleton } from "@radix-ui/themes";

import { IResultsTableData } from "../(home)/types";

export const TournirTable = ({
  data,
  title,
  loading,
}: {
  data: IResultsTableData[];
  title: string;
  loading: boolean;
}) => {
  const tableBody = (data: IResultsTableData[]) => {
    return data.map((item) => {
      return (
        <Table.Row align='center' key={item.player_id}>
          <Table.RowHeaderCell>{item.personName}</Table.RowHeaderCell>
          <Table.Cell>{item.score}</Table.Cell>
        </Table.Row>
      );
    });
  };

  const skeletonBody = () => {
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

  const tableHead = (isSkeleton: boolean) => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Player"}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{isSkeleton ? <Skeleton /> : "Scores"}</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
    );
  };

  return (
    <div className="w-full">
      <h3>{title}</h3>
      <Table.Root variant='surface' className='w-full'>
        {tableHead(loading)}
        <Table.Body>{!data.length ? skeletonBody() : tableBody(data)}</Table.Body>
      </Table.Root>
    </div>
  );
};
