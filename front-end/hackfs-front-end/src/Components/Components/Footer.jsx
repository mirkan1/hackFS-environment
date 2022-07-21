import React from 'react';

import chainlinkLogo from "../../Assets/Images/ChainLinkLogo.png"
import fileCoinLogo from "../../Assets/Images/FileCoinLogo.png"
import ipfsLogo from  "../../Assets/Images/IpfsLogo.png"
import nftStorageLogo from "../../Assets/Images/NftStorageLogo.png"
import polygonLogo from "../../Assets/Images/PolygonLogo.png"


const Footer_Icons = ({imgSrc="",imgAlt=""})=>{
    return <li>
        <img src={imgSrc} alt={imgAlt} className="h-12 "/>
    </li>;
}

const Footer=() =>{
    return ( <ul className="mt-auto text-2xl font-strong p-4 flex justify-center gap-x-2 items-center">
        <li>Powered By : </li>
        <Footer_Icons imgSrc={chainlinkLogo} imgAlt="Chainlink"/>
        <Footer_Icons imgSrc={polygonLogo} imgAlt="Polygon"/>
        <Footer_Icons imgSrc={ipfsLogo} imgAlt="Ipfs" />
        <Footer_Icons imgSrc={nftStorageLogo} imgAlt="NFT.Storage"/>
        <Footer_Icons imgSrc={fileCoinLogo} imgAlt="Filecoin"/>
        </ul> );
}

export default Footer;