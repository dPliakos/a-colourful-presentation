import React from 'react'
import { Gsoc, Globe, Student, OpenSource } from '../../../svg/topics/topicsSvg';
import Topics from '../Topics'

const talkContent = [
    {
        primarySvg: Gsoc,
        Title: 'Google Summer of Code',
        paragraph: 'A mentorship program for university students, and a unique opportunity to learn and grow',
        svg1: OpenSource,
        svg1Text: 'Open Source Community',
        svg2: Student,
        svg2Text: 'For Students',
        svg3: Globe,
        svg3Text: 'Remote',
        buttonText: 'Browse GSoC',
        link: '/talks/topics/GSoC'
    }
]

const TalkTopics=()=><Topics group='talk' data={talkContent} />

export default TalkTopics;
