import React, {Component} from 'react';
import { Image, Container, Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser'
import 'moment/locale/fr'
import moment from 'moment'
import { ArrowLeft } from 'react-bootstrap-icons'

class Event extends Component {
  constructor(props) {
    super(props)
    this.descriptionRef = React.createRef();
  }

    componentDidMount(){
      moment.locale('fr')
      if (this.descriptionRef)
       this.descriptionRef.current.querySelectorAll('p, span').forEach(element => element.style.fontSize = "14px");
    }

    render(){
      const {data, setCurrentEvent} = this.props
     
      return(
        <div id="seeEvent" className="currentEventScroll">
                <div className=" mt-1 mb-3">
                  <Button onClick={() => setCurrentEvent()} variant="dark" className="m-3" style={{position: "fixed"}}><ArrowLeft  size={16}/>  Retour</Button>
                </div>
              <div className="text-center">
              <Image alt={data.fields.cover_alt} fluid src={data.fields.cover_url} />
              </div>
              
              
              <Container>
                <div className="mt-2 text-center">
                  <h1 className="h2 font-weight-bold">{data.fields.title}</h1>
                  <p style={{color: "black"}}>Catégorie : {data.fields.category}</p>
                </div>

                <div className="mt-3 text-dark">
                  <p style={{color: "black"}} className="mb-0">Début : {moment(data.fields.date_start).format("LLLL")}</p>
                  <p style={{color: "black"}} className="mb-0">Fin : {moment(data.fields.date_end).format("LLLL")}</p>
                  <br/>
                  <p style={{color: "black"}}>{data.fields.address_name}, {data.fields.address_street} {data.fields.address_city} {data.fields.address_zipcode}</p>
                </div>
                <div className="mb-5">
                  <p style={{color: "black"}}>
                    {data.fields.lead_text}
                  </p>
                </div>
                <div>
                  <h2 className="h4">Description</h2>
                </div>
                <div ref={this.descriptionRef} style={{color : "black"}}>
                  {ReactHtmlParser(data.fields.description)}             
                </div>
                

                <div className="mb-2 mt-2">
                  <h2 className="h4">Accès</h2>
                  <p className="text-secondary">{data.fields.address_name}, {data.fields.address_street} {data.fields.address_city} {data.fields.address_zipcode}</p>
                  <p className="text-secondary">Métro : {data.fields.transport}</p>
                </div>

                <div className="mb-2 mt-2">
                  <h2 className="h4">Réservation</h2>
                  <p className="text-secondary">Type d'accès : <span className="text-success">{data.fields.access_type}</span></p>
                  <p className="text-secondary">{data.fields.access_mail && "Email : " + data.fields.access_mail}</p>
                  <p className="text-secondary">{data.fields.access_phone && "Téléphone : " + data.fields.access_phone}</p>
                  <a target="_blanck" href={data.fields.access_link} className="text-secondary">{data.fields.access_link &&  data.fields.access_link }</a>
                  {data.fields.price_detail && <p className="text-secondary">{data.fields.price_detail}</p>}

                </div>

                <div className="mb-4 mt-2">
                  <h2 className="h4">Contact</h2>
                  <p className="text-secondary">{data.fields.contact_name && "Nom du contact : " + data.fields.contact_name}</p>
                  <p className="text-secondary">{data.fields.contact_mail && "Email : " + data.fields.contact_mail}</p>
                  <p className="text-secondary">{data.fields.contact_phone && "Téléphone : " + data.fields.contact_phone}</p>
                  <p className="text-secondary">{data.fields.contact_facebook && "Facebook :" + data.fields.contact_facebook }</p>
                  <a target="_blanck" href={data.fields.contact_url} className="text-secondary">{data.fields.contact_url && "Site : " + data.fields.contact_url }</a>
                </div>
              </Container>
        </div>
      )
    }

}

export default Event