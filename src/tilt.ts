type Config = {
    transform: {
        perspective: number,
        rotateX: number,
        rotateY: number,
        scaleX: number,
        scaleY: number,
        scaleZ: number
    },
}

const transformString = (
    perspective: number, 
    rotateX: number, 
    rotateY: number, 
    scaleX: number, 
    scaleY: number, 
    scaleZ: number
) => {
    return `translate(perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleX}, ${scaleY}, ${scaleZ}))`;
}

const defaultConfig = {
    transform: {
        perspective: 500,
        rotateX: 0,
        rotateY: 0,
        scaleX: 1.12,
        scaleY: 1.12,
        scaleZ: 1.12
    }
} as Config;

const tilt = (
    element_identifier: string, 
    config: Config = defaultConfig
) => {
    const element = document.querySelector(element_identifier) as HTMLElement;

    if (!element) throw new Error(`Element ${element_identifier} not found`);

    let element_width = element.offsetWidth;
    let element_height = element.offsetHeight;
    
    let element_center_x = element_width / 2;
    let element_center_y = element_height / 2;

    element.addEventListener('mousemove', (event: MouseEvent<Element, MouseEvent>) => {
        let mouse_x = event.offsetX;
        let mouse_y = event.offsetY;

        let tilt_x = (mouse_x - element_center_x) / element_center_x;
        let tilt_y = (mouse_y - element_center_y) / element_center_y;

        
        element.style.transform = transformString(config.transform.perspective, config.transform.rotateX, config.transform.rotateY, config.transform.scaleX, config.transform.scaleY, config.transform.scaleZ);
    }) // Tilt element depending on position of mouse


    element.addEventListener('mouseleave', (event) => {
        element.style.transform = transformString(500, 0, 0, 1, 1, 1);;
    }) // Reset the element to its original state
        
}

export default tilt