import React from 'react';
import {TalkEventDetails} from '../../DetailedEvent';
import { Git } from '../../../../svg/topics/topicsSvg';



const LinkArray = {title:'Title',
    links:[]
}

function importAll(r) {
    return r.keys().map(r);
  }
  
  const images = importAll(require.context('../../../../Photos/fosdem/', false, /\.(png|jpe?g|svg|JPE?G)$/));
  
  
 const imageCaptions=['','','','','']

const eventData =
    {
        title:'FOSDEM20',
        date:'1-2 Feb. 2020',
        details:'A free event for software developers to meet, share ideas and collaborate.',
        group:'event',
        topic:'FOSDEM',
        poster:images[0].src,
        slides:'',
        socialEvent:'',
        links:[LinkArray],
        svg:Git,
        images,
        imageCaptions,
    }

const Fosdem20 = (props)=><TalkEventDetails mobile={props.mobile} group={eventData.group} data={eventData}/>

export default Fosdem20;
