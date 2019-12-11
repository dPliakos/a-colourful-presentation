import React from 'react';
import {WorkshopDetailedEvent} from '../../DetailedEvent';
import git101poster from '../../../../Photos/git101ateith/poster/git101poster.jpg'
import { Git } from '../../../../svg/topics/topicsSvg';

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../../../Photos/git101ateith/', false, /\.(png|jpe?g|svg|JPE?G)$/));

const codesnippets=<div></div>

const downloadLinks=[
]

const cheatsheet=[]

const stages = [
    // 'eat guacamole and cheese','drink water','sleep late sleep late'
]

const LinkArray = {title:'Titxle',
    links:[]
}

const imageCaptions=['lorem','lorem','lorem','lorem','lorem']
const eventData =
    {
        title:'git101',
        date:'06/05/2019',
        details:'An introduction to git basic commands and workflows, with an after-flavor of GitHub',
        group:'workshop',
        topic:'git',
        poster:git101poster,
        slides:'https://docs.google.com/presentation/d/1EQo6aQmxGQ-HV1Q7ZTpbSTBzhoIwOmkffHM9r6ji5lM/edit?usp=sharing',
        socialEvent:'https://www.facebook.com/events/455650285188880/',
        links:[LinkArray],
        svg:Git,
        cheatsheet,
        codeSnippets:[{
            title:'TItle01',
            codesnippets
        },
        {
            title:'TItle05',
            codesnippets
        }
    ],
        images,
        imageCaptions,
        downloadLinks,
        stages
    }

const Git101 = (props)=><WorkshopDetailedEvent mobile={props.mobile} group='workshop' data={eventData}/>

export {Git101};
