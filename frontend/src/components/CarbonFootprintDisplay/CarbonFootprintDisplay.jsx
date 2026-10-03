import { useCarbonFootprint } from 'react-carbon-footprint';

const CarbonFootprintDisplay = () => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #ccc',
        padding: '12px 16px',
        borderRadius: '8px',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        color: '#111',
        maxWidth: '300px'
      }}
    >
      <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#16803c' }}>
        Network Carbon Footprint
      </h3>
      <p style={{ margin: '4px 0', fontSize: '13px' }}>
        Bytes Transferred: <strong>{bytesTransferred ? bytesTransferred.toLocaleString() : 0}</strong> bytes
      </p>
      <p style={{ margin: '4px 0', fontSize: '13px' }}>
        CO2 Emissions: <strong>{gCO2 ? gCO2.toFixed(3) : '0.000'}</strong> grams CO2eq
      </p>
      <p style={{ fontSize: '0.8em', color: '#666', margin: '6px 0 0 0' }}>
        (Estimates based on network data transfer during this session)
      </p>
    </div>
  );
};

export default CarbonFootprintDisplay;
