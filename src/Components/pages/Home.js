import React, { Component } from 'react';
import anime from 'animejs/lib/anime.es.js';
import history from '../../history'
import store from '../../store'

import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { Button } from '../../Components/parts/Buttons';
import { CallToActionSvg } from '../../svg/CallToActionSvg';

class Home extends Component {

    state = {
        animationPlaying: true
    }


    componentDidMount() {
        this.scrollToChangePage = this.scrollToChangePage.bind(this);

        //set theme to purple
        this.updateStore();

        //add listeners for scroll / swipe
        window.addEventListener("wheel", this.scrollToChangePage, true);
        window.addEventListener('touchstart', this.startTouch, false);
        window.addEventListener('touchmove', this.swipeToChangePage, false);

        //play animations
        this.entranceAnimation();
    }

    componentWillUnmount() {

        //remove scroll / swipe listeners
        window.removeEventListener('wheel', this.scrollToChangePage, true);
        window.removeEventListener('touchstart', this.startTouch, true);
        window.removeEventListener('touchmove', this.swipeToChangePage, true);
    }

    initialX = null;
    startTouch = (e) => {
        this.initialX = e.touches[0].clientX;
    };
    swipeToChangePage = (e) => {

        if (this.initialX === null) {
            return;
        }
        var currentX = e.touches[0].clientX;
        var diffX = this.initialX - currentX;

        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            this.changePage();
        }
        this.initialX = null;
        e.preventDefault();
    };

    scrollToChangePage = (e) => {
        if (e.deltaY > 0) {
            //scroll down
            this.changePage();
        }
    }

    changePage = () => {
        history.push('/Categories');

    }


    //when the animation is completed,hide the skip button 
    animationTimeline = anime.timeline({ complete: () => this.hideSkipButton() });

    entranceAnimation = () => {
        var textWrapper = document.querySelector('.leftContent__title');

        // eslint-disable-next-line
        textWrapper.innerHTML = textWrapper.textContent.replace((/([^\x00-\x80]|\w)/g), "<span class='letter'>$&</span>");

        this.animationTimeline
            .add({
                targets: '.leftContent__title .letter',
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 2250,
                delay: function (el, i) {
                    return 150 * (i + 1)
                }
            })
            .add({
                targets: '.leftContent__subtitle-first',
                opacity: [0, 1],
                easing: "easeInOutQuad"
            })
            .add({
                targets: '.leftContent__subtitle-second',
                opacity: [0, 1],
                easing: "easeInOutQuad"
            })
            .add({
                targets: '.leftContent__subtitle-last',
                opacity: [0, 1],
                easing: "easeInOutQuad"
            })
            .add({
                targets: '.rightContent',
                translateX: -1000,
                duration: 2000,
                easing: 'easeInOutSine',
                scale: [.05, 1],
            })
            .add({
                targets: '.homeCTA',
                opacity: [0, 1],
                duration: 1000,
            })
            .add({
                targets: '.skipButton',
                opacity: [1, 0],
                duration: 1000,
                complete: () => this.hideSkipButton()
            })

    }


    skipAnimation = () => {

        //finish animation
        this.animationTimeline.seek(this.animationTimeline.duration);

        //hide skip button
        this.hideSkipButton();
    };

    hideSkipButton = () => this.setState({ animationPlaying: false })

    updateStore = () => {
        store.dispatch(
            { type: 'change_Color', payload: { color: 'stella' } }
        );
    }

    render() {
        return (
            <Container id='homePage' fluid='true' className='home'>

                {/*IF animation is playing,show the skip button */}
                {this.state.animationPlaying ? <button className='skipButton fade-in' onClick={this.skipAnimation}>Skip Animations?</button> : ''}

                <Row>
                    <Col className='leftContent' md='6'>
                        <h1 className='leftContent__title'>Stella Rouzi</h1>
                        <h3 className='leftContent__subtitle leftContent__subtitle-first'>Event Organizer</h3>
                        <h3 className='leftContent__subtitle leftContent__subtitle-second'>Ruby on Rails Dev</h3>
                        <h3 className='leftContent__subtitle leftContent__subtitle-last'>GSoC Mentor</h3>

                    </Col>
                    <Col className='rightContent' md='6'>
                        <p className='rightContent__paragraph'>
                            Meeting new people, sharing ideas,
                        <br />
                            exploring the world,
                        <br />
                            contributing!
                    </p>
                    </Col>
                </Row>
                <Row className='homeCTA'>
                    <Col md='6'>
                        <span className='home__latest'>Latest</span>
                        <Button group='workshop' buttonText='Git 101' />
                    </Col>

                    <Col className='scrollGuide' md='6'>
                        <Link to='/Categories'>
                            <span className='home__scrollAction'>Try Swiping or Scrolling!</span> <CallToActionSvg />
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;