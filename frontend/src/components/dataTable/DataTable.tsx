import React, { useRef, useEffect, useCallback } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { DataTableProps } from '../../models/types';
import styles from '../../styles/DataTable.module.css';

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
    <div ref={tableContainerRef} className={styles.tableContainer}>
      <Table striped bordered hover responsive className={`mb-0 ${styles.tableStyle}`}>
      <thead>
          <tr>
            <th className={styles.columnWidth}>ID</th>
            <th className={styles.columnWidth}>Name</th>
            <th className={styles.columnWidth}>Address</th>
            <th className={styles.columnWidth}>Phone</th>
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
