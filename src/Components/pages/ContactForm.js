import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import store from '../../store'
import { SingleBreadCrumbs } from '../parts/BreadCrumbs'
import anime from 'animejs/lib/anime.es.js';
import * as emailjs from 'emailjs-com'


export default class ContactForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            title: '',
            message: '',
            errors: {
                name: '',
                email: '',
                title: '',
                message: ''
            },
            showResponse: false,
        }


    }

    handleInputChange(event) {
        event.preventDefault()
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.validateMail()) {
            return;
        }

        var templateParams = {
            "to_name": process.env.REACT_APP_TO_EMAIL,
            "from_name": this.state.name,
            "title": this.state.title,
            "message_html": this.state.message,
        }

        //previous template id : template_fg92o5s8

        emailjs.send("gmail", process.env.REACT_APP_EMAILJS_TEMPLATE, templateParams, process.env.REACT_APP_EMAILJS_USERID)

        this.setState({
            name: '',
            email: '',
            title: '',
            message: '',
            showResponse: true
        })
        this.submitAnimation();
    }

    componentDidMount() {
        this.updateStore();
        this.animate();
    }

    updateStore = () => {

        store.dispatch(
            { type: 'change_Color', payload: { color: 'contact' } }
        );
    }

    animate = () => anime({
        targets: '.animatedText',
        translateY: [-100, 400],
        duration: 4000,
        rotate: (-30),
        complete: () => anime({
            targets: '.animatedText',
            translateY: [400, 350],
            duration: 4000,
            loop: true,
            easing: 'linear',
            direction: 'alternate',
        }),
    })

    submitAnimation = () => {
            anime({
                complete: () => anime({
                    targets: '.animatedResponse',
                    translateY: [-100, 600],
                    duration: 4000,
                    rotate: (-30),
                    opacity: [0, 1],
                    complete: () => anime({
                        targets: '.animatedResponse',
                        translateY: [600, -100],
                        duration: 6000,
                        opacity: [1, 0],
                    }),
                }),
            })
    }

    validateMail = () => {
        let errors = {};
        let formIsValid = true;

        if (!this.state.name) {
            errors.name = 'Name cannot be empty.';
            formIsValid = false;
        }

        if (!this.state.title) {
            errors.title = 'Title cannot be empty.';
            formIsValid = false;
        }


        if (!this.state.email) {
            errors.email = 'Mail cannot be empty.';
            formIsValid = false;
        }


        if (!this.state.message) {
            errors.message = 'Message cannot be empty.';
            formIsValid = false;
        }

        var mailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (this.state.email && !mailPattern.test(this.state.email)) {
            errors.email = 'This is not a valid mail.'
            formIsValid = false;
        }

        this.setState({ errors: errors })
        return formIsValid;
    }


    render() {
        return (
            <Container className='fade-in' fluid='true'>
                <div >
                    <Row>
                        <Col xs='12' lg='4'>
                            <SingleBreadCrumbs group='event' parent='contact' url='/contact' title='contact form' />
                            <h1 className='animatedText'>Hello there!</h1>
                            {this.state.showResponse ?
                            <h1 className='animatedResponse animatedResponse-success'>Sent successfully!</h1>
                            : ''}
                        </Col>
                        <Col xs='12' lg={{ span: 6 }}>
                            <form className='contactForm' onSubmit={this.handleSubmit} noValidate>
                                <h1 className='contactForm__title'>The Contact Form</h1>

                                <p className='contactForm__about'>
                                  Have questions? Looking for mentorship?
                                  <br/> Interested in booking a workshop or a team training?
                                  <br/> Send me
                                  a message and I will get back to you as soon as possible!</p>
                                <h3 className='contactForm__subtitle'>Get to know each other</h3>

                                <div className='inputBox-name'>
                                    <label xfor="name">Name *</label>
                                    <input className='inputText'
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Smithson"
                                        onChange={this.handleInputChange.bind(this)}
                                        value={this.state.name}
                                    />
                                    <h6 className='contactForm__error'>{this.state.errors.name}</h6>
                                </div>

                                <div className='inputBox-mail'>
                                    <label htmlFor="mailadress">E-mail Address *</label>
                                    <input className='inputText' type="text" id="mailadress" name="email" placeholder="you@mail.me" onChange={this.handleInputChange.bind(this)} value={this.state.email} />
                                    <h6 className='contactForm__error'>{this.state.errors.email}</h6>
                                </div>

                                <h3 className='contactForm__subtitle'>Your Message</h3>
                                <div className='inputBox'>
                                    <label xfor="title">Title *</label>
                                    <input className='inputText' type="text" id="title" name="title" placeholder="Book a git workshop in Thessaloniki" onChange={this.handleInputChange.bind(this)} value={this.state.title} required />
                                    <h6 className='contactForm__error'>{this.state.errors.title}</h6>
                                </div>

                                <label xfor="message">Message *</label>
                                <textarea id="message" name="message" placeholder="Write something.." onChange={this.handleInputChange.bind(this)} value={this.state.message} required></textarea>
                                <h6 className='contactForm__error'>{this.state.errors.message}</h6>
                                <input className='contactForm__submit' type="submit" value="Submit" onClick={this.handleSubmit.bind(this)} />


                            </form>

                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}
