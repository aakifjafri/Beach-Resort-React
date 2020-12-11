import React from 'react'

const Hero = ({ children, hero }) => {
    return (
        <header className={hero}>
            {children}
        </header>
    )
}

//id we didn't passed any prps in Hero component
Hero.defaultProps = {
    hero: "defaultHero"
};

export default Hero;