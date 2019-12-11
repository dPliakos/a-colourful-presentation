import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import store from '../../store'
import { DualButtons, Button } from '../parts/Buttons';
import { LinkContainer, StageContainer } from '../parts/LinkContainer';
import CodeSnippets from '../parts/CodeSnippets'
import { EventBreadCrumbsLevel3, BreadCrumbsLevel3 } from '../parts/BreadCrumbs'
import FsLightbox from 'fslightbox-react';
import { Link } from 'react-router-dom'
import { FacebookShareButton } from 'react-share';
import { withRouter } from 'react-router-dom'
import { Facebook } from '../../svg/Social/SocialSvg'


/*  ----------- START OF COMPONENTS ----------- */

const EventIntroduction = (props) =>
    <Row>
        <Col xs='12' md='8' className='EventInfo'>
            <h1 className='EventInfo__Title'>{props.title}</h1>
            <h5 className='EventInfo__Date'>{props.date}</h5>
            <p className='EventInfo__information'>{props.details} </p>
            <DualButtons group={props.group} firstLink={props.firstLink} secondLink={props.secondLink} firstButtonText='Get the Slides' secondButtonText='Facebook Event' />
        </Col>
        <Col xs='12' md='4' className='EventPoster'>
            <h5 className='EventPoster__text'>the poster</h5>
            <img src={props.poster} alt={props.title + ' poster'} onClick={() => props.openLightboxOnSlide(props.lightBoxIndex)} className='EventPoster__image' />
            <FacebookShareButton quote={props.title} url={window.location.href}>
                <Button modifier="share" buttonText={<span className="myButton__wrapper"><Facebook group="menuOpenGradient" />Share!</span>} group="event" />
            </FacebookShareButton>
        </Col>
    </Row>

const LinksRow = (props) => <Row className='postIntroRow'>
    <Col xs='12' className='LinksCont'>
        <div>
            <h1 className='LinksCont__Title'>Links</h1>
        </div>
        {props.links.map((container, id) => <LinkContainer group='callToAction' title={container.title} key={id} Links={container.links} />)}
    </Col>
</Row>

const CheatSheet = React.forwardRef((props, ref) => <Row id="cheatsheet"
    className='postIntroRow'>
    <Col md='8' lg='9' className='cheatSheet'>
        <div ref={ref} className='cheatIntro'>
            <props.svg /><h2>the Cheatsheet</h2>
        </div>
        <Row>
            {props.cheatsheet.map((cheatData, id) => {
                return <Col key={id} md='6' lg='4' className='cheatDetails'>
                    <div className="cheatDetails__wrapper">
                        <props.svg /><h3>{cheatData.title}</h3>
                    </div>
                    {cheatData.commands.map((cheatLine, id) => {
                        return <span key={id} className='cheatDetails__codeLine'><span className='cheatDetails__command'>{cheatLine.command}</span> | {cheatLine.use}</span>
                    })}
                </Col>
            })}

            <Col xs='12' className='stages'>
                <Row>
                    {props.stages.map((stage, id) =>
                        <StageContainer title={'stage ' + id} text={stage} />)}
                </Row>
            </Col>
        </Row>
    </Col>
    <Col md={{ span: 4 }} lg='3' className='tipContainer'>
        <p><b>Pro tip : </b> Make a bookmark so you can always refer back to it! </p>
    </Col>
</Row>
)
const EventCodeSnippets = (props) => <Row className='postIntroRow codeSnippetRow'>
    <Col md='7' lg='8'>
        {props.codeSnippets.map((snippet, id) => <CodeSnippets key={id} title={snippet.title} code={snippet.codesnippets} />)}
    </Col>
    <LinkContainer group='download' title='Get the Files!' Links={props.downloadLinks} />
</Row>

const PhotoMedia = (props) => <Row className='postIntroRow PhotosRow'>
    <Col md='12'>
        <h1>Moments</h1>
    </Col>

    {props.images.map((image, index) => <Col key={index} md='6'>
        <img src={image} alt={formatAlternativeText(image)} onClick={() => props.openLightboxOnSlide(index + 1)} className='PhotosRow__image' />
    </Col>)}
</Row>

const CTAEnding = (props) => <div><Row className='postIntroRow ctaRow'>
    <Col className='ctaBlock' xs='12'>
        <h2 className='ctaBlock__Title'>Book a workshop for your community</h2>
        <div className='ctaBlock__Divider' />
        <Link to='/contact/form'><Button group='calltoAction' buttonText='Show me the form!' /></Link>
    </Col>
    {props.isMobile ? <Col md={{ xs: 12 }} className='tipContainer'>
        <p>Check the Desktop version for extra content such as the workshop's cheatsheet.</p>
    </Col> : ''}
</Row>
</div>

/*  ----------- END OF COMPONENTS ----------- */

const formatAlternativeText = (text) => {
    var result = text.match(/(\w*_\w*)+/)[0];
    return result.split("_").join(" ");
}

const lightBoxImages = (images, poster) => {
    var lightBoximages = [...images];
    lightBoximages.push(poster);
    return lightBoximages;
}

const updateStore = (group) => {
    store.dispatch(
        { type: 'change_Color', payload: { color: group } }
    );
}



class WorkshopDetailed extends Component {

    constructor(props) {
        super(props);
        updateStore(props.group)
        this.state = {
            toggler: false, slide: 0
        }
    }

    cheatSheetRef = React.createRef();

    componentDidMount() {
        setTimeout(() => this.scrollToAnchor(this.cheatSheetRef, 'cheatsheet'), 1000);
    }

    scrollToAnchor = (toRef, domID) => {
        console.log(toRef);
        if (toRef && window.location.href.includes(`#${domID}`)) {
            toRef.current.scrollIntoView({
                // optional params
                behavior: 'smooth',
                block: 'start',
                inline: 'center',
            });
        }
    }



    openLightboxOnSlide = (number) => {
        this.setState(prevState =>
            ({
                toggler: !prevState.toggler,
                slide: number,
            })
        );
    }

    render() {
        const toggler = this.state.toggler;
        const slide = this.state.slide;
        const mobile = this.props.mobile;

        return <Container className='fade-in' fluid='true'>

            <BreadCrumbsLevel3 group={this.props.group} topic={this.props.data.topic} title={this.props.data.title} />


            <EventIntroduction topic={this.props.data.topic} title={this.props.data.title} date={this.props.data.date} details={this.props.data.details}
                group={this.props.data.group} firstLink={this.props.data.slides}
                secondLink={this.props.data.socialEvent}
                poster={this.props.data.poster}
                lightBoxIndex={this.props.data.images.length + 1}
                openLightboxOnSlide={(num) => this.openLightboxOnSlide(num)} />


            {this.props.data.links ?
                <LinksRow links={this.props.data.links} />
                : ''
            }

            {this.props.mobile ?
                ''
                : this.props.data.cheatsheet ?
                    <div>
                        <CheatSheet ref={
                            this.cheatSheetRef
                        } stages={this.props.data.stages} cheatsheet={this.props.data.cheatsheet} svg={this.props.data.svg} />
                    </div>
                    : ''
            }

            {this.props.data.codeSnippets ?
                <EventCodeSnippets codeSnippets={this.props.data.codeSnippets} downloadLinks={this.props.data.downloadLinks} />
                : ''
            }


            <PhotoMedia images={this.props.data.images} altText={this.props.data.imageCaptions} openLightboxOnSlide={(num) => this.openLightboxOnSlide(num)} />

            <CTAEnding isMobile={mobile} />

            <FsLightbox
                toggler={toggler}
                slide={slide}
                sources={lightBoxImages(this.props.data.images, this.props.data.poster)}
                type='image'
            />
        </Container>
    }
}

class TalkEvent extends Component {



    constructor(props) {
        super(props);
        this.state = { isMobile: props.mobile, toggler: false, slide: 0 }
        updateStore(props.group)
    }

    openLightboxOnSlide = (number) => {
        this.setState(prevState =>
            ({
                toggler: !prevState.toggler,
                slide: number,
            })
        );
    }




    render() {

        const toggler = this.state.toggler;
        const slide = this.state.slide;
        const mobile = this.props.mobile;

        return <Container className='fade-in' fluid='true'>

            {this.props.group === 'event' ? <EventBreadCrumbsLevel3 group={this.props.group} title={this.props.data.title} /> :
                <BreadCrumbsLevel3 group={this.props.group} topic={this.props.data.topic} title={this.props.data.title} />}

            <EventIntroduction title={this.props.data.title} date={this.props.data.date} details={this.props.data.details}
                group={this.props.data.group} firstLink={this.props.data.slides}
                secondLink={this.props.data.socialEvent}
                poster={this.props.data.poster}
                lightBoxIndex={this.props.data.images.length + 1}
                openLightboxOnSlide={(num) => this.openLightboxOnSlide(num)} />

            {this.props.data.links ?
                <LinksRow links={this.props.data.links} />
                : ''
            }

            <PhotoMedia images={this.props.data.images} altText={this.props.data.imageCaptions} openLightboxOnSlide={(num) => this.openLightboxOnSlide(num)} />

            <CTAEnding isMobile={mobile} />


            <FsLightbox
                toggler={toggler}
                slide={slide}
                sources={lightBoxImages(this.props.data.images, this.props.data.poster)}
                type='image'
            />
        </Container>
    }
}

const WorkshopDetailedEvent = withRouter(WorkshopDetailed);
const TalkEventDetails = withRouter(TalkEvent);

export { WorkshopDetailedEvent, TalkEventDetails };
