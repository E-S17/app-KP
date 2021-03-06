import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../components/Loader';
import CanvasJSReact from '../assets/canvasjs.react';
import Sidebar from '../components/Sidebar';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DataJenisK = () => {
  const [grafikA, setGrafikA] = useState([]);

  useEffect(() => {
    const fetchGrafikA = async () => {
      const response = await axios.get('/api/grafikagama');

      setGrafikA(response.data);
    };
    fetchGrafikA();
  }, []);

  const agama = grafikA.map(grafik => {
    return {
      label: grafik._id,
      y: grafik.count,
    };
  });

  const options = {
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: 'Grafik Data',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}',
        dataPoints: agama,
      },
    ],
  };

  return (
    <>
      <Container className="py-3">
        <Row>
          <Col md={9}>
            <Card>
              <Card.Header>Demografi Berdasar Agama</Card.Header>
              {grafikA.length === 0 ? (
                <Loader />
              ) : (
                <Card.Body>
                  <Card.Title>Statistik Kelurahan Malalayang</Card.Title>
                  <Card.Text>
                    <CanvasJSChart options={options} />
                  </Card.Text>
                </Card.Body>
              )}
            </Card>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default DataJenisK;
