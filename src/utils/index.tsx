import { Responsive } from "semantic-ui-react"

export const isSSR = typeof window === 'undefined'

export const getWidth = () => {
    return isSSR ? Number(Responsive.onlyTablet.minWidth) : Number(window.innerWidth)
}

export const generateBase64InitialImage = (name: string) => {
    let initials = '';
    const firstInitial = name?.split(' ')[0] || 'A';
    const lastInitial = name?.split(' ').reduceRight((a: string) => a) || 'Z';
    if (firstInitial === lastInitial) {
        initials = lastInitial.trim().substring(0, 2).toUpperCase();
    }
    initials = [firstInitial, lastInitial]
        .map((initial) => initial[0])
        .join('')
        .toUpperCase();
    const randomColor = `hsl(${360 * Math.random()},${(25 + 70 * Math.random())}%,${(85 + 10 * Math.random())}%)`;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = 750;
    context.fillStyle = randomColor;
    context.beginPath();
    context.fillRect(
        0, 0,
        canvas.width, canvas.height,
    );

    context.font = `${(canvas.height/4)}px serif`;
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(initials, canvas.width/2, canvas.height/2);
    return canvas.toDataURL();
}

export const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }