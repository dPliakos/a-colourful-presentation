import React from 'react';
import {WorkshopDetailedEvent} from '../../DetailedEvent'
import rorpt1poster from '../../../../Photos/railspt1ateith/poster/rorpt1poster.jpg'

import { Ruby } from '../../../../svg/topics/topicsSvg';

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../../../Photos/railspt1ateith/', false, /\.(png|jpe?g|svg|JPE?G)$/));


const codesnippet_docker=<div>
<div>
    {/* eslint-disable-next-line*/}
    <span className='codeSnippet__code-Comment'>// install Docker</span>
    <a href=' https://docs.docker.com/docker-for-windows/install/' className='codeSnippet__code-Link'> https://docs.docker.com/docker-for-windows/install/</a>
</div>
<div>
    {/* eslint-disable-next-line*/}
    <span className='codeSnippet__code-Comment'>// Create a new Folder </span>
    <span className='codeSnippet__code-Command'>mkdir </span>
    <span className='codeSnippet__code-Input'>rails_workshop && </span>
    <span className='codeSnippet__code-Command'>cd </span>
    <span className='codeSnippet__code-Input'>rails_workshop </span>
</div>
<div>
    <span className='codeSnippet__code-Command'>docker run </span>
    <span className='codeSnippet__code-Input'>-ti -v "$PWD":/rails_workshop --name rails_workshop -p 3000:3000 ruby bash</span>
</div>
<div>
    <span className='codeSnippet__code-Command'>cd </span>
    <span className='codeSnippet__code-Input'>rails_workshop </span>
</div>
<div>
    <span className='codeSnippet__code-Command'>gem </span>
    <span className='codeSnippet__code-Input'>install rails --version 5.0.0 </span>
     {/* eslint-disable-next-line*/}
    <span className='codeSnippet__code-Comment'>//This may take a while!</span>
</div>
</div>


const codesnippet_rails=<div>
<div>
    {/* eslint-disable-next-line*/}
    <span className='codeSnippet__code-Comment'>// Create a Rails web application</span>
    <a href=' https://docs.docker.com/docker-for-windows/install/' className='codeSnippet__code-Link'> https://docs.docker.com/docker-for-windows/install/</a>
</div>
<div>
    {/* eslint-disable-next-line*/}
    <span className='codeSnippet__code-Comment'>// Create a new Folder </span>
    <span className='codeSnippet__code-Command'>mkdir </span>
    <span className='codeSnippet__code-Input'>rails_workshop && </span>
    <span className='codeSnippet__code-Command'>cd </span>
    <span className='codeSnippet__code-Input'>rails_workshop </span>
</div>
<div>
    <span className='codeSnippet__code-Command'>rails new </span>
    <span className='codeSnippet__code-Input'> schedule -T</span>
</div>
<div>
    <span className='codeSnippet__code-Command'>cd </span>
    <span className='codeSnippet__code-Input'>schedule </span>
</div>
<div>
    {/* eslint-disable-next-line*/}
    <span className='codeSnippet__code-Comment'>// edit Gemfile and add </span>
    <span className='codeSnippet__code-Command'>gem </span>
    <span className='codeSnippet__code-Input'> 'haml-rails' </span>
</div>


<div>
    <span className='codeSnippet__code-Command'>bundle install </span>
     {/* eslint-disable-next-line*/}
    <span className='codeSnippet__code-Comment'>// This may take a while!</span>
</div>
</div>

const downloadLinks=[
    {
        url: 'sadaaa',
        text: 'test'
    },
    {
        url: 'sadaaa',
        text: 'test'
    },
    {
        url: 'sadaaa',
        text: 'test'
    }
]

const cheatsheet=[
    {
        title:'Architectural  pattern',
        commands:
        [{command:'MVC',
        use:'Model View Controller'
        },
        {command:'lalalala ',
        use:'We did it!'
        }]
    },
    {
        title:'Get started!',
        commands:
        [{command:'rails server',
        use:'start the rails server to serve your application'
    }]
    },
    {
        title:'yeet',
        commands:
        [{
        command:'git pull',
        use:'updates the local project'
        }]
    },
    {
        title:'Basic actions',
        commands:
        [{
        command:'CRUD',
        use:'Create Read Update Destroy'
        }]
    },

    {
        title:'Try Rails stuff',
        commands:
        [{
        command:'rails console',
        use:'Fire up the rails console'
        }]
    },

    {
        title:'yeet',
        commands:
        [{
        command:'git pull',
        use:'updates the local project'
        }]
    }
]

const LinkArray = {title:'Title',
    links:[
    {
        url: 'sadaaa',
        text: 'test test test'
    },
    {
        url: 'sadaaa',
        text: 'test'
    },
    {
        url: 'sadaaa',
        text: 'test'
    }]
}

const imageCaptions = ['lorem','lorem','lorem','lorem','lorem']

const stages = [
    'eat guacamole and cheese','drink water','sleep late sleep late'
]
const eventData =
    {
        title:'Intro to Ruby On Rails',
        date:'06/05/2019',
        details:'Create a fully functional web application in under 5 minutes. Let Rails work its magic for you, and get started with your our own web application.',
        group:'workshop',
        topic:'RoR',
        poster:rorpt1poster,
        slides:'https://drive.google.com/open?id=11ySTkZizgAeBH0FaE1DZjAdmXwWUPNqR',
        socialEvent:'https://www.facebook.com/events/403678983517416/',
        links:[LinkArray,LinkArray,LinkArray],
        svg:Ruby,
        cheatsheet,
        codeSnippets:[{
            title:'Using Docker',
            codesnippets:codesnippet_rails
            },
            {title:'Using docker',
            codesnippets:codesnippet_docker
            }
        ],
        images,
        stages,
        imageCaptions,
        downloadLinks
    }


const Ror1ateith = (props)=><WorkshopDetailedEvent mobile={props.mobile} group='workshop' data={eventData}/>

export default Ror1ateith;
