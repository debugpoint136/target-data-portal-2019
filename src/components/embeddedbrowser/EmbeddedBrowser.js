import React, {Component} from 'react';
// import CONFIG from '../config.json'
import {
    // Button, Header, Transition,
    Embed,  Container} from 'semantic-ui-react';

export default class EmbeddedBrowser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            active: false
        }
    }

    toggleVisibility = () => this.setState({
        visible: !this.state.visible,
        active: !this.state.active
    })

    render() {
        return (
            <div>
                <Container
                    style={{
                    maxHeight: '400px',
                    overflow: 'hidden'
                }}>
                    <Embed
                        active
                        iframe={{
                        allowFullScreen: false,
                        style: {
                            padding: 30
                        }, 
                        // src: `${CONFIG.TARGET_DATA_URL}/${this.props.accession}.html` 
                        src: 'https://target.wustl.edu/example.html' 
                        }}/>
                </Container>

            </div>
        );
    }
}