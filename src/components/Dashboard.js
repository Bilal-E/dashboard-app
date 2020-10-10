import React, { Component } from 'react';
import './Dashboard.css';

import WidgetText from './WidgetText';
import WidgetBar from './WidgetBar';
import WidgetPie from './WidgetPie';
import WidgetDoughnut from './WidgetDoughnut';
import WidgetColumn from './WidgetColumn';


import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//excel import
const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {

    constructor() {
        super();

        this.state = {
            items: [],

            dropDownOptions: [],

            selectedValue: null,

            organicSource: null,
            directSource: null,
            referralSource: null,
            socialSource: null,
            emailSource: null,
            pageViews: null,
            users: null,
            newUsers: null,
            sessions: null,

            barArr: [],
            pieArr: [],
            doughnutArr: [],
            doughnut2Arr: [],
            columnArr: []

        }
    }

    getData = arg => {

        const arr = this.state.items;

        let organicSource = 0;
        let directSource = 0;
        let referralSource = 0;
        let socialSource = 0;
        let emailSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let sessions = 0;
        let sessionsPerUsers = 0;
        let pagePerSession = 0;
        let avgSessionTime = 0;
        let bounceRate = 0;

        let barArr = [];
        let pieArr = [];
        let doughnutArr = [];
        let doughnut2Arr = [];
        let columnArr = [];

        for (let i = 0; i < arr.length; i++) {

            if (arg === arr[i]["month"]) {

                organicSource = arr[i].organic_source;
                directSource = arr[i].direct_source;
                referralSource = arr[i].referral_source;
                socialSource = arr[i].social_source;
                emailSource = arr[i].email_source;
                pageViews = arr[i].page_views;
                users = arr[i].users;
                newUsers = arr[i].new_users;
                sessions = arr[i].sessions;
                sessionsPerUsers = arr[i].number_of_sessions_per_users;
                pagePerSession = arr[i].page_per_session;
                avgSessionTime = arr[i].avg_session_time;
                bounceRate = arr[i].bounce_rate;

                barArr.push(
                    {
                        label: "Organic",
                        value: arr[i].organic_source
                    },
                    {
                        label: "Direct",
                        value: arr[i].direct_source
                    },
                    {
                        label: "Referral",
                        value: arr[i].referral_source
                    },
                    {
                        label: "Social",
                        value: arr[i].social_source
                    },
                    {
                        label: "Email",
                        value: arr[i].email_source
                    },
                );

                pieArr.push(
                    {
                        label: "Sessions per User",
                        value: arr[i].number_of_sessions_per_users
                    },
                    {
                        label: "Page per Session",
                        value: arr[i].page_per_session
                    },
                    {
                        label: "Avg. Session Time",
                        value: arr[i].avg_session_time
                    },
                    {
                        label: "Bounce Rate",
                        value: arr[i].bounce_rate
                    }
                );

                doughnutArr.push(
                    {
                        label: "Pages per Session",
                        value: arr[i].page_per_session
                    },
                    {
                        label: "Avg. Session Time",
                        value: arr[i].avg_session_time
                    }
                );

                doughnut2Arr.push(
                    {
                        label: "Page Views",
                        value: arr[i].page_views
                    },
                    {
                        label: "Sessions",
                        value: arr[i].sessions
                    }
                );

                columnArr.push(
                    {
                        label: "Users",
                        value: arr[i].users
                    },
                    {
                        label: "New Users",
                        value: arr[i].new_users
                    }
                );

            }
        }

        this.setState({
            organicSource: organicSource,
            directSource: directSource,
            referralSource: referralSource,
            socialSource: socialSource,
            emailSource: emailSource,
            pageViews: pageViews,
            users: users,
            newUsers: newUsers,
            sessions: sessions,
            sessionsPerUsers: sessionsPerUsers,
            pagePerSession: pagePerSession,
            avgSessionTime: avgSessionTime,
            bounceRate: bounceRate,
            barArr: barArr,
            pieArr: pieArr,
            doughnutArr: doughnutArr,
            doughnut2Arr: doughnut2Arr,
            columnArr: columnArr,

        },
            () => {
                console.log(this.state.organicSource);
                console.log(this.state.doughnutArr);

            }
        )
    }

    updateDashboard = event => {
        this.getData(event.value);
        this.setState({
            selectedValue: event.value,
        },
            () => {
                console.log(this.state.organicSource);
            }
        );
    }

    componentDidMount() {

        fetch(url)
            .then(response => response.json())
            .then(data => {

                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }

                // dropdown options
                let dropDownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropDownOptions.push(rows[i].month);
                }

                dropDownOptions = Array.from(new Set(dropDownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropDownOptions: dropDownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );

            });
    }


    render() {

        return (

            <div>

                <Container fluid>

                    <Row id='headRow'>

                        <Col id='heading'>
                            Website Traffic Dashboard
                    </Col>

                        <Col>
                            <Dropdown
                                options={this.state.dropDownOptions}
                                onChange={this.updateDashboard}
                                value={this.state.selectedValue}
                                placeholder="Select an option" />;
                    </Col>

                    </Row>

                </Container>

                <Container>

                    <Row>

                        <Col>
                            <WidgetText title='Organic Source' value={this.state.organicSource} />
                        </Col>

                        <Col>
                            <WidgetText title='Direct Source' value={this.state.directSource} />
                        </Col>

                        <Col>
                            <WidgetText title='Referral Source' value={this.state.referralSource} />
                        </Col>

                        <Col>
                            <WidgetText title='Social Source' value={this.state.socialSource} />
                        </Col>

                        <Col>
                            <WidgetText title='Email Source' value={this.state.emailSource} />
                        </Col>

                        <Col>
                            <WidgetText title='Page Views' value={this.state.pageViews} />
                        </Col>

                    </Row>

                    <Row>

                        <Card
                            text='white'
                            bg='dark'
                            style={{
                                width: '100%',
                                borderRadius: '3%',
                                margin: '5%'
                            }}>

                            <Col>
                                <WidgetBar data={this.state.barArr} />
                            </Col>

                        </Card>

                    </Row>

                    <Row id='row4'>

                        <Card
                            text='white'
                            bg='dark'
                            style={{
                                width: '28rem',
                                borderRadius: '3%',
                                margin: '5%'
                            }}>
                            <Col>
                                <WidgetPie data={this.state.pieArr} />
                            </Col>

                        </Card>

                        <Card
                            text='white'
                            bg='dark'
                            style={{
                                width: '28rem',
                                borderRadius: '3%',
                                margin: '5%'
                            }}>
                            <Col>
                                <WidgetColumn data={this.state.columnArr} />
                            </Col>

                        </Card>

                    </Row>

                    <Row id='row5'>
                        <Card
                            text='white'
                            bg='dark'
                            style={{
                                width: '28rem',
                                borderRadius: '3%',
                                margin: '5%'
                            }}>
                            <Col>
                                <WidgetDoughnut data={this.state.doughnutArr} />
                            </Col>
                        </Card>

                        <Card
                            text='white'
                            bg='dark'
                            style={{
                                width: '28rem',
                                borderRadius: '3%',
                                margin: '5%'
                            }}>

                            <Col>
                                <WidgetDoughnut data={this.state.doughnut2Arr} />
                            </Col>

                        </Card>

                    </Row>

                </Container>

            </div>

        );
    }
}

export default Dashboard;