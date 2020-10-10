import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function WidgetText(props) {
    return (

        <div id='textDiv'>

            <Card
                text='white'
                bg='dark'
                style={{ width: '18rem', 
                         borderRadius: '3%', 
                         margin:'10%' }}>

                <Card.Header>{props.title}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.value}</Card.Title>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                </Card.Body>

            </Card>

        </div>

    );
}

export default WidgetText;

