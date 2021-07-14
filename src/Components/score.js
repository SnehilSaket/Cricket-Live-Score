import { Component } from "react";
import { Card, CardContent, Typography, Grid, Box,Button, CardActions} from "@material-ui/core";
import logo from '../images/finalvs.jpg';
import {withStyles} from "@material-ui/core/styles"
import { getCricketMatchDetails } from "../Service/cricket-api";

const styles = {
    date: {
        alignItems: 'flex-start',
        marginBottom: 20,
        fonsize: 12       
    },
    // container: {
    //     display: 'flex'
    // },
    matchDetails: {
        marginLeft: 'auto',
        fonsize: 12   
    },
    component : {
        background: '#3f51b5',
        padding: '10px',
        color: 'white',
        display: 'flex',
        alignItems: 'flex-start'
    }
}


class Score extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            open: false
        }
    }


    getDetails(id){
        getCricketMatchDetails(id).then(data => {
            console.log(data);
            this.setState({ detail: this.state.detail = data });
        }).catch(error => console.log(error))
    }

    getScore = (score) => {
        if (!score) return {};
        let numb = score && score.split('/');
        let nummid = numb && numb[1] && numb[1].split('v');
        let ans = {};
        ans.first = numb && nummid && numb[0] && nummid[0] && numb[0].replace(/[^0-9]/g, '') + '/' + nummid[0].replace(/[^0-9]/g, '');
        ans.second = numb && nummid && numb[2] && nummid[1] && nummid[1].replace(/[^0-9]/g, '') + '/' + numb[2].replace(/[^0-9]/g, '');
        // console.log(ans.first + '   ' + ans.second);
        return ans;
    }

    render() {
        let score = this.getScore(this.state.detail.score);
        return (
            <Card style= {{margin: '20px', width: 700}}>
                <Box className = {this.props.classes.component}>
                    <Typography>{this.props.match['team-1']} VS {this.props.match['team-2']}</Typography>
                    <Button onClick = {() => this.getDetails(this.props.match.unique_id)} variant = 'contained' color="secondary" size = 'small' style= {{marginLeft: 'auto', borderRadius: 10}}disabled = {this.props.match.matchStarted ? false : true}>Get Score</Button>
                </Box>
                <CardContent style= {{backgroundColor: '#fcf7f7'}}>
                    <Box style = {{display: 'flex'}}>
                        <Typography className = {this.props.classes.date}>{new Date(this.props.match.dateTimeGMT).toLocaleString()}</Typography>
                        <Typography className = {this.props.classes.matchDetails}>{this.props.match.matchStarted ? "Match started" : "Match not yet started"}</Typography>
                    </Box>
                    <Grid container justify = 'center' alignItems = 'center' alignContent= 'center'>
                        <Grid>
                            <Typography variant = 'h4'>{this.props.match['team-1']}</Typography>
                            <Typography>{score.first}</Typography>
                        </Grid>
                        <Grid>
                            <img style = {{width:100, height: 100}} src={logo} alt="Vs" />
                        </Grid>
                        <Grid>
                            <Typography variant = 'h4'>{this.props.match['team-2']}</Typography>
                            <Typography>{score.second}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style= {{backgroundColor: '#fcf7f7'}}>
                    <Grid container justify="center" style={{ display: 'block' }}>
                        <Typography>{this.state.detail.score}</Typography>
                        <Typography style={{ fontSize: 12 }}>Limited in-person attendance</Typography>
                    </Grid>
                </CardActions>
            </Card>
    )

    }
}

export default withStyles(styles)(Score);
