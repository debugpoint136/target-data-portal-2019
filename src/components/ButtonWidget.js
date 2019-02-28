import React from 'react';
import {css} from 'emotion'
import tw from 'tailwind.macro'
const styles = {
    button: css(tw `m-8 p-4 bg-grey-lighter h-32 mx-auto w-3/4 font-sans hover:text-2xl hover:text-white text-3xl justify-center items-center flex text-red hover:bg-blue lg:w-32`)
}

const ButtonWidget = () => {
    return (
        <div className={styles.button}>Click me!</div>
    );
}

export default ButtonWidget;
