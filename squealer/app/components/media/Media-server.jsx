"use client"

import Media from './Media'
import dynamic from 'next/dynamic'
const MediaServer = (props) => {
    // const Media = dynamic(() => import('./Media'), { ssr: false })

    return <Media uploads={props.uploads} />
}

export default MediaServer;
