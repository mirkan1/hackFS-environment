import React from 'react';
import heroImage from "../../Assets/Images/HeroImage.png"
import Button from '../Components/CommonContainers/Button';

function HomePage() {
    return ( <div className='flex gap-x-8'>
        <img src={heroImage} alt="hero_image" className='h-96'/>
        <div className='flex flex-col text-2xl gap-y-8 justify-between'>
            <p>
            The world’s first decentralized card club where each card dealt is an NFT owned by someone.  
            <br/>
            <br/>
            If your card is involved in a winning hand, you also win. 
            </p>
            <div>
            <Button btnText={"Connect Wallet"}/>
            </div>
        </div>
    </div> );
}

export default HomePage;