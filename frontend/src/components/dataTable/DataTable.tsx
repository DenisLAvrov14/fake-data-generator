import React, { useRef, useEffect, useCallback } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { DataTableProps } from '../../models/types';

const DataTable: React.FC<DataTableProps> = ({ data, isLoading, onScrollEnd }) => {
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (tableContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
        onScrollEnd();
      }
    }
  }, [isLoading, onScrollEnd]);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const rowCount = isLoading || data.length === 0 ? 20 : data.length;

  return (
    <div
      ref={tableContainerRef}
      style={{
        maxHeight: '500px',
        overflowY: 'auto',
        border: '1px solid #dee2e6',
        borderRadius: '0.25rem',
        padding: '10px',
      }}
    >
      <Table striped bordered hover responsive className="mb-0" style={{ tableLayout: 'fixed', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '25%' }}>ID</th>
            <th style={{ width: '25%' }}>Name</th>
            <th style={{ width: '25%' }}>Address</th>
            <th style={{ width: '25%' }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, index) => (
            <tr key={index}>
              <td>{data[index]?.id || '...'}</td>
              <td>{data[index]?.name || '...'}</td>
              <td>{data[index]?.address || '...'}</td>
              <td>{data[index]?.phone || '...'}</td>
            </tr>
          ))}
          {isLoading && (
            <tr>
              <td colSpan={4} className="text-center">
                <Spinner animation="border" size="sm" role="status" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
