import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const HighscoreList = ({ highscores }) => {
  const columns = [
    {
      id: 'index',
      Cell: row => {
        return <div>{row.index + 1}</div>;
      },
      className: 'hs-index',
      width: 30,
      style: { padding: 0, margin: 0 }
    },
    {
      Cell: row => {
        return <div>{row.value}</div>;
      },
      accessor: 'player',
      className: 'hs-player',
      width: 130,
      style: { padding: 0, margin: 0 }
    },
    {
      Cell: row => {
        return <div style={{ padding: 0 }}>{row.value}</div>;
      },
      accessor: 'score',
      className: 'hs-score',
      width: 60,
      style: { padding: '0 15px 0 0', margin: 0 }
    },
    {
      Cell: row => {
        return <div>{row.value}</div>;
      },
      id: 'scoreDate',
      accessor: d => moment(d.date).format('YYYY-MM-DD'),
      className: 'hs-date',
      width: 80,
      style: { padding: 0, margin: 0 }
    }
  ];
  return (
    <div>
      <ReactTable showPagination={false} showPaginationBottom={false} sortable={false} data={highscores} columns={columns} />
    </div>
  );
};

export default HighscoreList;
