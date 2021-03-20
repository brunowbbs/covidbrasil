import React, { useState } from 'react'
import { MapBrazil } from 'react-brazil-map';

export default function App() {

  const [estado, setEstado] = useState('');
  const [casos, setCasos] = useState('');
  const [mortes, setMortes] = useState('');
  const [suspeitos, setSuspeitos] = useState('');

  const handleDistrict = (res) => {

    fetch("https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/" + res)
      .then(res => res.json())
      .then(
        (result) => {
          setMortes(result.deaths);
          setCasos(result.cases);
          setSuspeitos(result.suspects);

          switch (res) {
            case 'AC': setEstado('Acre'); break;
            case 'AL': setEstado('Alagoas'); break;
            case 'AP': setEstado('Amapá'); break;
            case 'AM': setEstado('Amazonas'); break;
            case 'BA': setEstado('Bahia'); break;
            case 'CE': setEstado('Ceará'); break;
            case 'DF': setEstado('Distrito Federal'); break;
            case 'ES': setEstado('Espirito Santo'); break;
            case 'GO': setEstado('Goiás'); break;

            case 'MA': setEstado('Maranhão'); break;
            case 'MT': setEstado('Mato Grosso'); break;
            case 'MS': setEstado('Mato Grosso do Sul'); break;
            case 'MG': setEstado('Minas Gerais'); break;
            case 'PA': setEstado('Pará'); break;
            case 'PB': setEstado('Paraíba'); break;
            case 'PR': setEstado('Paraná'); break;
            case 'PE': setEstado('Pernambuco'); break;
            case 'PI': setEstado('Piauí'); break;
            case 'RJ': setEstado('Rio de Janeiro'); break;

            case 'RN': setEstado('Rio Grande do Norte'); break;
            case 'RS': setEstado('Rio Grande do Sul'); break;
            case 'RO': setEstado('Rondônia'); break;
            case 'RR': setEstado('Roraima'); break;
            case 'SC': setEstado('Santa Catarina'); break;
            case 'SP': setEstado('São Paulo'); break;
            case 'SE': setEstado('Sergipe'); break;
            case 'TO': setEstado('Tocantins'); break;
            default: setEstado('Erro. Tente Novamente!')

          }
        },
        (error) => {
          alert(error)
        }
      )
  }

  const formatNumber = (number) => {
    return number.toString().replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
  }

  return (
    <div className="container">
      <div className='map-right'>
        <MapBrazil width="100%" height='100%' onChange={handleDistrict} />
      </div>

      <div className="information-left">
        <div className="container-info">

          <div className="subcontainer">
            <h1>Covid Brasil</h1>

            <p style={{ fontSize: 18, height: 'auto', paddingLeft: 20, marginBottom: 30 }}>
              Selecione um estado no mapa e acompanhe os seus dados relacionados a COVID-19 em tempo real.
              </p>

            <div className="container-txt">
              <strong>Estado:</strong>
              <span>{estado ? estado : '---'}</span>
            </div>

            <div className="container-txt">
              <strong>Casos:</strong>
              <span>{casos ? formatNumber(casos) : '---'}</span>
            </div>

            <div className="container-txt">
              <strong>Mortes:</strong>
              <span>{mortes ? formatNumber(mortes) : '---'}</span>
            </div>

            <div className="container-txt">
              <strong>Suspeitos:</strong>
              <span>{suspeitos ? formatNumber(suspeitos) : '---'}</span>
            </div>
            <div className="container-txt">
              <span style={{ fontSize: 16 }}><b>Fonte:</b> covid19-brazil-api</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
