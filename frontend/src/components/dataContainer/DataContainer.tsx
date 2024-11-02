import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { loadData, setRegion, setErrors, setSeed, setPage } from '../../store/slices/dataSlice';
import { exportDataToCSV } from '../../services/api';
import RegionSelector from '../regionSelector/RegionSelector';
import ErrorSlider from '../errorSlider/ErrorSlider';
import SeedInput from '../seedInput/SeedInput';
import DataTable from '../dataTable/DataTable';
import { RootState } from '../../store/store';
import { LoadDataParams } from '../../models/DataState';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';

const DataContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { region, errors, seed, data, page, loading, hasMore } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    const params: LoadDataParams = { region, errors, seed, page };
    dispatch(loadData(params));
  }, [dispatch, region, errors, seed, page]);

  const handleScrollEnd = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(setPage(page + 1));
    }
  }, [dispatch, loading, hasMore, page]);

  const handleRegionChange = (newRegion: string) => {
    dispatch(setRegion(newRegion));
  };

  const handleErrorChange = (newErrors: number) => {
    dispatch(setErrors(newErrors));
  };

  const handleSeedChange = (newSeed: string) => {
    dispatch(setSeed(newSeed));
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 100000).toString();
    dispatch(setSeed(randomSeed));
  };

  const exportMutation = useMutation({
    mutationFn: () => exportDataToCSV(data),
    onSuccess: () => alert('Data exported successfully!'),
    onError: (error) => console.error('Error exporting data:', error),
  });

  const handleExport = () => {
    if (data.length > 0) {
      exportMutation.mutate();
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Fake Data Generator</h1>

      <Card className="p-3 mb-4" style={{ marginTop: '-20px' }}> {/* Уменьшаем верхний отступ */}
        <Row className="align-items-center">
          <Col md={4} sm={12} className="mb-2">
            <RegionSelector value={region} onChange={handleRegionChange} />
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <ErrorSlider value={errors} onChange={handleErrorChange} />
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <SeedInput value={seed} onChange={handleSeedChange} onRandom={handleRandomSeed} />
          </Col>
        </Row>
      </Card>

      <Card className="p-3 mb-4">
        <DataTable data={data} isLoading={loading} onScrollEnd={handleScrollEnd} />
      </Card>

      <div className="d-flex justify-content-center">
        <Button onClick={handleExport} disabled={exportMutation.status === 'pending'}>
          {exportMutation.status === 'pending' ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Exporting...
            </>
          ) : (
            'Export to CSV'
          )}
        </Button>
      </div>
    </Container>
  );
};

export default DataContainer;
