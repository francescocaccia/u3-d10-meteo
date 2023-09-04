import { Container, Form, Button, ListGroup } from "react-bootstrap";
import MyCard from "./MyCard";
import { useState } from "react";
import meteo from "../meteo.svg";
import { BsSearch } from "react-icons/bs";
const key = "e546e7f2074d9e0c2509db589789d3b7";
const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&cnt=8&lang=IT&`;
const geoLocationApi = `http://api.openweathermap.org/geo/1.0/direct?limit=1&appid=${key}&q=`;

const Meteo = () => {
  const [city, setCity] = useState("");
  const [meteoData, setMeteoData] = useState([]);

  const onFormSubmit = e => {
    e.preventDefault();
    const getCity = async () => {
      const rawData = await fetch(geoLocationApi + city);
      const data = await rawData.json();
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    };
    const getWeather = async ({ lat, lon }) => {
      const rawData = await fetch(weatherApi + `lat=${lat}&lon=${lon}`);
      const data = await rawData.json();
      const forecast = data.list;
      setMeteoData(forecast);
      console.log(data)
      return data;

    };

    getCity().then(latLon => {
      getWeather(latLon);
    });
  };
  return (
    <Container fluid className="mb-5">
      <Form onSubmit={onFormSubmit} className="mb-3 d-flex justify-content-center mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold fs-3">Scrivi la città per scoprire il meteo</Form.Label>
          <div className="d-flex">
            <Form.Control
              value={city}
              type="text"
              placeholder="Città, paese"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button className="fw-semibold text-light align-items-center d-flex" variant="info" type="submit">
              Cerca <BsSearch className="ms-2" />
            </Button>
          </div>
        </Form.Group>
      </Form>

      {/* Visualizza l'h2 solo se meteoData ha dati */}
      {meteoData.length > 0 && (
        <div className="fs-2 text-center">
          <img src={meteo} alt="logoMeteo" width={90} height={90} /><p className="m-0">Meteo di:</p> <span className="text-info fs-1">{city} </span>{city.coord}
        </div>
      )}

      {meteoData.length > 0 ? (
        <ListGroup className="listMeteo">
          {meteoData.map((met) => (
            <MyCard key={met.dt} meteo={met} city={city} />
          ))}
        </ListGroup>
      ) : (
        <div className="container d-flex flex-column align-items-center mt-4">
          <h1 className="text-center mb-2">Francesco's Weather Forecast</h1>
          <div style={{ maxHeight: "710px", maxWidth: "710px" }}>
            <img src={meteo} alt="immagineMeteo" style={{ objectFit: "cover" }} className="mb-4 img-fluid " />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Meteo;
