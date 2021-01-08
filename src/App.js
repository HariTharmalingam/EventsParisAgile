import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";
import Map from "./Components/Map";
import SideBar from "./Components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import Alerts from "./Components/Alerts";

function App(props) {
  return (
    <Provider store={store}>
      <Row noGutters className="App" style={{ flex: 1, flexDirection: "row" }}>
        <Col lg={4}>
          <SideBar />
        </Col>
        <Col lg={8}>
        <Alerts />
          <Map />
        </Col>
      </Row>
    </Provider>
  );
}

export default App;
