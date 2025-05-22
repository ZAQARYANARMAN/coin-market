import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const triggerAnimation = (animations, setAnimations, image, top, left, percent) => {
    const newAnim = { id: uuidv4(), image: image, top, left, percent };
    setAnimations([...animations, newAnim]);
    setTimeout(() => setAnimations(prev => prev.filter(a => a.id !== newAnim.id)), 1000);
}

const pandingAnimate = (animations) => {
    return animations.map((anim) => {
        return (
            <motion.img
                key={anim.id}
                src={anim.image}
                alt="flying-coin"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                    x: anim.percent,
                    y: [-120, 100],
                    opacity: [1, 1, 0.8, 0],
                    scale: [1, 1.3, 0.8]
                }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                    width: "27px",
                    height: "27px",
                    position: "absolute",
                    top: anim.top,
                    left: anim.left,
                    zIndex: "10",
                    pointerEvents: "none",
                    transition: "0.9s",
                    userSelect: "none"
                }}
            />
        )
    })
}

export { triggerAnimation, pandingAnimate }